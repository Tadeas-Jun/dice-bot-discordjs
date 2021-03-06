const { Client, MessageEmbed, Message } = require('discord.js');
const client = new Client({ intents: [] });
const { token } = require('./resources/config.json');

const commands = require('./resources/commands.json');

let resultsEmbed;

console.log('Starting bot, please give me a second.');
client.on('ready', async () => {

    await CreateCommands();

    resultsEmbed = new MessageEmbed();

    console.log('I am ready to throw dice!');

});

async function CreateCommands() {

    console.log('Creating commands.');

    let commandData = commands.commands;

    console.log(`Deploying ${commandData.length} commands.`);

    // Deploying commands for all guilds (might take up to an hour to load everywhere).
    await client.application?.commands.set(commandData);

    // Deploy the commands to a specific guild, for testing purposes - the global commands take up to an hour to load, the guild commands are instant.
    // await client.guilds.cache.get('GUILD_ID')?.commands.set(commandData);

}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // Get the specified number of sides for the selected dice.
    const diceMaxes = GetDiceMax(interaction);

    // If the specified number of sides in /d-- is out of the 2 - 9999 range, return an ephemeral error message to the user.
    if(diceMaxes === -1) {
        interaction.reply({ content: 'Please select a number of sides between **2** and **9999**.', ephemeral: true });
        return;
    }

    // Load the specified number of sides from /d--.
    if(interaction.commandName === "d--") interaction.commandName = `d${diceMaxes[0]}`;

    // Calculate the result of each of the dice.
    let results = [];
    diceMaxes.forEach(diceMax => {

        results.push(ThrowDice(diceMax));

    });

    // Reply to the user with an embed, the command name (type of die) and the results.
    const replyString = `I threw **${interaction.commandName}**, and got: **${results.join("**, **")}**.`;
    resultsEmbed
        .setColor(RandomHexColor())
        .setDescription(replyString);

    console.log(`Sending dice throw.`);
    interaction.reply({embeds: [resultsEmbed]});

});

// Calculate a random color hexcode for the embed.
function RandomHexColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

// Get the number of sides on the specific type of die from the Discord interaction.
function GetDiceMax(interaction) {

    // Handle the /d-- command.
    if(interaction.commandName === "d--") {

        const diceMax = interaction.options.getInteger('sides');
        if(diceMax < 2 || diceMax > 9999) {
            return -1;
        }

        return [diceMax];
    }

    const dIndex = interaction.commandName.indexOf('d');
    
    // Get the number of dice being thrown.
    const numberOfDice = dIndex === 0 ? 1 : parseInt(interaction.commandName.substring(0, dIndex));

    // Get the number of sides for this type of die.
    const diceMax = parseInt(interaction.commandName.substring(dIndex + 1));

    // Build an array containing the number of sides for each individual die.
    let diceMaxes = [];
    for(let i = 0; i < numberOfDice; i++) {
        diceMaxes.push(diceMax);
    }

    return diceMaxes;

}

// Calculate a random number between 1 and the number of sides for a given die.
function ThrowDice(diceMax) {

    return Math.floor(Math.random() * diceMax) + 1;

}

client.login(token);
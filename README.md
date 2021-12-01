# Dice Bot using Discord.js
🎲 This is a simple Discord bot, coded in JavaScript and the Discord.js library. This bot allows its users to roll several types of die, including `d20`, `4d6`, and a customizable `d--`.

## Dice
The bot features 9 sets of dice, as well as one extra costumizable die. The featured dice commands are `/d4`, `/d6`, `/4d6`, `/d8`, `/d10`, `/2d10`, `/d12`, `/d20`, `/d100`, `/d--`.

The bot will reply to any of these commands with an embedded message, including the thrown dice and the results. The embed has a randomly colored side for aestethic effect.

### d--
When a user throws the customazible die, using the command `/d--`, they have to specify a number of sides the die should have. This number can range from 2 to 9999. The embeded response from the bot will include the number of sides the rolled die has. 

## Set-up & use
To set up this bot, please create a bot application in the Discord Developer Portal (for more instructions, see [Tutorial](/README.md#tutorial)), and then follow these steps:

1. Create a `resources/config.json` file and include your bot token with the key `"token"`.
2. Change the information in the `package.json` file to reflect your bot's data.
3. Make sure your bot has the `applications.commands` scope enabled to be able to use Slash Commands.
4. Run the bot via NodeJS by running the `node bot.js` command locally, or set up online hosting.

*The `README.md`, `LICENSE`, `.gitignore`, and `.github` files/folders do not have to be included in the bot's folder. All other files do.*

If you chose to use this bot for your games, please consider sponsoring the project here on GitHub with a few dollars.

### Adding more dice
During the set-up phase, you might choose to remove, change, or include more dice than those which are specified above. You may do so by editing the `resources/commands.json` file. Keep in mind that, in order for the default code to work properly with changed commands, all commands have to abide by the following strict format:

`[y]d[x]`,

where `[y]` is the number of dice of the type thrown, and `[x]` is the number of sides this type of die has. For example, in the `/4d6` command (`[y] = 4, [x] = 6`), the bot throws four six-sided dice.

## Tutorial
A full article on how to code, set up, and use this bot is coming soon.

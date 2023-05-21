// Load necessary variables and classes
require('dotenv').config()
const { REST, Routes, Application, ApplicationCommand, ApplicationCommandOptionType } = require('discord.js');

// Define an array of commands
const commands = [
	{
		name: 'ping',
		description: 'Replies with pong!',
	},
	{
		name: 'help',
		description: 'Get a list of what Pancake Chicken can do!',
	},
	{
		name: 'sentiment',
		description: 'Takes user input and returns a sentiment score.',
		options: [{
			name: 'input',
			description: 'A word or phrase.',
			type: ApplicationCommandOptionType.String,
			required: true,
		}]
	},
	{
		name: 'uptime',
		description: '(WIP) Returns the uptime of this bot for this week.',
	},
	{
		name: 'age',
		description: '(WIP) Returns the age of the current chicken.',
	},
]

// Discord REST API client
const rest = new REST().setToken(process.env.TOKEN);

// Register the commands with the Discord API, logs error if it fails
(async () => {
	try {
		console.log('Registering slash commands...');
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
		console.log('Slash commands registered successfully!');
	} catch (error) {
		console.log(`There was an error: ${error}`);
	}
})();

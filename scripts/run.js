// Load necessary variables and classes
require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');
const { readFileSync } = require('fs');
const jsonData = readFileSync('./data/responses.json', 'utf8');
const { nicknames, responses } = JSON.parse(jsonData);
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Discord bot client to receive server and message information
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

// When the bot is ready, log a message in the console
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages, log messages, ignore bots, clean message
client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	console.log(`Message received: ${message.content}`);
	if (typeof message.content !== 'string') return;
	let messageContent = message.content.toLowerCase().trim();

	// Iterate over keywords and select random response
	if (nicknames.some(keyword => messageContent.includes(keyword))) {
		let randomResponse = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(randomResponse);
	}
});

// Listen for interactions, log commands, ignore non-slash-commands
client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	console.log(`Command received: /${interaction.commandName}`);

	// ping
	if (interaction.commandName === 'ping') {
		interaction.reply('Pong!');
	}

	// sentiment [input]
	if (interaction.commandName === 'sentiment') {
		let input = interaction.options.get('input').value;
		console.log(`Input Received: ${input}`);
		let result = sentiment.analyze(input).comparative.toFixed(2);
		let analysis = result > 0 ? 'positive' : result < 0 ? 'negative' : 'neutral';
		interaction.reply(
			'Your input was: `' + input + '` \n' +
			'Pancake Chicken thinks it has a `' + analysis + '` sentiment. (`' + result + '`)'
		);
	}

	// help
	if (interaction.commandName === 'help') {
		interaction.reply(
			'Below is a list of implemented and planned features: \n' +
			'1. Pancake Chicken responds to its name. \n' +
			'2. Care for Pancake Chicken: `/feed`, `/play`, `/clean` \n' +
			'3. Utility commands: `/sentiment`, `/uptime`, `/age`, `/remind`');
	}

	// uptime
	if (interaction.commandName === 'uptime') {
		interaction.reply('...bawk? \n `This feature is still under development.`');
	}

	// age
	if (interaction.commandName === 'age') {
		interaction.reply('...bawk? \n `This feature is still under development.`');
	}
});

// Login using the bot token
client.login(process.env.TOKEN); 
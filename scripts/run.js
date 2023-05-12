// Load necessary variables and classes
require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');
const { readFileSync } = require('fs');
const jsonData = readFileSync('./data/responses.json', 'utf8');
const { nicknames, responses } = JSON.parse(jsonData);
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

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

// Listen for messages, log messages, ignore bots, 
client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	console.log(`Message received: ${message.content}`);
	if (typeof message.content !== 'string') return;

	const messageContent = message.content.toLowerCase().trim();

	// Iterate over keywords and select random response
	if (nicknames.some(keyword => messageContent.includes(keyword))) {
		const randomResponse = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(randomResponse);
	}
});

// Listen for interactions, log commands, ignore non-slash-commands
client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	console.log(`Command received: /${interaction.commandName}`);

	// Check and respond to commands
	if (interaction.commandName === 'ping') {
		interaction.reply('Pong!')
	}
	
	// Takes user input and returns sentiment score.
	if (interaction.commandName === 'sentiment') {
		const input = interaction.options.get('input').value;
		console.log(`Input Received: ${input}`);
		var result = sentiment.analyze(input).comparative;
		interaction.reply(`${result}`);
	}
});

// Login using the bot token
client.login(process.env.TOKEN); 
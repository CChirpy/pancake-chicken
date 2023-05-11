// Load necessary environment variables and classes
require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');

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

// Listen for messages
client.on('messageCreate', (message) => {

  // Ignore messages sent by bots
  if (message.author.bot) return;

  // Logs message in console
  console.log('Message received:', message.content);

  // Only respond to text messages
  if (typeof message.content !== 'string') return;

  // Check and respond to messages
  if (message.content.trim().startsWith('ping')) {
    message.channel.send('pong!');
  }
});

// Listen for interactions
client.on('interactionCreate', (interaction) => {

  // Ignore interactions that are not slash commands
  if (!interaction.isChatInputCommand()) return;

  // Logs slash commands in console
  console.log('Command received: /' + interaction.commandName);

  // Check and respond to commands
  if (interaction.commandName === 'ping') {
    interaction.reply('Pong!')
  }
});

// Login using the bot token
client.login(process.env.TOKEN); 
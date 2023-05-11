// Import necessary classes
require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new instance of the Client class with specific intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When the bot is ready, log a message in the console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages and respond to 'ping' messages with 'pong'
client.on("messageCreate", (message) => {

  // Ignore messages sent by bots
  if (message.author.bot) return;

  // Logs message in console
  console.log("Message received:", message.content);

  // Only respond to text messages
  if (typeof message.content !== "string") return;

  // Check if the message starts with 'ping' and respond with 'pong'
  if (message.content.trim().startsWith("ping")) {
    message.channel.send("pong!");
  }
});

// Bot token
client.login(process.env.TOKEN); 
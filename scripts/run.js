// node scripts/run.js

// Import the necessary classes from the 'discord.js' library
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new instance of the Client class with specific intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
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
  if (message.author.bot) return; // Ignore messages sent by bots
  console.log("Message received:", message.content);
  if (typeof message.content !== "string") return; // Only respond to text messages
  if (message.content.trim().startsWith("ping")) { // Check if the message starts with 'ping'
    console.log("Ping received!");
    message.channel.send("pong!"); // Send a message back to the same channel
  }
});

client.login(""); // Replace this string with your bot token

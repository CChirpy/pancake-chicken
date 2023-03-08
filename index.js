// The Client and Intents are destructured from discord.js, since it exports an object by default. 
// Read up on destructuring here: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

// const { Client, Intents } = require("discord.js");
// const client = new Client({
//  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
// });

const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// client.on("ready", () => {
//   console.log("I am ready!");
// });

// client.on("messageCreate", (message) => {
//   if (message.content.startsWith("ping")) {
//     message.channel.send("pong!");
//   }
// });

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // ignore messages sent by bots
  console.log("Message received:", message.content);
  if (typeof message.content !== "string") return;
  if (message.content.trim().startsWith("ping")) {
    console.log("Ping received!");
    message.channel.send("pong!");
  }
});

client.login("");

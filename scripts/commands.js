// Load necessary variables and classes
require('dotenv').config()
const { REST, Routes } = require('discord.js');

// Define an array of commands
const commands = [
  {
    name: 'ping',
    description: 'Replies with pong!',
  }
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

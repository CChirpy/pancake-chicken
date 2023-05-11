// Load necessary environment variables and classes
require('dotenv').config()
const { REST, Routes } = require('discord.js');

// Define an array of commands
const commands = [
    {
        name: 'ping',
        description: 'Pong!'
    }
]

// Discord REST API client
const rest = new REST().setToken(process.env.TOKEN);

// Register the commands with Discord
(async () => {
    try {
        // Log a message indicating that registration is starting
        console.log('Registering slash commands...');

        // Register the commands with the Discord API
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        // Log a message indicating that registration was successful
        console.log('Slash commands registered successfully!');
    } catch (error) {
        // Log an error message if registration fails
        console.log(`There was an error: ${error}`);
    }
})();

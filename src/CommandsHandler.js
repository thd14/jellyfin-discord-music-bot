const Discord = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const discordclientmanager = require("./discordclientmanager");
const discordClient = discordclientmanager.getDiscordClient();

function init (clientId, guildId,token) {
    discordClient.commands = new Discord.Collection();
    const commands = [];
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
        if ('data' in command && 'execute' in command) {
            discordClient.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
    // Construct and prepare an instance of the REST module
    const rest = new Discord.REST({ version: '10' }).setToken(token);
    // and deploy your commands!
    (async () => {
        try {
        
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Discord.Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
            
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}
module.exports = {
	init
}
try {
	const CONFIG = require("../config.json");
	const Discord = require("discord.js");
	const jellyfinClientManager = require("./jellyfinclientmanager");

	const discordclientmanager = require("./discordclientmanager");
	discordclientmanager.init();
	const CommandsHandler = require("./CommandsHandler")
	const discordClient = discordclientmanager.getDiscordClient();
	const {
		handleChannelMessage
	} = require("./messagehandler");
	const log = require("loglevel");
	const prefix = require("loglevel-plugin-prefix");
	const chalk = require("chalk");
	const colors = {
		TRACE: chalk.magenta,
		DEBUG: chalk.cyan,
		INFO: chalk.blue,
		WARN: chalk.yellow,
		ERROR: chalk.red
	};

	log.setLevel(CONFIG["log-level"]);

	prefix.reg(log);
	log.enableAll();

	prefix.apply(log, {
		format (level, name, timestamp) {
			return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
		}
	});

	prefix.apply(log.getLogger("critical"), {
		format (level, name, timestamp) {
			return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
		}
	});

	jellyfinClientManager.init();
	// TODO Error Checking as the apiclients is inefficent
	jellyfinClientManager.getJellyfinClient().authenticateUserByName(CONFIG["jellyfin-username"], CONFIG["jellyfin-password"]).then((response) => {
		jellyfinClientManager.getJellyfinClient().setAuthenticationInfo(response.AccessToken, response.SessionInfo.UserId);
	});
	CommandsHandler.init(CONFIG["clientId"],CONFIG["guildId"],CONFIG["token"]);

	discordClient.once(Discord.Events.ClientReady, () => {
        console.log('Ready!');
    });
    
    discordClient.on(Discord.Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
		const command = discordClient.commands.get(interaction.commandName);

        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
	

	discordClient.on("message", (message) => {
		handleChannelMessage(message);
	});
	
	discordClient.login(CONFIG.token);
} catch (error) {
	console.error(error);
}

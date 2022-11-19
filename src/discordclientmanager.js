const Discord = require("discord.js");

var discordClient;

function init () {
	discordClient = new Discord.Client({intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildVoiceStates,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers,
	]});
}
function getDiscordClient () {
	return discordClient;
}

module.exports = {
	getDiscordClient,
	init
};

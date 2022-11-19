const Discord = require('discord.js');
const playbackmanager = require("../src/playbackmanager");
const {
	getDiscordEmbedError
} = require("../src/util");

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('list')
		.setDescription('Show the playlist'),
	async execute(interaction) {
		const reply = await playbackmanager.makeList(interaction);
		await interaction.reply({ embeds: [reply] });
	},
};
const Discord = require('discord.js');
const playbackmanager = require("../src/playbackmanager");
const {
	getDiscordEmbedError
} = require("../src/util");

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the playlist'),
	async execute(interaction) {
		playbackmanager.shuffle()
		var reply
		if (typeof playbackmanager.getcurrentPlayingPlaylist() == 'undefined') {
			reply = getDiscordEmbedError("No playlist");
		}else{
			reply = new Discord.EmbedBuilder()
			.setColor(interaction.guild.members.me.displayHexColor)
			.setTitle(":twisted_rightwards_arrows: Playlist shuffled :twisted_rightwards_arrows:")
		}
		await interaction.reply({ embeds: [reply] });
	},
};
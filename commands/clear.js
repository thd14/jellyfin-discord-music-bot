const Discord = require('discord.js');
const playbackmanager = require("../src/playbackmanager");


module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('clear')
		.setDescription('Empty the playlist'),
	async execute(interaction) {
		playbackmanager.clear()
		const reply = new Discord.EmbedBuilder()
		.setColor(interaction.guild.members.me.displayHexColor)
		.setTitle(":no_entry_sign: Playlist cleared :no_entry_sign:")
		await interaction.reply({ embeds: [reply] });
	},
};
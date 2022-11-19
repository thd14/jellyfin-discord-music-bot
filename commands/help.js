const Discord = require('discord.js');
const {helpMessage} = require("../src/messagehandler");

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('help')
		.setDescription('Show comande list'),
	async execute(interaction) {
		reply = helpMessage();
		await interaction.reply({ embeds: [reply] });
	},
};
const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'deletesuggestions',
    description: "刪除建議頻道",
    category: "設置",
    aliases: ['cc'],
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: [""],
    emoji: "🛠️",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const guild = interaction.guild;

            db.delete(`suggestions_${interaction.guild.id}`);
            interaction.followUp({ content: `✅ 已刪除建議頻道` });
        } catch (e) {
            return console.log(e);
        }
    }
};

const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'setsuggestions',
    description: "設置建議頻道",
    category: "設置",
    aliases: ['cc'],
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: [""],
    emoji: "🛠️",
    options: [
        {
            name: 'channel',
            description: "要設置的頻道",
            type: 'CHANNEL',
            required: true
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const guild = interaction.guild;
            const channel = interaction.options.getChannel('channel');

            db.set(`suggestions_${interaction.guild.id}`, channel.id);
            interaction.followUp({ content: `✅ 已設置建議頻道 ${channel}` });
        } catch (e) {
            return console.log(e);
        }
    }
};

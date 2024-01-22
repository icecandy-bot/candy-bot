const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { Client, CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');

module.exports = {
    name: "set-channel-levelup",
    category: "levelup",
    description: "設置升級通知頻道",
    options: [
        {
            name: 'channel',
            description: "選擇頻道",
            type: 'CHANNEL',
            required: true
        },
    ],
    run: async (client, interaction, args) => {

        const GuildMember = interaction.member;
        if (!GuildMember.permissions.has("MANAGE_GUILD")) return interaction.followUp({ content: "您沒有執行此操作的權限！", })
        if (!args.length)
            return interaction.followUp(`需要參數：\`Default\`，\`頻道ID或提及頻道\`\n> Default：在用戶升級的頻道發送消息。\n> 頻道ID或提及頻道：在指定頻道發送消息。`);

        const channel = interaction.options.getChannel('channel');
        if (args[0].toLowerCase() == "default") {
            sql.prepare("INSERT OR REPLACE INTO channel (guild, channel) VALUES (?, ?);").run(interaction.guild.id, "Default");
            return interaction.followUp({ content: `升級通知頻道已設置為默認設置` });
        } else if (channel) {
            const permissionFlags = channel.permissionsFor(interaction.guild.me);
            if (!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) {
                return interaction.followUp(`我沒有權限在或查看 ${channel} 中發送消息！`)
            } else
                sql.prepare("INSERT OR REPLACE INTO channel (guild, channel) VALUES (?, ?);").run(interaction.guild.id, channel.id);
            return interaction.followUp({ content: `升級通知頻道已設置為 ${channel}` });
        } else {
            return interaction.followUp({ content: `需要參數：\`Default\`，\`頻道ID或提及頻道\`\n> Default：在用戶升級的頻道發送消息。\n> 頻道ID或提及頻道：在指定頻道發送消息。` });
        }
    }
}

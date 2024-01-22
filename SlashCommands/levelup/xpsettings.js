const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');
const moment = require("moment")

module.exports = {
  name: "xpsettings",
  description: "❌ | 進階 XP 系統",
  userPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "xp",
      description: "XP 設定",
      type: "STRING",
      required: true,
    },
    {
      name: "seconds",
      description: "秒數",
      type: "STRING",
      required: true,
    },
  ],

  /**
    * @param {CommandInteraction} interaction
    */
  run: async (client, interaction, args) => {
    const guildMember = interaction.member;

    if (!guildMember.permissions.has("MANAGE_GUILD")) {
      return interaction.followUp({ content: "你沒有執行該指令的權限！", });
    }

    const xp = interaction.options.getString('xp');
    const seconds = interaction.options.getString('seconds');

    if (!args.length) {
      return interaction.reply(`請提供有效的參數！\`xpsettings (xp) (seconds)\``);
    }

    let checkIf = sql.prepare("SELECT levelUpMessage FROM settings WHERE guild = ?").get(interaction.guild.id);

    if (checkIf) {
      sql.prepare(`UPDATE settings SET customXP = ? WHERE guild = ?`).run(parseInt(xp), interaction.guild.id);
      sql.prepare(`UPDATE settings SET customCooldown = ? WHERE guild = ?`).run(parseInt(seconds) * 1000, interaction.guild.id);
    } else {
      sql.prepare(`INSERT OR REPLACE INTO settings (guild, levelUpMessage, customXP, customCooldown) VALUES (?,?,?,?)`).run(interaction.guild.id, `**恭喜** {member}！你現在升到了 **等級 {level}**`, parseInt(xp), parseInt(seconds) * 1000);
    }

    return interaction.followUp({ content: `從現在開始，使用者將獲得 1XP - ${parseInt(xp)}XP/${parseInt(seconds)} 秒`, });
  }
}

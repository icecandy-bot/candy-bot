const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
  name: "role-level-show",
  category: "level",
  description: "顯示設定的等級角色",
  run: async (client, interaction, args) => {
    const GuildMember = interaction.member;
    if (!GuildMember.permissions.has("MANAGE_GUILD")) {
      return interaction.followUp({ content: "你沒有執行該指令的權限！", });
    }

    const allRoles = sql.prepare(`SELECT * FROM roles WHERE guildID = ?`).all(interaction.guild.id);

    if (!allRoles || allRoles.length === 0) {
      return interaction.followUp(`目前沒有設定的角色！`);
    } else {
      let embed = new MessageEmbed()
        .setTitle(`${interaction.guild.name} 等級角色設定`)
        .setDescription(`使用 \`help\` 可以獲得更多信息`)
        .setColor("RANDOM");

      for (const data of allRoles) {
        let levelSet = data.level;
        let roleSet = data.roleID;
        embed.addFields({ name: `\u200b`, value: `**等級 ${levelSet}**: <@&${roleSet}>` });
      }

      return interaction.followUp({ embeds: [embed] });
    }
  }
};

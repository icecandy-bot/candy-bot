const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
  name: "role-level-remove",
  category: "level",
  description: "刪除等級角色",
  options: [
    {
      name: 'level',
      description: '要刪除的等級',
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const GuildMember = interaction.member;
    if (!GuildMember.permissions.has("MANAGE_GUILD")) {
      return interaction.reply({ content: "你沒有執行該指令的權限！", });
    }

    if (!args.length) {
      let embed = new MessageEmbed()
        .setTitle(`設定等級角色`)
        .setDescription(`當用戶達到特定等級時，獲得角色獎勵。`)
        .addFields({ name: `role-level add <level> <@role>`, value: `設定在特定等級時給予用戶的角色。` })
        .addFields({ name: `role-level remove <level>`, value: `刪除在指定等級設定的角色。` })
        .addFields({ name: `role-level show`, value: `顯示所有設定為等級的角色。` })
        .setColor("RANDOM");

      return interaction.reply({ embeds: [embed] });
    }

    const levelArgs = interaction.options.getString('level');

    client.deleteLevel = sql.prepare(`DELETE FROM roles WHERE guildID = ? AND level = ?`);
    client.deleteLevel.run(interaction.guild.id, levelArgs);

    let embeds = new MessageEmbed()
      .setTitle(`成功刪除等級角色！`)
      .setDescription(`已刪除等級 ${levelArgs} 的角色獎勵。`)
      .setColor("RANDOM");

    return interaction.followUp({ embeds: [embeds] });
  }
};

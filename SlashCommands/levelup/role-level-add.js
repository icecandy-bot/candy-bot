const Discord = require("discord.js");
const SQlite = require("better-sqlite3");
const sql = new SQlite('./mainDB.sqlite');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
  name: "role-level",
  category: "level",
  description: "等級獎勵",
  options: [
    {
       name: 'level',
       description: '要設定的等級',
       type: 3,
       required: true,
    },
    {
      name: "role",
      type: "ROLE",
      description: "要獲得信息的角色！",
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
    const role = interaction.options.getRole('role');

    client.getRole = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND roleID = ? AND level = ?");
    client.setRole = sql.prepare("INSERT OR REPLACE INTO roles (guildID, roleID, level) VALUES (@guildID, @roleID, @level);");

    let Role = client.getRole.get(interaction.guild.id, role.id, levelArgs);

    if (!Role) {
      Role = {
        guildID: interaction.guild.id,
        roleID: role.id,
        level: levelArgs
      };
      client.setRole.run(Role);
      let embed1 = new MessageEmbed()
        .setTitle(`成功設定角色！`)
        .setDescription(`已為等級 ${levelArgs} 設定角色 ${role}`)
        .setColor("RANDOM");
      return interaction.followUp({ embeds: [embed1] });
    } else if (Role) {
      client.deleteLevel = sql.prepare(`DELETE FROM roles WHERE guildID = ? AND roleID = ? AND level = ?`);
      client.deleteLevel.run(interaction.guild.id, role.id, levelArgs);
      client.updateLevel = sql.prepare(`INSERT INTO roles(guildID, roleID, level) VALUES(?,?,?)`);
      client.updateLevel.run(interaction.guild.id, role.id, levelArgs);
      let embeds = new MessageEmbed()
        .setTitle(`成功設定角色！`)
        .setDescription(`已更新等級 ${levelArgs} 的角色為 ${role}`)
        .setColor("RANDOM");
      return interaction.followUp({ embeds: [embeds] });
    }
  }
};

const db = require('quick.db');
const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: 'setup-auditlog', // 由 tn_hazem 開發
  description: '🔓 | 設置日誌',
  userPermissions: ['ADMINISTRATOR'],
  run: async (client, interaction, args) => {
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`消息日誌`)
        .setCustomId(`msg`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`成員日誌`)
        .setCustomId(`mem`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`封禁和踢出日誌`)
        .setCustomId(`ban`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`頻道日誌`)
        .setCustomId(`ch`)
        .setStyle(`SECONDARY`)
    );
    let row1 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`Webhook 日誌`)
        .setCustomId(`webhook`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`語音日誌`)
        .setCustomId(`voice`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`禁言日誌`)
        .setCustomId(`Timeout`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`主題日誌`)
        .setCustomId(`thread`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`身分日誌`)
        .setCustomId(`role`)
        .setStyle(`SECONDARY`)
    );
    let row1s = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`設置所有日誌`)
        .setCustomId(`alt`)
        .setStyle(`SUCCESS`),
      new Discord.MessageButton()
        .setLabel(`刪除所有日誌`)
        .setCustomId(`select11`)
        .setStyle(`DANGER`)
    );
    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: `${interaction.member.user.username}`, iconURL: `${interaction.member.user.displayAvatarURL()}` })
      .setTitle(`設置您的日誌！`)
      .setDescription(`> **選擇您需要的日誌類型，然後選擇相應的頻道**`)
      .setThumbnail(interaction.guild.iconURL() || null)
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() || null });

    interaction.followUp({ embeds: [embed], components: [row, row1, row1s], ephemeral: true });

    setTimeout(() => {
      row.components.forEach(button => button.setDisabled(true));
      row1.components.forEach(button => button.setDisabled(true));
      row1s.components.forEach(button => button.setDisabled(true));

      interaction.editReply({ embeds: [embed], components: [row, row1, row1s] });
    }, 120000);
  }
};

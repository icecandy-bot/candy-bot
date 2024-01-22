const db = require('quick.db');
const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'setup-goodbay',
    description: '❎ | 設置告別信息',
    userPermissions: ['ADMINISTRATOR'],

    run: async (client, interaction, args) => {
        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel(`設置頻道`)
                .setCustomId(`goodbays`)
                .setStyle(`SUCCESS`),
            new MessageButton()
                .setLabel(`設置背景`)
                .setCustomId(`goodbay_app_background`)
                .setStyle(`SECONDARY`),
            new MessageButton()
                .setLabel(`設置消息`)
                .setCustomId(`goodbay_app_message`)
                .setStyle(`SECONDARY`),
            new MessageButton()
                .setLabel(`設置顏色`)
                .setCustomId(`goodbay_app_color`)
                .setStyle(`SECONDARY`)
        );

        const row3 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('選擇設置')
                    .addOptions([
                        {
                            label: '刪除告別背景',
                            value: 'dddelete_background',
                        },
                        {
                            label: '刪除告別消息',
                            value: 'dddelete_message',
                        },
                        {
                            label: '刪除告別顏色',
                            value: 'dddelete_color',
                        },
                    ]),
            );

        let embed = new MessageEmbed()
            .setAuthor({ name: `${interaction.member.user.username}`, iconURL: `${interaction.member.user.displayAvatarURL()}` })
            .setTitle(`設置您的告別信息！`)
            .setImage('https://cdn.discordapp.com/attachments/1148240486981709864/1161600766239318108/My_Video1.gif')
            .setDescription(`> **選擇您需要的告別信息設置，並選擇分配給它的頻道**\n \`✍️ 完全可定制\`
\`👀 高質量資源\`
\`😵 如夢幻般的設計\``)
            .setThumbnail(interaction.guild.iconURL() || null)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() || null });

        interaction.followUp({ embeds: [embed], components: [row, row3], ephemeral: true });

        setTimeout(() => { 
            row.components.forEach(button => button.setDisabled(true));
            row3.components.forEach(button => button.setDisabled(true));
            interaction.editReply({ embeds: [embed], components: [row, row3] });
        }, 180000);
    } 
};

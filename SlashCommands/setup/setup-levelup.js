const db = require('quick.db');
const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'setup-levelup',
    description: '❎ | 設置等級',
    userPermissions: ['ADMINISTRATOR'],

    run: async (client, interaction, args) => {

        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel(`設置頻道`)
                .setCustomId(`levelups`)
                .setStyle(`SUCCESS`),
            new MessageButton()
                .setLabel(`設置背景`)
                .setCustomId(`level_app`)
                .setStyle(`SECONDARY`),
            new MessageButton()
                .setLabel(`設置消息`)
                .setCustomId(`message_level`)
                .setStyle(`SECONDARY`)
        );
        let rows = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel(`設置頭像顏色`)
                .setCustomId(`levl_colorv_app`)
                .setStyle(`PRIMARY`),
            new MessageButton()
                .setLabel(`❓`)
                .setCustomId(`leesefs`)
                .setStyle(`PRIMARY`),
            new MessageButton()
                .setLabel(`設置橫幅顏色`)
                .setCustomId(`levl_colorb_app`)
                .setStyle(`PRIMARY`)
        );

        const row3 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectlevel')
                    .setPlaceholder('選擇等級提升設置')
                    .addOptions([
                        {
                            label: '刪除等級提升背景',
                            value: 'level_background',
                        },
                        {
                            label: '刪除等級提升顏色',
                            value: 'level_color',
                        },
                    ]),
            );
        let embed = new MessageEmbed()
            .setAuthor({ name: `${interaction.member.user.username}`, iconURL: `${interaction.member.user.displayAvatarURL()}` })
            .setTitle(`設置等級提升！`)
            .setColor('RANDOM')
            .setDescription(`> **選擇您需要的等級提升設置，並選擇分配給它的頻道**\n
           **等級提升指令**

            \`/add-level\`  給予用戶等級
            \`/leaderboard\`  查看獲得最多XP和最高等級的前10名用戶
            \`/rank\` 顯示用戶等級卡片
            \`/role-level-add\` 等級獎勵角色
            \`/xpsettings\`  高級XP系統
            \`/role-level-show\` 
            \`/role-level-remove\`
          `)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() || null });

        interaction.followUp({ embeds: [embed], components: [row3, row, rows], ephemeral: true });

        setTimeout(() => {
            row.components.forEach(button => button.setDisabled(true));
            rows.components.forEach(button => button.setDisabled(true));
            row3.components.forEach(button => button.setDisabled(true));
            interaction.editReply({ embeds: [embed], components: [row3, row, rows] });
        }, 180000);
    }
};

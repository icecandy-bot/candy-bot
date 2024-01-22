const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setting-application",
    description: "查看或更改申請系統設置",
    category: '設置',
    options: [
        {
            name: 'system',
            description: '選擇申請系統',
            type: 3,
            required: true,
            choices: [
                { name: '1 申請系統', value: '1' },
                { name: '2 申請系統', value: '2' },
                { name: '3 申請系統', value: '3' },
                { name: '4 申請系統', value: '4' },
                { name: '5 申請系統', value: '5' }
            ]
        }
    ],
    run: async (client, interaction) => {
        const system = interaction.options.getString('system');
        const questionOptions = db.get(`application_questions_${interaction.guild.id}_${system}`);
        const logsChannelId = db.get(`application_logs_channel_${interaction.guild.id}_${system}`);

        if (!questionOptions || !logsChannelId) {
            const errorMessage = new MessageEmbed()
                .setDescription(`找不到申請系統 ${system} 的設置`);
            return interaction.followUp({ embeds: [errorMessage] });
        }
        const questions = questionOptions.map((option, index) => `問題 ${index + 1}: ${option}`);

        const embed = new MessageEmbed()
            .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL({ format: 'png', dynamic: true }))
            .setTitle(`> ✅ 申請系統設置 \`${system}\``)
            .addField('> 🔗 申請日誌頻道', `<#${logsChannelId}>`)
            .addField('📜 問題', questions.join('\n'))
            .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL({ format: 'png', dynamic: true }))
            .setColor('RANDOM');

        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('SECONDARY')
                .setLabel('編輯問題')
                .setEmoji('⚙')
                .setCustomId(`edit_question${system}`),
            new MessageButton()
                .setStyle('SUCCESS')
                .setEmoji('➕')
                .setLabel('新增問題')
                .setCustomId(`add_question${system}`),
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('刪除問題')
                .setEmoji('🗑️')
                .setCustomId(`remove_question${system}`)
        );

        interaction.followUp({ embeds: [embed], components: [row1], ephemeral: true });

        setTimeout(() => {
            row1.components.forEach(button => button.setDisabled(true));
            interaction.editReply({ components: [row1] });
        }, 180000);
    },
};

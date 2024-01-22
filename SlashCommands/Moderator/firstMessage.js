const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ec = require('../../settings/embed');

module.exports = {
    name: 'first-message',
    description: '📩 | 獲取頻道中的第一則訊息',

    run: async (client, interaction, args) => {
        const fetchMessages = await interaction.channel.messages.fetch({ limit: 1, after: 1 });
        const msg = fetchMessages.first();

        const embed = new MessageEmbed()
            .setTitle(`第一則訊息`)
            .setColor(ec.color)
            .addFields(
                { name: '**訊息內容:**', value: `${msg.content}`, inline: true },
                { name: '**發送者:**', value: `${msg.author}`, inline: true },
                { name: '**發送日期:**', value: `<t:${parseInt(msg.createdTimestamp / 1000)}:R>`, inline: true },
            )
            .setTimestamp()
            .setFooter({
                text: `由 ${interaction.user.username} 要求`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel('獲取訊息')
                    .setStyle('LINK')
                    .setURL(msg.url)
                    .setEmoji('1041215924818165781'),
            ]);

        interaction.followUp({ embeds: [embed], components: [row] });
    }
};

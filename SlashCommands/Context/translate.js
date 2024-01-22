const { MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const ec = require("../../settings/embed");

module.exports = {
    name: 'Translet',
    description: '將其他語言的文字翻譯成繁體中文',
    category: '上下文',
    userPermissions: [],
    type: 'MESSAGE',
    emoji: "💎",

    run: async (client, interaction, args) => {
        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );

        const translated = await translate(msg.content, { to: 'zh-TW' });
        const embed = new MessageEmbed()
            .setFooter({ text: ec.footer, iconURL: ec.iconURL })
            .setTimestamp()
            .addFields(
                { name: "要翻譯的文字:", value: `\`\`\`${msg.content}\`\`\`` },
                { name: "翻譯後的文字:", value: `\`\`\`${translated.text}\`\`\`` },
            )
            .setColor(ec.color);

        interaction.followUp({ embeds: [embed] });
    },
};

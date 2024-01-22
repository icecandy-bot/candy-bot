const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: '❌ | 刪除最多 99 條訊息。',
    category: 'Moderator',
    userPermissions: ['ADMINISTRATOR'],
    type: 'CHAT_INPUT',
    ownerOnly: false,
    options: [
        {
            name: 'number_of_messages',
            type: 'STRING',
            description: '要刪除的訊息數量（2-99）',
            required: true
        }
    ],
    /** 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const amount = parseInt(interaction.options.getString('number_of_messages'));

        if (isNaN(amount) || amount < 2 || amount > 99) {
            return interaction.followUp('請提供有效的刪除訊息數量（介於 2 到 99 之間）。');
        }

        try {
            await interaction.channel.bulkDelete(amount, true);
            interaction.followUp({
                content: `⚠️ 我已清理 \`${amount}\` 條訊息 :broom:`
            });
        } catch (error) {
            console.error(error);
            interaction.followUp('在嘗試清理訊息時發生錯誤。');
        }
    }
}

const { Client, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: 'invitetracker',
    description: '⏳ | 獲取加入伺服器的使用者的邀請數量。',
    category: 'Moderator',
    userPermissions: [],
    type: 'CHAT_INPUT',
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: '標記以查看他們的邀請',
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        if (userInv.size <= 0) {
            return interaction.followUp({ content: `${user} 沒有任何邀請。` });
        }

        let invCodes = userInv.map(x => x.code).join('\n');
        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const trackerEmbed = new MessageEmbed()
            .setDescription(`**_邀請數量：_** ${user}`)
            .addFields(
                { name: `使用者邀請數：`, value: `${i}` },
                { name: '邀請碼：', value: `${invCodes}` },
            )
            .setColor(ec.color)
            .setTimestamp()
            .setFooter({
                text: `由 ${interaction.user.username} 要求`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        interaction.followUp({ embeds: [trackerEmbed] });
    }
};

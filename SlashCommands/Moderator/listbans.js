const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const ec = require('../../settings/embed');

module.exports = {
    name: "listbans",
    description: "返回伺服器的封鎖列表",
    userPermission: "BAN_MEMBERS",
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const fetchBans = interaction.guild.bans.fetch();
        let amount = 1;
        const bannedMembers = (await fetchBans)
            .map(
                (member) =>
                    `${amount++} **${member.user.username}** | (*${member.user.id}*)`
            )
            .join("\n");

        const list = new MessageEmbed()
            .setTitle(`${interaction.guild.name} 的封鎖列表`)
            .setDescription(`${bannedMembers}`)
            .setFooter(`封鎖人數: ${amount - 1}`)
            .setTimestamp()
            .setColor(ec.color);
        return interaction.followUp({ embeds: [list] });
    },
};

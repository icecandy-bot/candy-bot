const { CommandInteraction, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: "kick",
    description: "❌ | 踢出成員。",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "target",
            description: "選擇目標。",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "選擇原因。",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        await target.user.fetch();

        const response = new MessageEmbed()
            .setTitle("__**成功踢出目標！**__")
            .setColor(ec.color)
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .setFooter({
                text: `由 ${interaction.user.username} 要求`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "踢出原因", value: reason },
                { name: "加入伺服器時間", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "帳號建立時間", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
            );

        interaction.followUp({ embeds: [response], ephemeral: true });
        target.kick({ days: 0, reason: reason });
    }
};

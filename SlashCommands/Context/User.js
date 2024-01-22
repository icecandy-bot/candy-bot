const { ContextMenuInteraction, MessageEmbed } = require("discord.js");
const ec = require('../../settings/embed');

module.exports = {
    name: 'User Info',
    type: 2,
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    run: async(client, interaction, args) => {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        const user = await interaction.guild.members.fetch(target.id);

        const response = new MessageEmbed()
            .setColor(ec.color)
            .setAuthor({ name: target.user.username, iconURL: target.user.displayAvatarURL() })
            .setThumbnail(target.user.displayAvatarURL())
            .addFields(
                { name: "成員", value: `${target}`, inline: true },
                { name: "暱稱", value: target.nickname || "無", inline: true },
                { name: "機器人帳號", value: `${user.bot ? "是" : "否"}` },
                { name: "角色", value: `${target.roles.cache.map(r => r).join(' ')}`, inline: false },
                { name: "加入伺服器時間", value: `<t:${parseInt(target.joinedAt / 1000)}:R>`, inline: true },
                { name: "加入 Discord 時間", value: `<t:${parseInt(target.user.createdAt / 1000)}:R>`, inline: true },
            )
            .setFooter({ text: `使用者 ID: ${target.user.id}` })
            .setTimestamp();

        await interaction.followUp({ embeds: [response], ephemeral: true });
    }
};

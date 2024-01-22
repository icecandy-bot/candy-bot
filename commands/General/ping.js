const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: 'ping',
    description: '🏓 | 顯示機器人延遲',
    category: 'info',
    cooldown: 10,
    run: async (client, message) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        };
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let botLatency = new Date() - message.createdAt;
        let apiLatency = client.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setTitle("機器人延遲與 Ping")
            .setColor(ec.color)
            .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
            .addFields(
                { 
                    name: "機器人延遲:", 
                    value: `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`, 
                    inline: true
                },
                { 
                    name: "API 延遲:", 
                    value: `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`, 
                    inline: true 
                },
                { 
                    name: "機器人運行時間:", 
                    value: `${days}天 ${hours}小時 ${minutes}分 ${seconds}秒`, 
                    inline: true 
                }
            )
            .setFooter({ text: ` • 由 ${message.author.tag} 發起`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } });
    },
};

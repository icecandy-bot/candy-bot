                  const Discord = require("discord.js");
                  const SQLite = require("better-sqlite3");
                  const sql = new SQLite('./mainDB.sqlite');
                  const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

                  module.exports = {
                    name: "leaderboard",
                    category: "level",
                    description: "查看前 10 名經驗值和最高等級的使用者",
                    options: [
                      {
                        name: 'page',
                        description: '要顯示的頁面',
                        type: 3,
                        required: false,
                      },
                    ],
                    run: async (client, interaction, page) => {
                      let currentPage = parseInt(page || interaction.options.getString('page')) || 1;
                      const top10 = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP DESC;").all(interaction.guild.id);
                      const itemsPerPage = 10;
                      const startIdx = (currentPage - 1) * itemsPerPage;
                      const endIdx = startIdx + itemsPerPage;
                      const usersToShow = top10.slice(startIdx, endIdx);
                      const embed = new MessageEmbed()
                        .setAuthor(`${interaction.guild.name} 排行榜`, interaction.guild.iconURL() || null)
                        .setTimestamp()
                        .setColor("RANDOM");

                      if (usersToShow.length < 1) {
                        embed.setDescription(`排行榜中沒有使用者！`);
                      } else {
                        const leftColumn = [];
                        const rightColumn = [];

                        usersToShow.forEach((user, index) => {
                          const rank = startIdx + index + 1;
                          const nextXP = user.level * 2 * 250 + 250;
                          const userTag = interaction.client.users.cache.get(user.user)?.tag || `<@!${user.user}>`;
                          const field = `#${rank}. ${userTag}\n> **等級**: \`${user.level}\`\n> **經驗值**: \`${user.xp} / ${nextXP}\``;

                          if (index < 5) {
                            leftColumn.push(field);
                          } else {
                            rightColumn.push(field);
                          }
                        });

                        for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
                          const leftEntry = leftColumn[i] || '\u200B';
                          const rightEntry = rightColumn[i] || '\u200B';

                          embed.addFields(
                            { name: '\u200B', value: leftEntry, inline: true },
                            { name: '\u200B', value: rightEntry, inline: true }
                          );
                        }
                      }

                      const row = new MessageActionRow().addComponents(
                        new MessageButton()
                          .setLabel('首頁')
                          .setStyle('PRIMARY')
                          .setCustomId('start_button'),
                        new MessageButton()
                          .setLabel('上一頁')
                          .setStyle('PRIMARY')
                          .setCustomId('previous_button'),
                        new MessageButton()
                          .setStyle('SECONDARY')
                          .setCustomId('page')
                          .setLabel(`${currentPage}/${Math.ceil(top10.length / itemsPerPage)}`)
                          .setDisabled(true),
                        new MessageButton()
                          .setLabel('下一頁')
                          .setStyle('PRIMARY')
                          .setCustomId('next_button'),
                        new MessageButton()
                          .setLabel('末頁')
                          .setStyle('PRIMARY')
                          .setCustomId('end_button')
                      );

                      await interaction.followUp({ embeds: [embed], components: [row] });

                      const filter = (i) => i.user.id === interaction.user.id;
                      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

                      collector.on('collect', async (interaction) => {
                        if (interaction.customId === 'previous_button') {
                          currentPage--;
                        } else if (interaction.customId === 'next_button') {
                          currentPage++;
                        } else if (interaction.customId === 'start_button') {
                          currentPage = 1;
                        } else if (interaction.customId === 'end_button') {
                          currentPage = Math.ceil(top10.length / itemsPerPage);
                        }

                        const startIdx = (currentPage - 1) * itemsPerPage;
                        const endIdx = startIdx + itemsPerPage;
                        const usersToShow = top10.slice(startIdx, endIdx);
                        const embed = new MessageEmbed()
                          .setAuthor(`${interaction.guild.name} 排行榜`, interaction.guild.iconURL() || null)
                          .setTimestamp()
                          .setColor("RANDOM");

                        if (usersToShow.length < 1) {
                          embed.setDescription(`排行榜中沒有使用者！`);
                        } else {
                          const leftColumn = [];
                          const rightColumn = [];

                          usersToShow.forEach((user, index) => {
                            const rank = startIdx + index + 1;
                            const nextXP = user.level * 2 * 250 + 250;
                            const userTag = interaction.client.users.cache.get(user.user)?.tag || `<@!${user.user}>`;
                            const field = `#${rank}. ${userTag}\n> **等級**: \`${user.level}\`\n> **經驗值**: \`${user.xp} / ${nextXP}\``;

                            if (index < 5) {
                              leftColumn.push(field);
                            } else {
                              rightColumn.push(field);
                            }
                          });

                          for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
                            const leftEntry = leftColumn[i] || '\u200B';
                            const rightEntry = rightColumn[i] || '\u200B';

                            embed.addFields(
                              { name: '\u200B', value: leftEntry, inline: true },
                              { name: '\u200B', value: rightEntry, inline: true }
                            );
                          }
                        }

                        const row = new MessageActionRow().addComponents(
                          new MessageButton()
                            .setLabel('首頁')
                            .setStyle('PRIMARY')
                            .setCustomId('start_button'),
                          new MessageButton()
                            .setLabel('上一頁')
                            .setStyle('PRIMARY')
                            .setCustomId('previous_button'),
                          new MessageButton()
                            .setStyle('SECONDARY')
                            .setCustomId('page')
                            .setLabel(`${currentPage}/${Math.ceil(top10.length / itemsPerPage)}`)
                            .setDisabled(true),
                          new MessageButton()
                            .setLabel('下一頁')
                            .setStyle('PRIMARY')
                            .setCustomId('next_button'),
                          new MessageButton()
                            .setLabel('末頁')
                            .setStyle('PRIMARY')
                            .setCustomId('end_button')
                        );
                        await interaction.update({ embeds: [embed], components: [row] });
                      });

                      collector.on('end', async () => {
                        const row = new MessageActionRow().addComponents(
                          new MessageButton()
                            .setLabel('首頁')
                            .setStyle('PRIMARY')
                            .setCustomId('start_button')
                            .setDisabled(true),
                          new MessageButton()
                            .setLabel('上一頁')
                            .setStyle('PRIMARY')
                            .setDisabled(true)
                            .setCustomId('previous_button'),
                          new MessageButton()
                            .setStyle('SECONDARY')
                            .setCustomId('page')
                            .setLabel(`${currentPage}/${Math.ceil(top10.length / itemsPerPage)}`)
                            .setDisabled(true),
                          new MessageButton()
                            .setLabel('下一頁')
                            .setStyle('PRIMARY')
                            .setCustomId('next_button')
                            .setDisabled(true),
                          new MessageButton()
                            .setLabel('末頁')
                            .setStyle('PRIMARY')
                            .setCustomId('end_button')
                            .setDisabled(true)
                        );

                        await interaction.editReply({ components: [row] });
                      });
                    },
                  };

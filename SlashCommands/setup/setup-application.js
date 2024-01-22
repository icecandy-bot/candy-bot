const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "setup-application",
  description: "設置申請系統",
  category: '設置',
  options: [
    {
      name: 'system',
      description: '選擇申請系統',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: '1 申請系統',
          value: '1'
        },
        {
          name: '2 申請系統',
          value: '2'
        },
        {
          name: '3 申請系統',
          value: '3'
        },
        {
          name: '4 申請系統',
          value: '4'
        },
        {
          name: '5 申請系統',
          value: '5'
        }
      ]
    },
    {
      name: 'channel',
      description: "發送申請問題的頻道",
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'applicationlogschannel',
      description: "發送申請日誌的頻道",
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'question-options',
      description: '使用 / 分隔問題選項，例如：你的真實名字是什麼 / 你多大了',
      type: 3,
      required: true,
    },
    {
      name: "button_label",
      description: "申請按鈕的標籤",
      type: "STRING",
      required: false,
    },
    {
      name: "button_emoji",
      description: "申請按鈕的表情符號",
      type: "STRING",
      required: false,
    },
    {
      name: 'button_color',
      description: '申請按鈕的顏色',
      type: 'STRING',
      required: false,
      choices: [
          { name: '紅色', value: 'DANGER' },
          { name: '綠色', value: 'SUCCESS' },
          { name: 'Blurple', value: 'PRIMARY' },
          { name: '灰色', value: 'SECONDARY' },
      ],
    },
    {
      name: "embed_description",
      description: "申請按鈕的標籤",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const channel = interaction.options.getChannel('channel');
    const applicationLogsChannel = interaction.options.getChannel('applicationlogschannel');
    const questionOptions = interaction.options.getString('question-options').split('/').map(option => option.trim());
    const system = interaction.options.getString('system');
    let label = interaction.options.getString('button_label') || `申請`;
    let Description = interaction.options.getString('embed_description') || `點擊"申請"按鈕進行申請`;
    let emojisbutton = interaction.options.getString('button_emoji') || `<:zfrzegerh:1153541488530182185>`;
    const questions = questionOptions.map((option, index) => `問題 ${index + 1}: ${option}`);
    const bcolor = interaction.options.getString('button_color') || 'SECONDARY'

    // 將問題選項存儲在數據庫中
    db.set(`application_questions_${interaction.guild.id}_${system}`, questionOptions);
    db.set(`application_logs_channel_${interaction.guild.id}_${system}`, applicationLogsChannel.id);

    // 發送設置確認消息
    const embed = new MessageEmbed()
      .setTitle('申請系統設置')
      .setDescription('申請系統已成功設置！')
      .addField('頻道', channel.toString())
      .addField('申請日誌頻道', applicationLogsChannel.toString())
      .addField('📜 問題', questions.join('\n'))
      .addField('⚙ 申請', system)
      .setColor('#00ff00');

    const embeds = new MessageEmbed()
     .setAuthor(`${interaction.guild.name} 申請`, interaction.guild.iconURL({ format: 'png', dynamic: true }))
     .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true }))
      .setDescription(Description)
      .setColor('#00ff00');

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle(bcolor)
        .setLabel(label)
        .setEmoji(emojisbutton)
        .setCustomId(`apply_button${system}`)
    );

    const row1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('編輯問題')
        .setEmoji('1174375434704654396')
        .setCustomId(`edit_question${system}`),
        new MessageButton()
        .setStyle('SUCCESS')
        .setEmoji('➕')
        .setLabel('添加問題')
        .setCustomId(`add_question${system}`),
      new MessageButton()
        .setStyle('DANGER')
        .setLabel('刪除問題')
        .setEmoji('🗑️')
        .setCustomId(`remove_question${system}`)
    );

    channel.send({ embeds: [embeds], components: [row] });
    interaction.followUp({ embeds: [embed], components: [row1] });

    setTimeout(() => {
      row1.components.forEach(button => button.setDisabled(true));

      interaction.editReply({ components: [row1] });
  }, 180000);

  },
};

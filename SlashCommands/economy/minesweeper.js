const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require('discord.js')
const db = require("quick.db");
const ms = require('ms');
module.exports = {
name: 'minesweeper',
description: '📀 | Play a game of minesweeper',
run: async (client, interaction, args) => {
      let bal2 = await db.fetch(`money_${interaction.user.id}`)
    if(bal2 < 1000) return interaction.followUp("❌|  You don't have ** \`<:bes_coin:1039327980146671616> 200 \`**coin")
  
   
    db.subtract(`money_${interaction.user.id}`, 200)
var arr = [
[0,0,0,'<a:942168959346704435:1090367705594478703>','<a:942168959346704435:1090367705594478703>'],
[0,0,0,'<a:942168959346704435:1090367705594478703>',0],
[0,0,0,0,'<a:942168959346704435:1090367705594478703>'],
[0,0,0,0,'<a:942168959346704435:1090367705594478703>'],
[0,0,0,'<a:942168959346704435:1090367705594478703>','<a:942168959346704435:1090367705594478703>',0],
];

function placeBombs(array) {
for (let row = 0; row < array.length; row++) {
let currentIndex = array[row].length,  randomIndex;
while (currentIndex != 0) {
  
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex--;

[array[row][currentIndex], array[row][randomIndex]] = [
array[row][randomIndex], array[row][currentIndex]];
}
}
return array;
}
placeBombs(arr)

function count(data, i, j) {
let c = 0;

const prevRow = data[i - 1];
const currentRow = data[i]
const nextRow = data[i + 1];

[prevRow, currentRow, nextRow].forEach(row => {
if (row) {
if (row[j - 1] == '<a:942168959346704435:1090367705594478703>') c++;
if (row[j] == '<a:942168959346704435:1090367705594478703>') c++;
if (row[j + 1] == '<a:942168959346704435:1090367705594478703>') c++;
}
})
return c;
}

function update(data) {
return data.map((a, i) => {
return a.map((b, j) => {
return b == '<a:942168959346704435:1090367705594478703>' ? b : count(data, i, j)
})
})
}

const result = update(arr)
arr = result; 
let positions = []

for (let row = 0; row < arr.length; row++) {
for (let col = 0; col < arr[row].length; col++) {
if (arr[row][col] === '<a:942168959346704435:1090367705594478703>') {
let obj = {
r: {
emoji: `<a:942168959346704435:1090367705594478703>`,
style: 'DANGER',
custom_id: `bomb${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral1${row}${col}`,
type: 2,
},
b: {
emoji: `💥`,
style: 'DANGER',
custom_id: `boom${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 0) {
let obj = {
r: {
emoji: `0️⃣`,
style: 'SUCCESS',
custom_id: `0${row}${col}`,
disabled: true,
type: 2,
},
a: {
emoji: `0️⃣`,
style: 'SUCCESS',
custom_id: `neutral0${row}${col}`,
disabled: true,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 1) {
let obj = {
r: {
emoji: `1️⃣`,
style: 'PRIMARY',
custom_id: `1${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral2${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 2) {
let obj = {
r: {
emoji: `2️⃣`,
style: 'PRIMARY',
custom_id: `2${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral3${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 3) {
let obj = {
r: {
emoji: `3️⃣`,
style: 'PRIMARY',
custom_id: `3${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral3${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 4) {
let obj = {
r: {
emoji: `4️⃣`,
style: 'PRIMARY',
custom_id: `4${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral4${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 5) {
let obj = {
r: {
emoji: `5️⃣`,
style: 'PRIMARY',
custom_id: `5${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral5${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 6) {
let obj = {
r: {
emoji: `6️⃣`,
style: 'PRIMARY',
custom_id: `6${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral6${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 7) {
let obj = {
r: {
emoji: `7️⃣`,
style: 'PRIMARY',
custom_id: `7${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral7${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 8) {
let obj = {
r: {
emoji: `8️⃣`,
style: 'PRIMARY',
custom_id: `8${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral8${row}${col}`,
type: 2,
}
}
positions.push(obj)
}else if(arr[row][col] === 9) {
let obj = {
r: {
emoji: `9️⃣`,
style: 'PRIMARY',
custom_id: `9${row}${col}`,
disabled: true,
type: 2,
},
a: {
label: `-`,
style: 'SECONDARY',
custom_id: `neutral9${row}${col}`,
type: 2,
}
}
positions.push(obj)
}
}
}
  
let row1 = new Discord.MessageActionRow()
.addComponents(positions[0].a, positions[1].a, positions[2].a, positions[3].a, positions[4].a)
let row2 = new Discord.MessageActionRow()
.addComponents(positions[5].a, positions[6].a, positions[7].a, positions[8].a, positions[9].a)
let row3 = new Discord.MessageActionRow()
.addComponents(positions[10].a, positions[11].a, positions[12].a, positions[13].a, positions[14].a)
let row4 = new Discord.MessageActionRow()
.addComponents(positions[15].a, positions[16].a, positions[17].a, positions[18].a, positions[19].a)
let row5 = new Discord.MessageActionRow()
.addComponents(positions[20].a, positions[21].a, positions[22].a, positions[23].a, positions[24].a)

let game = new MessageEmbed()
.setDescription(`**${interaction.user}'s Minesweeper Game**`)
.setColor("#6F8FAF")
     const check = await db.fetch(`games_${interaction.member.id}`);
    let timeout = 60000;
    if (check !== null && timeout - (Date.now() - check) > 0) {
      const timeLeft = ms(timeout - (Date.now() - check));
        return  interaction.followUp({content:`**❌ | Your are on cooldown** Time left: \`${timeLeft}\` remaining`, ephemeral: true})
       } else {
let msg = await interaction.followUp({ embeds: [game], components: [row1, row2, row3, row4, row5], fetchReply: true })

const filter = i => i.user.id === interaction.user.id;
let collector = msg.createMessageComponentCollector({filter,time: 120000,})
collector.on('collect', async (i) => {
if (!i.isButton()) return;
i.deferUpdate();
let used = positions.find(x => x.a.custom_id === i.customId);
if (used.r.style === 'DANGER') {
collector.stop()
} 
          
used.a = used.r;
let row1 = new Discord.MessageActionRow()
.addComponents(positions[0].a, positions[1].a, positions[2].a, positions[3].a, positions[4].a)
row2 = new Discord.MessageActionRow()
.addComponents(positions[5].a, positions[6].a, positions[7].a, positions[8].a, positions[9].a)
row3 = new Discord.MessageActionRow()
.addComponents(positions[10].a, positions[11].a, positions[12].a, positions[13].a, positions[14].a)
row4 = new Discord.MessageActionRow()
.addComponents(positions[15].a, positions[16].a, positions[17].a, positions[18].a, positions[19].a)
row5 = new Discord.MessageActionRow()
.addComponents(positions[20].a, positions[21].a, positions[22].a, positions[23].a, positions[24].a)

interaction.editReply({ components: [row1, row2, row3, row4, row5] })
})

collector.on('end', async (i, reason) => {
if(reason === "time"){
interaction.editReply({ embeds: [game.setDescription(`**${interaction.user}'s Took To Long So I Stoped The Game**`)], components: [] })
}else{
positions.forEach((g) => {
 g.a = g.r
row1 = new Discord.MessageActionRow()
.addComponents(positions[0].a, positions[1].a, positions[2].a, positions[3].a, positions[4].a)
row2 = new Discord.MessageActionRow()
.addComponents(positions[5].a, positions[6].a, positions[7].a, positions[8].a, positions[9].a)
row3 = new Discord.MessageActionRow()
.addComponents(positions[10].a, positions[11].a, positions[12].a, positions[13].a, positions[14].a)
row4 = new Discord.MessageActionRow()
.addComponents(positions[15].a, positions[16].a, positions[17].a, positions[18].a, positions[19].a)
row5 = new Discord.MessageActionRow()
.addComponents(positions[20].a, positions[21].a, positions[22].a, positions[23].a, positions[24].a)
})
              let diamonds  = Math.round(Math.random() * 1000);
        let diamond = [
            `${diamonds}`,
            `${diamonds}`,
            `${diamonds}`,
            `${diamonds}`
  ];
  time = Date.now() + 60000 * 1;
   db.set(`games_${interaction.user.id}`, Date.now());
      db.add(`money_${interaction.user.id}`, + diamonds)
interaction.editReply({ content: `<a:942168959346704435:1090367705594478703>  | *Explosion Sounds*\n <:bes_coin:1039327980146671616> | *Coins win \`${diamond[Math.floor(Math.random() * diamond.length)]}\`*\n <:icons_reminder:1056576428734435350> | *Next Play Game <t:${Math.round(time / 1000)}:R> *`,components: [row1, row2, row3, row4, row5] }) 
   
}

})
}
},
};
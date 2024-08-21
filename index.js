
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(() => console.log(`Example app listening at http://localhost:`))

const moment = require("moment")
const ms = require("ms")
const { Client, Intents, MessageEmbed, Interaction, MessageButton, MessageActionRow, Modal, WebhookClient, MessageSelectMenu, Collection, Permissions, MessageFlags, GatewayIntentBits, TextInputComponent, ButtonBuilder, ActionRowBuilder, } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, 32767]
});
client.setMaxListeners(0)
client.login(process.env.token)

client.on("ready", () => {
  console.log(`Logged in as  ${client.user.username}`)
  client.user.setActivity(`EROOR S System`, { type: 'LISTENING' })
  client.user.setStatus("idle")
});


const db = require("pro.db")
db.backup("backup");
const emjTrue = "✔️"
const emjFalse = "❌️"
const talabtRoom = "1163903880803909722"
const montagat = "1163903907890741258"
const designer = "1163903909270650920"
const developer = "1163903910734475354"
const staffManagerRole = "1163902508796756079"
const discorsLeader = "1163902506968027237"
const OfficialRole = "1163902542145667184"
const RolesRole = "1163902533765447790"
const discordStaff = "1163902529524990054"
const UnderTestRole = "1175842899519348816"
const developerId = "577638787622895617"
const bankid = "577638787622895617"
const ManshoratChannel3 = '1163903857814929469'
const spinbank = "577638787622895617"
const manshoratRoom = '1163903857814929469'
const roomschannel12345 = '1163903856594399334'
const prefix = "$"
const lineLink = "https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png"
const colorE = "7c0a02"

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception occurred:', error);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
});

///////////////

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'تقيم') || message.content.startsWith(prefix + 'تقييم')) {
    if (message.content.startsWith(prefix + "تقيمات")) return false;
    if (message.content.startsWith(prefix + "تقييمات")) return false;
    const now = new Date();
    const args = message.content.split(" ")
    const user = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
    if (!user) return message.reply("**منشن الإداري أولاً !**")
    const titlefeed = message.content.split(" ").slice(2).join(" ")
    if (!titlefeed) return message.reply("**يرجى وضع محتوى التقييم أولاً .**")
    if (user.id === message.member.id) return message.reply("**لا تستطيع تقييم نفسك !**")
    if (!user.roles.cache.some(r => r.id == 1163902529524990054)) return message.reply("**هذا الشخص ليس اداري !**")
    const feedbackData = db.get(`feedback_${user.id}`);
    if (feedbackData) {
      for (const entry of feedbackData) {
        const memberId = entry.member;
        if (memberId == message.member.id) return message.reply("**لا يمكنك تقييم الشخص اكثر من مرة !**")
      }
    }
    const FeedBackLog = await message.client.channels.fetch("1163903940635672676");

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("⭐ 1")
        .setCustomId("s1")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 2")
        .setCustomId("s2")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 3")
        .setCustomId("s3")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 4")
        .setCustomId("s4")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 5")
        .setCustomId("s5")
        .setStyle("SECONDARY"),
    )

    message.reply({ content: `** الاداري : ${user}**\n** تقييمك : ${titlefeed}**\n** يرجى اختيار عدد النجوم التي تعطيها للاداري عبر الازرار في الاسفل**`, components: [row] }).then(m => {

      db.set(`temp_${m.id}`, message.member.id)
      db.set(`tempuser_${message.member.id}`, user.id)
      db.set(`tempfeedback_${message.member.id}`, titlefeed)
    })

  }
});

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "s1") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()
      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 1**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 1, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s2") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 2**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 2, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s3") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 3**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 3, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)



    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s4") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 4**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 4, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)

    }
  }

});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s5") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()
      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 5**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 5, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }

  }
})

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "تقييمات")) {
    const args = message.content.split(" ")
    const member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
    if (!member) return message.reply("**منشن الإداري أولاً !**")
    if (!db.has(`feedback_${member.id}`)) return message.reply("**هذا الشخص ليس لديه تقييمات !**")
    if (!member.roles.cache.some(r => r.id == 1163902529524990054)) return message.reply("**هذا الشخص ليس اداري !**")
    const feedbackData = db.get(`feedback_${member.id}`);
    let usersData = [];
    for (const entry of feedbackData) {
      var stars = entry.stars;
      var title = entry.title;
      var memberId = entry.member;
      var star1 = "⭐";
      var star2 = "⭐⭐";
      var star3 = "⭐⭐⭐";
      var star4 = "⭐⭐⭐⭐";
      var star5 = "⭐⭐⭐⭐⭐";
      usersData.push({ user: memberId, stars, title });
    }
    usersData.sort((a, b) => b.stars - a.stars);
    const embed = new MessageEmbed()
      .setColor(`${colorE}`)
      .setDescription(`**${member} Reviews :**`);
    const topUsers = usersData.slice(0, 20);
    topUsers.forEach((user, index) => {
      var starsString = "";
      if (user.stars == 1) {
        starsString = star1;
      } else if (user.stars == 2) {
        starsString = star2;
      } else if (user.stars == 3) {
        starsString = star3;
      } else if (user.stars == 4) {
        starsString = star4;
      } else if (user.stars == 5) {
        starsString = star5;
      }
      embed.addField(`**#${index + 1} | **`, `**المقيم : <@${user.user}>\n- عدد النجوم : ${starsString}\n- التقييم : ${user.title}**\n`);
    });
    message.reply({ embeds: [embed] })
  }
});


///////////////
client.on('messageCreate', async message => {
  if (message.content.startsWith('$رول') && message.member.roles.cache.has(RolesRole) || message.content.startsWith('$role') && message.member.roles.cache.has(RolesRole)) {
    if (message.content.startsWith(prefix + "رولات")) return false;
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (!args) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    let row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setPlaceholder("Select Kind Of Role ..")
          .setCustomId('menu-select')
          .setMaxValues(1)
          .addOptions([
            {
              label: 'Seller Roles',
              value: 'sellR'
            },
            {
              label: 'Other Roles',
              value: 'otherR'
            }]))
    let m = await message.reply({ content: `** يرجى تحديد نوع الرتبة :**`, components: [row] })
    db.set(`giverole_${m.id}`, user.id)
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.customId == "menu-select") {
    if (interaction.values[0] === 'sellR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select1')
              .setMaxValues(5)
              .addOptions([
                {
                  label: '♚・Greet S :',
                  value: '1163902560139235412'
                },
                {
                  label: '✯ || Angle S :',
                  value: '1163902561129082890'
                },
                {
                  label: '♙ || Perfect S :',
                  value: '1163902562236366889'
                },
                {
                  label: '♙ || Excellent S :',
                  value: '1163902563263987783'
                },
                {
                  label: '♙ || Good S :',
                  value: '1163902564362879036'
                },
                {
                  label: '♙ || Designer S :',
                  value: '1163902564853629052'
                },
                {
                  label: '♙ || Developer :',
                  value: '1163902566237745202'
                },]))
        interaction.message.edit({
          content: `**  يرجى تحديد الرتبه :**`, components: [row1]
        })
        interaction.deferUpdate()
      }
    }
    if (interaction.values[0] === 'otherR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select2')
              .setMaxValues(2)
              .addOptions([
                {
                  label: '❆ || Trust S',
                  value: '1175845787222151168'
                },
                {
                  label: 'Warn 100%',
                  value: '1163902568947257404'
                },
                {
                  label: 'Warn 50%',
                  value: '1163902568083247184'
                },]))
        interaction.message.edit({ content: `** يرجى تحديد الرتبة :**`, components: [row1] })
        interaction.deferUpdate()
      }
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu-select1") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`)
        let member = interaction.guild.members.cache.find(r => r.id == u)
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find(ro => ro.id == r)
          if (role) {
            if (member.roles.cache.some(ro => ro.id == r)) {
              await member.roles.remove([role])
              rolesRemoved.push(role.name.replace(/\|\|/g, ''));
            } else {
              await member.roles.add([role])
              rolesAdded.push(role.name.replace(/\|\|/g, ''));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(' , ')}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(' , ')}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] })
        interaction.deferUpdate()
        db.delete(`giverole_${interaction.message.id}`)
      }
    }
    if (interaction.customId == "menu-select2") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`)
        let member = interaction.guild.members.cache.find(r => r.id == u)
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find(ro => ro.id == r)
          if (role) {
            if (member.roles.cache.some(ro => ro.id == r)) {
              await member.roles.remove([role])
              rolesRemoved.push(role.name.replace(/\|\|/g, ''));
            } else {
              await member.roles.add([role])
              rolesAdded.push(role.name.replace(/\|\|/g, ''));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(' , ')}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(' , ')}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] })
        interaction.deferUpdate()
        db.delete(`giverole_${interaction.message.id}`)
      }
    }
  }
});
///////////////
client.on('messageCreate', async message => {
  if (message.content.startsWith('$نصاب') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1163902580351582208');
    const logChannel = await message.client.channels.fetch("1163903944678977718");
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply(`**منشن الشخص أولاً أو ضع الإيدي !**`)
    if (db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص بالفعل في قائمة النصابين !**");
    db.add(`scammer_${user.id}`, 1)
    await user.roles.set([]);
    await user.roles.add(role)
    await message.reply(`**تم إضافة ${user} إلى قائمة النصابين !**`)
    let EmbedLog = new Discord.MessageEmbed()
      .setTitle(`** Add a New Thief !**`)
      .setDescription(`> ** تم تشهير ${user} , المشرف المسؤول ${message.author} **
        ** إيدي النصاب : ${user.id}
         إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('$ازالة') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1163902580351582208');
    const logChannel = await message.client.channels.fetch("1163903944678977718");
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (!db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص ليس بقائمة النصابين لإزالته !**")
    db.delete(`scammer_${user.id}`, 1)
    await user.roles.remove(role);
    await message.reply(`**تم إزالة ${user} من قائمة النصابين !**`)
    let EmbedLog = new Discord.MessageEmbed()
      .setTitle(`** Remove a New Thief !**`)
      .setDescription(`> ** تم إزالة تشهير ${user} , المشرف المسؤول ${message.author} **
** إيدي الشخص : ${user.id}
 إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ إزالة التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('$فحص') || message.content.startsWith('فحص')) {
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (db.has(`scammer_${user.id}`)) {
      await message.reply(`** إنتبه ! هذا الشخص نصاب، الرجاء عدم التعامل معه .**`);
    } else {
      await message.reply(`**هذا الشخص ليس نصاب <:ok:1156897043621629952>  ، لكن انتبه ! هذا لا يعني أنه مضمون .. الرجاء أخذ وسيط  من هنا <#1163903882116730990>  قبل التعامل مع أي أحد .<a:Mats_love:1152757032185778186> **`);
    }
  }
});

///////////////
client.on("guildMemberAdd", async member => {
  const guild = member.guild;
  const role = guild.roles.cache.find(r => r.name === "نصاب");
  const user = guild.members.cache.find(m => m.id === member.id);
  if (role && user && db.get(`scammer_${user.id}`)) {
    try {
      await user.roles.add(role);
      console.log(`تم إعطاء الرتبة ${role.name} للعضو ${user.displayName} في سيرفر ${guild.name}`);
    } catch (error) {
      console.error(`حدث خطأ أثناء إعطاء الرتبة للعضو ${user.displayName} في سيرفر ${guild.name}: ${error}`);
    }
  }
});

///////////////
client.on("messageCreate", async message => {
  if (message.content === prefix + 'ping') {
    let rowPing = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel(`إعادة إختبار السرعة`)
          .setCustomId(`reexam`)
          .setStyle("SECONDARY"))
    message.channel.send('pong').then(message => {
      message.edit({
        content: `**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`, components: [rowPing]
      })
    });
  }
});
client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'reexam') {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      message.edit(`**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`)
    }
  }
});

///////////////
client.on('messageCreate', async message => {
  if (message.content.startsWith('$نداء') && message.member.roles.cache.has(discordStaff) || message.content.startsWith('$come') && message.member.roles.cache.has(discordStaff)) {
    try {
      const channel = message.channel;
      const args = message.content.split(' ');
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      const commandLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
      if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
      await user.send(`** يرجى التوجه إلى ${channel} في أقرب وقت !\n  الإستدعاء من قبل : ${message.member} .\n  رسالة الإستدعاء : ${commandLink} -تعال**`)
      await message.reply(`**${emjTrue} لقد تم نداء ${user} إلى هذا الروم بنجاح !**`)
    } catch {
      await message.reply(`**${emjFalse} لا يمكنني ارسال رسالة لهذا الشخص !**`)
    }
  }
});

///////////////




///////////////
let manshor;
let member;

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "منشور")) {
    if (message.member.roles.cache.has(discorsLeader) || message.member.roles.cache.some(r => r.id == 1163902512848449566)) {

      if (message.content.startsWith(prefix + "منشورات")) return false;

      member = message.mentions.members.first()
      if (!member) return message.reply(`**${emjFalse} يرجى منشن صاحب المنشور أولاً !**`)
      manshor = message.content.split(" ").slice(2).join(" ");
      if (!manshor) return message.reply(`**${emjFalse} يرجى وضع المنشور أولاً !**`)

      let embed = new Discord.MessageEmbed()
        .setTitle(`** إختر نوع المنشن :**`)
        .setDescription(`** يرجى إختيار نوع المشنن المناسب : \`here\` أو \`everyone\`\n المنشور :\n\`${manshor}\`**`)
        .setColor(`${colorE}`)
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("here")
          .setCustomId("menthere")
          .setStyle("SECONDARY")
      )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("everyone")
            .setCustomId("menteve")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("no mention")
            .setCustomId("nomen")
            .setStyle("SECONDARY")
        )

      message.reply({ embeds: [embed], components: [row] })
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "menthere") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);

      const heremanshor = `${manshor}\n@here`

      let embed1 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${heremanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor(`${colorE}`)
      let row1 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid")
          .setStyle("SUCCESS")
      )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER")
        )
      interaction.deferUpdate()

      message.edit({ embeds: [embed1], components: [row1] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  } else if (interaction.customId === "menteve") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const evemanshor = `${manshor}\n@everyone`
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${evemanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor("EA3648")
      let row2 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid2")
          .setStyle("SUCCESS"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER"))
      interaction.deferUpdate()
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  } else if (interaction.customId === "nomen") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const nomenmanshor = `${manshor}`
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${nomenmanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor(`${colorE}`)
      let row2 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid3")
          .setStyle("SUCCESS"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER"))
      interaction.deferUpdate()
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "cancelid") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      let embed3 = new Discord.MessageEmbed()
        .setColor(`EA3648`)
        .setDescription(`** تم إلغاء إرسال هذا المنشور .
 بواسطة :
${interaction.member}
**`)
      interaction.deferUpdate()
      message.edit({ embeds: [embed3], components: [] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();
      const manshoratRoom = "〢・الـمنــشـورات・الـمــميـزه";
      const ManshoratChannel = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom);
      const ManshoratLog = client.channels.cache.get("1163903946214096906");
      const mehere = `${member}`
      const manshorhere = `${manshor}\n\nتواصل مع : ${mehere}\n@here`
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel is defined before sending messages
      if (ManshoratChannel) {
        await ManshoratChannel.send(`${manshorhere}`);
        await ManshoratChannel.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1163903884641714207>`)
        await ManshoratChannel.send({files : [lineLink]});
      } else {
        console.log("໒・manshorat・log");
      }

      await ManshoratLog.send(`** المنشور :\n\`${manshor}\`\n المنشن :\nevery\n المشرف المسؤول :\n${interaction.member}\n صاحب المنشور :\n${mehere}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});


client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid2") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();
      const manshoratRoom2 = "〢・الـمنــشـورات・الـمــميـزه";
      const ManshoratChannel2 = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom2);
      const ManshoratLog2 = client.channels.cache.get("1163903946214096906");
      const memeve = `${member}`
      const manshoreve = `${manshor}\n\nتواصل مع : ${memeve}\n@everyone`
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel2}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel2 is defined before sending messages
      if (ManshoratChannel2) {
        await ManshoratChannel2.send(`${manshoreve}`);
        await ManshoratChannel2.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1163903884641714207>`)
        await ManshoratChannel2.send({files : [lineLink]});
      } else {
        console.log("໒・manshorat・log");
      }

      await ManshoratLog2.send(`** المنشور :\n\`${manshor}\`\n المنشن :\nevery\n المشرف المسؤول :\n${interaction.member}\n صاحب المنشور :\n${memeve}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog2.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});


client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid3") {
    if (interaction.member.roles.cache.some(r => r.id == discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();

      await interaction.guild.channels.fetch();

      const manshoratRoom3 = "〢・الـمنــشـورات・الـمــميـزه";
      const ManshoratChannel3 = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom3);
      const ManshoratLog3 = client.channels.cache.get("1163903946214096906");
      const nomen = `${member}`
      const manshorno = `${manshor}\n\nتواصل مع: ${nomen}`;
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel3}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel3 is defined before sending messages
      if (ManshoratChannel3) {
        await ManshoratChannel3.send(`${manshorno}`);
        await ManshoratChannel3.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1163903884641714207>`)
        await ManshoratChannel3.send({files : [lineLink]});
      } else {
        console.log("໒・manshorat・log");
      }

      await ManshoratLog3.send(`** المنشور :\n\`${manshor}\`\n المنشن :\nno mention\n المشرف المسؤول :\n${interaction.member}\n صاحب المنشور :\n${nomen}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog3.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});
/////////////// 
client.on("messageCreate", async message => {
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (args.endsWith("b")) {
    args = args.replace(/b/gi, "") * 1000000000;
  } else if (args.endsWith("m")) {
    args = args.replace(/m/gi, "") * 1000000;
  } else if (args.endsWith("k")) {
    args = args.replace(/k/gi, "") * 1000;
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (
    message.content.startsWith(prefix + "/#sjnskwndnsk") ||
    message.content.startsWith("ضريبة") ||
    message.content.startsWith("ضريبه") ||
    message.content.startsWith("$tax") ||
    message.content.startsWith("$ضريبه") ||
    message.content.startsWith("$ضريبة")
  ) {
    let args2 = parseInt(args);
    let tax = Math.floor(args2 * (20 / 19) + 1);
    let tax2 = Math.floor(args2 * (20 / 19) + 1 - args2);
    let tax3 = Math.floor(tax2 * (20 / 19) + 1);
    let tax4 = Math.floor(tax2 + tax3 + args2);
    let embed1 = new Discord.MessageEmbed()
      .setTitle(`**${emjFalse} | Error \`:\`**`)
      .setDescription("**يرجى وضع المبلغ المراد حساب ضريبته .**")
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setColor(`${colorE}`)
      .setTimestamp()
      .setFooter("#- EROOR S.");
    if (!args2) return message.channel.send({ embeds: [embed1] });
    let embed2 = new Discord.MessageEmbed()
      .setTitle(`**${emjFalse} | Error \`:\`**`)
      .setDescription("**يرجى وضع المبلغ المراد حساب ضريبته .**")
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setColor(`${colorE}`)
      .setTimestamp()
      .setFooter("#- EROOR S.");
    if (isNaN(args2)) return message.channel.send({ embeds: [embed2] });
    if (args2 < 1) return message.channel.send(3);
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`** | Tax \`:\`**`)
      .setDescription(`** The amount to be paid \`:\` 1**`)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setColor(`${colorE}`)
      .setTimestamp()
      .setFooter("#- EROOR S.");
    if (args2 == 1) return message.channel.send({ embeds: [embed4] });
    let taxmsg = new Discord.MessageEmbed()
      .setTitle(`** | Tax \`:\`**`)
      .setColor(`${colorE}`)
      .setDescription(`** The amount to be paid \`:\` ${tax}\n Mediator tax \`:\` \`الوسيط\` ${tax4}**`)
      .setFooter("#- EROOR S.")
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setTimestamp();
    if (args2 >= 50000000) {
      taxmsg.setImage(`https://media.discordapp.net/attachments/1151903417753677975/1155262308549939200/977963533557977118.png?width=531&height=36.ae/OlCHy`);
    }
    message.channel.send({ embeds: [taxmsg] });
  }
});

///////////////
client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "staff-role")) {
    if (!message.member.roles.cache.some(r => r.id == 1163902508796756079 )) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    let r = message.content.split(" ").slice(1).join(" ")
    let role = message.guild.roles.cache.find(r => r.id == r)
    if (!r) {
      if (!role) {
        if (isNaN(r)) {
          message.reply("> **Error : Please put the rank ID**")
        }
      }
    }
    db.set(`role_${message.guild.id}`, r)
    message.reply(`> **تم تعيين رتبة <@&${r}> مستخدم لـ زر الكلايم .**`)

  }
});

client.on("channelCreate", channel => {
  if (channel.name.startsWith("ticket-")) {
    let embed = new Discord.MessageEmbed()
      .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
      .setColor(`${colorE}`)
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Claim")
        .setCustomId("claim")
        .setStyle("SECONDARY")
    )
    setTimeout(() => {
      channel.send({ embeds: [embed], components: [row] }).then(m => db.set(`message_${channel.id}`, m.id))
    }, 1000);
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    let message = db.get(`message_${interaction.channel.id}`)
    let msg = interaction.channel.messages.cache.find(r => r.id == message)
    let role = interaction.guild.roles.cache.find(r => r.id == db.get(`role_${interaction.guild.id}`))
    if (interaction.customId == "claim") {
      if (!interaction.member.roles.cache.some(r => r.id == db.get(`role_${interaction.guild.id}`))) return interaction.reply({ content: "**يمكن للإدارة فقط إستخدام هذا الزر .**", ephemeral: true })
      let embed = new Discord.MessageEmbed()
        .setDescription(`**مسؤول التذكرة : ${interaction.member} .**`)
        .setColor(`${colorE}`)
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Unclaim")
          .setCustomId("unclaim")
          .setStyle("DANGER"))
      interaction.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false,
      })
      interaction.channel.permissionOverwrites.edit(staffManagerRole, {
        SEND_MESSAGES: true,
      })
      interaction.channel.permissionOverwrites.edit(interaction.member, {
        SEND_MESSAGES: true,
      })
      interaction.channel.setName(`ticket-${interaction.member.user.username}`)
      db.set(`claimed_${interaction.channel.id}_${interaction.member.id}`, interaction.member.id)
      db.set(`user_${interaction.channel.id}`, interaction.member.id)
      db.add(`weekuser_${interaction.member.id}`, 1)
      db.add(`alluser_${interaction.member.id}`, 1)
      interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`**تم إستلام التذكرة من قبل : ${interaction.member} .**`).setColor(`${colorE}`)] })
      msg.edit({ embeds: [embed], components: [row] })
    }
    if (interaction.customId == "unclaim") {
      if (!interaction.member.roles.cache.some(r => r.id == db.get(`role_${interaction.guild.id}`))) return interaction.reply({ content: "**يمكن للإدارة فقط إستخدام هذا الزر .**", ephemeral: true })
      if (!db.has(`claimed_${interaction.channel.id}_${interaction.member.id}`)) return interaction.reply({ content: "**يمكن لصاحب التذكرة فقط إستخدام هذا الزر .**", ephemeral: true })
      interaction.reply({ content: `${role}`, embeds: [new Discord.MessageEmbed().setDescription(`**تم ترك التذكرة من قبل : ${interaction.member} .**`).setColor(`${colorE}`)] })
      let embed = new Discord.MessageEmbed()
        .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
        .setColor(`${colorE}`)
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Claim")
          .setCustomId("claim")
          .setStyle("SECONDARY"))
      interaction.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: true,
      })
      interaction.channel.permissionOverwrites.edit(interaction.member, {
        SEND_MESSAGES: false,
      })

      db.subtract(`weekuser_${interaction.member.id}`, 1)
      db.subtract(`alluser_${interaction.member.id}`, 1)
      db.delete(`claimed_${interaction.channel.id}_${interaction.member.id}`)
      db.delete(`user_${interaction.channel.id}`)
      msg.edit({ embeds: [embed], components: [row] })
    }
  }
});

client.on("channelDelete", channel => {
  if (db.has(`user_${channel.id}`)) {
    const s = db.get(`user_${channel.id}`)
    if (db.has(`claimed_${channel.id}_${s}`)) {
      db.delete(`claimed_${channel.id}_${s}`)
    }
    if (db.has(`message_${channel.id}`)) {
      db.delete(`message_${channel.id}`)
      db.delete(`user_${channel.id}`)
    }
  }
})

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "points") || message.content.startsWith(prefix + "نقاط") || message.content.startsWith(prefix + "نقط")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var points = db.get(`weekuser_${user.id}`)
      var weekwarns = db.get(`weekwarns_${user.id}`)
      var allpoints = db.get(`alluser_${user.id}`)
      var allwarns = db.get(`allwarns_${user.id}`)
      var allmute = db.get(`muteall_${user.id}`)
      var weekmute = db.get(`muteweek_${user.id}`)
      if (!points) {
        points = 0
      }
      if (!weekwarns) {
        weekwarns = 0
      }
      if (!allpoints) {
        allpoints = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      if (!allmute) {
        allmute = 0
      }
      if (!weekmute) {
        weekmute = 0
      }
      let embed2 = new Discord.MessageEmbed()
        .setDescription(` **${member.user} , Points :**\n     \n>  **Week Points : \`${points + weekwarns + weekmute}\`**\n>  **All Points : \`${allpoints + allwarns + allmute}\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    if (!user) {
      var points = db.get(`weekuser_${message.member.id}`)
      var weekwarns = db.get(`weekwarns_${message.member.id}`)
      var allpoints = db.get(`alluser_${message.member.id}`)
      var allwarns = db.get(`allwarns_${message.member.id}`)
      var allmute = db.get(`muteall_${message.member.id}`)
      var weekmute = db.get(`muteweek_${message.member.id}`)
      if (!points) {
        points = 0
      }
      if (!weekwarns) {
        weekwarns = 0
      }
      if (!allpoints) {
        allpoints = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      if (!allmute) {
        allmute = 0
      }
      if (!weekmute) {
        weekmute = 0
      }
      let embed4 = new Discord.MessageEmbed()
        .setDescription(` **${message.member.user} , Points :**\n     \n>  **Week Points : \`${points + weekwarns + weekmute}\`**\n>  **All Points : \`${allpoints + allwarns + allmute}\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "tickets") || message.content.startsWith(prefix + "تكتات") || message.content.startsWith(prefix + "تكت")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      let points = db.get(`weekuser_${user.id}`)
      let allpoints = db.get(`alluser_${user.id}`)
      let embed1 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embedd = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embed44 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested by : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      if (!db.has(`weekuser_${user.id}`)) return message.reply({ embeds: [embed1] })
      if (!db.has(`alluser_${user.id}`)) return message.reply({ embeds: [embedd] })
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    if (!user) {
      let points = db.get(`weekuser_${message.member.id}`)
      let allpoints = db.get(`alluser_${message.member.id}`)
      let embed3 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      let embedd = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      if (!db.has(`weekuser_${message.member.id}`)) return message.reply({ embeds: [embed3] })
      if (!db.has(`alluser_${message.member.id}`)) return message.reply({ embeds: [embedd] })
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`)

        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mutes") || message.content.startsWith(prefix + "ميوتات")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var mutes = db.get(`muteweek_${user.id}`)
      var allmutes = db.get(`muteall_${user.id}`)
      if (!mutes) {
        mutes = 0
      }
      if (!allmutes) {
        allmutes = 0
      }
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Mutes :`)
        .setDescription(`> **All Mutes : \`${allmutes}\`**\n> **Week Mutes : \`${mutes}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    if (!user) {
      var mutes = db.get(`muteweek_${message.member.id}`)
      var allmutes = db.get(`muteall_${message.member.id}`)
      if (!mutes) {
        mutes = 0
      }
      if (!allmutes) {
        allmutes = 0
      }
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Mutes :`)
        .setDescription(`> **Week Mutes : \`${mutes}\`**\n> **All Mutes : \`${allmutes}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "ticket(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`weekuser_${user.id}`, args2)
      await db.add(`alluser_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allticket(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`alluser_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mute(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`muteweek_${user.id}`, args2)
      await db.add(`muteall_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allmute(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`muteall_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "allwarn(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`allwarns_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "ticket(-)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`weekuser_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`alluser_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`weekuser_${user.id}`, args2)
      await db.subtract(`alluser_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} ticket points from ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المزالة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }

  }

});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warn(+)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be added**")
      await db.add(`weekwarns_${user.id}`, args2)
      await db.add(`allwarns_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المضافة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warn(-)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`weekwarns_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`allwarns_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`weekwarns_${user.id}`, args2)
      await db.subtract(`allwarns_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} warn points from ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المزالة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "mute(-)")) {
    if (message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      let user = message.mentions.members.first()
      if (!user) return message.reply("**Error : Please mention a user**")
      if (!db.has(`muteweek_${user.id}`)) return message.reply("**This user does not have any points**")
      if (!db.has(`muteall_${user.id}`)) return message.reply("**This user does not have any points**")
      let args = message.content.split(" ").slice(2).join(" ")
      if (!args) return message.reply("**Error : Please put a number**")
      let args2 = parseInt(args)
      if (!args2) return message.reply("**Error : This is not a number that can be removed**")
      await db.subtract(`muteweek_${user.id}`, args2)
      await db.subtract(`muteall_${user.id}`, args2)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} mute points from ${user}**`)
        .setColor(`${colorE}`)
      message.reply({ embeds: [embed] })
      let log = message.guild.channels.cache.find(r => r.id == 1163903947296227340)
      let member = message.guild.members.cache.find(r => r.id == user.id)
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL() })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(`> ** المسؤول : ${message.member}**\n> ** الشخص : ${message.guild.members.cache.find(r => r.id == user.id)}**\n> ** عدد النقاط المزالة : ${args2}**`)
        .setFooter({ text: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setColor(`${colorE}`)
      log.send({ embeds: [embedLog] })
      log.send(`https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png`)
    }
  }
});

client.on("messageCreate", message => {
  if (message.content == prefix + "claim") {

    if (!message.member.roles.cache.some(r => r.id == perms)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    let embed = new Discord.MessageEmbed()
      .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
      .setColor(`${colorE}`)
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Claim")
        .setCustomId("claim")
        .setStyle("SECONDARY")
    )
    message.delete()
    message.channel.send({ embeds: [embed], components: [row] }).then(m => db.set(`message_${message.channel.id}`, m.id))

  }
});

///////////////
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$setr')) {
    let args = message.content.split(" ")
    const roles = message.mentions.roles.first() || message.guild.roles.cache.find((x) => x.id == args[1]) || message.guild.roles.cache.find((x) => x.name == message.content.split(' ').slice(1).join(' '));
    if (!message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    if (!args) return message.reply("**حدد رتبة !**")
    if (!roles) return message.reply("**حدد رتبة !**")


    const members = roles.members.map((e) => `<:222:1158891999349461093> |  <@${e.user.id}>`);
    const membersCount = roles.members.size;
    const MAX_LENGTH = 2000;
    const chunks = [];
    let currentChunk = '';
    for (const member of members) {
      if (currentChunk.length + member.length + 1 <= MAX_LENGTH) {
        currentChunk += `${member}\n`;
      } else {
        chunks.push(currentChunk);
        currentChunk = `${member}\n`;
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    for (let i = 0; i < chunks.length; i++) {
      const content = i === chunks.length - 1 ? `**${chunks[i]}\nعددهم : \`${membersCount}\`**` : `**${chunks[i]}**`;
      await message.reply({ content });
    }
  }
});
////////////////
client.on("messageCreate", message => {
  if (message.content.startsWith("خط")) {
    if (message.content.startsWith("خط")) return false;
    message.channel.send({files : `https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png` })
    message.delete();
  }
});
////////////////
client.on("messageCreate", message => {
  if (message.content.startsWith("خطط")) {
    if (message.content.startsWith("خطط")) return false;
    message.channel.send({files : `https://media.discordapp.net/attachments/1158491033387143188/1158553572707942523/line1.png` })
    message.delete();
  }
});
////////////////
const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');

const voiceChannelId = '1163903822033334272';
const guildId = '1157118605335470080';

client.on('ready', () => {
  const voiceChannel = client.channels.cache.get(voiceChannelId);
  if (!voiceChannel) {
    return console.log(`Voice channel ${voiceChannelId} not found.`);
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannelId,
    guildId: guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  connection.on('error', (error) => {
    console.error(`Error joining voice channel: ${error.message}`);
  });

  connection.on('stateChange', (state) => {
    console.log(`Connection state changed: ${state.status}`);
  });

  const audioPlayer = createAudioPlayer();
  connection.subscribe(audioPlayer);

  console.log(`Joined voice channel ${voiceChannel.name}!`);
});
////////////////
client.on("messageCreate", message => {
  if (message.channel.id == `${talabtRoom}`) {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + "طلب")) return false;
    setTimeout(() => {
      message.delete()
    }, 3000)
  }
});

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "طلب")) {
    if (message.channel.id == `${talabtRoom}`) {
      let args = message.content.split(" ").slice(1).join(" ")
      if (!args) {
        message.reply(`**طريقة الطلب \`:\` ${prefix}طلب + طلبك**`).then(m => {
          setTimeout(() => {
            m.delete()
            message.delete()
          }, 3000)
        })
      }
      if (args) {
        let row = new Discord.MessageActionRow().addComponents(
          new Discord.MessageButton()
            .setLabel("منتجات 🎮")
            .setCustomId("mon")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("تصاميم 🎨")
            .setCustomId("des")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("برمجيات 💻")
            .setCustomId("dev")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("الغاء ❌")
            .setCustomId("can")
            .setStyle("DANGER"),)
        let embed = new Discord.MessageEmbed()
          .setTitle("**__إختر المكان الصحيح لطلبك :__                                                                  **")
          .setDescription(`**منتجات : 🎮                                                                                        
- مثل : نيترو , حسابات , الخ ..
تصاميم : 🎨
- مثل صورة , بنر , الخ ..
برمجيات : 💻
- مثل : بوت , كود , الخ ..
إلغاء الطلب : ❌
- لإلغاء طلبك، عدم إرساله للبائعين .**`)
          .setColor(`${colorE}`)
        db.set(`talab_${message.member.id}`, args)
        message.channel.send({ content: `${message.member}`, embeds: [embed], components: [row] })
        message.delete()
      }
    }
  }
})

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "mon") {
      let talab = db.get(`talab_${interaction.member.id}`)
      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`${montagat}`).send({ content: `<@&1163902576119513139>\n**صاحب الطلب : ${interaction.member}\nرقم الطلب : ${number}**`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`${montagat}`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى البائعين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(err => { })
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "des") {
      let talab = db.get(`talab_${interaction.member.id}`)

      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`1163903909270650920`).send({ content: `<@&1163902577440727080>\n**صاحب الطلب : ${interaction.member}\nرقم الطلب : ${number}**`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`1163903909270650920`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى المصممين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "dev") {
      let talab = db.get(`talab_${interaction.member.id}`)

      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`1163903910734475354`).send({ content: `<@&1163902578250240100>\n**صاحب الطلب : ${interaction.member}\nرقم الطلب : ${number}**`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`1163903910734475354`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى المبرمجين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "can") {
      interaction.reply("> **تم إلغاء طلبك بنجاح .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
    }
    if (interaction.customId == "del") {
      if (interaction.member.roles.cache.some(r => r.id == 1163902529524990054)) {
        interaction.message.delete()
        interaction.reply({ content: `**${emjTrue} لقد تم حذف الطلب بنجاح .**`, ephemeral: true })
      }
    }
  }
});

///////////
client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "info") || message.content.startsWith(prefix + "معلومات")) {
    let embed1 = new MessageEmbed()
      .setTitle(`** EROOR \`S\` Information・المعلومات**`)
      .setDescription(`**إختر من الأزرار التالية ما يناسبك.**`)
      .setColor(`${colorE}`)
      .setImage(`https://media.discordapp.net/attachments/1151903417753677975/1155262308549939200/977963533557977118.png?width=531&height=36.ae/lAYNF`)
    let row1 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("رتب")
        .setCustomId("roles")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("إعلانات")
        .setCustomId("ads")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("إضافات")
        .setCustomId("adds")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("منشورات مميزه")
        .setCustomId("manshorat")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("رومات خاصة")
        .setCustomId("rooms")
        .setStyle("SECONDARY"),)
    message.channel.send({ embeds: [embed1], components: [row1] })
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "roles") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed2 = new MessageEmbed()
      .setDescription(`** Manter \`S\` Roles・معلومات الرتب

>  Role: <@&1163902560139235412>
>  Price: 140k
>  النشر بجميع الرومات
>  نشر الصور بجميع الرومات
>  إمكانية المنشن بجميع الرومات
    
>  Role: <@&1163902561129082890>
>  Price: 110k
>  النشر بجميع الرومات، ماعدا [ تصاميم - برمجيات ]
>  نشر الصور بجميع الرومات
>  إمكانية المنشن بجميع الرومات
    
>  Role: <@&1163902562236366889>
>  Price: 90k
>  النشر بجميع الرومات، ماعدا [ تصاميم - برمجيات ]
>  نشر الصور برومات [ حسابات - ديسكورد ] فقط
>  إمكانية المنشن بجميع الرومات
    
    
>  Role: <@&1163902563263987783>
>  Price: 70k
>  النشر بجميع الرومات، ماعدا [ تصاميم - برمجيات ]
>  عدم نشر الصور
>  إمكانية المنشن


>  Role: <@&1163902564362879036>
>  Price: 50k
>  النشر بجميع الرومات، ماعدا [ تصاميم - برمجيات - عملات - اللعاب ]
>  عدم إمكانية نشر الصور
>  عدم إمكانية المنشن

    
>  Role: <@&1163902564853629052>
>  Price: 40k
>  النشر بروم تصاميم فقط
>  إمكانية نشر الصور
>  إمكانية المنشن
    
>  Role: <@&1163902566237745202>
>  Price: 40k
>  النشر بروم برمجيات فقط
>  إمكانية نشر الصور
>  إمكانية المنشن
   ** `)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed2], components: [] })

    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@577638787622895617> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "ads") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`** EROOR \`S\` Ads・معلومات الاعلانات

>  Mention Here・منشن هير
>  200k 
    
>  Mention Everyone・منشن للكل
>  400k 
    
>  Online Broadcast・برودكاست للاونلاين ( يرسل لين يتبند )
>  600k 
    
>  Giveaway・في هدايا الاعلانات
>  800k 
    
>  Giveaway・روم خاص لسيرفرك
>  1m 
    
>  Private Giveaway・روم خاص لسيرفرك بـ الاسم الي تختاره و جيف اوي
>  1.5m 
    
>  First Room・جيف اوي اول روم في السيرفر
>  2m 
**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@577638787622895617> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "adds") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`**EROOR \`S\` Adds ・الإضافات

>   إزالة التحذيرات :

> لإزالة الوارن الواحد = 30 ألف



>  نقل الرتب :

> لنقل الرتبة من حساب لآخر = 20 الف



>  الموثوقين | <@&1175845787222151168>

> لأخذ رتبة موثوق يجب عليك توفير 30 عملية بيع و يكون مبلغ كل عملية لا يقل عن 50 الف
>  يجب عند نشر عملية أن توثق دليل تسليم السلعة و دليل التحويل للمبلغ

 
**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@577638787622895617> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "manshorat") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`** EROOR \`S\` Manshorat・المنشورات المميزه

>  Manshor Mention Here・منشور منشن هير
>  Price: 40k Credit
    
>  Manshor Mention Everyone・منشور منشن للكل
>  Price: 80k Credit**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@577638787622895617> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "rooms") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let fi = interaction.guild.channels.cache.filter(ch => ch.name.startsWith("〢↯・"))
    var f;
    if (fi.size < 10) {
      f = "مفتوح"
    }
    if (fi.size >= 10) {
      f = "مغلق"
    }
    let embed3 = new MessageEmbed()
      .setDescription(`** EROOR \`S\` Private Rooms・الرومات الخاصة

>  Role: <@&1163902556859277312>
>  Price: 80k Credit Weekly
>  روم خاص بـ اسمك
>  تقدر تطلب و تبيع
>  تقدر تمنشن هير كل ساعتين
>  النشر في الروم بمفردك

>  الرومات المتوفرة : ${fi.size} 
>  \`${f}\` **`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@577638787622895617> .**`);
    }, 500);
  }
});


client.on('messageCreate', message => {
  if (message.content === prefix + 'rooms') {
    if (!message.member.roles.cache.some(r => r.id === '1163902465993887867')) {
      return message.reply('**للأسف لا تمتلك صلاحية**');
    }
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
      .setDescription(`> **${emjTrue} = ارجاع الرومات**\n\n> **${emjFalse} = اخفاء الرومات**`)
      .setTimestamp()
      .setColor(colorE)
      .setFooter(message.guild.name, message.guild.iconURL());
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setEmoji(emjTrue)
        .setStyle('SECONDARY')
        .setCustomId('show'),
      new Discord.MessageButton()
        .setEmoji(emjFalse)
        .setStyle('SECONDARY')
        .setCustomId('hide')
    );
    message.reply({ embeds: [embed], components: [row] }).then(m => {
      db.set(`m_${message.guild.id}`, m.id);
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'show') {
    const guild = client.guilds.cache.get('1163903856594399334');
    const channelIds = [
      '1163903857814929469',
      '1163903859786268692',
      '1163903861006815343',
      '1163903862617411705',
      '1163903864018325635',
      '1163903865956094103',
      '1163903867625414666',
      '1163903868967592026',
      '1163903870334943292',
      '1170107219468107856',
      '1163903880803909722'
    ];
    const everyoneRole = guild.roles.cache.get('1163902590065590314');

    channelIds.forEach(channelId => {
      const channel = guild.channels.cache.get(channelId);
      if (channel) {
        channel.permissionOverwrites.edit(everyoneRole, {
          VIEW_CHANNEL: true,
        });
        channel.bulkDelete(100).catch(error => {
          console.log(`Error deleting messages in channel ${channel.name}: ${error}`);
        });
      } else {
        console.log(`Channel ${channelId} not found`);
      }
    });

    let embed = new Discord.MessageEmbed()
      .setTitle("Rooms was Opened !!")
      .setDescription("**مرحبًا ، تم إظهار رومات البيـ3 الآن ، وستغلق في الساعة 12:00 ليلاً بتوقيت مصر**")
      .setColor("GREEN");

 guild.channels.cache.get('1163903856594399334').send({ embeds: [embed], content: '|| @here ||' })
   guild.channels.cache.get('1163903856594399334').send(`${lineLink}`)
  .then(() => {
    console.log(`Opened channels in guild ${guild.name}`);
  })
  .catch((error) => {
    console.log(`Error opening channels: ${error}`);
  });
  } else if (interaction.customId === 'hide') {
    const guild = client.guilds.cache.get('1163903856594399334');
    const channelIds = [
      '1163903857814929469',
      '1163903859786268692',
      '1163903861006815343',
      '1163903862617411705',
      '1163903864018325635',
      '1163903865956094103',
      '1163903867625414666',
      '1163903868967592026',
      '1163903870334943292',
      '1163903880803909722',
      '1170107219468107856',
      '1163903880803909722',
      '1163903880803909722',
      '1163903880803909722',
      '1163903880803909722',
      '1163903880803909722'
    ];
    const everyoneRole = guild.roles.cache.get('1163902590065590314');

    channelIds.forEach(channelId => {
      const channel = guild.channels.cache.get(channelId);
      if (channel) {
        channel.permissionOverwrites.edit(everyoneRole, {
          VIEW_CHANNEL: false,
        });
      } else {
        console.log(`Channel ${channelId} not found`);
      }
    });

    let embed = new Discord.MessageEmbed()
      .setTitle("Rooms was Closed !!")
      .setDescription("**مرحبًا ، تم غلق رومات البيـ3 الآن ، وسيتم إظهارها في الساعة 8:00 صباحاً بتوقيت مصر**")
      .setColor("RED");

guild.channels.cache.get('1163903856594399334').send({ embeds: [embed], content: '|| @here ||' })
     guild.channels.cache.get('1163903856594399334').send(`${lineLink}`)

  .then(() => {
    console.log(`Closed channels in guild ${guild.name}`);
  })
  .catch((error) => {
    console.log(`Error closing channels: ${error}`);
  });
  }
});

///////////

client.on('messageCreate', async message => {
  if (message.content.startsWith('$say')) {
    const content = message.content.slice('$say'.length).trim();

    const isAdmin = message.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return message.reply('You do not have permission to use this command.');
    }

    const embed = new MessageEmbed()
      .setColor('7c0a02 ')
      .setDescription(content)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});


client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "warns") || message.content.startsWith(prefix + "تحذيرات")) {
    let user = message.mentions.members.first()
    if (user) {
      let member = message.guild.members.cache.find(u => u == user.id)
      var warns = db.get(`weekwarns_${user.id}`)
      var allwarns = db.get(`allwarns_${user.id}`)
      if (!warns) {
        warns = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Warns :`)
        .setDescription(`> **All Warns : \`${allwarns}\`**\n> **Week Warns : \`${warns}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed2] })
    }
    if (!user) {
      var warns = db.get(`weekwarns_${message.member.id}`)
      var allwarns = db.get(`allwarns_${message.member.id}`)
      if (!warns) {
        warns = 0
      }
      if (!allwarns) {
        allwarns = 0
      }
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Warns :`)
        .setDescription(`> **Week Warns : \`${warns}\`**\n> **All Warns : \`${allwarns}\`**`)
        .setColor(`${colorE}`)
        .setFooter({ text: `Requested By : ${message.member.user.tag}`, iconURL: message.member.user.displayAvatarURL() })
      message.reply({ embeds: [embed4] })
    }
  }
});

////////
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$repoints')) {
    if (!message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1163902508796756079')) {
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, total: points + weekwarns + weekmute });
          }
        }
      });
      usersData.sort((a, b) => b.total - a.total);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Week :**');
      const topUsers = usersData.slice(0, 10);
      topUsers.forEach((user, index) => {
        embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Week : ${user.points + user.weekwarns + user.weekmute} **`);
      });
      const channel = message.guild.channels.cache.get('1175850571396305036');
      if (channel && channel.isText()) {
        await channel.send({ embeds: [embed] });
        await message.reply('**تم إعادة تعيين نقاط الأسبوع بنجاح.**');
      }
      usersData.forEach((user) => {
        if (user.user.id !== client.user.id) {
          if (db.has(`feedback_${user.user.id}`)) {
            db.delete(`feedback_${user.user.id}`)
          }
          if (user.points === 0 && user.weekwarns === 0 && user.weekmute === 0) {
            db.delete(`weekuser_${user.user.id}`);
            db.delete(`weekwarns_${user.user.id}`);
            db.delete(`muteweek_${user.user.id}`);
          } else {
            db.set(`muteweek_${user.user.id}`, 0);
            db.set(`weekwarns_${user.user.id}`, 0);
            db.set(`weekuser_${user.user.id}`, 0);
          }
        }
      });
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }
});

//////////////
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$top') || message.content.startsWith('$توب')) {
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1163902529524990054')) {
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points + weekwarns + weekmute });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Points :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Top : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtp = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(true))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false))
      await message.channel.send({ embeds: [embed], components: [rowtp] })
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }
});
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "wetop") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1163902529524990054')) {
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);

          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points + weekwarns + weekmute });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Week :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط في هذا الإسبوع .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Week : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtpreply = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(false))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(true))
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }
})
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "altop") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has('1163902529524990054')) {
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({ user: member.user, points, weekwarns, weekmute, totalPoints: points });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle('**Top 10 Points :**');
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription('**لا يوجد أعضاء يمتلكون نقاط .**');
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(`**#${index + 1} | **`, `**<@${user.user.id}> - ${user.points} Tickets - ${user.weekwarns} Warns - ${user.weekmute} Mutes - All Points : ${user.points + user.weekwarns + user.weekmute} **`);
        });
      }
      let rowtpreply = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("All")
          .setCustomId("altop")
          .setStyle("SECONDARY")
          .setDisabled(true))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false))
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error('حدث خطأ :', error);
    }
  }

})

///////////
let messageCount = 0;
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$start')) {
    if (!message.member.roles.cache.some(r => r.id == 1163902508796756079)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    try {
      const memberList = await message.guild.members.fetch();
      memberList.forEach(async (member) => {
        if (member.roles.cache.has('1163902508796756079')) {
          var points = db.get(`weekuser_${member.id}`)
          var weekwarns = db.get(`weekwarns_${member.id}`)
          var weekmute = db.get(`muteweek_${member.id}`)
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          messageCount++;
          var roleToAssign = "1163902529524990054";
          var roleToAssignHighStaff = "1163902508796756079";
          if (!member.roles.cache.some(r => r.id == 1163902529524990054)) {
            if (points + weekwarns + weekmute >= 100) {
              roleToAssign = "دبل ترقية";
            } else if (points + weekwarns + weekmute >= 50 && points + weekwarns + weekmute <= 99) {
              roleToAssign = "ترقية";
            } else if (points + weekwarns + weekmute >= 15 && points + weekwarns + weekmute <= 49) {
              roleToAssign = "سكب";
            } else if (points + weekwarns + weekmute < 15) {
              roleToAssign = "تخفيض";
            }
          }
          if (member.roles.cache.some(r => r.id == 1163902506968027237)) {
            if (points + weekwarns + weekmute >= 130) {
              roleToAssignHighStaff = "دبل ترقية";
            } else if (points + weekwarns + weekmute >= 90 && points + weekwarns + weekmute <= 129) {
              roleToAssignHighStaff = "ترقية";
            } else if (points + weekwarns + weekmute >= 20 && points + weekwarns + weekmute < 90) {
              roleToAssignHighStaff = "سكب";
            }
            else if (points + weekwarns + weekmute < 20) {
              roleToAssignHighStaff = "تخفيض";
            }
          }
          let replyMessage = `> ** الإداري : <@${member.user.id}>**\n> ** الإداري رقم : ${messageCount}**\n** عدد التكتات : ${points}\n عدد التحذيرات : ${weekwarns}\n عدد الميوتات : ${weekmute}\n مجموع النقاط الكلي : ${points + weekwarns + weekmute}**`;
          if (!member.roles.cache.some(r => r.id == 1163902529524990054)) {
            if (roleToAssign !== "") {
              replyMessage += `\n**<:141414:1158892392217313351> النتيجة : ${roleToAssign}**`;
            }
          }
          if (member.roles.cache.some(r => r.id == 1163902506968027237)) {
            if (roleToAssignHighStaff !== "") {
              replyMessage += `\n**<:141414:1158892392217313351> النتيجة : ${roleToAssignHighStaff}**`;
            }
          }

          await message.channel.send(replyMessage);
        }
      });
    } catch (error) {
      console.error('خطأ :', error);
    }
  }
});

////////////
client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'sub')) {
    if (message.member.roles.cache.some(r => r.id == 1163902529524990054)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1163902529524990054)
      let Emoji = message.guild.roles.cache.find(r => r.name == "♛ || Discord Staff")
      let discordstaff = message.guild.roles.cache.find(r => r.name == "♛ || Discord Staff")
      let args = message.content.split(" ")
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص يمتلك بالفعل روم خاص**`)
      if (!args[2]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[2][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)

      message.reply(`${emjTrue} **| تم إنشاء روم خاص لـ ${member} لمدة \`${args[2]}\`**`)

      let embed = new Discord.MessageEmbed()
        .setDescription(`** EROOR \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **
  
> ** صنع بواسطة : ${message.member} **
  
> ** صنع في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[2])) / 1000)}:R> **

> ** مدة الروم : ${args[2]} **
`)
        .setColor(`${colorE}`)
      let mm = await message.guild.channels.create(`〢↬・${member.user.username}`, { type: "text" })
        .then(async m => {
          m.setParent(message.guild.channels.cache.find(r => r.id == 1163903804408868915))
          member.roles.add([prv]).catch(err => { })
          db.set(`prvuser_${member.id}`, member.id)
          db.set(`prvroom_${m.id}`, member.id)
          m.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          })

          m.permissionOverwrites.edit(Emoji, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
          })
          m.permissionOverwrites.edit(discordstaff, {
            MANAGE_MESSAGES: true,
          })
          m.permissionOverwrites.edit(member.id, {
            SEND_MESSAGES: true,
            MENTION_EVERYONE: true,
            ATTACH_FILES: true
          })

          m.send({ content: `<@${member.id}>`, embeds: [embed] })
          db.push(`room`, {
            server: message.guild.id,
            id: member.id,
            endsAt: Date.now() + ms(args[2]),
            channelid: m.id
          })
        });
    }
  }
});

async function saleh() {
  if (db.has(`room`)) {
    const data = await db.get(`room`)
    for (const x of data) {
      let end = x.endsAt
      let g = await x.server
      if (end < new Date()) {
        const guild = await client.guilds.cache.get(g)
        const channel = await guild.channels.cache.find(r => r.id == x.channelid)
        await db.set(`enduser_${x.id}`, x.id)
        await db.set(`endroom_${x.channelid}`, x.channelid)

        await channel.bulkDelete(100);


        const embed = new Discord.MessageEmbed()
          .setDescription(`** EROOR S Rooms Ended・إنتهاء الروم**\n> ** لقد انتهت مدة هذا الروم، لديك مهلة 24 ساعه لتجديده ..**\n> ** للتجديد تواصل مع <#1163903884641714207> .**`)
          .setColor(`${colorE}`)
          .setTimestamp()
        channel.permissionOverwrites.edit(guild.members.cache.get(x.id), {
          SEND_MESSAGES: false,
        })
        await channel.send({ content: `<@${x.id}>`, embeds: [embed] })

        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set('room', data);
        }
      }
    }
  }
}
setInterval(async () => {
  saleh()
}, 10000)

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'renew')) {
    if (message.member.roles.cache.some(r => r.id == 1163902529524990054)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1163902529524990054)

      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)

      if (!args[3]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[3].endsWith("d")) {
        if (!args[3].endsWith("h")) {
          if (!args[3].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[3][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)

      if (!db.has(`enduser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص لا يمتلك روم منتهي**`)
      if (!db.has(`endroom_${channel.id}`)) return message.reply(`${emjFalse} | **هذا الروم ليس منتهي**`)

      message.reply(`${emjTrue} **| تم تجديد الروم ${channel} لـ ${member} لمدة \`${args[3]}\`**`)
      db.set(`prvuser_${member.id}`, member.id)
      db.set(`prvroom_${channel.id}`, member.id)
      let embed = new Discord.MessageEmbed()
        .setDescription(`** Manter \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **
  
> ** تم التجديد بواسطة : ${message.member} **
  
> ** تم التجديد في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[3])) / 1000)}:R> **

> ** مدة الروم : ${args[3]} **
`)
        .setColor(`${colorE}`)
      channel.bulkDelete(100)
      member.roles.add([prv]).catch(err => { })
      db.delete(`enduser_${member.id}`)
      db.delete(`endroom_${channel.id}`)
      channel.permissionOverwrites.edit(member.id, {
        SEND_MESSAGES: true
      })
      channel.send({ content: `<@${member.id}>`, embeds: [embed] })
      db.push(`room`, {
        server: message.guild.id,
        id: member.id,
        endsAt: Date.now() + ms(args[3]),
        channelid: channel.id
      })
    }
  }
});

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  if (message.content.startsWith(prefix + 'close')) {
    if (message.member.roles.cache.some(r => r.id == 1163902529524990054)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1163902529524990054)
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص ليس لديه روم خاص**`)
      await message.reply(`${emjTrue} | **تم حذف الروم ${channel.name} للشخص ${member} .**`)
      await channel.delete()
      await member.roles.remove([prv])
      if (db.has(`enduser_${member.id}`)) {
        await db.delete(`enduser_${member.id}`)
      }
      if (db.has(`endroom_${channel.id}`)) {
        await db.delete(`endroom_${channel.id}`)
      }
      if (db.has(`prvuser_${member.id}`)) {
        await db.delete(`prvuser_${member.id}`)
      }
      if (db.has(`prvroom_${channel.id}`)) {
        await db.delete(`prvroom_${channel.id}`)
      }
      if (db.has(`room`)) {
        const data = await db.get(`room`)
        for (const x of data) {
          if (x.id == member.id) {
            if (x.channelid == channel.id) {
              const index = data.indexOf(x);
              if (index !== -1) {
                data.splice(index, 1);
                await db.set('room', data);
              }
            }
          }
        }
      }
    }
  }
});

client.on("channelDelete", async channel => {
  if (db.has(`prvroom_${channel.id}`)) {
    let member = channel.guild.members.cache.find(r => r.id == db.get(`prvroom_${channel.id}`))
    if (db.has(`enduser_${member.id}`)) {
      await db.delete(`enduser_${member.id}`)
    }
    if (db.has(`endroom_${channel.id}`)) {
      await db.delete(`endroom_${channel.id}`)
    }
    if (db.has(`prvuser_${member.id}`)) {
      await db.delete(`prvuser_${member.id}`)
    }
    if (db.has(`prvroom_${channel.id}`)) {
      await db.delete(`prvroom_${channel.id}`)
    }
    if (db.has(`room`)) {
      const data = await db.get(`room`)
      for (const x of data) {
        if (x.id == member.id) {
          if (x.channelid == channel.id) {
            const index = data.indexOf(x);
            if (index !== -1) {
              data.splice(index, 1);
              await db.set('room', data);
            }
          }
        }
      }
    }
  }
});

//////////////////
client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "ميوت") || message.content.startsWith(prefix + "mute")) {
    if (message.content.startsWith(prefix + "mutes")) return;
    if (message.content.startsWith(prefix + "ميوتات")) return;
    let ch = "1163903906707935394"
    if (ch.includes(message.channel.id)) {
      const guild = message.guild;
      const channel10 = await guild.channels.cache.find(r => r.name == "໒・mute・log")
      const now = new Date();
      let args = message.content.split(" ")
      if (!args) return message.reply("**حدد الشخص !**")
      let user = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      if (!user) return message.reply("**حدد الشخص !**")
      if (!args[2]) return message.reply(`${emjFalse} | **حدد مدة الميوت !**`)
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[2][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)
      let role = message.guild.roles.cache.find(r => r.name == "Muted")
      user.roles.add([role]).catch(err => { })
      db.add(`muteweek_${message.member.id}`, 1)
      db.add(`muteall_${message.member.id}`, 1)

      message.reply(`**تم إسكات ${user} بنجاح !**`)

      let SpecialEmbedLog10 = new Discord.MessageEmbed()
        .setTitle(`** Add Order Mute !**`)
        .setDescription(`> ** تم إضافة ميوت لـ ${user} , المشرف المسؤول ${message.author} **
      ** إيدي الشخص : ${user.id}
       إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ إضافة الميوت : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
        .setColor(`${colorE}`)
        .setTimestamp()

      channel10.send({ embeds: [SpecialEmbedLog10] })
      db.set(`muted_${user.id}`, user.id)
      db.push(`mute`, {
        server: message.guild.id,
        id: user.id,
        endsAt: Date.now() + ms(args[2]),
      })
    }
  }
});

client.on("guildMemberAdd", member => {
  if (db.has(`muted_${member.id}`)) {
    db.push(`mute`, {
      server: member.guild.id,
      id: member.id,
      endsAt: Date.now() + ms(`5h`),
    })
    member.roles.add([member.guild.roles.cache.find(r => r.name == "Muted")])
  }
});

client.on("guildMemberRemove", async member => {
  if (db.has(`muted_${member.id}`)) {
    if (db.has(`mute`)) {
      const data = await db.get(`mute`)
      for (const x of data) {
        if (x.id == member.id) {
          const index = data.indexOf(x);
          if (index !== -1) {
            data.splice(index, 1);
            await db.set('mute', data);
          }
        }
      }
    }
  }
});

async function mute() {
  if (db.has(`mute`)) {
    const data = await db.get(`mute`)
    for (const x of data) {
      let end = x.endsAt
      let g = await x.server
      if (end < new Date()) {
        const guild = await client.guilds.cache.get(g)
        const member = await guild.members.cache.get(x.id)
        const role = await guild.roles.cache.find(r => r.name == "Muted")
        const channel = await guild.channels.cache.find(r => r.name == "໒・mute・log")
        channel.send(`**لقد انتهت مدة الميوت للشخص ${member} .**`)
        member.roles.remove([role]).catch(err => { })
        db.delete(`muted_${member.id}`)
        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set('mute', data);
        }

      }
    }
  }
}
setInterval(async () => {
  mute()
}, 15000)

////////////


client.on('messageCreate', (message) => {
  if (message.content.startsWith('$discount') || message.content.startsWith('$تخفيض') || message.content.startsWith('تخفيض')) {
    const discountPercentage = message.content.split(" ")[1]
    if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) return message.reply('**حدد نسبة بين 0 و 100 !**');
    const originalPrice = message.content.split(" ")[2]
    if (isNaN(originalPrice) || originalPrice <= 0) return message.reply('**حدد رقم للخصم !**');
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    message.reply(`** المبلغ الاساسي : ${originalPrice}**\n** نسبة الخصم : ${discountPercentage}%**\n **قيمة الخصم : ${discountAmount}**\n **المبلغ النهائي مع الخصم : ${discountedPrice}**`)
  }
});

client.on("messageCreate", message => {
  if (message.content == prefix + "setup") {
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("apply")
        .setEmoji("👤")
        .setStyle("SECONDARY")
    )
    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setTitle("**نموذج التقديم :**")
      .setDescription(`**
>  تم فتح تقديم الإدارة

>  اسمك :

>  عمرك :

>  بلدك :

>  كم مده تفاعلك :

>  خبراتك :

>  في ايش راح تفيدنا :

> الشعار اجباري


>  وضع الرابط في البايو : اجباري
.gg/er-s

! EROOR , Name
! ER , Name**`)
      .setColor(`${colorE}`)
      .setThumbnail(message.guild.iconURL())
    message.delete()
    message.channel.send({ components: [row], embeds: [embed] })
  }
});

const cooldown = new Set()

const discordModals = require('discord-modals');
discordModals(client);
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'apply') {
    if (cooldown.has(interaction.member.id)) return interaction.reply({ content: "Cooldown !", ephemeral: true })
    let user = db.get(`user_${interaction.member.id}`)
    if (db.has(`userapply_${interaction.member.id}`)) return interaction.reply({ content: "**انت بالفعل على قائمة المقدمين !**", ephemeral: true })
    if (interaction.member.roles.cache.some(r => r.id == 1163902529524990054) || interaction.member.roles.cache.some(r => r.id == 1163902529524990054)) return interaction.reply({ content: "**انت بالفعل اداري**", ephemeral: true })
    const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');

    const modal = new Modal()
      .setCustomId('modal')
      .setTitle('نموذج التقديم :')
      .addComponents(
        new TextInputComponent()
          .setCustomId('name')
          .setLabel("ما اسمك ؟")
          .setRequired(true)
          .setPlaceholder("ادخل اسمك هنا")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('age')
          .setRequired(true)
          .setPlaceholder("ادخل عمرك من هنا")
          .setLabel("كم عمرك ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('country')
          .setRequired(true)
          .setPlaceholder("ادخل بلدك من هنا")
          .setLabel("من وين ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('active')
          .setRequired(true)
          .setPlaceholder("ادخل هنا مدة تفاعلك")
          .setLabel("مدة تفاعلك باليوم ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('shop')
          .setRequired(true)
          .setPlaceholder("ادخل هنا خبرتك و هل كنت اداري في سيرفر شوب اخر")
          .setLabel("هل لديك خبرة او ماضي في سيرفرات الشوب ؟")
          .setStyle('LONG')

      )

    showModal(modal, {
      client: client,
      interaction: interaction,
    });

  }
});

client.on('modalSubmit', async modal => {
  if (modal.customId == "modal") {
    let ch = db.get(`channel_${modal.guild.id}`)
    let channel = modal.guild.channels.cache.find(c => c.id == 1170100199931248730)
    const name = modal.getTextInputValue("name")
    const age = modal.getTextInputValue("age")
    const country = modal.getTextInputValue("country")
    const active = modal.getTextInputValue("active")
    const shop = modal.getTextInputValue("shop")

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setEmoji(`✔️`)
        .setCustomId("acc")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji(`❌️`)
        .setCustomId("dec")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji("🤐")
        .setCustomId("time")
        .setStyle("SECONDARY")
    )
    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: `${modal.member.user.username}`, iconURL: `${modal.member.user.displayAvatarURL()}` })
      .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(modal.guild.iconURL())
      .setTitle("**تقديم جديد !**")
      .setDescription(`**الشخص : <@${modal.member.id}>**\n\n>  **الاسم : ${name}**\n\n>  **العمر : ${age}**\n\n>  **البلد : ${country}**\n\n>  **مدة التفاعل : ${active}**\n\n>  **خبرته في سيرفرات الشوب : ${shop}**`)
      .setColor(`${colorE}`)
    modal.reply({ content: "تم ارسال تقديمك !", ephemeral: true })
    channel.send({ content: `${modal.member}`, embeds: [embed], components: [row] }).then(m => {
      db.set(`userapply_${modal.member.id}`, modal.member.id)
      db.set(`userm_${m.id}`, modal.member.id)
    })
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "acc") {
      if (!interaction.member.roles.cache.some(r => r.id == 1163902508796756079)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let role = interaction.guild.roles.cache.find(r => r.id == "1175842899519348816")
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مقبول من : ${member} ✔️**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      member.roles.add([role]).catch(err => { })
      member.send(`**لقد تم قبول تقديمك !**\n**الرجاء مراجعة هذه الرومات و حفظ ما فيها :**\n<#1163903885874839592> | <#1163903932158980136> | <#1163903939272528074>`).catch(err => { })
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
    if (interaction.customId == "dec") {
      if (!interaction.member.roles.cache.some(r => r.id == 1163902508796756079)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مرفوض من : ${member} ❌️**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      member.send(`**لقد تم رفض تقديمك ! الرجاء عدم التقديم مرة ثانية لتجنب الميوت .**`).catch(err => { })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
    if (interaction.customId == "time") {
      if (!interaction.member.roles.cache.some(r => r.id == 1163902508796756079)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**لقد تم اسكات : ${member} 🤐**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      member.send(`**لقد تم اسكاتك !**`).catch(err => { })
      member.timeout(86400000).catch(err => { })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
  }
});

let buttonwinner = false

client.on("messageCreate", async message => {
  if (message.content == prefix + "زر" || message.content == prefix + "button") {
    const wait = require('node:timers/promises').setTimeout;
    buttonwinner = false
    const embed = new Discord.MessageEmbed()
      .setTitle("**اسرع شخص يضغط الزر : ⚡**")
      .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اسرع واحد يضغط الزر يفوز**")
      .setTimestamp()
      .setColor("333333")
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r1")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r2")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r3")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r4")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r5")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r6")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r7")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r8")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r9")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r10")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row3 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r11")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r12")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r13")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r14")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r15")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row4 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r16")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r17")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r18")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r19")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r20")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    message.channel.send({ components: [row, row2, row3, row4], embeds: [embed] }).then(async m => {
      await wait(3500)
      const all = [...row.components, ...row2.components, ...row3.components, ...row4.components]
      const r = Math.floor(Math.random() * all.length);
      const button = all[r]
      button.setStyle("SUCCESS")
      button.setDisabled(false)
      const embed2 = new Discord.MessageEmbed()
        .setTitle("**اسرع شخص يضغط الزر : ⚡**")
        .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اضغط على الزر الأخضر 🟢**")
        .setTimestamp()
        .setColor("GREEN")
      m.edit({ components: [row, row2, row3, row4], embeds: [embed2] })
      const time = setTimeout(() => {
        button.setDisabled(true)
        button.setStyle("DANGER")
        const embed3 = new Discord.MessageEmbed()
          .setTitle("**اسرع شخص يضغط الزر : ⚡**")
          .setDescription("**انتهى الوقت**\n**🔴 لا يوجد اي فائز**")
          .setTimestamp()
          .setColor("RED")
        m.edit({ components: [row, row2, row3, row4], embeds: [embed3] })
      }, 10000)
      client.on("interactionCreate", interaction => {
        if (interaction.isButton()) {
          if (interaction.customId == `${button.customId}` && buttonwinner == false) {
            buttonwinner = true
            button.setDisabled(true)
            const embed4 = new Discord.MessageEmbed()
              .setTitle("**اسرع شخص يضغط الزر : ⚡**")
              .setDescription(`**👑 | ${interaction.member}**`)
              .setTimestamp()
              .setColor("YELLOW")
            m.edit({ components: [row, row2, row3, row4], embeds: [embed4] })
            interaction.channel.send(`**⚡ | الفائز هو : ${interaction.member}**`)
            interaction.deferUpdate()
            clearTimeout(`${time}`)
          }
        }
      });

    })
  }
});


const warnWork = `1163903912168915065`
const cooldown1 = 10000;

const cooldown2 = new Map();

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "تحذير")) {
if (cooldown2.has(message.content)) {
      const timeLeft = cooldown1 - (Date.now() - cooldown2.get(message.content));
      if (timeLeft > 0) {
        return message.reply(`** يجب عليك إنتظار ${Math.ceil(timeLeft / 1000)} ثانية لإستخدام هذا الأمر ..
 يجب التأكد من عدم تكرارك مخالفة شخص تمت مخالفته من قبل زميلك**`);
      }
    }
cooldown2.set(message.content, Date.now());
    if(message.content.startsWith(prefix + "تحذيرات")) return false;
    const wait = require('node:timers/promises').setTimeout;
    if (warnWork.includes(message.channel.id)) {
      const now = new Date()
    let madri = `(=)`
    let channel = message.guild.channels.cache.find(r => r.id == 1163903852840497222);
    let s1 = message.guild.roles.cache.find(r => r.name == "Warn 50% :");
    let s2 = message.guild.roles.cache.find(r => r.name == "Warn 100% :");
      
    let excellent = message.guild.roles.cache.find(r=>r.name == "♚・Greet S :")
    let legendry = message.guild.roles.cache.find(r=>r.name == "✯ || Angle S :")
    let epic = message.guild.roles.cache.find(r=>r.name == "♙ || Perfect S :")
    let rare = message.guild.roles.cache.find(r=>r.name == "♙ || Excellent S :")
    let normal = message.guild.roles.cache.find(r=>r.name == "♙ || Good S :")
    let designer = message.guild.roles.cache.find(r=>r.name == "♙ || Designer S :")
    let developer = message.guild.roles.cache.find(r=>r.name == "♙ || Developer :")
    let prv = message.guild.roles.cache.find(r=>r.name == "✾ || Private S :")
    let special = message.guild.roles.cache.find(r=>r.name == "♞・↝ Special Posts")
    let rolesToCheck = ["♚・Greet S :" , "✯ || Angle S :" , "♙ || Perfect S :" , "♙ || Excellent S :" , "♙ || Good S :" , "♙ || Designer S :" , "♙ || Developer :" , "✾ || Private S :" , "♞・↝ Special Posts"]
    let args = message.content.split(" ")
    let user = message.mentions.members.first() || message.guild.members.cache.find(r=>r.id ==      args[1])
    let reason = message.content.split(" ").slice(2).join(" ")
    if(!user) return message.reply(`**${emjFalse} يرجى وضع منشن الشخص أولاً !**`)
    const roles = user.roles.cache;
    const roleNames = Array.from(roles.values()).map(role => role.name);
    const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
    if(rolesUserHas.length === 0) return message.reply(`**${emjFalse} هذا الشخص لا يمتلك رتب بيع**`)
    if(!reason) return message.reply(`** ${emjFalse} يرجى وضع السبب أولاً !**`)
    if(!message.attachments.size) return message.reply(`**${emjFalse} يرجى وضع الدليل أولاً !**`)
    
    if(!user.roles.cache.some(r=>r.name == "Warn 50% :") && !reason.includes(`(=)`)) {
    message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : Warn 50%\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      const a = attachmentFiles.join(`\n`)
      channel.send(`${lineLink}`);
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
      
      user.roles.add([s1])
      
    }
    if(user.roles.cache.some(r=>r.name == "Warn 50% :") && !reason.includes(`(=)`)) {
      if(!user.roles.cache.some(r=>r.name == "Warn 100% :") && !reason.includes(`(=)`)) {
      message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : Warn 100%\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
       channel.send(`${lineLink}`);
        const a = attachmentFiles.join(`\n`)
        const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
      
      user.roles.add([s2])
         
    }
    }
    if(user.roles.cache.some(r=>r.name == "Warn 100% :") && !reason.includes(`(=)`)) {
            user.roles.remove([s1,s2,perfect,gold,great,epic,normal,designer,developer,prv])
                message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : سحب رتبة\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      const a = attachmentFiles.join(`\n`)
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
      
      channel.send(`${lineLink}`);
    }
    if(reason.includes(`(=)`)) {
                message.reply(`**${emjTrue} تم إعطاء التحذير لـ ${user} !**`)
    db.add(`weekwarns_${message.member.id}` , 1)
    db.add(`allwarns_${message.member.id}` , 1)
     const attachments = Array.from(message.attachments.values());
      const attachmentFiles = attachments.map((attachment) => attachment.url);
    channel.send({content:`** الشخص : ${user}\n\n الإداري : ${message.member}\n\n نوع التحذير : سحب رتبة\n\n السبب : ${reason}\n\n الدليل :**` , files:attachmentFiles})
      channel.send(`${lineLink}`);
      const a = attachmentFiles.join(`\n`)
      const roles = user.roles.cache;
      const roleNames = Array.from(roles.values()).map(role => role.name);
      const rolesUserHas = rolesToCheck.filter(role => roleNames.includes(role));
      
              user.roles.remove([s1,s2,excellent,,great,epic,normal,designer,developer,prv,special])

    }
      }
  }
});





client.on('messageCreate', async (message) => {
  const roleId = '1163902465993887867';
  if (!message.guild || message.author.bot) return;
  const [command, ...args] = message.content.slice(prefix.length).split(' ');
  if (command === 'resetdata') {
    if (!message.member.roles.cache.has(roleId)) {
      await message.reply('**لا يوجد معك صلاحية**.');
      return;
    }
    await db.delete(`guildData_${guildId}`);
    await message.reply('**تم حذف جميع الجوائز**.');
  }
});



client.on('messageCreate', async (message) => {
  const roleId = '1163902529524990054'; 
  if (!message.guild || message.author.bot || !message.content.startsWith(prefix + 'spin')) return;
  const guildId = message.guild.id;
  if (guildId !== '1157118605335470080') {
    await message.reply('**الامر غير متاح**.');
    return;
  }
  let data = db.get(`guildData_${guildId}`) || [];
  if (!data || data.length === 0) {
    await message.reply('**لا يوجد جوائز حاليا**.');
    return;
  }
  const member = message.guild.members.cache.get(message.author.id);
  if (!member.roles.cache.has(roleId)) {
    await message.reply('**لا يوجد معك صلاحية**');
    return;
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomExtra = data[randomIndex];
  const embed = new MessageEmbed()
    .setTitle('Congratulations, You Won :')
    .setDescription(`> **${randomExtra}**`)
    .setColor(`${colorE}`)
    .setFooter('EROOR Spin', message.guild.iconURL({ dynamic: true }));

  await message.channel.send({ embeds: [embed] });
});


client.on('messageCreate', async (message) => {
  const roleId = '1163902465993887867'; 
  if (!message.guild || message.author.bot) return;
  const [command, ...args] = message.content.slice(prefix.length).split(' ');
  if (command === 'addspin') {
    if (!message.member.roles.cache.has(roleId)) {
      await message.reply('**لا يوجد معك صلاحية**');
      return;
    }
    const guildId = message.guild.id;
    let data = db.get(`guildData_${guildId}`) || [];
    if (args.length === 0) {
      await message.reply('**اكتب المكافأة**.');
      return;
    }
    const extrasToAdd = args.filter(extra => !data.includes(extra));
    if (extrasToAdd.length === 0) {
      await message.reply('**المكافأة موجودة بالفعل**.');
      return;
    }
    data.push(...extrasToAdd);
    db.set(`guildData_${guildId}`, data);
    await message.reply('**تم الاضافة بنجاح**.');
  }
});

let boost_channel = "1163903836889550848"; //ID CHANNEL BOOST HERE 
client.on("guildMemberUpdate", (old,now) => {
    let oldS = old.premiumSince;
    let nowS = now.premiumSince;
    if (!oldS && nowS) {
        let user = now.guild.members.cache.get(now.user.id)
        let channel = now.guild.channels.cache.get(boost_channel)
        channel.send({
         content : `**__
> 🌹 |  Thanks For Added Boost ${now.user} __**`
        }).then((y) => {
y.react("<a:Mats_love:1152757032185778186>")
})
    }
})
client.on('messageCreate', (message) => {
  const klamMmno3 = ["خط","خطط","$تشهير","$معلومات","$info","$اعلان","حول","$say"]
  if (!message.author.bot && message.guild) {
    const tttt = klamMmno3.some(word => message.content.includes(word));

    if (tttt) {
      message.delete() 
  }
}
});


const replace = [
  {
    word: "بيع",
    replace: "بيــ3"
  },
   {
    word: "شراء",
    replace: "4ــراء"
  },
  {
    word: "حساب",
    replace: "حـsـاب"
  },
  {
    word: "وسيط",
    replace: "9سـيط"
  },
  {
    word: "هاك",
    replace: "هـ-ــاك"
  },
  {
    word: "شوب",
    replace: "شـ9ب"
  },
  {
    word: "متجر",
    replace: "متـ_gـر"
  },
  {
    word: "ديسكورد",
    replace: "ديسـkـورد"
  },
  {
    word: "سعر",
    replace: "سـ3ـر"
  },
  {
    word: "نيترو",
    replace: "نـيـtـرو"
  },
  {
    word: "متوفر",
    replace: "متـ9فـر"
  },
]

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "replacer")) {
  if(!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("تشفير")
    .setDescription("**لتشفير منشورك قم بالضغط على الزر و ضع منشورك.**")
    .setThumbnail(message.guild.iconURL())

      const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("تشفير")
            .setCustomId('replace')
        )
    message.channel.send({embeds: [embed], components: [row]})
  }
})


client.on("interactionCreate", async i => {
  if (!i.isButton()) return;
  if (i.customId == "replace") {
            const modal = new Modal()
            .setTitle('تشفير')
            .setCustomId('rep')

   const replacer = new TextInputComponent()
            .setCustomId('replacetext')
            .setLabel(`قم بـوضع منشورك هنا لتشفيره`)
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle("PARAGRAPH")

       const rows = [replacer].map(
                (component) => new MessageActionRow().addComponents(component)
            )
            modal.addComponents(...rows);
            i.showModal(modal);

  }

})

client.on("interactionCreate", async i => {
  if (!i.isModalSubmit()) return;
  if (i.customId == "rep") {
let text = i.fields.getTextInputValue('replacetext');
    let replaced = false;

    replace.forEach(t => {
      const regex = new RegExp(t.word, 'g');
      if (regex.test(text)) {
        text = text.replace(regex, t.replace);
        replaced = true;
      }
    });


    if (replaced) {
i.reply({content: `\`المنشور بعد التشفير :\`\n\n ${text}`, ephemeral: true})
    } else {
      i.reply({content: "**منشورك لا يحتاج للتشفير**", ephemeral: true})
    }
  }
  

})
process.on("unhandledRejection", e => {
  console.log(e)
})

client.on('messageCreate', (message) => {
  if (message.content === 'count') {
    const guild = message.guild;

    if (guild) {
      const members = guild.members.cache;

      // عمك عمر مكسيكان
      const bots = members.filter(member => member.user.bot);
      const realUsers = members.filter(member => !member.user.bot);

      message.channel.send(`**عدد البوتات في السيرفر: ** ${bots.size} `);
      message.channel.send(`**عدد الأعضاء الحقيقيين في السيرفر:** ${realUsers.size} `);
    } else {
      message.channel.send('يرجى تنفيذ الامر في سيرفر.');
    }
  }
});



const channelId = '1163903873161900104'; // ايدي روم الي هيترسل فيها
const messageContent = '**اللهم صلي وسلم وبارك علي سيدنا محمد**'; 

  setInterval(() => {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    if (channel.isText() && messageContent) {
      channel.send(messageContent);
    }
  }, 3600000); 



const channelId1 = '1163903878039879791'; // 
const reactions = ['<:999:1158892236990337095>', '<:888:1158892207890251898>']; // 

client.on('messageCreate', async (message) => {
  // 
  if (message.author && message.channelId === channelId1) {
    //
    for (const reaction of reactions) {
      await message.react(reaction);
    }
  }
});

/////////////

client.on("messageCreate", async msg => {
  if (msg.content == "eroors") {
    let embed = new MessageEmbed()
    .setColor("7c0a02")
    .setTitle("**البداية**")
    .setDescription(`**\`EROOR S,\`
نحن سيرفر يهدف إلى توفير الفرص للجميع لعرض منتجاتهم للبيع
عن طريق شراء رتبة بيع بمبلغ يتم تحديده من قبل إدارة السيرفر و عرض منتجاتك بالرومات المحددة.

قم بإتباع الازرار الموجودة تحت حتى تظهر لك القوائم التعريفية عن السيرفر
من الافضل قراءة جميع القوائم واللوائح قبل البدء في السيرفر تجنبا لاي مشكلة

> القوانين قابله للتعديل بأي وقت وعدم قرائتها ليس بعذر
    **`)
    let row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("about")
      .setLabel("حول السيرفر")
      .setStyle("SUCCESS"),
      new MessageButton()
      .setCustomId("server")
      .setLabel("قوانين السيرفر")
      .setStyle("SUCCESS"),
      new MessageButton()
      .setCustomId("chat")
      .setLabel("قوانين الشات")
      .setStyle("SUCCESS"),
      new MessageButton()
      .setCustomId("important")
      .setLabel("هام جدا")
      .setStyle("DANGER"),
    )
    msg.channel.send({ embeds: [embed],components: [row] })
  }
})


client.on("interactionCreate", async i => {
  if (!i.isButton()) return
  if (i.customId === "about") {
    let embed = new Discord.EmbedBuilder()
    .setTitle("حول السيرفر")
    .setDescription("Description here")
    i.reply({ ephemeral: true,embeds: [embed] })
  }
  if (i.customId === "server") {
    let embed = new Discord.EmbedBuilder()
    .setTitle("قوانين السيرفر")
    .setDescription("Description here")
    i.reply({ ephemeral: true,embeds: [embed] })
  }
  if (i.customId === "chat") {
    let embed = new Discord.EmbedBuilder()
    .setDescription("Description here")
    i.reply({ ephemeral: true,embeds: [embed] })
  }
  if (i.customId === "important") {
    let embed = new Discord.EmbedBuilder()
    .setTitle("هام جدا")
    .setDescription("Description here")
    i.reply({ ephemeral: true,embeds: [embed] })
  }
})

////////////

process.on("uncaughtException" , err => {
return;
})
process.on("unhandledRejection" , err => {
return;
})
process.on("rejectionHandled", error => {
return;
});

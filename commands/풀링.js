const { Permissions } = require("discord.js")
const client = require("../index")
module.exports = {
    name: "풀링",
    async execute(message, args) {
        let list = ""
        if (!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return message.reply("권한이 없습니다 ")
        const channel = client.channels.cache.get(args[0]) || message.member.voice.channel
        if (!channel) return message.reply("**음성채널에 입장해주시거나 유저를 옮길 채널 ID를 입력해주세요.**")
        await message.guild.members.cache.forEach(member => {
            if (member.voice.channel) list += `${member.user.tag}\n`
        })
        const embed = new (require("discord.js")).MessageEmbed()
            .setColor("BLUE")
            .setDescription(`**유저 목록\n\n${list}**`)
            .addField("채널 이름", `${channel.name}`)
        const button1 = new (require("discord.js")).MessageButton()
            .setCustomId("check")
            .setLabel("수락")
            .setStyle("SUCCESS")
        const button2 = new (require("discord.js")).MessageButton()
            .setCustomId("caccel")
            .setLabel("취소")
            .setStyle("DANGER")
        const check = new (require("discord.js")).MessageActionRow().addComponents(button1).addComponents(button2)
        embed.setTitle("유저를 풀링하시겠습니까?")
        const msg = await message.reply({ embeds: [embed], components: [check] })

        const filter = i => i.user.id == message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, max: 1 })
        collector.on("collect", async i => {
            if (i.customId == "check") {
                embed.setTitle("유저를 옮김")
                embed.setColor("GREEN")
                await i.update({ embeds: [embed], components: [] })
                await message.guild.members.cache.forEach(member => {
                    if (member.voice.channel) {
                        member.voice.setChannel(channel)
                    }
                })
            } else {
                if (i.customId == "cancel") {
                    embed.setTitle("취소됨")
                    embed.setColor("RED")
                    await i.update({ embeds: [embed], components: [] })
                    return
                }
            }
        })
    }
}
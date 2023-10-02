const google = require('google-it')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "구글검색",
    execute(message, args) {
        const Embed = new MessageEmbed()
            .setTitle(`${args.join(" ")}에 대한 검색결과`)
            .setColor("PURPLE")
            .setTimestamp()

        google({ 'query': args.join(" ") }).then(rufrhk => {
            rufrhk.forEach(function (item, index) {
                Embed.addField(`${index + 1}. ${item.title} `, `[바로가기](${item.link})`)
            })
            message.channel.send({ embeds: [Embed] })
        }).catch(e => {
            return message.reply(`오류가 발생했습니다 ${e}`)
        })
    }
}
const { Permissions } = require('discord.js');
module.exports = {
    name: "청소",
    async execute(message, args) {
        try {
            let i = 0
            const list = []
            const user = message.mentions.members.first() || "NONE"
            const messagechannel = message.channel
            const messages = messagechannel.messages.fetch()
            const count = parseInt(args[0])
            if (isNaN(args[0])) return message.reply("올바른 값을 입력해주세요")
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("권한이 없습니다")
            if (count < 0 || count > 99) return message.reply("1에서 100미만의 수를 입력해주세요")
            if (user == "NONE") {
                await messagechannel.bulkDelete(count, true).then((count) => {
                    message.channel.send({ content: `${message.author}의 의해 ${count.size}개의 메세지를 삭제했습니다` }).then((msg) => setTimeout(() => { msg.delete() }, 1000))
                })
            } else {
                (await messages).filter((m) => {
                    if (m.author.id == user.id && count > i) {
                        console.log(m)
                        list.push(m)
                        i++
                    }
                })
                await messagechannel.bulkDelete(list, true).then((count) => message.channel.send({ content: `${message.author}의 의해 ${user}님의 메세지를 ${count.size}개만큼 삭제하였습니다` }).then((msg) => setTimeout(() => { msg.delete() }, 2000)))
            }
        } catch (error) {
            message.reply("에러가 발생했습니다")
        }
    }
}
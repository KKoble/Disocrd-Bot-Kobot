const Schema = require("../models/도박")
const cooldown = new Set();

module.exports = {
    name: "미션",
    async execute(message) {
        if (cooldown.has(message.author.id)) {
            return message.channel.send("**오류 ) 미션 명령어는 1분이라는 쿨타임이 존재합니다. 잠시 후 다시 시도해 주세요**");
        } else {
            cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 60000);
        }
        const emdfhr = await Schema.findOne({ userid: message.author.id })
        if (!emdfhr) return message.reply("**오류 ) 등록되지 않은 유저입니다. ( !돈줘 )**")
        const random1 = Math.floor(Math.random() * 10) + 1
        const random2 = Math.floor(Math.random() * 10) + 1
        const random3 = Math.floor(Math.random() * 10) + 1
        const random4 = Math.floor(Math.random() * 10) + 1
        const rufrhk = random1 * random2 + random3 - random4
        message.channel.send(`**${random1} x ${random2} + ${random3} - ${random4}의 답은 ? \n( 제한시간 30초 )**`)
        try {
            const filter = (m) => {
                if (m.author !== message.author) return
                if (m.content == rufrhk) return true;
                else m.react("❌")
            }
            const wait = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }) // time을 바꾸시면 제한시간이 바뀝니다 1000 = 1초
            if (wait) {
                message.channel.send(`**문제를 맞추셨어요 🤩 1000원을 드릴게요 \n현재 잔액 : ${emdfhr.money + 1000}원**`)
                await Schema.findOneAndUpdate({ userid: message.author.id }, {
                    money: emdfhr.money + 1000,
                    userid: message.author.id,
                    date: emdfhr.date
                })
            }
        } catch (e) {
            return message.channel.send("**시간이 초과되었습니다.*")
        }
    }
}
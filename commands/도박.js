const Schema = require("../models/도박")
const comma = require("comma-number")

module.exports = {
    name: "도박",
    description:"코봇 도박 <돈>",
    async execute(message, args) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) return message.reply("**코봇 돈줘로 돈을 먼저 받아주세요.**")
        if (isNaN(args[0])) return message.reply("**베팅 하실 금액을 입력해 주세요.**")
        if (args.join(" ").includes("-")) return message.reply("**금액엔 -가 포함되면 안돼요 !**")
        const money = parseInt(args[0]);
        if (money > ehqkrduqn.money) return message.reply("**소유하고 있는 돈 보다 많은 금액을 베팅할 순 없습니다.**")
        const random = Math.floor(Math.random() * 101)
        if (random < 50) {
            message.reply(`**너가 졌어 베팅한 금액을 잃었어 ㅠ\n-${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money - money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        } else {
            message.reply(`**너가 이겼어 ! \n+${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }
    }
}
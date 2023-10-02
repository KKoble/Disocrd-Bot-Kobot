const { Permissions } = require("discord.js")
const Schema = require("../models/뮤트")
const config = require("../config.json")

module.exports = {
    name:"언뮤트",
     async execute(message,args){
        const rolealive = await Schema.findOne({serverid:message.guild.id})
        if(!rolealive) return message.reply(`서버에 뮤트 역할이 등록되지 않았어요. ${config.prefix}뮤트역할설정으로 역할을 생성해주세요 !`)
        const role = message.guild.roles.cache.find(r=> r.id == `${rolealive.roleid}`)
        if(!role) return message.reply(`뮤트 역할이 삭제되거나 오류가 발생했어요. ${config.prefix}뮤트역할설정으로 역할을 다시 생성해주세요 !`)
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("권한이 없습니다.")
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("뮤트 할 유저의 아이디를 입력해주시거나 멘션을 해주세요 !")
        user.roles.remove(role).catch((error)=>{
            return message.channel.send("봇의 권한이 언뮤트 할 대상보다 낮습니다.")
        })
        message.channel.send(`**${user.user.tag}님을 언뮤트했어요 !**`)
    }
}
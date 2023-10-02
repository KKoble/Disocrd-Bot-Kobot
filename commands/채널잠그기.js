const {Permissions , MessageEmbed} = require('discord.js')

module.exports = {
    name:"채널닫기",
    execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없습니다")
        message.channel.permissionOverwrites.edit(message.guild.roles.cache.find((e) => e.name.toLowerCase().trim() === "@everyone"),{
            SEND_MESSAGES : false,
            ADD_REACTIONS : false
        })
        const date = new Date()
        const time = Math.round(date.getTime() / 1000)

        const embed = new MessageEmbed()
        .setTitle("채널이 닫힘")
        .setDescription("일반 유저에게서 메세지보내기 , 이모지달기 권한을 제거했습니다")
        .addFields(
            {name : "채널을 닫은 관리자" , value: `${message.author}` , inline:true},
            {name : "명령어가 실행된 시간", value:`<t:${time}>`,inline:true},
            {name : "채널을 다시 열고싶다면?",value : `코봇 채널열기`,inline:true}
        )
        .setColor("RED")
        .setTimestamp()
        message.channel.send({embeds : [embed]})
    }
}
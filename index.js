const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
module.exports=client
const fs = require ('fs')
const { DiscordTogether } = require('discord-together')
client.discordTogether = new DiscordTogether(client);

const {prefix , token, mogo_url} = require('./config.json')

//몽고DB 연결
const mongoose = require("mongoose")

mongoose.connect(mogo_url, {
    useNewUrlParser: true ,  useUnifiedTopology: true 
    }).then(console.log("데이터베이스 연결 완료"))

//상태 메세지 설정
client.once('ready',()=>{
    let number = 0
    setInterval(() => {
        const list = ["서버관리 하는중", "여러분들과 애기하는 중" , "여러분과 노는 중"]
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type:"PLAYING"
        })
        number++
    }, 600000) //몇초마다 상태메세지를 바꿀지 정해주세요 (1000 = 1초)
    console.log("봇이 준비되었습니다")
})

client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

//개인 음성채팅 생성
client.on('voiceStateUpdate', async (newState, oldState) => {
    const channel = newState.guild.channels.cache.find(c => c.name === "개인음성채팅생성");
    if (newState.member.voice.channel) {
        if (!channel) return
        if (newState.member.voice.channel.id !== channel.id) return
        newState.guild.channels.create(`${newState.member.user.username}의 음성방`, {
            type: "GUILD_VOICE",
            parent: oldState.channel.parent
        }).then(ch => {
            if (!ch) return
            newState.member.voice.setChannel(ch)
            const interval = setInterval(() => {
                if (ch.deleted == true) {
                    clearInterval(interval)
                    return;
                }
                if (ch.members.size == 0) {
                    ch.delete()
                    console.log("채널 삭제됨")
                    return;
                }
            }, 1000);
        })
    }
})

client.login(token)
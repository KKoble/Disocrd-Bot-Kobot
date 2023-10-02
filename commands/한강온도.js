const fetch = require('node-fetch') // node-fetch 모듈을 불러옴
const { MessageEmbed } = require('discord.js') //discord.js 모듈에서 임베드를 불러옴

module.exports = {
    name: "한강온도", //명령어 이름
    async execute(message) {
        const msg = await message.channel.send({ content: "불러오는중 . . ." }) //나중에 수정될 메세지
        fetch("http://hangang.dkserver.wo.tc/").then(res => res.json()).then(json => { //fetch로 http://hangang.dkserver.wo.tc/ 사이트를 긁어옴
            if (json.result == "true") { // json.result가 true라면
                let tkdxo // 상태라는 변수를 만듬
                if (json['temp'] < 16) { // 한강온도가 16도 이하라면
                    tkdxo = "좀 차갑네요..!" //tkdxo값을 바꿈
                } else tkdxo = "따듯하네요..!" // 16도 보다 높다면 상태를 바꿈

                const embed = new MessageEmbed() // 임베드를 만듬
                    .setTitle("한강온도") // 임베드의 제목
                    .setDescription(tkdxo) // 임베드의 설명
                    .setColor("GREEN") // 임베드의 컬러
                    .setThumbnail("https://cdn.discordapp.com/attachments/892675661246889987/905438873079906345/unnamed.png", ({ dynamic: true })) //임베드 우측상단에 나오는 사진
                    .addFields({ name: `온도 : ${json['temp']}`, value: `마지막 업데이트 : ${json['time']}` }) // 모름
                    .setTimestamp() // 매세지를 보낸시간을 표시함

                msg.edit({ embeds: [embed], content: " " }) // 처음에 보낸 메세지를 임베드로 수정함
            } else { //json.result가 true아니라면
                return message.channel.send({ content: "API가 원활하지않음" }); //리턴하고 메세지를 보냄
            }
        })
    }
}
const { MessageEmbed } = require('discord.js') //discord.js 모듈에서 임베드를 가져온다

module.exports = {
    name: "접속기기", //명령어읾
    execute(message) { //index.js 에서 message값을 가져옴
        let devices = [] //배열 생성
        const user = message.mentions.members.first() || message.member; //user값을 멘션한 유저 , 멘션한 유저가 없다면 메세지를 보낸 유저로 지정
        if (!user.presence) return message.reply("유저가 오프라인입니다.") //user의 존재(?)가 없다면 리턴하고 "유저가 오프라인입니다." 라고 보냄
        let status = user.presence.clientStatus // status값을 유저의 접속장치로 지정

        if (status.desktop) { //유저의 접속장치가 컴퓨터라면 ?
            devices.push("컴퓨터") //6번줄에서 생성한 배열에 "컴퓨터를" 쑤셔넣음
        }

        if (status.mobile) { //유저의 접속장치가 모바일이라면 ?
            devices.push("모바일") //6번줄에서 생성한 배열에 "모바일" 쑤셔넣음
        }

        if (status.web) { //유저의 접속장치가 웹이라면 ?
            devices.push("웹") //6번줄에서 생성한 배열에 "웹" 쑤셔넣음
        }

        devices = devices.join(', ') //위에 과정이 완료되면 devices값은 예시로 "[ '컴퓨터', '웹' ]" 이렇게 될것이다 이것을 "컴퓨터 , 웹" 처럼 바꿔줌

        const embed = new MessageEmbed() //임베드를 생성
            .setTitle(`${user.tag || user.user.tag}`) //임베드 제목을 유저의 닉네임,태그로 설정
            .setDescription(`[ ${devices} ]`) // 임베드 설명을 23라인에서 변환시킨 접속장치값으로 설정
            .setColor("RANDOM") // 임베드 색깔을 랜덤으로 설정
            .setTimestamp() // 임베드 하단에 임베드를 보낸 시간을 표시하게 설정

        message.channel.send({ embeds: [embed] }) //유저가 명령어를 사용한 채널에 25라인에서 생성한 임베드를 보냄
    }
}
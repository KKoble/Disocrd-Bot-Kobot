const ytsearch = require('yt-search') // yt-search모듈을 불러온다 (유튜브 검색 모듈)
const comma = require('comma-number') // comma-number모듈을 불러온다 (예를 들어1000을 1,000 으로 만들어주는 모듈)
const { MessageEmbed } = require('discord.js') // discord.js모듈에서 MessageEmbed를 불러온다

module.exports = {
    name: "유튜브검색", // 명령어이름
    async execute(message, args) { // index에서 message와 args값을 받아온다
        const argsjoin = args.join(" ") // 접두사 + 명령어 다음에 오는 메세지들을 가져옴
        if (!argsjoin) return message.reply("검색하실 내용을 입력해주세요") // 접두사 + 명령어 다음에 오는 메세지가 없다면 리턴
        const msg = await message.channel.send({ content: "검색중 . . ." }) // 나중에 수정될 메세지
        let search = await ytsearch(argsjoin) // 유튜브에서 영상을 검색
        let video = search.videos[0] // 검색한 영상중 첫번째 영상을 video로 지정
        if (!video) return message.reply("검색 결과가 없습니다.") //검색한 영상중에 첫번째 영상이 존재하지 않는다면 리턴

        const { views, title, timestamp, url, author, ago, image } = video // 영상의 정보
        const embed = new MessageEmbed() // 임베드를 만듬
            .setTitle(`${argsjoin}에 대한 검색결과입니다`) // 임베드 제목 
            .setImage(image) // 임베드에 들어갈 사진(썸네일)
            .addFields(
                { name: "제목", value: `${title}`, inline: true },
                { name: "링크", value: `[링크](${url})`, inline: true },
                { name: "채널주인", value: `[${author.name}](${author.url})`, inline: true },
                { name: "영상 생성일", value: `${ago}`, inline: true },
                { name: "영상길이", value: `${timestamp}`, inline: true },
                { name: "조회수", value: `${comma(views)}회`, inline: true }
            )
            .setColor("RANDOM") // 임베드색갈을 랜덤으로 지정
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL()) // 임베드 하단에 나오는 작은 메세지와 사진을 메세지를 보낸 유저의 닉네임과 프사로 지정 

        msg.edit({ embeds: [embed], content: " " }) // 10라인에서 보낸 메세지를 임베드로 수정함
    }
}

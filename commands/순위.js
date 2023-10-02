const Schema = require("../models/도박") //models
const client = require("../index") // index에서 client 값을 가져옴
const comma = require("comma-number") // ex ) 1000을 1,000원으로 바꿔주는 모듈

module.exports = {
    name: "도박순위",
    execute(message) {
        Schema.find() // models에 있는 데이터베이스를 모두 불러옴
            .sort([["money", "descending"]]) // money값을 내림차순으로 정렬
            .limit(10) // 최대 10개까지만 가져오게 설정
            .exec((error, res) => { // 내림차순으로 정렬한 정보를 res로 추출
                const embed = new (require("discord.js")).MessageEmbed() // 임베드 생성
                    .setTitle("도박 순위표") // 제목
                    .setColor("BLUE") // 색깔
                    .setTimestamp() // 임베드가 생성된 시간 표시

                for (let i = 0; i < res.length; i++) { // i를 0으로 설정 , res.length( 전체 res 개수) 보다 작으면 계속 실행 , 실행할때마다 i에 1을 더함
                    let searchuser = client.users.cache.get(res[i].userid) // 데이터베이스에 저장된 userid로 유저를 검색함
                    const user = searchuser || "Delete User" // user을 위에서 찾은 유저로 저장 || 유저를 못찾았다면 Delete User로 지정
                    embed.addField(`${i + 1}. ${user.tag || user}`, `${comma(res[i].money)}원`) //몰라요
                }
                message.channel.send({ embeds: [embed] }) // 채널에 임베드를 전송
            })
    }
}
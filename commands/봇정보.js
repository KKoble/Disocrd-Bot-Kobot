const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "봇정보",
  description: "코봇 봇정보",
  async execute(message) {
    try {
      const { client } = message; // message에서 client 객체를 가져옵니다.

      const serverCount = client.guilds.cache.size;
      let memberCount = 0;

      client.guilds.cache.forEach((guild) => {
        memberCount += guild.memberCount;
      });

      const botCreatedAt = client.user ? client.user.createdAt : null;

      // 봇이 만들어진 날짜를 한국어로 표시
      const botCreatedAtText = botCreatedAt
        ? botCreatedAt.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
        : '봇 정보를 가져올 수 없음';

      const botAvatarURL = client.user ? client.user.displayAvatarURL() : '';

      const ping = message.client.ws.ping;

      const command = (26)

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('서버 정보')
        .addField('이용중인 서버 수', serverCount.toString(), true)
        .addField('이용중인 이용자 수', memberCount.toString(), true)
        .addField('봇이 만들어진 날짜', botCreatedAtText || '날짜 정보 없음', true)
        .addField('핑', ping.toString(), true)
        .addField('명령어', command.toString(), true)
        .setThumbnail(botAvatarURL || '봇 아바타 없음'); // 봇 아바타 정보가 없으면 '봇 아바타 없음'을 사용

      // 메시지로 인베드(embed) 보내기
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};

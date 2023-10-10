const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "정보",
  description:"코봇 정보 <멘션>",
  execute(message) {
    // 멘션된 사용자 가져오기 (첫 번째 멘션만 사용)
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply('멘션된 사용자가 없습니다.');
    }

    // 사용자의 봇 여부 확인
    const isBot = user.bot ? '봇' : '봇 아님';

    // 사용자 계정 생성 날짜 (한국어로 표시)
    const creationDate = user.createdAt.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // 사용자 아이디
    const userId = `${user.id}`;

    // 사용자명 (닉네임)
    const username = `${user.username}`;

    // 사용자 계정 생성 날짜
    const userCreationDate = `${creationDate}`;

    // 사용자 뱃지 정보 가져오기
    const badges = user.flags.toArray();

    // 사용자 프로필 사진 URL
    const avatarURL = user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 });

    // 인베드(embed) 생성
    const embed = new MessageEmbed()
    .setTitle(`${user.username}님의 정보`) // 사용자명을 제목으로 사용
    .addField('유저명', username) // 사용자명을 추가
    .addField('아이디', userId)
    .addField('계정 생성 날짜', userCreationDate)
    .addField('봇여부', isBot)
    .addField('뱃지', badges.join(', ') || '뱃지 없음') // 뱃지 정보 추가, 뱃지가 없을 경우 '뱃지 없음'을 표시
    .setColor('#0099ff')
    .setThumbnail(avatarURL); // 프로필 사진 추가

    // 메시지에 인베드(embed) 보내기
    message.channel.send({ embeds: [embed] });
  }
};
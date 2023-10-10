const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "서버정보",
  description: "코봇 서버정보",
  execute(message) {
    const guild = message.guild;
    const serverName = guild.name || '서버 이름이 없음';
    const memberCount = guild.memberCount || '인원 수를 가져올 수 없음';

    // 서버 생성 날짜를 한국어로 표시하기 위해 날짜 형식을 설정
    const creationDate = guild.createdAt ? new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(guild.createdAt) : '날짜를 가져올 수 없음';

    const guildOwner = guild.owner ? guild.owner.user.tag : '반장을 찾을 수 없음';

    // 필드 값이 비어 있거나 null인 경우, 빈 문자열로 대체
    const validatedServerName = serverName.toString() || '서버 이름이 없음';
    const validatedMemberCount = memberCount.toString() || '인원 수를 가져올 수 없음';
    const validatedCreationDate = creationDate.toString() || '날짜를 가져올 수 없음';

    // 서버 아이콘 URL 가져오기
    const serverIconURL = guild.iconURL({ dynamic: true, format: 'png', size: 2048 }) || '';

    // 인베드(embed) 생성
    const embed = new MessageEmbed()
      .setTitle('서버 정보')
      .addField('서버 이름', validatedServerName, true)
      .addField('인원 수', validatedMemberCount, true)
      .addField('만들어진 날짜', validatedCreationDate, true)
      .setColor('#0099ff')
      .setThumbnail(serverIconURL) // 아이콘을 썸네일로 추가
      .setImage(serverIconURL); // 아이콘을 이미지로 추가

    // 메시지에 인베드(embed) 보내기
    message.channel.send({ embeds: [embed] });
  }
};

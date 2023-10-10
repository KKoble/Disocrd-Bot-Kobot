const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "공지",
  description:"코봇 공지 <채널ID> <제목> <내용>",
  execute(message, args) {
    const channelId = args.shift(); // 채널 ID를 가져옵니다.
    const title = args.shift(); // 제목을 가져옵니다.
    const content = args.join(' '); // 내용을 가져옵니다.

    const channel = message.guild.channels.cache.get(channelId); // 채널을 가져옵니다.

    if (!channel) {
      message.channel.send('채널을 찾을 수 없습니다.');
      return;
    }

    // 인배드(embed)를 생성합니다.
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(content)
      .setColor('#0099ff'); // 하늘색으로 변경, 색상 코드를 원하는 색상으로 바꿀 수 있습니다.

    // 서버 아이콘을 추가합니다.
    const guildIconUrl = message.guild.iconURL({ dynamic: true });
    if (guildIconUrl) {
      embed.setThumbnail(guildIconUrl);
    }

    // 메시지를 보내고 성공 또는 실패를 답장합니다.
    channel.send({ embeds: [embed] })
      .then(() => {
        message.channel.send('메세지를 보내기 성공.');
      })
      .catch((error) => {
        console.error('메시지 전송 중 오류 발생:', error);
        message.channel.send('메시지 전송에 실패했습니다.');
      });
  }
};

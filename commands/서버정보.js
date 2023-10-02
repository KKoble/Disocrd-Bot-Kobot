const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "봇정보",
    execute(message) {
        let serverCount = message.client.guilds.cache.size;
        let memberCount = 0;

        message.client.guilds.cache.forEach((guild) => {
            memberCount += guild.memberCount;
        });

        message.channel.send(`봇이 들어가 있는 서버 수: ${serverCount}개\n봇이 들어가 있는 모든 서버의 총 멤버 수: ${memberCount}명`);
    }
};

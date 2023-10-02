const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "핑",
    execute(message, args) {
        // 봇의 핑(응답 시간)을 가져옵니다.
        const ping = message.client.ws.ping;

        // 핑을 메시지로 응답합니다.
        message.reply(`퐁🏓! 현재 봇 응답속도는 ${ping}ms 입니다.`);
    }
};

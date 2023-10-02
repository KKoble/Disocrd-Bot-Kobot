const { Permissions } = require("discord.js");
const Schema = require("../models/뮤트");

module.exports = {
    name: "뮤트역할생성",
    async execute(message) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            return message.reply("**오류 ) 뮤트역할을 설정하기에 권한이 부족합니다 \n필요한 권한 : 채널관리 , 역할관리**");
        }

        const roles = await Schema.findOne({ serverid: message.guild.id });
        if (roles) {
            let role = message.guild.roles.cache.find(x => x.id == `${roles.roleid}`);
            if (role) return message.reply("**이미 뮤트역할이 존재합니다\n역할을 삭제해주시고 다시 명령어를 입력해주세요**");
        }

        const role = await message.guild.roles.create({ name: "Muted", reason: `${message.author.tag}님의 의해 뮤트역할 생성`, color: "BLUE" });

        // Use a for...of loop to handle asynchronous operations sequentially
        for (const [_, channel] of message.guild.channels.cache) {
            try {
                await channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false, SPEAK: false });
            } catch (error) {
                console.error(`Error editing permissions for channel ${channel.name}: ${error}`);
            }
        }

        if (roles) {
            await Schema.findOneAndUpdate({ serverid: message.guild.id }, {
                roleid: role.id,
                serverid: message.guild.id
            });
        } else {
            const newData = new Schema({
                roleid: role.id,
                serverid: message.guild.id
            });
            newData.save();
        }
        message.channel.send("뮤트 역할 생성을 완료했습니다");
    }
};

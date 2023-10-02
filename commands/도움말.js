const { readdirSync } = require("fs")
const path = require("path")
const config = require("../config.json")

module.exports = {
    name: "명령어",
    async execute(message) {
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`명령어 목록 | 접두사 : ${config.prefix}`)
            .setColor("BLUE")
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
        const commands = readdirSync(path.resolve(__dirname, `../commands/`)).filter(file => file.endsWith(".js"))
        for (const file of commands) {
            const command = require(`../commands/${file}`)
            embed.addFields({ name: `${command.name}`, value: `설명 : ${command.description || "없음"}`, inline: true })
        }
        const menu = new (require("discord.js")).MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("옵션을 선택해 주세요")
            .addOptions([
                { label: "일반 명령어", description: `${config.prefix}를(을) 앞에 붙여서 사용하는 명령어`, value: "일반 명령어" },
            ])
        const components = new (require("discord.js")).MessageActionRow().addComponents(menu)
        await message.channel.send({ content: "**아래 옵션을 선택해 주세요**", components: [components] })
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            max: 1
        })
        collector.on("collect", collected => {
            const value = collected.values [0]
            if (collected.member.id !== message.author.id) return
            if (value == "일반 명령어"){
            return collected.update({ content:" ", embeds:[embed], components: [] })
            }
        })
    }
}
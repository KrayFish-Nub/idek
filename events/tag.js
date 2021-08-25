module.exports = (client, message, arguments) => {
    client.on('messageCreate', async message => {
        const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`);
        client.config = require("../config.json");

        if (!message.guild || message.author.bot) return;
        const { Client, Message, MessageEmbed } = require("discord.js");

        const p = await client.config.prefix

        if (message.content.match(mentionRegex)) {
            const prefix1 = new MessageEmbed()
                .setTitle(`My prefix on this guild is \`\`\`${p}\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .addField(`Starter Command: `, `\`${p}help\``)
                .setTimestamp()
                .setColor('#5539cc')
            return message.reply({ embeds: [prefix1] }).then((s) => {
                prefix1.delete({ timeout: 7000 })
            }).catch(() => { })
        }
    })
}
module.exports = (client, message, arguments) => {
    client.on('messageCreate', async message => {
        const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
        client.config = require("../config.json");
        if (!message.guild || message.author.bot) return;
        const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
        if (message.content.match(mentionRegex)) {
            const letEmKnow = new MessageEmbed()
                .addFields(
                    {
                        name: 'View my Commands', value: '➜ `/help`', inline: true
                    },
                    {
                        name: 'Made by', value: `➜ <@749290595645653114>`, inline: true
                    },
                    {
                        name: 'Got a Suggestion?', value: `➜ \`/suggest\``, inline: true
                    }
                )
                .setImage('https://cdn.discordapp.com/attachments/872924441275953162/884894768788832367/bp2.png')
                .setColor(client.config.color)
            const serverBtn = new MessageButton()
                .setLabel('Support Server')
                .setURL('https://discord.com/invite/Ec96E9XjH6')
                .setStyle('LINK')
                .setEmoji('863637932522340393')
            const botBtn = new MessageButton()
                .setLabel('Bot Invite')
                .setURL('https://discord.com/oauth2/authorize?client_id=863270412997230603&permissions=8&scope=bot%20applications.commands')
                .setStyle('LINK')
                .setEmoji('884884132914692146')
            const webBtn = new MessageButton()
                .setLabel('Website')
                .setURL('https://discord.com')
                .setDisabled(true)
                .setStyle('LINK')
                .setEmoji('863637932224282674')
            const btnRow = new MessageActionRow()
                .addComponents(serverBtn, botBtn, webBtn)
            message.channel.send({ embeds: [letEmKnow], components: [btnRow] })
        }
    })
}
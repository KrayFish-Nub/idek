const { Message, webhookClient, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const colors = require("colors")

module.exports = {
    name: "web",

    run: async (client, message, args) => {
        const owner = ["749290595645653114", "873881757064261672"]
        const channel = client.channels.cache.get('863266611351126016');
        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setFooter(`Made with 💖 by George`)
            .setThumbnail('https://cdn.discordapp.com/attachments/872924441275953162/875835906819502100/standard_3.gif')
            .addFields(
                {
                    name: 'Beta Build Name', value: '<@873799999769681971>', inline: true
                },
                {
                    name: 'How to use it?', value: 'Click this [Link](https://discord.com/oauth2/authorize?client_id=873799999769681971&permissions=261993005047&scope=applications.commands%20bot)'
                },
                {
                    name: 'Whats new?', value: 'Everything is in Slash Commands \nClick this [Link for more](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) information about slash commands', inline: true
                }
            ).setImage('https://media.discordapp.net/attachments/872924441275953162/884894768788832367/bp2.png')
        const embed2 = new MessageEmbed()
            .setTitle('Hotfix').setColor(client.config.color)
            .setDescription('Fixed bug: __Fixed lag on music__')
        try {
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();


            await webhook.editMessage('887034038383157278', {
                username: `${message.guild.name}`,
                avatarURL: 'https://cdn.discordapp.com/attachments/872924441275953162/875835906819502100/standard_3.gif',
                embeds: [embed2]
            });
        } catch (error) {
            console.error('Error trying to send a message:'.bgRed, error);
        }
    }
}
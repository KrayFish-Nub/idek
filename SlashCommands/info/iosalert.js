const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'iosalert',
    description: 'Get iOS Alert',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Type the message',
            name: 'message',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const text = args.join(" ")
        if (!text) return message.channel.send('Please specify a alert.')

        let final = "https://api.popcatdev.repl.co/alert?text=" + encodeURIComponent(text)

        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setImage(final)
            
        return interaction.followUp({ embeds: [embed] });

    }
}
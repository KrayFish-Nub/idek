const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
// https://api.popcatdev.repl.co/mnm?image=
module.exports = {
    name: 'iosalert',
    description: 'Get iOS Alert',
    permission: ['SEND_MESSAGES'],
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
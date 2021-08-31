const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nuke a channel',
    permission: ['ADMINISTRATOR'],
    botPermission: ["ADMINISTRATOR"],

    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const nukeEmbed = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription('This channel got nuked!').setColor(client.config.color)
            .setImage('https://media.discordapp.net/attachments/872924441275953162/881344599191326720/fedisbomb-explode.gif')

        interaction.channel.clone().then(channel => {
            channel.setPosition(interaction.channel)
            channel.send({ embeds: [nukeEmbed] })
        })
        interaction.channel.delete()

    }
}
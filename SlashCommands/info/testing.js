const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'hmmmmmm',
    permission: ['SEND_MESSAGES'],
    botPermission: ["ATTACH_FILES", "SEND_MESSAGES", "VIEW_CHANNEL"],
    ownerOnly: true,

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        interaction.guild.channels.create('Statistics', {
            type: 'GUILD_CATEGORY'
        }).then(channel =>
            channel.setPosition(0)
        )
    }
}
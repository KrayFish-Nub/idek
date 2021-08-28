const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'for bot devs',
    permission: ['SEND_MESSAGES'],
    ownerOnly: true,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let [, emoji] = args;
        if (!emoji) return interaction.followUp({ content: `and ` });
        
        interaction.followUp({ content: `${emoji}` });
    }
}
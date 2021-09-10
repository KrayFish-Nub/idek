const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const distube = require('distube') 
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
    run: async (client, interaction, args, message) => {
        distube.play(message, args.join(" "));

    }
}
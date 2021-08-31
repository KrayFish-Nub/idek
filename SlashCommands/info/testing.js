const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'hmmmmmm',
    permission: ['SEND_MESSAGES'],
    botPermission: ["ATTACH_FILES", "SEND_MESSAGES", "VIEW_CHANNEL"],
    ownerOnly: true,
    options: [
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'set the channel dummy',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const emoji = args[0];
        const emojiZero = await interaction.guild.emopjis.cache.get(emoji)
        console.log(emojiZero)
    }
}
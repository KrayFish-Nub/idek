const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'delete x amount of messages',
    permission: ['MANAGE_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            name: 'amount',
            type: 'STRING',
            description: 'Number of messages to delete (2-99)',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let amount = args[0]
        if (amount >= 100) {
            interaction.followUp({ content: `I can clear up to \`100\` messages`})
        } 
        if (amount <= 100) {
            interaction.channel.bulkDelete(amount, true)
            interaction.channel.send({
                content: `I've cleared \`${amount}\` messages :broom:`
            })
        }
    }
}
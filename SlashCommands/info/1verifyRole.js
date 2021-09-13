const { Client, Util, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Schema = require('../../models/verifyRoles')
module.exports = {
    name: 'verifyrole',
    description: 'Create a verification system',
    permission: ['ADMINISTRATOR'],
    BotPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        {
            name: 'message',
            type: 'STRING',
            description: 'Set the message for the verification system',
            required: true
        },
        {
            name: 'role',
            type: 'ROLE',
            description: 'Select the role',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const messageLine = args[0]
        const reactionRole = args[1]
        const roleCheck = interaction.guild.roles.cache.get(reactionRole)
        const verifyEmbed = new MessageEmbed()
            .setColor(client.config.color).setTitle(interaction.guild.name)
            .setDescription(`${messageLine}`)
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            await new Schema({
                Guild: interaction.guild.id,
                Role: roleCheck.id,
            }).save();
            const btn = new MessageButton()
                .setCustomId("btnRole")
                .setLabel("Verify")
                .setStyle("PRIMARY")
            const btnRow = new MessageActionRow()
                .addComponents(btn)
            interaction.channel.bulkDelete(1, true)
            interaction.channel.send({ embeds: [verifyEmbed], components: [btnRow] })
        })
    }
}
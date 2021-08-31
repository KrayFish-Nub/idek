const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Schema = require('../../models/verifyRoles')

module.exports = {
    name: 'delete-verifyrole',
    description: 'Delete the verify system for this server',
    permission: ['ADMINISTRATOR'],
    botPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                interaction.followUp({ content: `Verify role does **not** exist !` });
            } else {
                await Schema.findOneAndDelete({ Guild: interaction.guild.id })
                interaction.followUp({ content: `Verify role has been **deleted** !` });
            }
        })
    }
}
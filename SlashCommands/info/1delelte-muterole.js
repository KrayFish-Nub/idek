const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const roleSchema = require('../../models/autorole')

module.exports = {
    name: 'delete-muterole',
    description: 'Reset the muterole system for this server',
    permission: ['ADMINISTRATOR'],
    botPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        roleSchema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                interaction.followUp({ content: `Mute role does **not** exist !` });
            } else {
                await roleSchema.findOneAndDelete({ Guild: interaction.guild.id })
                interaction.followUp({ content: `Mute role has been **deleted** !` });
            }
        })
    }
}
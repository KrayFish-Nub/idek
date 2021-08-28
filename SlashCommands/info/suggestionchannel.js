const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const sugSchema = require('../../models/suggestions')

module.exports = {
    name: 'set-suggestions',
    description: 'Set the suggestion channel!',
    permission: ['ADMINISTRATOR'],
    ownerOnly: true,
    options: [
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'Select the suggestion channel',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const channel = interaction.guild.channels.cache.get(channel => channel.name === args)
        sugSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new sugSchema({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                }).save();
            }
            interaction.followUp({ content: `<#${channel}> has been set as the suggestion channel!` })
        })
    }
}
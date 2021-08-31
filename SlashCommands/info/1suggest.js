const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const sugSchema = require('../../models/suggestions')
module.exports = {
    name: 'set-suggestions',
    description: 'Set the suggestion channel',
    permission: ['ADMINISTRATOR'],
    botPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
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
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const channel = args[0];
        const channelToFind = await interaction.guild.channels.cache.get(channel)
        sugSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channelToFind.id;
                data.save();
            } else {
                new sugSchema({
                    Guild: interaction.guild.id,
                    Channel: channelToFind.id,
                }).save();
            }
            interaction.followUp(`${channel} has been set as the suggestion channel!`)
        })
    }
}
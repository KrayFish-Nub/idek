const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Schema = require('../../models/welcomeCh')
module.exports = {
    name: 'set-welcome',
    description: 'Welcome Channel',
    permission: ['ADMINISTRATOR'],
    BotPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'Channel for welcoming',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const chName = args[0]
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = chName;
                data.save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: chName,
                }).save();
            }
            interaction.followUp(`〢Welcome Channel ➜ <#${chName}>`)
        })
    }
}
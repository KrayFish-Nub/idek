const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment, CommandInteraction } = require("discord.js");
const Schema = require('../../models/supportRole')
module.exports = {
    name: 'set-tickets',
    description: 'Send ticket command',
    permission: ['ADMINISTRATOR'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'ROLE',
            description: 'Select your ticket support',
            name: 'support',
            required: true,
        },
        {
            type: 'STRING',
            description: 'Paste the link for your server banner',
            name: 'image',
            required: false,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const role = interaction.guild.roles.cache.get(args[0])
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            new Schema({
                Guild: interaction.guild.id,
                Role: role.id,
            }).save();
        })
        const ticketStart = new MessageEmbed()
            .setTitle("`Create a ticket`").setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription("> Press the button bellow to create a ticket")
            .setFooter(interaction.guild.name, interaction.guild.iconURL()).setColor(client.config.color)
            .setImage(args[1])
        const ticketBtn = new MessageButton()
            .setCustomId("ticket")
            .setEmoji("863637932689457153")
            .setLabel("Ticket")
            .setStyle('SECONDARY')
        const row = new MessageActionRow()
            .addComponents(ticketBtn)
        interaction.channel.bulkDelete(1, true)
        interaction.channel.send({ embeds: [ticketStart], components: [row] });
    }
}
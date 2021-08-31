const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'set-tickets',
    description: 'Send ticket command',
    permission: ['ADMINISTRATOR'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Paste the link for your server banner',
            name: 'custom_image',
            required: false,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {

        const ticketstart = new MessageEmbed()
            .setTitle("`Create a ticket`").setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription("```Select the category you need help with\n```")
            .setFooter(interaction.guild.name, interaction.guild.iconURL()).setColor(client.config.color)
            .setImage(args.join(' '))

        const support = new MessageButton()
            .setCustomId("support")
            .setEmoji("877235024263524382")
            .setLabel("〢Support Ticket")
            .setStyle('PRIMARY')

        const contact = new MessageButton()
            .setCustomId("contact")
            .setEmoji("877913018430783619")
            .setLabel("〢Contact Staff")
            .setStyle('PRIMARY')

        const partners = new MessageButton()
            .setCustomId("partner")
            .setEmoji("879111663176020008")
            .setLabel("〢Partnership")
            .setStyle('PRIMARY')

        const row = new MessageActionRow()
            .addComponents(support, contact, partners)

        interaction.channel.bulkDelete(1, true)

        interaction.channel.send({ embeds: [ticketstart], components: [row] });
    }
}
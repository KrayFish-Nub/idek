const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'delete',
    description: 'Are you sure u want to delete this trash',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Mention a trash bag',
            name: 'user',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const avatarURL = member.user.avatarURL({ dynamic: true, format: "png", })

        let final = "https://luminabot.xyz/api/image/delete?image=" + avatarURL

        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setImage(final)

        return interaction.followUp({ embeds: [embed] });

    }
}
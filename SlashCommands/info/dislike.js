const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'dislike',
    description: 'Everyone disliked that...',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Disliked',
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

        let final = "https://luminabot.xyz/api/image/dislike?image=" + avatarURL

        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setImage(final)

        return interaction.followUp({ embeds: [embed] });

    }
}
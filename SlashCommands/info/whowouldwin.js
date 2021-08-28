const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'whowouldwin',
    description: 'Who would win?',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'mention the user stupid',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const av1 = interaction.user.avatarURL({ format: "png" })
        const av2 = user.user.displayAvatarURL({ format: "png" })
        const img = `https://api.popcat.xyz/whowouldwin?image1=${encodeURIComponent(av1)}&image2=${encodeURIComponent(av2)}`
        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setImage(img)
        interaction.followUp({ embeds: [embed] });
    }
}
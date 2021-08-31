const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'gunpoint',
    description: 'GUN POINT A BITCH',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTACH_FILES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const av = user.user.displayAvatarURL({ dynamic: false, size: 4096, format: "png" })
        let em = new MessageEmbed()
            .setImage(`https://api.popcat.xyz/gun?image=${av}`)
            .setColor(client.config.color)
        interaction.followUp({ embeds: [em] });
    }
}
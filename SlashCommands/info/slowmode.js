const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'Set a slowmode in a channel',
    permission: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    options: [
        {
            name: 'time',
            type: 'STRING',
            description: 'time is set in seconds',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let channel = interaction.channel;
        const vc1 = args.join(" ");
        const member = interaction.member;
        channel.setRateLimitPerUser(vc1, `Responsible - ${member}`);
        const slowEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.config.color)
            .setDescription(`**Slowmode is now set to :** \n${vc1} seconds`)
            .setFooter(`Use /slowmodeoff to turn it off`)
        interaction.followUp({ embeds: [slowEmbed] })
    }
}
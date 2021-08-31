const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'slowmodeoff',
    description: 'Turn off slowmode',
    permission: ['MANAGE_CHANNELS'],
    botPermission: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let channel = interaction.channel;
        const vc1 = 0;
        const member = interaction.member;
        channel.setRateLimitPerUser(vc1, `Responsible - ${member}`);
        const resetEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.config.color)
            .setDescription(`Slowmode turned off`)
        interaction.followUp({ embeds: [resetEmbed] })
    }
}
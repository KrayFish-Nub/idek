const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment, Integration, Role } = require('discord.js');

module.exports = {
    name: 'lockdown',
    description: 'Lock a channel',
    permission: ['MANAGE_CHANNELS'],
    botPermission: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    options: [
        {
            name: 'reason',
            type: 'STRING',
            description: 'Reason for lockdown',
            required: false          
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        let reason = args[0] || `No reason given`
        const role = interaction.guild.roles.everyone
        const lockdownTrue = new MessageEmbed()
            .setTitle('Channel Successfuly Locked')
            .setDescription(`${reason}`).setColor(client.config.color)
            .addFields(
                { name: `Channel Locked :`, value: `<#${interaction.channel.id}>`, inline: true },
                { name: `Locked By :`, value: `<@${interaction.user.id}>`, inline: true }
            ).setFooter(`Use /lockdownoff to let members send messages again`)
        interaction.channel.permissionOverwrites.edit(role.id, { SEND_MESSAGES: false });
        interaction.followUp({
            embeds: [lockdownTrue]
        })
    }
}

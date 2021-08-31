const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment, Integration, Role } = require('discord.js');

module.exports = {
    name: 'lockdownoff',
    description: 'Unlock a channel',
    permission: ['MANAGE_CHANNELS'],
    botPermission: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const role = interaction.guild.roles.everyone
        const lockdownTrue = new MessageEmbed()
            .setTitle('Channel Successfuly Unlocked')
            .addFields(
                { name: `Channel Unlocked :`, value: `<#${interaction.channel.id}>`, inline: true },
                { name: `Unlocked By :`, value: `<@${interaction.user.id}>`, inline: true }
            ).setColor(client.config.color)
        interaction.channel.permissionOverwrites.edit(role.id, { SEND_MESSAGES: true });
        interaction.followUp({
            embeds: [lockdownTrue]
        })
    }
}

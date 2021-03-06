const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member duh',
    permission: ['KICK_MEMBERS'],
    botPermission: ["KICK_MEMBERS"],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'kick who?',
            required: true          
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const user = interaction.guild.members.cache.get(args[0])
        if(user.roles.highest. position >= interaction.member.roles.highest.position) return interaction.followUp({ content: 'He has a higher role than you'})
        interaction.guild.members.kick(user);
 

        const kickEmbed = new MessageEmbed()
            .setColor(client.config.color)
            .addFields(
                {
                    name: `Just Kicked :`, value: `<@${user.id}>`, inline: true
                },
                {
                    name: `Requested By :`, value: `<@${interaction.user.id}>`, inline: true
                }
            ).setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setTimestamp()
        interaction.followUp({ embeds: [kickEmbed] });
    }
}
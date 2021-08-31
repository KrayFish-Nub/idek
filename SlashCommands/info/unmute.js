const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const muteSchema = require('../../models/muterole')
module.exports = {
    name: 'unmute',
    description: 'unmute a member',
    permission: ['MANAGE_ROLES'],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'mention the user u want to unmute',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0])

        if (member.id === interaction.user.id) {
            return interaction.followUp({ content: `Are you dumb? you can't unmute yourself` });
        }


        muteSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) return;
            if (data) {
                const role = interaction.guild.roles.cache.find(role => role.id == data.Role);
                if (!role) {
                    return data.delete()
                }
                if (!role.id) {
                    return interaction.followUp({ content: `Please use \`/set-muterole\` and rerun the command` })
                }
                await member.roles.remove(role.id);
            }
        });
        const mute = new MessageEmbed()
            .setTitle('<a:tick:866661296007151626>  Mute Removed').setColor(client.config.color)
            .addFields(
                { name: `Unmuted :`, value: `<@${member.id}>`, inline: true },
            )
            .setTimestamp()
            .setFooter(interaction.user.username,
                interaction.user.displayAvatarURL({ dynamic: true }))
        await interaction.followUp({ embeds: [mute] });
    }
}
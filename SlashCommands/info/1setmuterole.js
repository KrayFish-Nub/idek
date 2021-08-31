const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const muteSchema = require('../../models/muterole')
module.exports = {
    name: 'set-muterole',
    description: 'Set the mute role',
    permission: ['ADMINISTRATOR'],
    botPermission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        {
            name: 'role',
            type: 'ROLE',
            description: 'select the role',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const role = args[0]
        const roleCheck = interaction.guild.roles.cache.get(role)
        muteSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err
            if (data) {
                interaction.followUp({content: `Reset the mute role by using \`/delete-muterole\` and rerun this command! `})
            } else {
                new muteSchema({
                    Guild: interaction.guild.id,
                    Role: roleCheck.id,
                }).save();
            }
            interaction.followUp({ content: `Mute role has been set` });
        })
    }
}
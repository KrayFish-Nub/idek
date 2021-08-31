const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const roleSchema = require('../../models/autorole')
module.exports = {
    name: 'set-autorole',
    description: 'Give a role to a person who joins',
    permission: ['ADMINITRATOR'],
    botPermission: ['ADMINITRATOR'],
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
        roleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err
            if (data) {
                interaction.followUp({content: `Reset the auto role by using \`/delete-autorole\` and rerun this command! `})
            } else {
                new roleSchema({
                    Guild: interaction.guild.id,
                    Role: roleCheck.id,
                }).save();
            }
            interaction.followUp({ content: `Auto role enabled` });
        })
    }
}
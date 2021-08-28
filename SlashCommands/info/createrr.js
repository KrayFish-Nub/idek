const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'createreactionroles',
    description: 'Create reaction role !',
    permission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        {
            name: 'emoji',
            type: 'STRING',
            description: 'Enter emoji so the members can react',
            required: true
        },
        {
            name: 'role',
            type: 'ROLE',
            description: 'Enter the role you want to give them',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const emoji = args[0]
        const role = interaction.guild.roles.cache.get(args[1])

        interaction.followUp({ content: `${emoji} ${role}` });
    }
}
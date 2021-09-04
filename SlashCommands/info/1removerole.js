const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'removerole',
    description: 'Remove a role from a user',
    permission: ['ADMINISTRATOR'],
    BotPermission: ['MANAGE_ROLES'],
    ownerOnly: false,
    options: [
        {
            name: 'role',
            type: 'ROLE',
            description: 'The role u want to give',
            required: true
        },
        {
            name: 'user',
            type: 'USER',
            description: 'The user u want to give the role to',
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
        const user = interaction.guild.members.cache.get(args[1])
        if (user.id === interaction.user.id) {
            return interaction.followUp({ content: `Are you dumb? you can't remove roles from yourself` });
        }
        if (user.id === client.user.id) {
            return interaction.followUp({ content: `Uh... I can't remove my own roles` });
        }
        const roleFind = interaction.guild.roles.cache.get(role)
        if (!roleFind) return interaction.reply({ content: `Role not found` })
        if (!user) return interaction.reply({ content: `User not found` })
        const giveEmbed = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setColor(client.config.color)
            .addFields(
                { name: `Role :`, value: `${roleFind}`, inline: true },
                { name: `Removed from :`, value: `<@${user.id}>`, inline: true }
            )
        await user.roles.remove(roleFind.id);
        interaction.followUp({ embeds: [giveEmbed] });
    }
}
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add a role to a user!',
    permission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        {
            type: 'ROLE',
            description: 'Mention a role',
            name: 'role',
            required: true,
        },
        {
            type: 'USER',
            description: 'Mention the user you want to give the role',
            name: 'user',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const role = interaction.guild.roles.cache.find(args[0]);

        await member.roles.add(role)
        var addRole = new MessageEmbed()
            .setColor(client.config.color)
            .setTitle("Role Added").setTimestamp()
            .addFields(
                { name: 'Role :', value: `${role}`, inline: true },
                { name: 'Member :', value: `${member}`, inline: true })
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
        interaction.followUp({ embeds: [addRole] });
    }
}
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'idban',
    description: 'ban user thats not in the server',
    permission: ['BAN_MEMBERS'],
    ownerOnly: false,
    options: [
        {
            name: 'user_id',
            type: 'STRING',
            description: 'give users id dumbass',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let userId = args[0]

        if (userId === interaction.user.id) return interaction.reply({
            content: `Are you dumb fam? You cam't ban your self...`, ephemeral: true
        })
        if (userId == client.user.id) return interaction.reply({
            content: `Did you just try to ban me with my own command...`, ephemeral: true
        })

        client.users.fetch(userId).then(async (user) => {
            await interaction.guild.members.ban(user.id)
            const banEmbed = new MessageEmbed()
                .setColor(client.config.color).setTimestamp()
                .addFields(
                    {
                        name: `Just Banned :`, value: `<@${userId}>`, inline: true
                    },
                    {
                        name: `Requested By :`, value: `<@${interaction.user.id}>`, inline: true
                    }
                ).setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            interaction.followUp({ embeds: [banEmbed] });
        })
    }
}
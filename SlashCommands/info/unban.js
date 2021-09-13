const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a member duh',
    permission: ['BAN_MEMBERS'],
    botPermission: ["BAN_MEMBERS", "VIEW_CHANNEL", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            name: 'user_id',
            type: 'STRING',
            description: 'give users id dumb ass',
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

        client.users.fetch(userId).then(async (user) => {
            await interaction.guild.members.unban(user.id)
            const banEmbed = new MessageEmbed()
                .setColor(client.config.color).setTimestamp()
                .addFields(
                    {
                        name: `Just Unbanned :`, value: `<@${userId}>`, inline: true
                    },
                    {
                        name: `Requested By :`, value: `<@${interaction.user.id}>`, inline: true
                    }
                ).setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))

            interaction.followUp({ embeds: [banEmbed] });
        }).catch(() =>{
            interaction.followUp({content: 'Provide a banned member\'s ID.'})
        })
    }
}
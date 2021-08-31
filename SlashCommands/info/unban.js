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
        const UnbanGif = "https://cdn.discordapp.com/attachments/872924441275953162/880529592119611413/yay-minions.gif"
        let userId = args[0]

        client.users.fetch(userId).then(async (user) => {
            await interaction.guild.members.unban(user.id)
            const userMessage = client.users.cache.get(userId)
            const userMessage2 = client.users.cache.get(userId)
            userMessage.send({
                content: `<@${interaction.user.id}> unbanned your ass from **${interaction.guild.name}** `
            })
            userMessage2.send({
                content: `${UnbanGif}`
            })
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
        })
    }
}
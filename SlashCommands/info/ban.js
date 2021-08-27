const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member duh',
    permission: ['BAN_MEMBERS'],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'who we banning?',
            required: true          
        },
        {
            name: 'reason',
            type: 'STRING',
            description: 'yeah we need this too =/',
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const banGif = "https://cdn.discordapp.com/attachments/872924441275953162/880514868778770524/bongocat-banhammer.gif"
        const reason = args[1] || `<@${interaction.user.id}> was too lazy to provide a reason smh`
        const user = interaction.guild.members.cache.get(args[0])
        interaction.guild.members.ban(user);
        const userMessage = client.users.cache.get(args[0])
        const userMessage2 = client.users.cache.get(args[0])
        userMessage.send({
            content: `<@${interaction.user.id}> banned your ass from **${interaction.guild.name}** \nReason ${reason} `
        })
        userMessage2.send({
            content: `${banGif}`
        })
        const banEmbed = new MessageEmbed()
            .setColor(client.config.color).setDescription(`**_Reason :_**\n${reason}`)
            .addFields(
                {
                    name: `Just Banned :`, value: `<@${user.id}>`, inline: true
                },
                {
                    name: `Requested By :`, value: `<@${interaction.user.id}>`, inline: true
                }
            ).setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setTimestamp()
        interaction.followUp({ embeds: [banEmbed] });
    }
}
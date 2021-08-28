const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song',
    permission: ['SEND_MESSAGES'],
    ownerOnly: true,
    options: [
        {
            name: 'song',
            type: 'STRING',
            description: 'Song name or URL',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const playEmbed = new MessageEmbed()
            .setTitle('Black Phone Started PLaying :')
            .setColor(client.config.color).setThumbnail(client.config.botpfp)
            .setDescription(`\`\`\`${args[0]}\`\`\`` )
            .addFields(
                { name: 'Requested By :', value: `<@${interaction.user.id}>`, inline: true },
                { name: `Channel :`, value: `<#${interaction.member.voice.channel.id}>`, inline: true }
            )
        interaction.followUp({ embeds: [playEmbed] });
    }
}
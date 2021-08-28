const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'servericon',
    description: 'view server icon',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const embed = new MessageEmbed()
            .setTitle(interaction.guild.name + `**_Icon_**`)
            .setColor(client.config.color)
            .setImage(interaction.guild.iconURL())
        interaction.followUp({ embeds: [embed] });
    }
}
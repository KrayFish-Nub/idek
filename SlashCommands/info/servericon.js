const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'servericon',
    description: 'view server icon',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
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
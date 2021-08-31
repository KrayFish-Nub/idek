const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const pretty = require("pretty-ms");

module.exports = {
    name: 'uptime',
    description: 'uptime for the bot',
    permission: ['SEND_MESSAGES'],
    botPermission: ["CONNECT", "VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES","USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const uptime = new MessageEmbed()
            .setDescription(`\`\`\`md\n# Current Uptime : \n# ${pretty(client.uptime)} ago \`\`\``)
            .setColor(client.config.color)
            .setThumbnail("https://cdn.discordapp.com/attachments/872924441275953162/875835906819502100/standard_3.gif")
        interaction.followUp({ embeds: [uptime] });
    }
}
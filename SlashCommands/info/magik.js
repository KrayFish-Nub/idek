const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const AmeClient = require("amethyste-api");
module.exports = {
    name: 'magik',
    description: 'Ultra Zoom',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'mention a user',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let AmeAPI = new AmeClient(client.security.apikey);
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const buffer = await AmeAPI.generate("magik", { url: user.user.displayAvatarURL({ format: "png", size: 512 }) });
        const attachment = new MessageAttachment(buffer, "approved.png");
        interaction.followUp({ files: [attachment] });
    }
}
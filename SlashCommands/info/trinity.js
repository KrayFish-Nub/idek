const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const AmeClient = require("amethyste-api");
module.exports = {
    name: 'trinity',
    description: 'TRINITYYYY',
    permission: ['SEND_MESSAGES'],
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
        const buffer = await AmeAPI.generate("trinity", { url: user.user.displayAvatarURL({ format: "png", size: 512 }) });
        const attachment = new MessageAttachment(buffer, "trinity.png");
        interaction.followUp({ files: [attachment] });
    }
}
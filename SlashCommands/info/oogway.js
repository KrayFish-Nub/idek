const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'oogway',
    description: 'Turtule never lies',
    permission: ['SEND_MESSAGES'],
    botPermission: ["SEND_MESSAGES", "VIEW_CHANNEL", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'what do i put on the image dumbass',
            name: 'message',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let text = args.slice(0).join(" ");

        if (!text) return message.reply({ content: 'what do i put on the image dumbass' });

        let final = "https://luminabot.xyz/api/image/oogway?text=" + encodeURIComponent(text)
        const attachment = new MessageAttachment(final, 'oogway.png', null)
        return interaction.followUp({ files: [attachment] });

    }
}
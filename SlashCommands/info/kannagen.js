const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'kannagen',
    description: 'KANNAAAAAAAA',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Type the message',
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
        const text = args.slice().join(' ');

        const url = `https://nekobot.xyz/api/imagegen?type=kannagen&text=${text}`;

        let response;
        response = await fetch(url).then(res => res.json());

        const attachment = new MessageAttachment(response.message, 'kannagen.png');
        return interaction.followUp({ files: [attachment] });

    }
}
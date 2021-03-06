const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cycle',
    description: 'Type a message and clyde will say it! ',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTACH_FILES'],
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

        const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

        let response;
        response = await fetch(url).then(res => res.json());

        const attachment = new MessageAttachment(response.message, 'clyde.png');
        return interaction.followUp({ files: [attachment] });

    }
}
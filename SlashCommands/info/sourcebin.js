const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { create } = require('sourcebin');

module.exports = {
    name: 'sourcebin',
    description: 'Encode or decode a code or text',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Paste the code you want to upload',
            name: 'code',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const content = args.join(" ");
        if (!content) return interaction.followUp({ content: `You must provide the code you want to upload to (<https://sourceb.in/>) when using this command.` });

        create([
            {
                name: "Code",
                content,
                language: "javascript"
            }
        ],
            {
                title: "Code",
                description: "Hmm, it apears this code has no description. Wait, is this the description?"
            }
        ).then((value) => {
            interaction.followUp({ content: `Your code has been posted: ${value.url}` });
        })
    }
}
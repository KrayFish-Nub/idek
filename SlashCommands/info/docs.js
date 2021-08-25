const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require("axios");
module.exports = {
    name: 'docs',
    description: 'Docs of discordjs',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Mention a query',
            name: 'query',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {

        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Please specify a selection!" });
        const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(query)}`;
        axios.get(url).then(({ data }) => {
            if (data) {
                interaction.followUp({ embeds: [data] });
            }
        });
    }
}
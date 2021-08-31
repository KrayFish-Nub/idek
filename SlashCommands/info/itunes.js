const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const request = require("node-superfetch");

module.exports = {
    name: 'itunes',
    description: 'Get information about a song in the iTunes store!',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Mention a song',
            name: 'song',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        try {
            const query = args.join('+');
            const {
                body
            } = await request
                .get('https://itunes.apple.com/search')
                .query({
                    term: query,
                    media: 'music',
                    entity: 'song',
                    limit: 1,
                });
            const body2 = JSON.parse(body.toString());
            if (!body2.results.length) return message.channel.send('Could not find any results.');
            const data = body2.results[0];
            let price = data.trackPrice.toString().split("-")[1]
            if (price === undefined) {
                price = 0
            }
            const success = new MessageEmbed()
                .setColor(client.config.color)
                .setAuthor('iTunes', 'https://i.imgur.com/PR29ow0.jpg', 'https://www.apple.com/itunes/')
                .setURL(data.trackViewUrl)
                .setThumbnail(data.artworkUrl100)
                .setTitle(data.trackName)
                .addField('Artist', data.artistName, true)
                .addField('Album', data.collectionName, true)
                .addField('Release Date', new Date(data.releaseDate).toDateString(), true)
                .addField("Price", "$" + price, true)
                .addField('Length', (data.trackTimeMillis / 1000) + "s", true)
                .addField('Genre', data.primaryGenreName, true);
            return interaction.followUp({ embeds: [success] });

        } catch (err) {
            if (err.status === 404) return interaction.followUp({ content: 'Could not find any results.' });
            console.log(err);
            return interaction.followUp({ content: `An error occurred. Please try again later!` });
        }
    }
}
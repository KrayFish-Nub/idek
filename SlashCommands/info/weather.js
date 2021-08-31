const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const weather = require('weather-js')
module.exports = {
    name: 'weather',
    description: 'Get a country\'s weather',
    permission: ['SEND_MESSAGES'],
    botPermission: ["CONNECT", "VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES","USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            name: 'country',
            type: 'STRING',
            description: 'Specify the country',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
            if (error) interaction.channel.send(error);

            if (result === undefined || result.length === 0) return interaction.channel.bulkDelete(1, true).then(() => {
                interaction.channel.send({
                    content: `Give me an actual location`
                })
            })


            let current = result[0].current;
            let location = result[0].location;




            const embed = new MessageEmbed()
                .setAuthor(`Current weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addField(`Timezone`, `UTC ${location.timezone}`, true)
                .addField(`Degree Type`, `Celcius`, true)
                .addField(`Temperature`, `${current.temperature}°​`, true)
                .addField(`Wind`, `${current.winddisplay}`, true)
                .addField(`Feels Like`, `${current.feelslike}°`, true)
                .addField(`Humidity`, `${current.humidity}%`, true)
                .setColor(client.config.color)
            interaction.followUp({ embeds: [embed] });
        })
    }
}
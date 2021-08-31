const { MessageEmbed, CommandInteraction } = require("discord.js");
const pop = require("popcat-wrapper");
module.exports = {
    name: "country",
    description: "Get info on a country!",
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    ownerOnly: false,
    options: [
        {
            name: 'country',
            type: 'STRING',
            description: 'Country name',
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const text = args.slice(0).join(" ")
        try {
            const c = await pop.country(text)
            const embed = new MessageEmbed()
                .setTitle(c.name)
                .setColor(client.config.color)
                .setThumbnail(c.flag)
                .addField("Name", c.name, true)
                .addField("Capital", c.capital, true)
                .addField("Domain", c.domain, true)
                .addField("Region", c.region, true)
                .addField("Population", c.population, true)
                .addField("Area", c.area, true)
                .addField("Currency", `${c.currency.name} (${c.currency.short})\nSymbol: ${c.currency.symbol}`)
            interaction.followUp({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            return interaction.followUp({ content: "Country not found!" })
        }
    }
}
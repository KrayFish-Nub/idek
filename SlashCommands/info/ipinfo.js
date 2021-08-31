const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'iplookup',
    description: 'Get information abouut an ip',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: true,
    options: [
        {
            type: 'STRING',
            description: 'Mention an ip',
            name: 'ip',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {

        const whois = await fetch(
            `http://ip-api.com/json/${args[0]}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,timezone,currency,isp,org,as,mobile,proxy,hosting,query`,
        ).then((response) => response.json());
        if (whois.status == "fail") {
            const whoisfail = new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setTitle(`${client.emotes.error} Retrieving data for ${args[0]} failed`)
                .setDescription(whois.message);
            interaction.followUp({ embeds: [whoisfail] });
            return;
        }
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        const iplookup = new MessageEmbed()
            .setTitle(`${client.config.compas} Results`)
            .setTimestamp()
            .setColor(client.config.color)
            .setFooter(`Auhtor ID ${member.user.id}`)
            .addFields(
                { name: "IP", value: whois.query, inline: true },
                {
                    name: "Country",
                    value: `${whois.country || "None"} (${whois.countryCode || "None"})`,
                    inline: true,
                },
                {
                    name: "Region",
                    value: `${whois.regionName || "None"} (${whois.region || "None"})`,
                    inline: true,
                },
                { name: "City", value: `${whois.city || "None"}`, inline: true },
                { name: "Zip code", value: `${whois.zip || "None"}`, inline: true },
                {
                    name: "Time zone",
                    value: `${whois.timezone || "None"}`,
                    inline: true,
                },
                {
                    name: "Continent",
                    value: `${whois.continent || "None"} (${whois.continentCode || "None"
                        })`,
                    inline: true,
                },
                {
                    name: "Currency",
                    value: `${whois.currency || "None"}`,
                    inline: true,
                },
                { name: "ISP", value: `${whois.isp || "None"}`, inline: true },
            );
        if (whois.proxy == true) {
            iplookup.addFields({
                name: "Additional information",
                value: "This is a Tor/VPN/Proxy IP",
            });
        } else if (whois.mobile == true) {
            iplookup.addFields({
                name: "Additional information",
                value: "This IP is used by mobile data",
            });
        } else if (whois.hosting == true) {
            iplookup.addFields({
                name: "Additional information",
                value: "This is a hosting service/datacenter IP",
            });
        }
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Check Host Site")
                .setURL(`https://check-host.net/ip-info?host=${whois.query}`)
        )

        interaction.followUp({ embeds: [iplookup], components: [row] });
    }
}
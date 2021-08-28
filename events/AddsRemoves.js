const client = require("../index");
const { MessageEmbed } = require('discord.js')

client.on("guildCreate", guild => {
    const msnSend = client.channels.cache.get('863417666395701268');

    const added = new MessageEmbed()
        .setTitle("Added to :").setColor(client.config.color).setThumbnail(guild.iconURL({ dynamic: true })).setTimestamp()
        .addFields(
            {
                name: `Guild Name :`, value: guild.name, inline: true
            },
            {
                name: `Guild ID :`, value: guild.id, inline: true
            },
            {
                name: `Member Count :`, value: `${guild.memberCount}`, inline: false
            },

        )
    msnSend.send({ embeds: [added] })
})
client.on("guildDelete", guild => {
    const msnSend = client.channels.cache.get('863417666395701268');

    const removed = new MessageEmbed()
        .setTitle("Removed from :").setColor(client.config.color).setThumbnail(guild.iconURL({ dynamic: true })).setTimestamp()
        .addFields(
            {
                name: `Guild Name :`, value: guild.name, inline: true
            },
            {
                name: `Guild ID :`, value: guild.id, inline: true
            },
            {
                name: `Member Count :`, value: `${guild.memberCount}`, inline: false
            },

        )
    msnSend.send({ embeds: [removed] })
})

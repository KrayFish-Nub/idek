module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error from the queue: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        const Discord = require('discord.js')
        const channelId = Discord.interaction.member.voice.channel.id
        const by = Discord.interaction.user.id
        const trackStartEmbed = new Discord.MessageEmbed()
            .setTitle("Black Phone Started Playing :")
            .setColor(client.config.color)
            .addFields(
                { name: `Now Playing : `, value: `\`\`\`${track.title}\`\`\`` },
                { name: `Channel : `, value: `<#${channelId}>`, inline: true },
                { name: `Requested by : `, value: `<@${by}>`, inline: true })
        interaction.channel.send({ embeds: [trackStartEmbed] });
    });

    player.on("trackAdd", (queue, track) => {
        const Discord = require('discord.js')
        const channelId = Discord.interaction.member.voice.channel.id
        const by = Discord.interaction.user.id
        const trackAddEmbed = new Discord.MessageEmbed()
            .setTitle("Black Phone Added :")
            .setColor(client.config.color)
            .addFields(
                { name: `Song Added to Queue : `, value: `\`\`\`${track.title}\`\`\`` },
                { name: `Channel : `, value: `<#${channelId}>`, inline: true },
                { name: `Requested by : `, value: `<@${by}>`, inline: true })
        interaction.channel.send({ embeds: [trackAddEmbed] });
    });

    player.on("botDisconnect", (queue) => {
        interaction.channel.send("Someone doesn't like and disconnected me from vc...");
    });

    player.on("channelEmpty", (queue) => {
        interaction.channel.send("Leaving vc because yall left me alone...");
    });

    player.on("queueEnd", (queue) => {
        interaction.channel.send("Wonna add more songs? i don't have any songs to play...");
    });

};
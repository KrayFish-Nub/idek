module.exports = (client, message, arguments) => {
    const colors = require("colors")
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch'.bgRed);
        const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
        const crashLogCh = client.channels.cache.get('885588356900204584');
        const crashEmbed = new MessageEmbed()
            .setTitle('Anti Crash : Rejection - Catch')
            .setColor(client.config.color)
            .addFields(
                {
                    name: 'Client :', value: `<@${client.user.id}>`, inline: true
                },
                {
                    name: 'Action taken :', value: 'Migrated', inline: true
                }
            ).addField('Reason : ', `${reason}`)
        const btn = new MessageButton()
            .setStyle('PRIMARY')
            .setDisabled(true)
            .setLabel('Restart Client')
            .setCustomId('restart')
        const btnRow = new MessageActionRow()
            .addComponents(btn)
        crashLogCh.send({
            embeds: [crashEmbed], components: [btnRow]
        })
        console.log(p)
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch'.bgRed);
        console.log(err, origin);
        const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
        const crashLogCh = client.channels.cache.get('885588356900204584');
        const crashEmbed = new MessageEmbed()
            .setTitle('Anti Crash : Uncaught Exception - Catch')
            .setColor(client.config.color)
            .addFields(
                {
                    name: 'Client :', value: `<@${client.user.id}>`, inline: true
                },
                {
                    name: 'Action taken :', value: 'Migrated', inline: true
                }
            ).addField('Reason : ', `${err}`)
        const btn = new MessageButton()
            .setStyle('PRIMARY')
            .setDisabled(true)
            .setLabel('Restart Client')
            .setCustomId('restart')
        const btnRow = new MessageActionRow()
            .addComponents(btn)
        crashLogCh.send({
            embeds: [crashEmbed], components: [btnRow]
        })
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)'.bgRed);
        console.log(origin);
        const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
        const crashLogCh = client.channels.cache.get('885588356900204584');
        const crashEmbed = new MessageEmbed()
            .setTitle('Anti Crash : Uncaught Exception - Catch **__(MONITOR)__**')
            .setColor(client.config.color)
            .addFields(
                {
                    name: 'Client :', value: `<@${client.user.id}>`, inline: true
                },
                {
                    name: 'Action taken :', value: 'Migrated', inline: true
                }
            ).addField('Reason : ', `${err}`)
        const btn = new MessageButton()
            .setStyle('PRIMARY')
            .setDisabled(true)
            .setLabel('Restart Client')
            .setCustomId('restart')
        const btnRow = new MessageActionRow()
            .addComponents(btn)
        crashLogCh.send({
            embeds: [crashEmbed], components: [btnRow]
        })
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves'.bgRed);
        const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
        const crashLogCh = client.channels.cache.get('885588356900204584');
        const crashEmbed = new MessageEmbed()
            .setTitle('Anti Crash - Multiple Resolves')
            .setColor(client.config.color)
            .addFields(
                {
                    name: 'Client :', value: `<@${client.user.id}>`, inline: true
                },
                {
                    name: 'Action taken :', value: 'Migrated', inline: true
                }
            ).addField('Type : ', `${type}`).addField('Reason : ', `${reason}`).addField('Promise : ', `${promise}`)
        const btn = new MessageButton()
            .setStyle('PRIMARY')
            .setDisabled(true)
            .setLabel('Restart Client')
            .setCustomId('restart')
        const btnRow = new MessageActionRow()
            .addComponents(btn)
        crashLogCh.send({
            embeds: [crashEmbed], components: [btnRow]
        })
    });
}
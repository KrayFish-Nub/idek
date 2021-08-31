const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'radiostations',
    description: 'full list of radio stations',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const greekStations = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(`Top radio stations in Greece :`).setColor(client.config.color)
            .addFields(
                {
                    name: `StarFM 88.8 |`, value: "`/starfm`", inline: true
                },
                {
                    name: `Ρυθμός 99.7 |`, value: "`/rythmos`", inline: true
                },
                {
                    name: `Pop FM 102.2`, value: "`/popfm`", inline: true
                },
                {
                    name: `AthensDeeJay 95.2 |`, value: "`/athensdeejay`", inline: true
                },
                {
                    name: `DeeJay 97.5 |`, value: "`/deejay`", inline: true
                },
                {
                    name: `Νέο Ραδιόφωνο 97.9`, value: "`/neoradiofono`", inline: true
                },
                {
                    name: `Δρόμος 89.8 |`, value: "`/dromos`", inline: true
                },
                {
                    name: `Mad Radio 106.2 |`, value: "`/madradio`", inline: true
                },
                {
                    name: `Derti 98.6`, value: "`/derti`", inline: true
                },
                {
                    name: `FLY 95.9 FM |`, value: "`/flyfm`", inline: true
                },
                {
                    name: `ZooRadio 90.8 |`, value: "`/zooradio`", inline: true
                },
                {
                    name: `SokFM 104.8 `, value: "`/sokfm`", inline: true
                }
            ).setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        const europeanStations = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(`Top radio stations in Europe :`).setColor(client.config.color)
            .addFields(
                {
                    name: `Lazio Style 89.3`, value: "`/laziostyle`", inline: true
                },
                {
                    name: `s`, value: "`/s`", inline: true
                }
            ).setThumbnail(interaction.guild.iconURL({ dynamic: true }))


        const select = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription("Select the country to display the available radio stations\nYou can suggest for your favourite radio station to be added by using `/suggestrd` ! ")
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true })).setColor(client.config.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        const greekrd = new MessageButton()
            .setCustomId("greekrd")
            .setLabel("Greece")
            .setStyle("PRIMARY")
        const other = new MessageButton()
            .setCustomId("european")
            .setLabel("European")
            .setStyle("PRIMARY")
        const selectionRow = new MessageActionRow()
            .addComponents(greekrd, other)

        const goBack = new MessageButton()
            .setCustomId("goback")
            .setLabel("Go back")
            .setStyle("DANGER")
        const goBackRow = new MessageActionRow()
            .addComponents(goBack)

        interaction.followUp({ embeds: [select], components: [selectionRow] });

        client.on('interactionCreate', async interaction => {
            if (interaction.customId === "greekrd")
                interaction.update({
                    embeds: [greekStations],
                    components: [goBackRow]
                })
            if (interaction.customId === "european")
                interaction.update({
                    embeds: [europeanStations],
                    components: [goBackRow]
                })
            if (interaction.customId === "goback")
                interaction.update({
                    embeds: [select],
                    components: [selectionRow]
                })
        })
    }
}
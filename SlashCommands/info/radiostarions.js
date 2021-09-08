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
        const pageOne = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(`Want a radio station added? Use : \`/suggest\``).setColor(client.config.color)
            .addFields(
                {
                    name: `Greek Rap 24-7 |`, value: "`/greekrap`", inline: true
                },
                {
                    name: `StarFM 88.8 |`, value: "`/starfm`", inline: true
                },
                {
                    name: `Ρυθμός 99.7 |`, value: "`/rythmos`", inline: true
                },
                {
                    name: `Pop FM 102.2 |`, value: "`/popfm`", inline: true
                },
                {
                    name: `AthensDeeJay 95.2 |`, value: "`/athensdeejay`", inline: true
                },
                {
                    name: `ZooRadio 90.8 |`, value: "`/zooradio`", inline: true
                }
            ).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setFooter('Page1/2')

        const pageTwo = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(`Want a radio station added? Use : \`/suggest\``).setColor(client.config.color)
            .addFields(
                {
                    name: `DeeJay 97.5 |`, value: "`/deejay`", inline: true
                },
                {
                    name: `Νέο Ραδιόφωνο 97.9 |`, value: "`/neoradiofono`", inline: true
                },
                {
                    name: `Δρόμος 89.8 |`, value: "`/dromos`", inline: true
                },
                {
                    name: `Mad Radio 106.2 |`, value: "`/madradio`", inline: true
                },
                {
                    name: `Derti 98.6 |`, value: "`/derti`", inline: true
                },
                {
                    name: `FLY 95.9 FM |`, value: "`/flyfm`", inline: true
                },
            ).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setFooter('Page2/2')

        const nextBtn = new MessageButton()
            .setStyle('PRIMARY').setLabel('❯').setCustomId('nextPage').setDisabled(false)
        const prevBtn = new MessageButton()
            .setStyle('PRIMARY').setLabel('❮').setCustomId('prevPage').setDisabled(true)
        const btnRow = new MessageActionRow().addComponents(prevBtn, nextBtn)

        const nextBtnTow = new MessageButton()
            .setStyle('PRIMARY').setLabel('❯').setCustomId('nextPageTwo').setDisabled(true)
        const prevBtnTwo = new MessageButton()
            .setStyle('PRIMARY').setLabel('❮').setCustomId('prevPageTwo').setDisabled(false)
        const btnRowTwo = new MessageActionRow().addComponents(prevBtnTwo, nextBtnTow)

        interaction.followUp({
            embeds: [pageOne], components: [btnRow]
        })
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) return;
            if (interaction.customId === "nextPage") {
                interaction.update({
                    embeds: [pageTwo], components: [btnRowTwo]
                })
            }
            if (interaction.customId === "prevPageTwo") {
                interaction.update({
                    embeds: [pageOne], components: [btnRow]
                })
            }
        })
    }
}
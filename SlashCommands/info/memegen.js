const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    name: 'getmeme',
    description: 'This gets infinite memes',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const btn1 = new MessageButton()
            .setLabel("Generate")
            .setStyle("PRIMARY")
            .setCustomId("meme_generate")

        const btn2 = new MessageButton()
            .setLabel("Stop")
            .setStyle("DANGER")
            .setCustomId("meme_stop")

        const row = new MessageActionRow()
            .addComponents(btn1, btn2)

        const btn3 = new MessageButton()
            .setLabel("Restart")
            .setStyle("PRIMARY")
            .setCustomId("meme_getnew")

        const btn4 = new MessageButton()
            .setLabel("Stop")
            .setStyle("DANGER")
            .setCustomId("meme_stop")
            .setDisabled(true)

        const dis = new MessageActionRow()
            .addComponents(btn3, btn4)

        let meme = await fetch("https://meme-api.herokuapp.com/gimme")
            .then(r => r.json())

        const firstMeme = new MessageEmbed()
            .setImage(meme.url)
            .setColor(client.config.color)
            .setDescription(`${meme.ups} ${client.config.uparrow} 〢 r/[${meme.subreddit}](${meme.postLink})`)

        let msg = await interaction.followUp({
            embeds: [firstMeme],
            components: [row]
        })

        client.on('interactionCreate', async interaction => {
            if (interaction.customId === "meme_generate") {
                let meme2 = await fetch("https://meme-api.herokuapp.com/gimme")
                    .then(r => r.json())

                const newMeme = new MessageEmbed()
                    .setImage(meme2.url)
                    .setColor(client.config.color)
                    .setDescription(`${meme2.ups} ${client.config.uparrow} 〢 r/[${meme2.subreddit}](${meme2.postLink})`)

                interaction.update({
                    embeds: [newMeme]
                })
            }
            if (interaction.customId === "meme_stop") {
                interaction.update({
                    components: [dis]
                })
            }
            if (interaction.customId === "meme_getnew") {
                let meme2 = await fetch("https://meme-api.herokuapp.com/gimme")
                    .then(r => r.json())

                const newMeme = new MessageEmbed()
                    .setImage(meme2.url)
                    .setColor(client.config.color)
                    .setDescription(`${meme2.ups} ${client.config.uparrow} 〢 r/[${meme2.subreddit}](${meme2.postLink})`)

                interaction.update({
                    embeds: [newMeme],
                    components: [row]
                })
            }
        })

    }
}
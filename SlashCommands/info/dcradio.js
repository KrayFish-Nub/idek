const { createAudioResource, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus, } = require('@discordjs/voice');
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'disconnect',
    description: 'Disconnects the bot from channel',
    permission: ['SEND_MESSAGES'],
    botPermission: ["CONNECT", "VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES","USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel)
            return interaction.followUp({ content: "https://media.discordapp.net/attachments/851287403456626717/872174370729119834/unknown.png" });

        let connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })

        connection.destroy()

        const reactions1 = "Ok i get it you don't want me anymore...",
            reactions2 = "I didn't even get hear my favourite song...",
            reactions3 = "I left dawg no need to bully me...",
            reactions4 = "Your mean man...",
            reactions5 = "Finally someone got me out of my misery...",
            reactions6 = "Ok i stop, stop cursing at me!",
            reactions7 = "Your a bitch"

        const dcreactions = [reactions1, reactions2, reactions3, reactions4, reactions4, reactions5, reactions6, reactions7]
        let randomMsg = dcreactions[Math.floor(Math.random() * dcreactions.length)];

        interaction.followUp({ content: randomMsg });
    }
}
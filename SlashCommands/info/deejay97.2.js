const {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus,
} = require('@discordjs/voice');

const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'deejay',
    description: 'DeeJay 97.5 radio station',
    permission: ['SEND_MESSAGES'],
    botPermission: ["CONNECT", "VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES","USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const radioEmbed = new MessageEmbed()
            .setAuthor("Started Playing DeeJay 97.5 !", interaction.client.user.avatarURL({ dynamic: true }))
            .setColor(client.config.color).setDescription("To stop use `/disconnect`")

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel)
            return interaction.followUp({ content: "https://media.discordapp.net/attachments/851287403456626717/872174370729119834/unknown.png" });

        const player = createAudioPlayer();

        let resource = createAudioResource('http://s4.onweb.gr:8470/;stream.play');

        let connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);
        interaction.followUp({ embeds: [radioEmbed] });
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy()
        });

    }
}
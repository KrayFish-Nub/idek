const {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus,
} = require('@discordjs/voice');

const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'flyfm',
    description: 'FLY 95.9 FM radio station',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const radioEmbed = new MessageEmbed()
            .setAuthor("Started Playing FLY 95.9 FM !", interaction.client.user.avatarURL({ dynamic: true }))
            .setColor(client.config.color).setDescription("To stop use `/disconnect`")

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel)
            return interaction.followUp({ content: "https://media.discordapp.net/attachments/851287403456626717/872174370729119834/unknown.png" });

        const player = createAudioPlayer();

        let resource = createAudioResource('http://sc2.streamwithq.com:8040/;');

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
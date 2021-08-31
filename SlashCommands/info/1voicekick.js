const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'vckick',
    description: 'Kick everyone from the voice chat',
    permission: ['MUTE_MEMBERS'],
    botPermission: ["MUTE_MEMBERS"],
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

        for (let member of voiceChannel.members) {
            member[1].voice.setChannel(null)
        }
        interaction.followUp({ content: `Kicked everyone from <#${voiceChannel.id}>` });
    }
}
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'thisguy',
    description: 'this GUY',
    permission: ['SEND_MESSAGES'],
    botPermission: ["ATTACH_FILES", "SEND_MESSAGES", "VIEW_CHANNEL"],
    ownerOnly: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'mention this guy',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const avatar = user.user.displayAvatarURL({ format: "png" });

        const finalLink = 'https://luminabot.xyz/api/image/thisguy?image=' + avatar;

        const attach = new MessageAttachment(`${finalLink}`, "thisguy.png")

        interaction.followUp({ files: [attach] });
    }
}
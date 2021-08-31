const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "gayrate",
    description: "Gay rate of a user",
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTACH_FILES'],
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Mention a user',
            name: 'user',
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        const left = '<:blurplejoin:873405029107777547> '
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let math = Math.floor(Math.random() * 101);

        const cleverembed = new MessageEmbed()
            .setTitle("Gay Rate Of")
            .setDescription(`<@${member.user.id}> ${left}  ` + `\`\`\`md\n# ${math} % Gay #\`\`\``)
            .setColor(client.config.color)
            .setThumbnail('https://cdn.discordapp.com/attachments/872924441275953162/877110741654720542/sus-dance.gif')
            .setTimestamp()

        interaction.followUp({ embeds: [cleverembed] });
    }
}
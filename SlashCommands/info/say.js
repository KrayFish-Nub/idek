const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    description: "What do u want to say ?",
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Type the message',
            name: 'message',
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        const sayEmbed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`**Said : **` + args.join(' '))
            .setThumbnail()
            .setColor(client.config.color)

        interaction.followUp({ embeds: [sayEmbed] });
    }

}

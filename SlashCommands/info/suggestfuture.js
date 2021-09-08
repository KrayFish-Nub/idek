const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Give a suggestion!",
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'write it',
            name: 'suggestion',
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const suggestCh = client.channels.cache.get('871796755635773552');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Give a suggestion" });
        const suggestEmbed = new MessageEmbed()
            .setTitle('Suggestion')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Suggestion :**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp().setColor(client.config.color)
        interaction.followUp({ content: 'sent' })
        interaction.channel.bulkDelete(1, true)
        member.send({ content: "Suggestion was sent! \n\nYour Suggestion :", embeds: [suggestEmbed] })
        suggestCh.send({ embeds: [suggestEmbed] });
    },
};
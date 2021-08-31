const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "bugreport",
    description: "Report a bug",
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Mention a bug',
            name: 'bug',
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
        const reportCh = client.channels.cache.get('871796755635773552');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setTitle('Bug Report')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Report :**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(client.config.color)
        interaction.followUp({ content: "Report has been sent to the report channel!" })
        reportCh.send({ embeds: [reportEmbed] });
    },
};
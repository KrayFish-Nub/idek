const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestrd",
    description: "Send a radio station to add to the bot!",
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'provide name and number of the radio station',
            name: 'radio_station',
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
        if (!query) return interaction.followUp({ content: "Tell me a radio station dumbass" });
        const suggestEmbed = new MessageEmbed()
            .setTitle('Radio Station Suggestion')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Radio Staion :**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp().setColor(client.config.color)
        interaction.followUp({ content: "Radio station has been sent to the suggestion channel !" })
        suggestCh.send({ embeds: [suggestEmbed] });
    },
};
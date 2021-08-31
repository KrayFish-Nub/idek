const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns bots letency",
    permission: ['SEND_MESSAGES'],
    botPermission: ["SEND_MESSAGES", "VIEW_CHANNEL", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, message) => {
        let sexleugue = {
            olybiakos: "<a:greenfire:865919100991045653>",
            paok: "<a:paokflame:865994340442832906> ",
            panathinaikos: "<a:warning:865919101300768779> "
        }
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const pingEmbed = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .addField("Letency :",
                `${client.ws.ping <= 200 ? sexleugue.olybiakos : client.ws.ping <= 400 ? sexleugue.paok : sexleugue.panathinaikos} ${client.ws.ping}ms`
            )
        interaction.followUp({ embeds: [pingEmbed] });
        let ping = Math.floor(Math.random() * 101);
        const pingEditEmbed = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .addField("Letency",
                `${client.ws.ping <= 200 ? sexleugue.olybiakos : client.ws.ping <= 400 ? sexleugue.paok : sexleugue.panathinaikos} ${client.ws.ping}ms`, true)
            .addField("Round Trip",
                `${ping <= 200 ? sexleugue.olybiakos : ping <= 400 ? sexleugue.paok : sexleugue.panathinaikos} ${ping} ms `, true)
        interaction.editReply({ embeds: [pingEditEmbed] })
    },
};
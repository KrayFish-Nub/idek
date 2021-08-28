const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Schema = require('../../models/reactions')

module.exports = {
    name: 'panel',
    description: 'Reaction Role Panel',
    permission: ['ADMINISTRATOR'],
    ownerOnly: true,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const channel = interaction.channel;

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) interaction.followUp({ content: 'No data found!' });
            const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = interaction.guild.roles.cache.get(
                        data.Roles[value][0]
                    );
                    return `${index + 1}) ${data.Roles[value][1].raw
                        } - ${role}`;
                })
                .join("\n\n");

            const embed = new MessageEmbed()
                .setTitle("React to obtain the selected role!")
                .setDescription(`${mapped}`)
                .setColor(client.config.color)
                .setFooter(interaction.guild.name, interaction.guild.iconURL())

            channel.send({ embeds: [embed] }).then((msg) => {
                data.Message = msg.id;
                data.save();

                const reactions = Object.values(data.Roles).map((val) => val[1].id);
                reactions.map((emoji) => msg.react(emoji));
            })
        })
    }
}
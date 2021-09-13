const { Message, MessageSelectMenu, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
    name: "drop293812",

    run: async (client, message, args) => {
        const menuEmbed = new MessageEmbed()
            .setAuthor(`${message.guild.iconURL({ dynamic: true })} ${message.guild.name}`)
            .setFooter(client.config.cpblack)
            .setDescription('Select the roles you want with the menu bellow')

        const menu = new MessageSelectMenu()
            .setCustomId('roleSelection')
            .setPlaceholder('Select Roles')
            .addOptions([
                {
                    label: 'Girls',
                    description: 'Select this if you\'re a girl',
                    value: 'selection_1',
                },
                {
                    label: '18+',
                    description: 'Over 18 people',
                    value: 'selection_2',
                },
                {
                    label: '18-',
                    description: 'For underaged people',
                    value: 'selection_3',
                },
                {
                    label: 'Gipas',
                    description: 'Gipes',
                    value: 'selection_4',
                },
            ])
        const dropDownRoles = new MessageActionRow().addComponents(menu)

        message.channel.send({
            embeds: [menuEmbed],
            components: [dropDownRoles]
        })
    }
}
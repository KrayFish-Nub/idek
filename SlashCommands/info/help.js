const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List of Black Phone commands',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTACH_FILES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const menu = new MessageSelectMenu()
            .setCustomId('selectMenu')
            .setPlaceholder('Choose a category')
            .addOptions([
                {
                    label: 'Configuration',
                    description: 'Set up settings for bot',
                    value: 'configs',
                    emoji: '872901821537062913'
                },
                {
                    label: 'Moderation',
                    description: 'List of Mod commands',
                    value: 'mod',
                    emoji: '872901832454860921'
                },
                {
                    label: 'Utility',
                    description: 'List of Utility commands',
                    value: 'utils',
                    emoji: '863637932787105852'
                },
                {
                    label: 'Music',
                    description: 'List of Music commands',
                    value: 'music',
                    emoji: '873050087687860264'
                },
                {
                    label: 'Fun',
                    description: 'List of Fun commands',
                    value: 'fun',
                    emoji: '881324951506915399'
                },
                {
                    label: 'Information',
                    description: 'Information about the bot',
                    value: 'info',
                    emoji: '881325328637763585'
                }
            ])
        const menuRow = new MessageActionRow()
            .addComponents(menu)
        const img = client.config.astronaut

        interaction.channel.bulkDelete(1, true)

        interaction.channel.send({ components: [menuRow], files: [img] });
    }

}

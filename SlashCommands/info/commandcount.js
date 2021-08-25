const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'Get to know how many slash commands i have',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        const slashembeds = new MessageEmbed()
            .setTitle('Slash Command Count :')
            .setDescription(`\`\`\`md\n# ${client.slashCommands.size}\`\`\``)
            .setFooter(`Author ID - ` + member.user.id)
            .setColor(client.config.color)
        interaction.followUp({ embeds: [slashembeds] });
    }
}
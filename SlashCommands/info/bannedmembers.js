const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'allbans',
    description: 'Displays all banned members',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'VIEW_AUDIT_LOG'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        var amount = 1;
        const fetchBans = interaction.guild.bans.fetch();
        const bannedMembers = (await fetchBans)
            .map((member) => `> __${amount++}.__ **${member.user.tag}** | (*${member.user.id}*)`)
            .join("\n");

        let bannedMemberssort =
            `**_ Banned Members :_**\n` +
            interaction.guild.bans.fetch()

        const bansEmbed = new MessageEmbed()
            .setAuthor(`Bans for ${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
            .setDescription(`**_ Banned Members :_**\n` + interaction.guild.bans.fetch())
            .setFooter(`〢Amount: ${amount - 1}`)
            .setTimestamp()

        interaction.followUp({ embeds: [bansEmbed] });
    }
}
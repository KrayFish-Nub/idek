const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Server stats',
    permission: ['SEND_MESSAGES'],
    botPermission: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Ultra High'
        };
        const regions = {
            brazil: '🇧🇷',
            europe: '🇪🇺',
            hongkong: '🇭🇰',
            india: '🇮🇳',
            japan: '🇯🇵',
            russia: '🇷🇺',
            singapore: '🇸🇬',
            southafrica: '🇿🇦',
            sydney: '🇦🇺',
            '🇺🇸': 'US East',
            '🇺🇸': 'US West',
            '🇺🇸': 'US South'
        };
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = interaction.guild.members.cache;
        const channels = interaction.guild.channels.cache;
        const emojis = interaction.guild.emojis.cache;
        let txt = client.config.txt
        let ch = client.config.vc
        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Name', value: `${interaction.guild.name}`, inline: true },
                { name: 'Owner', value: `${(await interaction.guild.fetchOwner())}` },
                { name: `Boosts`, value: `${interaction.guild.premiumTier ? `Tier : ${interaction.guild.premiumTier}` : '0'}`, inline: true },
                { name: `Verification Level `, value: `${verificationLevels[interaction.guild.verificationLevel]}`, inline: true },
                { name: 'Time Created', value: `${moment(interaction.guild.createdTimestamp).format('`LT`')} ${moment(interaction.guild.createdTimestamp).format('`LL`')} \`[${moment(interaction.guild.createdTimestamp).fromNow()}]\`` },
            )
            .addFields(
                { name: 'Bots ', value: `${members.filter(member => member.user.bot).size}`, inline: true },
                { name: 'Boost Count: ', value: `${interaction.guild.premiumSubscriptionCount || '0'}`, inline: true },
            )
            .addFields(
                { name: 'Roles', value: `${roles.length}`, inline: true },
                { name: 'Emoji Count', value: `${emojis.size}`, inline: true },
                { name: 'Animated Emojis', value: `${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString()}`, inline: true },
            )
            .addField('Channels', `${txt} Channels : ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} 
             ${ch} Channels : ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`,
            )
        interaction.followUp({ embeds: [embed] });
    }
}
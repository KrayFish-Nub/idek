const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Server stats',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const { MessageEmbed } = require('discord.js');
        const moment = require('moment');
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '💢',
            VERY_HIGH: '💥'
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
        let mem = client.config.members
        let online = client.config.online
        let idle = client.config.idle
        let dnd = client.config.dnd
        let offline = client.config.offline
        const embed = new MessageEmbed()
            .setColor(client.config.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Name', value: `${interaction.guild.name}`, inline: true },
                { name: 'Owner', value: `${await interaction.guild.fetchOwner().user}` },
                { name: 'Region', value: `${regions[interaction.guild.region]}`, inline: true },
                { name: `Boosts`, value: `${interaction.guild.premiumTier ? `Tier : ${interaction.guild.premiumTier}` : '0'}`, inline: true },
                { name: `Verification Level `, value: `${verificationLevels[interaction.guild.verificationLevel]}`, inline: true },
                { name: 'Time Created', value: `${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} [${moment(interaction.guild.createdTimestamp).fromNow()}]` },
            )
            // .addField(`${mem} Member Status`, `${online}  ${members.filter(member => member.presence.status === 'online').size}  ${dnd}: ${members.filter(member => member.presence.status === 'dnd').size}  ${idle}: ${members.filter(member => member.presence.status === 'idle').size}   ${offline}: ${members.filter(member => member.presence.status === 'offline').size}`)
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
            .setTimestamp();
        interaction.followUp({ embeds: [embed] });
    }
}
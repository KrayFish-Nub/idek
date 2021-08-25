const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const moment = require("moment")
module.exports = {
    name: 'infor',
    description: 'sasasas',
    permission: [''],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let embed = new MessageEmbed()
            .setTitle("**Server Information**")
            .setColor('GREEN')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setAuthor(interaction.guild.name, interaction.guild.iconURL)
            .addField("Name", interaction.guild.name, true)
            .addField("  ID", interaction.guild.id, true)
            // .addField("  Owner", `${interaction.guild.owner.user.username}#${interaction.guild.owner.user.discriminator}`, true)
            // .addField('#️⃣ Owner ID:', `${(await interaction.guild.ownerId)}`, true)
            .addField(`  No. of Members`, interaction.guild.memberCount.toString(), true)
            .addField(`  No. of Bots:`, interaction.guild.members.cache.filter(member => member.user.bot).size.toString(), true)
            .addField(`Emojis:`, interaction.guild.emojis.cache.size.toString(), true)
            .addField(` Animated Emoji\'s:`, interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString(), true)
            .addField(`💬 # of Text Channel\'s:`, interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString(), true)
            .addField(`🎤 # of Voice Channel\'s:`, interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString(), true)
            .addField(` Total Amount of Roles:`, interaction.guild.roles.cache.size.toString(), true)
            .addField(`Created at`, `${moment(interaction.guild.createdTimestamp).format('LLL')} | \`${moment(interaction.guild.createdTimestamp).fromNow()}\``, true)
            .addField(`Boost Level`, interaction.guild.premiumTier.toString(), true)
            .addField(` Total Boosts`, interaction.guild.premiumSubscriptionCount.toString(), true)
        interaction.followUp({ embeds: [embed] });
    }
}
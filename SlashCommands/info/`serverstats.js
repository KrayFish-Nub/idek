const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const memSchema = require('../../models/membercount')
const boostSchema = require('../../models/boostcount')
const botSchema = require('../../models/botcount')
const txtSchema = require('../../models/textchannel')
const vcSchema = require('../../models/voiceChannel')
const botzSchema = require('../../models/realbotzcount')
module.exports = {
    name: 'serverstats',
    description: 'Makes Server Statistics',
    permission: ['MANAGE_CHANNELS'],
    BotPermission: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const cate = await interaction.guild.channels.create('Statistics', {
            type: 'GUILD_CATEGORY'
        })
        const category = interaction.guild.channels.cache.find(c => c.name == "Statistics" && c.type == "GUILD_CATEGORY")

        memSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Total Members: ${interaction.guild.memberCount}`,
                {
                    type: "GUILD_VOICE",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["CONNECT"],
                        },
                    ],
                });

            new memSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Member: interaction.guild.memberCount,
            }).save();
            channel.setParent(cate.id)
            interaction.channel.bulkDelete(1, true)
            interaction.channel.send({ content: `Member Count ➜ <#${channel.id}>` });
        })
        botSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Real Users: ${interaction.guild.members.cache.filter(member => !member.user.bot).size}`,
                {
                    type: "GUILD_VOICE",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["CONNECT"],
                        },
                    ],
                });
            new botSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Bots: interaction.guild.members.cache.filter(member => !member.user.bot).size,
            }).save();
            channel.setParent(cate.id)
            interaction.channel.send({ content: `Real Users ➜ <#${channel.id}>` });
        })
        botzSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Bots: ${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
                {
                    type: "GUILD_VOICE",
                    parent_id: `${category}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["CONNECT"],
                        },
                    ],
                });
            new botzSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Bots: interaction.guild.members.cache.filter(member => !member.user.bot).size,
            }).save();
            channel.setParent(cate.id)
            interaction.channel.send({ content: `Bots ➜ <#${channel.id}>` });
        })
        boostSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Total Boosts: ${interaction.guild.premiumSubscriptionCount}`,
                {
                    type: "GUILD_VOICE",
                    parent_id: `${category}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["CONNECT"],
                        },
                    ],
                });
            new boostSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Boost: interaction.guild.premiumSubscriptionCount,
            }).save();
            channel.setParent(cate.id)
            interaction.channel.send({ content: `Boost Count ➜ <#${channel.id}>` });
        })
        txtSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Text Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size}`,
                {
                    type: "GUILD_VOICE",
                    parent_id: `${category}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["CONNECT"],
                        },
                    ],
                });
            new txtSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                TxtChannels: interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size,
            }).save();
            channel.setParent(cate.id)
            interaction.channel.send({ content: `Text Channel Count ➜ <#${channel.id}>` });
        })
        vcSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) data.delete();
            const channel = await interaction.guild.channels.create(
                `Voice Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`,
                {
                    type: "GUILD_VOICE",
                    parent_id: `${category}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["CONNECT"],
                        },
                    ],
                });
            new vcSchema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                TxtChannels: interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size,
            }).save();
            channel.setParent(category.id)
            interaction.channel.send({ content: `Voice Channel Count ➜ <#${channel.id}>` });
        })
    }
}
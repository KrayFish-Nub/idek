const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");


const { mongoUrl } = require("./security.json");
const mongoose = require("mongoose");
const chalk = require("chalk")
const client = new Client({
    intents: 32767,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
    }

});

mongoose.connect(mongoUrl, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log(chalk.greenBright('Connected to MongoDB')))


module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.security = require("./security.json");
require("./handler")(client);

//-------------Ticket event
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    let ticketName = `ticket-${interaction.user.username}`
    const user = interaction.user.id
    let antiSpam = await interaction.guild.channels.cache.find(ch => ch.name === ticketName.toLowerCase());
    const channel = interaction.guild.channels.cache.find(ch => ch.name === ticketName.toLowerCase(), { type: 'GUILD_TEXT' });
    const ticketOpen = new MessageEmbed()
        .setColor(client.config.color)
        .setTitle(client.config.wumpusjet + `  Hey ` + interaction.user.username).setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`\`\`\`md\n1. Support will be here shortly don't tag staff members \n2. If you press the lock button the channel will be locked \n3. Only Admins can delete the tickets\`\`\``)
    const unlockEmbed = new MessageEmbed()
        .setTitle("Ticket Locked").setColor(client.config.color).setTimestamp().setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`\`\`\`md\n1. You can unlock this ticket by pressing the button\`\`\``)
    const lockBtn = new MessageButton()
        .setLabel('Lock Ticket')
        .setStyle('SECONDARY')
        .setCustomId('lockBtn')
        .setEmoji('868554303848210512')
    const deleteBtn = new MessageButton()
        .setLabel('Delete Ticket')
        .setStyle('SECONDARY')
        .setCustomId('deleteBtn')
        .setEmoji('872901832454860921')
    const ticketRow = new MessageActionRow()
        .addComponents(lockBtn, deleteBtn)
    const unlockBtn = new MessageButton()
        .setLabel('Unlock Ticket')
        .setStyle('SECONDARY')
        .setEmoji('883877800010977290')
        .setCustomId('unlockBtn')
    const deleteBtnNo2 = new MessageButton()
        .setLabel('Delete Ticket')
        .setStyle('SECONDARY')
        .setCustomId('deleteBtn')
        .setEmoji('872901832454860921')
        .setDisabled(true)
    const ticketRowNo2 = new MessageActionRow()
        .addComponents(unlockBtn, deleteBtnNo2)

    if (interaction.customId === "ticket") {
        if (antiSpam) {
            interaction.reply({ content: `〢Ticket ➜  <#${channel.id}>`, ephemeral: true })
        } else if (!antiSpam) {
            const roleSchema = require('./models/supportRole')
            roleSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (!data) return;
                if (data) {
                    const supportRole = interaction.guild.roles.cache.find(role => role.id == data.Role);
                    if (!supportRole) {
                        return data.delete()
                    }
                    // console.log(supportRole)
                    const ticketCh = await interaction.guild.channels.create(ticketName, {
                        type: "GUILD_TEXT",
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                            },
                            {
                                id: interaction.user.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                            },
                            {
                                id: supportRole.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                            },
                        ]
                    })
                    interaction.reply({ content: `〢Ticket ➜  <#${ticketCh.id}>`, ephemeral: true })
                    ticketCh.send({
                        embeds: [ticketOpen],
                        components: [ticketRow]
                    })
                }
            })
        }
    }
    if (interaction.customId === "deleteBtn") {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: `<@${user}> ${client.config.rightarrow} Only admins can delete tickets`, allowedMentions: { userReplied: false } })
        setTimeout(() => interaction.channel.delete(), 5000);
        interaction.reply({
            content: client.config.dscloading + "Deleting ticket in: `5` seconds"
        })
    }
    if (interaction.customId === "lockBtn") {
        interaction.channel.permissionOverwrites.edit(user, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: true });
        interaction.update({
            embeds: [unlockEmbed],
            components: [ticketRowNo2]
        })
    }
    if (interaction.customId === "unlockBtn") {
        interaction.channel.permissionOverwrites.edit(user, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        interaction.update({
            embeds: [ticketOpen],
            components: [ticketRow]
        })
    }
})
//-------------AntLink event
client.on("messageCreate", async message => {
    if (!message.guild) return;

    if (message.member.permissions.has("KICK_MEMBERS")) return;

    const msg = `<@${message.author.id}> ${client.config.rightarrow} Only high staff members can send links here!`

    function deletedMessage() {
        message.delete();
        message.channel.send({ content: `${msg}` })
    }

    const forbiddenLinks = ["discord.io", "dsc.gg", "discord.gg", "discord.gg/invite", "discord.me"]

    forbiddenLinks.forEach((link) => {
        if (message.content.includes(link)) return deletedMessage()
    })

})
//-------------Update message
// client.on('messageCreate', async message => {
//     if (message.author.bot) return;
//     const embed = new MessageEmbed()
//         .setColor(client.config.color)
//         .setAuthor(client.user.username, client.config.blackphoneicon).setFooter(client.config.cpblack)
//         .setDescription(`<@${message.author.id}> ${client.config.rightarrow} We moved to Slash commands!\n\nMore info at [Discord Support](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ)`)
//     function updateUser() {
//         message.channel.send({ embeds: [embed] })
//     }

//     const prefix = [">"]

//     prefix.forEach((link) => {
//         if (message.content.includes(link)) return updateUser()
//     })
// })
//-------------Suggestion command
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    const sugSchema = require('./models/suggestions')

    sugSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (message.channel.id === data.Channel) {

            const channel = message.guild.channels.cache.get(data.Channel);
            message.delete()
            const suggestionEmbed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${message.content}`)
                .setTimestamp()
                .setColor("RANDOM")
            channel.send({ embeds: [suggestionEmbed] });
        }
    })
})
//-------------Help events
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === 'mod') {
        const modCommands = new MessageEmbed()
            .setTitle('List of Moderation commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.shieldmod)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`ban`, `idban`, `unban`, `kick`, `mute`, `unmute`, `nuke`, \n`clear`, `lockdown`, `lockdownoff`, \n`giverole`, `removerole`, `vcmute`, `vcunmute`, `vckick`')
        await interaction.reply({ embeds: [modCommands], ephemeral: true });
    }
    if (interaction.values[0] === 'utils') {
        const utilsCommands = new MessageEmbed()
            .setTitle('List of Moderation commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.utilsicon)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`roleinfo`, `iplookup`, `whois`, `country`, `banner`, \n`sourcebin`, `avatar`, `rolelist`, `botinfo`, `docs`, \n`servericon`, `serverinfo`, `invitetracker`, \n`commands`, `suggestrd`, `systeminfo`')
        await interaction.reply({ embeds: [utilsCommands], ephemeral: true });
    }
    if (interaction.values[0] === 'music') {
        const musicCommands = new MessageEmbed()
            .setTitle('List of Music commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.musicicon)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n**_RadioStations :_** `radiostations` \n\n**_Music Commands :_** \nWill be here soon')
        await interaction.reply({ embeds: [musicCommands], ephemeral: true });
    }
    if (interaction.values[0] === 'info') {
        const infoCommands = new MessageEmbed()
            .setTitle('Information about Black Phone').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.blackphoneicon)
            .setDescription(`Hey <@${interaction.user.id}> \n\nI'm <@${client.user.id}> a bot that can help you spend time in discord, moderate and all in all to have fun! \n\nI currently have **2** main developers \n**1.** <@${client.config.owner}>\n**2.** <@${client.config.owner2}>`)
        await interaction.reply({ embeds: [infoCommands], ephemeral: true });
    }
    if (interaction.values[0] === 'fun') {
        const funCommands = new MessageEmbed()
            .setTitle('List of Fun commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.roboticon)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`8ball`, `gayrate`, `simprate`, `beautiful`, `colorify`, `cycle`, \n`delete`, `dictator`, `dislike`, `drake`, `getmeme`, `gunpoint`, \n`iosalert`, `kannagen`, `magik`, `oogway`, `say`, `thisguy`, \n`triggered`, `trinity`, `trumptweet`, `wanted`, `whowouldwin`\n')
        await interaction.reply({ embeds: [funCommands], ephemeral: true });
    }
    if (interaction.values[0] === 'configs') {
        const configCommands = new MessageEmbed()
            .setTitle('List of Configuration commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.blackphoneicon)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`set-suggestions`, `set-tickets`, `set-logs`, `set-autorole`, \n`set-muterole`, `verifayrole`, `delete-autorole`, \n`delete-muterole`, `delete-verifyrole`')
        await interaction.reply({ embeds: [configCommands], ephemeral: true });
    }
})
//-------------AutoRole event
client.on('guildMemberAdd', async member => {
    const roleSchema = require('./models/autorole')

    roleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
        if (!data) return;
        if (data) {
            const role = member.guild.roles.cache.find(role => role.id == data.Role);
            if (!role) {
                return data.delete()
            }
            member.roles.add(role.id);
        }
    });
})
//-------------Verify event
client.on('interactionCreate', async interaction => {
    const verifySchema = require('./models/verifyRoles')
    verifySchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (!data) return;
        if (data) {
            const roleCheck = interaction.guild.roles.cache.find(role => role.id == data.Role);
            if (!roleCheck) {
                return data.delete()
            }
            if (interaction.customId === "btnRole") {
                interaction.member.roles.add(roleCheck)
                interaction.reply({ content: `Verified`, ephemeral: true })
            }
        }
    });
})
const memSchema = require('./models/membercount')
setInterval(() => {
    memSchema.find().then((data) => {
        if (!data && !data.length) return;

        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const memberCount = guild.memberCount;

            if (value.Member != memberCount) {
                const channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Total Members: ${memberCount}`);
                value.Member = memberCount;
                value.save();
            }
        })
    })
}, 10000);
const botSchema = require('./models/botcount')
setInterval(() => {
    botSchema.find().then((data) => {
        if (!data && !data.length) return;
        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const botCount = guild.members.cache.filter(member => !member.user.bot).size;
            if (value.Bots != botCount) {
                const channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Real Users : ${botCount}`);
                value.Bots = botCount;
                value.save();
            }
        })
    })
}, 10000);
const botzSchema = require('./models/realbotzcount')
setInterval(() => {
    botzSchema.find().then((data) => {
        if (!data && !data.length) return;
        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const botzCount = guild.members.cache.filter(member => member.user.bot).size;
            if (value.BotZ != botzCount) {
                const channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Bots : ${botzCount}`);
                value.BotZ = botzCount;
                value.save();
            }
        })
    })
}, 10000);
const boostSchema = require('./models/boostcount')
setInterval(() => {
    boostSchema.find().then((data) => {
        if (!data && !data.length) return;
        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const boostCount = guild.premiumSubscriptionCount;
            if (value.Boost != boostCount) {
                let channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Total Boosts: ${boostCount}`);
                value.Boost = boostCount;
                value.save();
            }
        })
    })
}, 10000);
const txtSchema = require('./models/textchannel')
setInterval(() => {
    txtSchema.find().then((data) => {
        if (!data && !data.length) return;
        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const textChannel = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
            if (value.TxtChannels != textChannel) {
                const channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Text Channels: ${textChannel}`);
                value.TxtChannels = textChannel;
                value.save();
            }
        })
    })
}, 10000);
const vcSchema = require('./models/voiceChannel');
setInterval(() => {
    vcSchema.find().then((data) => {
        if (!data && !data.length) return;
        data.forEach((value) => {
            const guild = client.guilds.cache.get(value.Guild);
            const voiceChannel = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
            if (value.VcChannels != voiceChannel) {
                const channel = guild.channels.cache.get(value.Channel);
                channel.setName(`Voice Channels: ${voiceChannel}`);
                value.VcChannels = voiceChannel;
                value.save();
            }
        })
    })
}, 10000);
client.on("guildDelete", async guild => {
    const msnSend = client.channels.cache.get('863417666395701268');
    const removed = new MessageEmbed()
        .setTitle("Removed from :").setColor(client.config.color).setThumbnail(guild.iconURL({ dynamic: true })).setTimestamp()
        .addFields(
            {
                name: `Guild Name :`, value: guild.name, inline: true
            },
            {
                name: `Guild ID :`, value: guild.id, inline: true
            },
            {
                name: `Member Count :`, value: `${guild.memberCount}`, inline: true
            }
        )
    msnSend.send({ embeds: [removed] })
})
client.on("guildCreate", async guild => {
    const msnSend = client.channels.cache.get('863417666395701268');

    const added = new MessageEmbed()
        .setTitle("Added to :").setColor(client.config.color).setThumbnail(guild.iconURL({ dynamic: true })).setTimestamp()
        .addFields(
            {
                name: `Guild Name :`, value: guild.name, inline: true
            },
            {
                name: `Guild ID :`, value: guild.id, inline: true
            },
            {
                name: `Member Count :`, value: `${guild.memberCount}`, inline: true
            }
        )
    msnSend.send({ embeds: [added] })
})
client.on('messageDelete', async (message) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (message.author.bot) return;
        const logCh = message.guild.channels.cache.get(data.Channel);
        const logsEmbed = new MessageEmbed()
            .setTitle('Message Delete')
            .setDescription(`\`\`\`${message.content}\`\`\``)
            .addFields(
                { name: `Deleted by :`, value: `<@${message.author.id}>`, inline: true },
                { name: `Channel :`, value: `<#${message.channel.id}>`, inline: true }
            ).setTimestamp()
            .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + message.guild.memberCount)
            .setColor(client.config.color)
        logCh.send({ embeds: [logsEmbed] });
    })
})
client.on('messageUpdate', async (oldMessage, newMessage, message) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: oldMessage.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = oldMessage.guild.channels.cache.get(data.Channel);
        if (oldMessage.author.bot) return;
        const count = 1950
        const originalMsg = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? ' ...' : "")
        const newMsg = newMessage.content.slice(0, count) + (newMessage.content.length > count ? ' ...' : "")
        const msgLinkBtn = new MessageButton()
            .setLabel('Message Link')
            .setStyle('LINK')
            .setURL(`${newMessage.url}`)
        const row = new MessageActionRow()
            .addComponents(msgLinkBtn)
        const logsEmbed = new MessageEmbed()
            .setTitle('Message Update')
            .setDescription(`**Old Message:**\`\`\`${originalMsg}\`\`\`\n**New Message:**\`\`\`${newMsg}\`\`\``)
            .addFields(
                { name: `Edited by :`, value: `<@${oldMessage.author.id}>`, inline: true },
                { name: `Channel :`, value: `<#${oldMessage.channel.id}>`, inline: true }
            ).setTimestamp()
            .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldMessage.guild.memberCount)
            .setColor(client.config.color)
        logCh.send({ embeds: [logsEmbed], components: [row] });
    })
})
client.on('channelDelete', async (channel) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: channel.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = channel.guild.channels.cache.get(data.Channel);
        if (channel.type === "GUILD_TEXT") {
            var type = "Text";
        } else if (channel.type === "GUILD_VOICE") {
            var type = "Voice";
        } else if (channel.type === "GUILD_CATEGORY") {
            var type = "Category";
        } else if (channel.type === "GUILD_NEWS") {
            var type = "News";
        } else if (channel.type === "GUILD_STORE") {
            var type = "Store";
        } else if (!channel.type) {
            var type = "Unknown || Thread";
        }
        channel.guild.fetchAuditLogs().then(logs => {
            const userDelete = logs.entries.first().executor.id
            const logsEmbed = new MessageEmbed()
                .setTitle('Channel Delete')
                .setDescription(`Channel was deleted by : <@${userDelete}>`)
                .addFields(
                    { name: 'Channel Name :', value: `\`${channel.name}\``, inline: true },
                    { name: 'Channel Type :', value: `\`${type}\``, inline: true },
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + channel.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('channelCreate', async (channel) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: channel.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = channel.guild.channels.cache.get(data.Channel);
        channel.guild.fetchAuditLogs().then(logs => {
            const topic = channel.topic || `Not set`
            const userCreate = logs.entries.first().executor.id
            if (userCreate === client.user.id) return;
            if (channel.type === "GUILD_TEXT") {
                var type = "Text";
            } else if (channel.type === "GUILD_VOICE") {
                var type = "Voice";
            } else if (channel.type === "GUILD_CATEGORY") {
                var type = "Category";
            } else if (channel.type === "GUILD_NEWS") {
                var type = "News";
            } else if (channel.type === "GUILD_STORE") {
                var type = "Store";
            } else if (!channel.type) {
                var type = "Unknown || Thread";
            }
            const logsEmbed = new MessageEmbed()
                .setTitle('Channel Create')
                .setDescription(`Channel was created by : <@${userCreate}>`)
                .addFields(
                    { name: 'Channel Name :', value: `\`${channel.name}\``, inline: true },
                    { name: 'Channel Type :', value: `\`${type}\``, inline: true },
                    { name: 'Channel Tag :', value: `<#${channel.id}>`, inline: true },
                    { name: 'Channel Topic :', value: `\`\`\`${topic}\`\`\``, inline: true },
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + channel.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('channelUpdate', async (oldChannel, newChannel) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: oldChannel.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = oldChannel.guild.channels.cache.get(data.Channel);
        if (oldChannel.type === "GUILD_TEXT") {
            var type = "Text";
        } else if (oldChannel.type === "GUILD_VOICE") {
            var type = "Voice";
        } else if (oldChannel.type === "GUILD_CATEGORY") {
            var type = "Category";
        } else if (oldChannel.type === "GUILD_NEWS") {
            var type = "News";
        } else if (oldChannel.type === "GUILD_STORE") {
            var type = "Store";
        } else if (!oldChannel.type) {
            var type = "Unknown || Thread";
        }
        if (oldChannel.type === "GUILD_TEXT") {
            var nType = "Text";
        } else if (oldChannel.type === "GUILD_VOICE") {
            var nType = "Voice";
        } else if (oldChannel.type === "GUILD_CATEGORY") {
            var nType = "Category";
        } else if (oldChannel.type === "GUILD_NEWS") {
            var nType = "News";
        } else if (oldChannel.type === "GUILD_STORE") {
            var nType = "Store";
        } else if (!oldChannel.type) {
            var nType = "Unknown || Thread";
        }
        oldChannel.guild.fetchAuditLogs().then(logs => {
            const topic = newChannel.topic || `Not changed`
            const userUpdate = logs.entries.first().executor.id
            const logsEmbed = new MessageEmbed()
                .setTitle('Channel Update')
                .setDescription(`Channel was updated by : <@${userUpdate}>`)
                .addFields(
                    { name: 'Channel Name :', value: `${oldChannel.name}`, inline: true },
                    { name: 'Channel Type :', value: `\`${type}\``, inline: true },
                    { name: 'Channel Tag :', value: `<#${oldChannel.id}>`, inline: true }
                ).setTimestamp()
                .addFields(
                    { name: 'Updated Channel Name:', value: `${newChannel.name}`, inline: true },
                    { name: 'Channel Type :', value: `\`${nType}\``, inline: true },
                    { name: 'Updated Channel Topic:', value: `\`\`\`${topic}\`\`\``, inline: true }
                )
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldChannel.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('roleCreate', async (role) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: role.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = role.guild.channels.cache.get(data.Channel);
        const permissions = []
        if (role.permissions.has("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (role.permissions.has("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (role.permissions.has("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (role.permissions.has("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (role.permissions.has("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (role.permissions.has("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (role.permissions.has("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (role.permissions.has("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (role.permissions.has("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }

        const position = `\`${role.guild.roles.cache.size - role.position}\`/\`${role.guild.roles.cache.size}\``;
        const yesNo = {
            true: '`Yes`',
            false: '`No`'
        }
        role.guild.fetchAuditLogs().then(logs => {
            const userUpdate = logs.entries.first().executor.id
            if (userUpdate === client.user.id) return;
            const logsEmbed = new MessageEmbed()
                .setTitle('Role Created')
                .setDescription(`Role was created by : <@${userUpdate}>`)
                .addFields(
                    { name: 'Name :', value: `\`${role.name}\``, inline: true },
                    { name: 'Color :', value: `\`${role.hexColor.toUpperCase()}\``, inline: true },
                    { name: 'Tag :', value: `${role}`, inline: true },
                    { name: 'Position :', value: `${position}`, inline: true },
                    { name: 'Mentionable', value: `${yesNo[role.mentionable]}` },
                    { name: 'Permissions :', value: `\`\`\`${permissions.join(` | `)}\`\`\`` }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + role.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('roleUpdate', async (role) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: role.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = role.guild.channels.cache.get(data.Channel);
        const permissions = []
        if (role.permissions.has("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (role.permissions.has("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (role.permissions.has("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (role.permissions.has("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (role.permissions.has("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (role.permissions.has("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (role.permissions.has("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (role.permissions.has("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (role.permissions.has("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (permissions.length == 0) {
            permissions.push("Permissions not changed");
        }

        const position = `\`${role.guild.roles.cache.size - role.position}\`/\`${role.guild.roles.cache.size}\``;
        const yesNo = {
            true: '`Yes`',
            false: '`No`'
        }
        role.guild.fetchAuditLogs().then(logs => {
            const userCreate = logs.entries.first().executor.id
            if (userCreate === client.user.id) return;
            const logsEmbed = new MessageEmbed()
                .setTitle('Role Updated')
                .setDescription(`Role was updated by : <@${userCreate}>`)
                .addFields(
                    { name: 'Name :', value: `\`${role.name}\``, inline: true },
                    { name: 'Color :', value: `\`${role.hexColor.toUpperCase()}\``, inline: true },
                    { name: 'Tag :', value: `${role}`, inline: true },
                    { name: 'Position :', value: `${position}`, inline: true },
                    { name: 'Mentionable', value: `${yesNo[role.mentionable]}`, inline: true },
                    { name: 'Permissions :', value: `\`\`\`${permissions.join(` | `)}\`\`\`` }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + role.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('roleDelete', async (role) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: role.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = role.guild.channels.cache.get(data.Channel);
        role.guild.fetchAuditLogs().then(logs => {
            const userDelete = logs.entries.first().executor.id
            if (userDelete === client.user.id) return;
            const logsEmbed = new MessageEmbed()
                .setTitle('Role Deleted')
                .setDescription(`Role was deleted by : <@${userDelete}>`)
                .addFields(
                    { name: 'Name :', value: `\`${role.name}\``, inline: true },
                    { name: 'Color :', value: `\`${role.hexColor.toUpperCase()}\``, inline: true },
                    { name: 'ID :', value: `\`${role.id}\``, inline: true },
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + role.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('voiceStateUpdate', async (oldState, newState) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: oldState.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = oldState.guild.channels.cache.get(data.Channel);
        oldState.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const userGiven = logs.entries.first().target;
            if (oldState.serverMute === false && newState.serverMute === true) {
                let voiceMute = new MessageEmbed()
                    .setTitle('Voice Mute').setTimestamp()
                    .addFields(
                        { name: 'Member Muted :', value: `${userGiven}`, inline: true },
                        { name: 'Muted by :', value: `<@${userGiver}>`, inline: true },
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldState.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [voiceMute] });
            }
            if (oldState.serverMute === true && newState.serverMute === false) {
                let voiceUnmute = new MessageEmbed()
                    .setTitle('Voice Unmute').setTimestamp()
                    .addFields(
                        { name: 'Member Unmuted :', value: `${userGiven}`, inline: true },
                        { name: 'Unmute by :', value: `<@${userGiver}>`, inline: true },
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldState.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [voiceUnmute] });
            }
            if (oldState.serverDeaf === true && newState.serverDeaf === false) {
                let voiceUndeafen = new MessageEmbed()
                    .setTitle('Voice Undeafen').setTimestamp()
                    .addFields(
                        { name: 'Member Undeafen :', value: `${userGiven}`, inline: true },
                        { name: 'Undeafen by :', value: `<@${userGiver}>`, inline: true },
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldState.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [voiceUndeafen] });
            }
            if (oldState.serverDeaf === false && newState.serverDeaf === true) {
                let voiceDeafen = new MessageEmbed()
                    .setTitle('Voice Deafen').setTimestamp()
                    .addFields(
                        { name: 'Member Deafen :', value: `${userGiven}`, inline: true },
                        { name: 'Deafen by :', value: `<@${userGiver}>`, inline: true },
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldState.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [voiceDeafen] });
            }
        })
    })
})
client.on('guildBanRemove', async (guild) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const userGiven = logs.entries.first().target;
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Ban Removed')
                .addFields(
                    { name: `Unbanned User :`, value: `${userGiven}`, inline: true },
                    { name: `Unbanned by :`, value: `<@${userGiver}>`, inline: true }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('guildBanAdd', async (guild) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const userGiven = logs.entries.first().target;
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Ban Added')
                .addFields(
                    { name: `Banned User :`, value: `${userGiven}`, inline: true },
                    { name: `Banned by :`, value: `<@${userGiver}>`, inline: true }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: oldMember.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = oldMember.guild.channels.cache.get(data.Channel);
        oldMember.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const userGiven = logs.entries.first().target;
            let roleGiven = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
            if (oldMember.roles.cache.size < newMember.roles.cache.size) {
                let roleAdd = new MessageEmbed()
                    .setTitle('Role Added').setTimestamp()
                    .addFields(
                        { name: 'Role Given :', value: `${roleGiven}`, inline: true },
                        { name: 'Given To :', value: `${userGiven}`, inline: true },
                        { name: 'Given By :', value: `<@${userGiver}>`, inline: true }
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldMember.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [roleAdd] });
            }
            let roleTaken = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
            if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                let roleRemove = new MessageEmbed()
                    .setTitle('Role Removed').setTimestamp()
                    .addFields(
                        { name: 'Role Taken :', value: `${roleTaken}`, inline: true },
                        { name: 'Taken From :', value: `${userGiven}`, inline: true },
                        { name: 'Taken By :', value: `<@${userGiver}>`, inline: true }
                    )
                    .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + oldMember.guild.memberCount)
                    .setColor(client.config.color)
                logCh.send({ embeds: [roleRemove] });

            }
        })
    })
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const Schema = require('./models/logsCh')
    const oldState = oldMember.premiumSince;
    const newState = newMember.premiumSince;
    Schema.findOne({ Guild: oldMember.guild.id }, async (err, data) => {
        if (!data) return;
        const logCh = oldMember.guild.channels.cache.get(data.Channel);
        const boostEmoji = '<a:booster:884400269264310352>'
        if (!oldState && newState) {
            const newBoosterEmbed = new MessageEmbed()
                .setTitle('New Booster')
                .setDescription(`${boostEmoji} <@${oldMember.user.id}> Just boosted **${oldMember.guild.name}**`)
                .setImage('https://cdn.discordapp.com/attachments/872924441275953162/884399246843973672/new_booster.png')
                .setColor('e812d1')
            logCh.send({ embeds: [newBoosterEmbed] });
        }
        if (oldState && !newState) {
            const lostBoosterEmbed = new MessageEmbed()
                .setTitle('Lost A Booster')
                .setDescription(`${boostEmoji} <@${oldMember.user.id}> Just unboosted **${oldMember.guild.name}**`)
                .setImage('https://cdn.discordapp.com/attachments/872924441275953162/884401211237863464/lost_a_booster.png')
                .setColor('e812d1')
            logCh.send({ embeds: [lostBoosterEmbed] });
        }
    })
})
client.on('guildVanityURLAdd', async (guild, vanityURL) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Vanity Link Added')
                .addFields(
                    { name: `Link :`, value: `${vanityURL}`, inline: true },
                    { name: `Added by :`, value: `<@${userGiver}>`, inline: true }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('guildVanityURLRemove', async (guild, vanityURL) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Vanity Link Removed')
                .setDescription(`${vanityURL} has been **removed**`)
                .setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('guildVanityURLUpdate', async (guild, oldVanityURL, newVanityURL) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Vanity Link Changed')
                .addFields(
                    { name: `Old Link :`, value: `${oldVanityURL}`, inline: true },
                    { name: `New Link :`, value: `${newVanityURL}`, inline: true },
                    { name: `Changed by :`, value: `<@${userGiver}>`, inline: true }
                ).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Boost Level Lost')
                .setDescription(`Level was ${oldLevel}, New level is ${newLevel}`).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color).setImage('https://cdn.discordapp.com/attachments/872924441275953162/884605953616515162/levelLost.png')
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('Boost Level Up')
                .setDescription(`Level was ${oldLevel}, New level is ${newLevel}`).setTimestamp()
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color).setImage('https://cdn.discordapp.com/attachments/872924441275953162/884605498261901372/boostLevelUp.png')
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on("guildBannerAdd", (guild, bannerURL) => {
    const Schema = require('./models/logsCh')
    Schema.findOne({ Guild: guild.guild.id }, async (err, data) => {
        if (!data) return;
        guild.guild.fetchAuditLogs().then(logs => {
            const userGiver = logs.entries.first().executor.id;
            const logCh = guild.guild.channels.cache.get(data.Channel);
            const logsEmbed = new MessageEmbed()
                .setTitle('New Banner')
                .setDescription(`Updated by ${userGiver}`)
                .setThumbnail(client.config.blackphoneicon).setFooter(client.user.username + ` Watching ` + guild.guild.memberCount)
                .setColor(client.config.color).setImage(`${bannerURL}`)
            logCh.send({ embeds: [logsEmbed] });
        })
    })
})
client.on('guildMemberAdd', async (member) => {
    const Schema = require('./models/welcomeCh')
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
        if (!data) return;
        const welCh = member.guild.channels.cache.get(data.Channel);

        welCh.send({ embeds: [] });
    })
})

client.login(client.security.token);
const { Client, Collection, Interaction, MessageEmbed, MessageButton, MessageActionRow, ClientVoiceManager } = require("discord.js");


const { mongoUrl } = require("./security.json");
const mongoose = require("mongoose");
const chalk = require("chalk")
const client = new Client({
    intents: 32767,
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
client.on('interactionCreate', async (interaction, args) => {
    const userClick = interaction.member
    const user = interaction.user.username;
    const userId = interaction.user.id;
    const name = "ticket-" + user;
    if (!interaction.isButton()) return;

    const partnerRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('partnerLock')
                .setLabel('Lock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY'),
        );
    const unlockPartner = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('partnerUnlock')
                .setLabel('Unlock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY')
                .setDisabled(true),
        );
    const staffRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('staffLock')
                .setLabel('Lock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY'),
        );
    const unlockStaff = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('staffUnlock')
                .setLabel('Unlock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY')
                .setDisabled(true),
        );
    const supportRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('supportLock')
                .setLabel('Lock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY'),
        );
    const unlockSupport = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('supportUnlock')
                .setLabel('Unlock')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete Ticket')
                .setStyle('PRIMARY')
                .setDisabled(true),
        );
    const supportEmbed = new MessageEmbed()
        .setTitle(client.config.wumpusjet + `   Hey ${user}, Support Ticket Created`).setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true })).setColor(client.config.color)
        .setDescription(`\`\`\`md\n1. Support will be here sortly don't tag staff members \n2. If you press the lock button the channel will be locked \n3. Only Admins can delete the tickets\`\`\``)
    if (interaction.customId === "support") {
        const supportChannel = await interaction.guild.channels.create(`ticket-${user}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
            },
            {
                id: userId,
                allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
            }]
        })
        interaction.reply({
            content: `Your ticket channel is <#${supportChannel.id}>`,
            ephemeral: true
        })
        supportChannel.send({
            embeds: [supportEmbed],
            components: [supportRow]
        })
    }
    const staffEmbed = new MessageEmbed()
        .setTitle(client.config.wumpusjet + `   Hey ${user}, Contact Ticket Created`).setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true })).setColor(client.config.color)
        .setDescription(`\`\`\`md\n1. Support will be here sortly don't tag staff members \n2. If you press the close button the channel will be locked \n3. Only Admins can delete the tickets\`\`\``)
    if (interaction.customId === "contact") {
        const staffChannel = await interaction.guild.channels.create(`ticket-${user}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
            },
            {
                id: userId,
                allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
            }]
        })
        interaction.reply({
            content: `Your ticket channel is <#${staffChannel.id}>`,
            ephemeral: true
        })
        staffChannel.send({
            embeds: [staffEmbed],
            components: [staffRow]
        })
    }
    const partnerEmbed = new MessageEmbed()
        .setTitle(client.config.wumpusjet + `   Hey ${user}, Partner Ticket Created`).setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true })).setColor(client.config.color)
        .setDescription(`\`\`\`md\n1. Owners will be here sortly \n2. If you press the close button the channel will be locked \n3. Only Admins can delete the tickets\`\`\``)
    if (interaction.customId === "partner") {
        const partnerChannel = await interaction.guild.channels.create(`ticket-${user}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
            },
            {
                id: userId,
                allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
            }]
        })
        interaction.reply({
            content: `Your ticket channel is <#${partnerChannel.id}>`,
            ephemeral: true
        })
        partnerChannel.send({
            embeds: [partnerEmbed],
            components: [partnerRow]
        })
    }
    const unlockEmbed = new MessageEmbed()
        .setTitle("Unlock Ticket").setColor(client.config.color).setTimestamp().setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`\`\`\`md\n1. You can unlock this ticket by pressing the button\`\`\``)
    if (interaction.customId === "partnerLock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
        interaction.update({
            embeds: [unlockEmbed],
            components: [unlockPartner]
        })
    }
    if (interaction.customId === "staffLock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
        interaction.update({
            embeds: [unlockEmbed],
            components: [unlockStaff]
        })
    }
    if (interaction.customId === "supportLock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
        interaction.update({
            embeds: [unlockEmbed],
            components: [unlockSupport]
        })
    }
    if (interaction.customId === "partnerUnlock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        interaction.update({
            embeds: [partnerEmbed],
            components: [partnerRow]
        })
    }
    if (interaction.customId === "staffUnlock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        interaction.update({
            embeds: [staffEmbed],
            components: [staffRow]
        })
    }
    if (interaction.customId === "supportUnlock") {
        interaction.channel.permissionOverwrites.edit(userId, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        interaction.update({
            embeds: [supportEmbed],
            components: [supportRow]
        })
    }
    if (interaction.customId === "delete") {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `<@${userId}> ${client.config.rightarrow} Only admins can delete tickets`, allowedMentions: { userReplied: false } })
        setTimeout(() => interaction.channel.delete(), 5000);
        interaction.reply({
            content: client.config.dscloading + "Deleting ticket in: `5 seconds`"
        })
    }
    // BUTTON ROLES \\

});
//-------------Antilink event
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
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(client.user.username, client.config.blackphoneicon).setFooter(client.config.cpblack)
        .setDescription(`<@${message.author.id}> ${client.config.rightarrow} We moved to Slash commands!\n\nMore info at [Discord Support](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ)`)
    function updateUser() {
        message.channel.send({ embeds: [embed] })
    }

    const prefix = [">"]

    prefix.forEach((link) => {
        if (message.content.includes(link)) return updateUser()
    })
})
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
});
//-------------Help events
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === 'mod') {
        const modCommands = new MessageEmbed()
            .setTitle('List of Moderation commands').setURL(client.config.botinvurl).setFooter(client.config.cpblack)
            .setColor(client.config.color).setThumbnail(client.config.shieldmod)
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`ban`, `idban`, `unban`, `kick`, `mute`, `unmute`, `nuke`, \n`clear`, `lockdown`, `lockdownoff`, \n`giverole`, `removerole`, `set-tickets`')
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
            .setDescription(client.config.slash + ' All commands are in **_Slash_**\n\n`set-suggestions`, `set-tickets`')
        await interaction.reply({ embeds: [configCommands], ephemeral: true });
    }
})
//-------------Autorole event
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
                channel.setName(`Bots + Alts: ${botCount}`);
                value.Bots = botCount;
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
const vcSchema = require('./models/voiceChannel')
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


client.login(client.security.token);
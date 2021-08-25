const { Client, Collection, Interaction, MessageEmbed, MessageButton, MessageActionRow, ClientVoiceManager } = require("discord.js");

const client = new Client({
    intents: 32767,
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
    }
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.on('interactionCreate', async (interaction) => {
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
});



client.login(client.config.token);
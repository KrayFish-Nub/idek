const { Client, CommandInteraction, MessageEmbed, version: djsversion, } = require('discord.js');
const version = require("../../package.json").version;
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");

module.exports = {
    name: 'botinfo',
    description: 'Get information about the bot!',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTCH_FILES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const core = os.cpus()[0];
        const botinfo = new MessageEmbed()
            .setURL(client.web)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(" Black Phone Bot's Complete Info!")
            .setDescription("Here is a complete info of what's used to run [Black Phone](https://discord.com/api/oauth2/authorize?client_id=863270412997230603&permissions=8&scope=bot%20applications.commands) !")
            .addField("Client", ` \`\`\`${client.user.tag}\`\`\` `, true)
            .addField("Slash Commands", ` \`\`\`${client.slashCommands.size} \`\`\` `, true)
            .addField("Bot Version", ` \`\`\`${version}\`\`\` `, true)
            .addField("Servers", ` \`\`\`${client.guilds.cache.size.toLocaleString()} servers! \`\`\` `, true)
            .addField("Total Users", `  \`\`\`${client.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}  \`\`\` `, true)
            .addField("Channels", `  \`\`\`${client.channels.cache.size.toLocaleString()} \`\`\` `, true)
            .addField("Message Received At", ` \`\`\`${utc(client.user.createdTimesstamp).format("Do MMMM YYYY HH:mm:ss")} \`\`\` `, true)
            .addField('Node.js Version', ` \`\`\`${process.version} \`\`\` `, true)
            .addField("Discord.js", ` \`\`\`${djsversion} \`\`\``, true)
            .addField("Platform", ` \`\`\`${process.platform} \`\`\` `, true)
            .addField("Uptime", ` \`\`\`${ms(os.uptime() * 1000, { long: true })}  \`\`\` `, true)
            .addField("CPU STATS", ` \`\`\`Cores: ${os.cpus().length} \n Model: ${core.model} \n Speed: ${core.speed}MHz  \`\`\` `)
            .setColor(client.config.color)
            .setTimestamp();
        interaction.followUp({ embeds: [botinfo] });
    }
}
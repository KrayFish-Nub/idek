const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    name: 'systeminfo',
    description: 'Information about the VPS im on',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        let settinngs = '<:settings:863637932787105852> '
        const { totalMemMb, usedMemMb } = await mem.info();

        const systeminfo = stripIndent`
        - OS        : ${process.platform}
        - CPU       : ${cpu.model()}
        - Cores     : ${cpu.count()}
        - CPU Usage : ${await cpu.usage()} %
        - RAM       : ${totalMemMb} MB
        - RAM Usage : ${usedMemMb} MB 
        `;

        const systeminfoembed = new MessageEmbed()
            .setTitle(`${client.config.settings}  System Information`).setTimestamp()
            .setDescription(`\`\`\`diff\n${systeminfo}\`\`\``)
            .setColor(client.config.color)
        interaction.followUp({ embeds: [systeminfoembed] });
    }
}
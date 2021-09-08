const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'botstatschannel',
    description: 'Bot stats for support server',
    ownerOnly: true,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const cate = await interaction.guild.channels.create('Bot Stats', {
            type: 'GUILD_CATEGORY'
        })
        const category = interaction.guild.channels.cache.find(c => c.name == "Bot Stats" && c.type == "GUILD_CATEGORY")

        const channel = await interaction.guild.channels.create(
            `Serving ${client.guilds.cache.size} Guilds`,
            {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['SPEAK', 'CONNECT']
                    },
                ],
            });
        channel.setParent(cate.id)
        interaction.channel.bulkDelete(1, true)
        interaction.channel.send({ content: `Guild Count ➜ <#${channel.id}>` });
    }
}
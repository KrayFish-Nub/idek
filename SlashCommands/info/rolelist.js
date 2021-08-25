const { Client, MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: 'rolelist',
    description: 'Check the roles for this guild ',
    permission: ['SEND_MESSAGES'],
    ownerOnly: false,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {

        let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description =
            `**_Roles :_**\n` +
            interaction.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .slice(i0, i1)
                .join("\n");

        let embed = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setColor(client.config.color)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`〢Page ${page}`)
            .setDescription(description);


        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("previous")
                .setStyle("PRIMARY")
                .setLabel("❮"),
            new MessageButton()
                .setCustomId("next")
                .setStyle("PRIMARY")
                .setLabel("❯")
        )
        client.on('interactionCreate', async interaction => {

            if (interaction.customId === 'previous') {
                await interaction.deferUpdate();

                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                let description =
                    `**_Roles :_**\n` +
                    interaction.guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(r => r)
                        .slice(i0, i1)
                        .join("\n");

                embed.setTitle(`〢Page ${page}`)
                embed.setDescription(description);

                await interaction.editReply({ embeds: [embed], components: [buttons] });
            }
            if (interaction.customId === 'next') {
                await interaction.deferUpdate();

                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                let description =
                    `**_Roles :_**\n` +
                    interaction.guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(r => r)
                        .slice(i0, i1)
                        .join("\n");

                embed.setTitle(`〢Page ${page}`)
                embed.setDescription(description);

                await interaction.editReply({ embeds: [embed], components: [buttons] });
            }
        });
        interaction.followUp({ embeds: [embed], components: [buttons] });
    }
}
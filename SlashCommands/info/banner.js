const { Client, CommandInteraction, MessageEmbed, BaseCommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'banner',
    description: 'Get the banner of a user',
    permission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'ATTCH_FILES'],
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Mention a user',
            name: 'user',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {

        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        let uid = user.id
        let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        })
        let receive = ''
        let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'
        response.then(a => {
            if (a.status !== 404) {
                a.json().then(data => {
                    receive = data['banner']
                    if (receive !== null) {
                        let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bot ${client.config.token}`
                            }
                        })
                        let statut = ''
                        response2.then(b => {
                            statut = b.status
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                            if (statut === 415) {
                                banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                            }

                        })
                    }
                })
            }
        })
        setTimeout(() => {
            let bannerEmbed = new MessageEmbed()
                .setDescription(`<@${user.user.id}>**_'s Banner :_**`)
                .setImage(banner)
                .setColor(client.config.color)
            // .setFooter('If theres no image its because \nthe user doesnt have a banner')
            interaction.followUp({ embeds: [bannerEmbed] });
        }, 1000)
    }
}
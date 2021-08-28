const { Client, Util, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Schema = require('../../models/reactions')
module.exports = {
    name: 'reactionroleadd',
    description: 'Add a role to the database',
    permission: ['ADMINISTRATOR'],
    ownerOnly: true,
    options: [
        {
            name: 'role',
            type: 'ROLE',
            description: 'What role do u want to add to the Datanase?',
            required: true
        },
        {
            name: 'emoji',
            type: 'STRING',
            description: 'Select the emoji',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const role = interaction.guild.roles.cache.get(args[0])
        let [, emoji] = args[1];

        const parsedEmoji = Util.parseEmoji(emoji);
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]
                await Schema.findOneAndUpdate(
                    { Guild: interaction.guild.id },
                    data
                );
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,
                            }
                        ]
                    }
                }).save();
            }
            interaction.followUp({
                content: `${role} added to panel, use \`/panel\` to get all the roles again!`
            })
        })
    }
}
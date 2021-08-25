const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",

    run: async (client, message, args) => {
        const owner = ["749290595645653114", "873881757064261672"]
        if (!owner.includes(message.author.id)) return message.channel.send(
            new MessageEmbed()
                .setDescription("Owner Only!")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        )

        const input = args.join(' ');
        if (!input) return message.channel.send(
            new MessageEmbed()
                .setDescription(`huh, provide some text`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        )
        if (!input.toLowerCase().includes('token')) {

            let embed = ``;

            try {
                let output = eval(input);
                if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

                embed = `\`\`\`js\n${output.length > 1024 ? 'Too large' : output}\`\`\``

            } catch (err) {
                embed = `\`\`\`js\n${err.length > 1024 ? 'Too large' : err}\`\`\``
            }

            message.channel.send(embed);

        } else {
            message.channel.send('my token huh?');
        }
    }
}
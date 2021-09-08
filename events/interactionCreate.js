const client = require("../index");
const { MessageEmbed } = require('discord.js')
client.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured" });

        const args = [];
        const cmdLog = new MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Command Used :', value: `${interaction.commandName}`, inline: true
                },
                {
                    name: 'Used Βy :', value: `<@${interaction.user.id}>`, inline: true
                },
                {
                    name: 'Guild :', value: `${interaction.guild.name}`, inline: true
                },
                {
                    name: 'User ID :', value: `${interaction.user.id}`, inline: true
                },
                {
                    name: 'Guild ID :', value: `${interaction.guild.id}`, inline: true
                }
            )
            .setColor(client.config.color)
        const cmdCh = client.channels.cache.get('865348763764916244');
        cmdCh.send({
            embeds: [cmdLog]
        })

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        const permission = interaction.member.permissions.has(cmd.permission);
        if (!permission) return interaction.followUp({ content: client.config.lock + "Hi you don't have **VALID** perms to run this command" });

        const botPermission = interaction.guild.me.permissions.has(cmd.botPermission);
        if (!botPermission) return interaction.followUp({ content: client.config.lock + "Hi i don't have **VALID** perms to run this command" });

        const config = require("../config.json");
        if (cmd.ownerOnly && interaction.member.id !== config.owner) return interaction.followUp({ content: client.config.lock + "This is developers **ONLY** command" });
        interaction.member = interaction.guild.members.cache.get(interaction.user.id)

        cmd.run(client, interaction, args);
    }
});

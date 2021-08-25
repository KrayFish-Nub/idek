const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

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

        if (!permission) return interaction.followUp({ content: client.config.lock + "Hi you don't have **V A L I D** perms" });
        const config = require("../config.json");
        if (cmd.ownerOnly && interaction.member.id !== config.owner) return interaction.followUp({ content: client.config.lock + "This is owner **O N L Y** command" });
        interaction.member = interaction.guild.members.cache.get(interaction.user.id)

        cmd.run(client, interaction, args);
    }
});

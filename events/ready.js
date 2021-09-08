const client = require("../index");

client.on("ready", () => {
    const tag = require('./tag')
    tag(client)
    setInterval(() => {
        let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
        client.user.setActivity(`${membersCount} Champions`, { type: "WATCHING" });
    }, 60000);
    client.user.setPresence({
        status: "dnd",
    });
});

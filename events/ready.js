const client = require("../index");

client.on("ready", () => {
    const tag = require('./tag')
    tag(client)
    client.user.setPresence({
        status: "dnd",
    })
});

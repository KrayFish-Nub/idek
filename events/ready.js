const client = require("../index");
client.on("ready", () => {
    const tag = require('./tag')
    // const antiCrash = require('./antiCrash')
    // antiCrash(client)
    tag(client)

    let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
    console.log(`\n`)

    console.log(`    ░░░░░░░░░░░░░░░▄▀▄░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░▄▀░░░▀▄░░░░░░░░░░░░░  卍 Logged in as : ${client.user.username}
    ░░░░░░░░░░░▄▀░░░░▄▀█░░░░░░░░░░░░░  
    ░░░░░░░░░▄▀░░░░▄▀░▄▀░▄▀▄░░░░░░░░░  卍 Guilds : ${client.guilds.cache.size}
    ░░░░░░░▄▀░░░░▄▀░▄▀░▄▀░░░▀▄░░░░░░░
    ░░░░░░░█▀▄░░░░▀█░▄▀░░░░░░░▀▄░░░░░  卍 Users : ${membersCount}
    ░░░▄▀▄░▀▄░▀▄░░░░▀░░░░▄█▄░░░░▀▄░░░
    ░▄▀░░░▀▄░▀▄░▀▄░░░░░▄▀░█░▀▄░░░░▀▄░
    ░█▀▄░░░░▀▄░█▀░░░░░░░▀█░▀▄░▀▄░▄▀█░
    ░▀▄░▀▄░░░░▀░░░░▄█▄░░░░▀▄░▀▄░█░▄▀░
    ░░░▀▄░▀▄░░░░░▄▀░█░▀▄░░░░▀▄░▀█▀░░░
    ░░░░░▀▄░▀▄░▄▀░▄▀░█▀░░░░▄▀█░░░░░░░
    ░░░░░░░▀▄░█░▄▀░▄▀░░░░▄▀░▄▀░░░░░░░
    ░░░░░░░░░▀█▀░▄▀░░░░▄▀░▄▀░░░░░░░░░
    ░░░░░░░░░░░░░█▀▄░▄▀░▄▀░░░░░░░░░░░
    ░░░░░░░░░░░░░▀▄░█░▄▀░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░▀█▀░░░░░░░░░░░░░░░`)

});

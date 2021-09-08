const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    BotZ: String
})

module.exports = mongoose.model('botzCount', Schema)
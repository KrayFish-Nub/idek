const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Bots: String
})

module.exports = mongoose.model('channelCount', Schema)
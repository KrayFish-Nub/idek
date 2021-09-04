const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    VcChannels: String
})

module.exports = mongoose.model('voiceChannelCount', Schema)
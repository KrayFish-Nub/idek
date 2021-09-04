const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    TxtChannels: String
})

module.exports = mongoose.model('txtChannelCount', Schema)
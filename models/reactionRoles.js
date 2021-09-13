const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Role: String,
    Emoji: String
})

module.exports = mongoose.model('reactionRole', Schema)
const mongoose = require('mongoose');

const sugSchema = new mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model('suggestions-channels', sugSchema);
var mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    avatar: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema);
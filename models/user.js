var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    googleId: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);
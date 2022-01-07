var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    googleId: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);
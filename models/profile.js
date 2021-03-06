const mongoose = require('mongoose');
const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: String,
    avatar: String,
    bio: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    boutList: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    faction: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema);
var mongoose = require('mongoose');
const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: String,
    avatar: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema);
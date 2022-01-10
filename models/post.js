var mongoose = require('mongoose');
const Schema = mongoose.Schema

const replySchema = new Schema({
    repliedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    content: String
})

const postSchema = new Schema({
    title: String,
    content: String,
    postedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    replies: [replySchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
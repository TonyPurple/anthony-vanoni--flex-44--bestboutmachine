var mongoose = require('mongoose');
const Schema = mongoose.Schema

const replySchema = new Schema({
    repliedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    content: { type: String, required: true },
    userName: String
}, {
    timestamps: true
})

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    replies: [replySchema],
    userName: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
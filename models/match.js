var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: { type: Number, min: 0, max: 7 },
    reviewer: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    userName: String
}, {
    timestamps: true
});

const matchSchema = new mongoose.Schema({
    promotion: { type: String },
    event: {
        type: String,
    },
    date: {
        type: Date,
    },
    wrestler: { type: String },
    matchType: {
        type: String,
    },
    result: {
        type: String,
    },
    reviews: [reviewSchema],
    nominatedBy: { type: Schema.Types.ObjectId, ref: "Profile" },
    bestBoutedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    userName: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Match', matchSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: { type: String, required: true },
    rating: { type: Number, min: 0, max: 7 },
    reviewer: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    userName: String
}, {
    timestamps: true
});

//declare current date variable to manipulate for default date
let curDate = new Date().toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
// let curDate = new Date(new Date().setHours(0, 0, 0, 0))

const matchSchema = new mongoose.Schema({
    promotion: { type: String, required: true },
    event: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: curDate
    },
    wrestlers: { type: String, required: true },
    matchType: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    nominatedBy: { type: Schema.Types.ObjectId, ref: "Profile" },
    bestBoutedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    userName: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Match', matchSchema);
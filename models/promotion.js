const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }],
    country: {
        type: String,
        required: true
    },
    roster: [{
        type: String,
    }],
    addedBy: { type: Schema.Types.ObjectId, ref: "Profile" },
    userName: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Promotion', promotionSchema);
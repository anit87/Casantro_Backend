const mongoose = require("mongoose")
const { Schema } = mongoose;

const catalogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required.']
    },
    otp: {
        type: Number
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    interestedIn: {
        type: Number,
        required: [true, 'Please provide your interest']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    date: { type: Date, default: Date.now },
});

const CatalogUser = mongoose.model('catalogUser', catalogSchema);

module.exports = CatalogUser
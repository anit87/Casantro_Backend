const mongoose = require("mongoose")
const { Schema } = mongoose;

const catalogSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    date: { type: Date, default: Date.now },
});

const CatalogUser = mongoose.model('catalogUser', catalogSchema);

module.exports = CatalogUser
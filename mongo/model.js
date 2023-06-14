const mongoose = require("mongoose");

const dressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        currdate: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

const dress = mongoose.model("dress", dressSchema);

module.exports = dress
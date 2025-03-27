const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        img:{
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        people_who_rate: {
            type: Number,
            required: true
        },
        reviews: [
            {
                user: {
                    type: String,
                    ref: "users",
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        _id: true
    }
)

module.exports = mongoose.models.products || mongoose.model("products", StorageSchema)
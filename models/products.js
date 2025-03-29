const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
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
        },
        people_who_rate: {
            type: Number,
        },
        reviews: [
            {
                id_user: {
                    type: String,
                    ref: "users",
                },
                name_user: {
                    type: String,
                
                },
                img_user: {
                    type: String
                },
                comment: {
                    type: String,
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
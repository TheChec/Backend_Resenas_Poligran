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
        category:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0

        },
        people_who_rate: {
            type: Number,
            default: 0
            
        },
        reviews: {
            type: [{
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
            }],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false,
        _id: true
    }
)

module.exports = mongoose.models.products || mongoose.model("products", StorageSchema)
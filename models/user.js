const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "user"], 
            default: "user",
        }
    },
    {
        versionKey: false,
        timestamps: true,
        _id: true

    }
)

module.exports = mongoose.models.User || mongoose.model("User", StorageSchema)
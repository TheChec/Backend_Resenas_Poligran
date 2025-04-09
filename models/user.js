const mongoose = require("mongoose")

/**
 * Modelo User (MongoDB con Mongoose)
 * 
 * - Define la estructura de un usuario:
 *    • name: nombre del usuario (String, requerido)
 *    • lastname: apellido del usuario (String, requerido)
 *    • img: URL o nombre de imagen (String, requerido)
 *    • age: edad del usuario (String, requerido)
 *    • email: correo único del usuario (String, requerido, único)
 *    • password: contraseña encriptada (String, requerido)
 *    • role: tipo de usuario (admin o user), por defecto 'user'
 * 
 * - Configuración del esquema:
 *    • versionKey desactivado (no se guarda "__v")
 *    • timestamps activados (createdAt y updatedAt automáticos)
 *    • _id incluido por defecto
 * 
 * - Exporta el modelo 'User' si no existe ya en mongoose.models
 */

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
        img: {
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
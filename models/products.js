const mongoose = require("mongoose")

/**
 * Modelo Products (MongoDB con Mongoose)
 * 
 * - Define la estructura de un producto:
 *    • name: nombre único en mayúsculas (String, requerido, único)
 *    • description: descripción del producto (String, requerido)
 *    • category: categoría del producto (String, requerido)
 *    • img: imagen del producto (String, requerido)
 *    • rating: puntuación promedio (Number, por defecto 0)
 *    • people_who_rate: total de personas que han calificado (Number, por defecto 0)
 *    • reviews: array de reseñas con:
 *         - id_user: ID del usuario que comenta (String, referencia)
 *         - name_user: nombre del usuario (String)
 *         - img_user: imagen del usuario (String)
 *         - comment: texto del comentario (String)
 *         - createdAt: fecha del comentario (Date, por defecto actual)
 * 
 * - Configuración del esquema:
 *    • timestamps activados (createdAt y updatedAt automáticos)
 *    • versionKey desactivado
 *    • _id incluido por defecto
 * 
 * - Exporta el modelo 'products' si no existe ya en mongoose.models
 */


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
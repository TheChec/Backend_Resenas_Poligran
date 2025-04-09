const products = require("../models/products");  // Correcta si 'products.js' está en 'models'
const boom = require("@hapi/boom")
const ProductCtrl = {}

/**
 * Controlador de Productos (ProductCtrl)
 * 
 * - Importa el modelo de productos y Boom para manejo de errores.
 * - Define operaciones CRUD y funcionalidades adicionales para productos.
 * 
 * Métodos:
 * 
 * PostProduct:
 *   • Crea un nuevo producto con los datos del body.
 * 
 * GetProduct:
 *   • Obtiene todos los productos de la base de datos.
 * 
 * DelProduct:
 *   • Elimina un producto por su ID recibido por parámetro.
 * 
 * UpdateProduct:
 *   • Actualiza un producto por ID con los datos recibidos.
 * 
 * ReviewsProduct:
 *   • Añade una reseña al producto por ID.
 *   • Verifica si el usuario ya comentó.
 *   • Actualiza el promedio de estrellas y la cantidad de personas que calificaron.
 * 
 * GetProductsByCategory:
 *   • Devuelve productos filtrados por categoría (ID recibido por parámetro).
 * 
 * - Exporta `ProductCtrl` para usarlo en las rutas.
 */


/**
 * Middleware de ejemplo
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

ProductCtrl.PostProduct = async (req, res, next) => {
    try {
        const newProduct = req.body 
        const savedProduct = await products.create(newProduct)
        res.status(200).send(
            {
                status: 200,
                message: "Se ha creado con exito el producto",
                data: savedProduct                 
            }
        )
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Error al crear el producto",
            error: error.message
        });
    }
}

ProductCtrl.GetProduct = async (req, res, next) => {   
    try {
        const Products = await products.find()
        res.status(200).send(
            {
                status: 200,
                message: "Se ha obtenido los productos con exitos",
                data: Products
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                message: "Error al obtener datos de los productos",
                error: error.message
            }
        )
    }
}

ProductCtrl.DelProduct = async (req, res, next) => {
    try {
        const _id = req.params.id
        const deleteProducts = await products.findByIdAndDelete(_id)
        res.status(200).send(
            {
                status: 200,
                message: "Se ha elimado el producto con exitos",
                data: deleteProducts
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                message: "Error al eliminar el producto",
                error: error.message
            }
        )
    }
}

ProductCtrl.UpdateProduct = async (req, res, next) => {
    try {
        const Product = req.body
        const _id = req.params.id
        const UpdateProduct = await products.findByIdAndUpdate(_id,Product, {new: true})
        res.status(200).send(
            {
                status: 200,
                message: "Se a actualizado el producto",
                data: UpdateProduct
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                message: "Error al actualizar el producto",
                error: error.message
            }
        )
    }
}

ProductCtrl.ReviewsProduct = async (req, res, next) => {
    try {
        const review = req.body;
        const _id = req.params.id;

        const existProducto = await products.findById(_id);
        if (!existProducto) {
            return res.status(404).send({
                status: 404,
                message: "El producto no ha sido encontrado"
            });
        }

        const yaComento = existProducto.reviews.some(
            (r) => r.id_user === review.id_user
        );

        if (!yaComento) {
            existProducto.people_who_rate += 1;
        }

        existProducto.reviews.push({
            id_user: review.id_user,
            name_user: review.name_user,
            img_user: review.img_user,
            comment: review.comment,
            createdAt: new Date()
        });

        // Calcular nuevo promedio
        const totalEstrellas = existProducto.rating * (existProducto.people_who_rate - (yaComento ? 0 : 1)) + review.stars;
        const nuevoPromedio = totalEstrellas / existProducto.people_who_rate;

        // Actualizar rating
        existProducto.rating = parseFloat(nuevoPromedio.toFixed(1));

        const UpdateProduct = await existProducto.save();

        res.status(200).send({
            status: 200,
            message: "Se ha hecho una reseña",
            data: UpdateProduct
        });

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Error al actualizar la review",
            error: error.message
        });
    }
};



ProductCtrl.GetProductsByCategory = async (req, res, next) => {
    try {
        const id = req.params.idcat
        const productFilters = await products.find({ category: id });
        res.status(200).send(
            {
                status: 200,
                message: "Se han traido todos los productos por categoria",
                data: productFilters
            }
        )

    }catch (error) { 
        res.status(500).send(
            {
                status: 500, 
                message: "Error al traer los productos por categoria",
                error: error.message
            }
        )
        
    }
}
module.exports = ProductCtrl
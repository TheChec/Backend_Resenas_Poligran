const products = require("../models/products");  // Correcta si 'products.js' está en 'models'
const boom = require("@hapi/boom")
const ProductCtrl = {}

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

module.exports = ProductCtrl
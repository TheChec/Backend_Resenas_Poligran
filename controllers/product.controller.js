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

module.exports = ProductCtrl
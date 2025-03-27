const express = require("express")
const router = express.Router()
const ProductCtrl = require("../controllers/product.controller");  // Correcta si el controlador está en la carpeta 'controllers'

router.post("/",ProductCtrl.PostProduct)
router.get("/",ProductCtrl.GetProduct)

module.exports = router


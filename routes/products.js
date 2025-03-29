const express = require("express")
const router = express.Router()
const ProductCtrl = require("../controllers/product.controller");  // Correcta si el controlador está en la carpeta 'controllers'

router.post("/",ProductCtrl.PostProduct)
router.get("/",ProductCtrl.GetProduct)
router.delete("/:id",ProductCtrl.DelProduct)
router.put("/:id",ProductCtrl.UpdateProduct)
router.get("/review/:id",ProductCtrl.ReviewsProduct)
module.exports = router

const express = require("express")
const router = express.Router()
const ProductCtrl = require("../controllers/product.controller");   
const upload = require('../middlewares/multer')

router.post("/",upload.single('file'), ProductCtrl.PostProduct)
router.get("/",ProductCtrl.GetProduct)
router.put("/review/:id",ProductCtrl.ReviewsProduct)
router.get("/categoria/:idcat",ProductCtrl.GetProductsByCategory)
router.delete("/:id",ProductCtrl.DelProduct)
router.put("/:id",ProductCtrl.UpdateProduct)

module.exports = router

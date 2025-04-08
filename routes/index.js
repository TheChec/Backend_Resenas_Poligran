const express = require("express")
const boom = require("@hapi/boom")
const fs = require("fs")
const router = express.Router()
const path = require('path');
const pathRouter = `${__dirname}`

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
    const name = removeExtension(file)

    if(name!=="index"){
        router.use(`/api/${name}`, require(`./${name}`))
        console.log('Ruta cargada -----> ', name, ' <-------')
    }

})

router.use('/public/images', express.static(path.resolve('./storage')));



router.get('*', (req, res,next) => {
    console.log(`Acceso a la ruta: ${req.method} ${req.url}`);
    next(boom.badRequest("ROUTE_NOT_FOUD",400))
})



module.exports = router
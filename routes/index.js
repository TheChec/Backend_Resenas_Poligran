const express = require("express")
const boom = require("@hapi/boom")
const fs = require("fs")
const router = express.Router()
const path = require('path');
const pathRouter = `${__dirname}`

/**
 * Archivo de rutas principal (routes/index.js)
 * 
 * Funcionalidades principales:
 * ----------------------------------------------------------------------
 * 1. **Crea un enrutador con Express**:
 *    - `const router = express.Router()` se usa para manejar todas las rutas del proyecto.
 * 
 * 2. **Carga dinámica de rutas**:
 *    - Se leen todos los archivos del directorio actual (`routes/`) usando `fs.readdirSync`.
 *    - Se eliminan las extensiones de los nombres de archivo (`removeExtension`).
 *    - Se ignora el archivo `index.js` para evitar autoreferencia.
 *    - Cada archivo encontrado se carga dinámicamente con `require` y se monta en:
 *         👉 `/api/{nombreDelArchivo}`.
 *    - Ejemplo: si existe `products.js`, se accede desde `/api/products`.
 *    - También se imprime en consola qué rutas fueron cargadas.
 * 
 * 3. **Ruta estática para archivos públicos**:
 *    - Expone imágenes desde la carpeta `storage`:
 *         👉 Disponible en `/public/images`.
 *    - Útil para servir imágenes subidas o recursos multimedia.
 * 
 * 4. **Manejo de rutas no encontradas**:
 *    - Para cualquier ruta no definida (`'*'`), se lanza un error Boom:
 *         👉 `boom.badRequest("ROUTE_NOT_FOUND", 400)`
 *    - También imprime en consola qué ruta se intentó acceder.
 */


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
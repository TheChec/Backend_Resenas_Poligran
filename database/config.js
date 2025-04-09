const mongoose = require('mongoose')

/**
 * Conexión a la base de datos (MongoDB)
 * 
 * - Utiliza Mongoose para conectarse a la base de datos.
 * - La URI de conexión debe estar definida en las variables de entorno (process.env.DB_URI).
 * - En caso de éxito, muestra un mensaje en consola.
 * - En caso de error, lo imprime en consola.
 * 
 * Uso:
 *   Este módulo exporta una función `dbConnect` que debe ser llamada al iniciar el servidor.
 */


const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI).then((res) => console.log("Base de datos conectada correctamente"))
      .catch((err) => console.error(err))
}

module.exports = dbConnect
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("../routes")
const app = express()
const conection_mongoDB = require("../database/config")
const { boomErrorHandler, errorHandler, logErrors } = require('../utils/BoomErrors')
const PORT = process.env.PORT || 3000

/**
 * Archivo principal del servidor Express.
 * 
 * Funcionalidades principales:
 * ---------------------------------------------------------
 * 1. **Carga de variables de entorno**:
 *    - Utiliza `dotenv` para leer `.env`.
 * 
 * 2. **Configuración del servidor Express**:
 *    - Se crea una instancia de la aplicación con `express()`.
 *    - Middleware para parsear JSON: `app.use(express.json())`.
 * 
 * 3. **CORS (Cross-Origin Resource Sharing)**:
 *    - Se define una **whitelist** con los orígenes permitidos:
 *        - `http://localhost:4200` (desarrollo Angular).
 *        - `https://frontend-resenas-poligran.vercel.app` (producción).
 *    - Configuración personalizada para aceptar solo orígenes autorizados.
 *    - Permite enviar `credentials` si es necesario.
 * 
 * 4. **Routing**:
 *    - Se importa el archivo de rutas central (`../routes`) y se monta con `app.use(router)`.
 * 
 * 5. **Manejo de errores** (con Boom.js):
 *    - `logErrors`: Logger de errores.
 *    - `boomErrorHandler`: Manejo específico para errores Boom.
 *    - `errorHandler`: Middleware final para cualquier otro error.
 * 
 * 6. **Conexión a base de datos MongoDB**:
 *    - Se importa y ejecuta la conexión desde `../database/config`.
 * 
 * 7. **Inicialización del servidor**:
 *    - Escucha en el puerto definido en `.env` o por defecto `3000`.
 *    - Muestra mensaje en consola al levantar.
 */


app.use(express.json())

const whitelist = [
    'http://localhost:4200',
    'https://frontend-resenas-poligran.vercel.app'
  ];
  
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // si necesitas enviar cookies o headers personalizados
  };
  
app.use(cors(corsOptions))
app.use(router)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:"+PORT)
})

conection_mongoDB()


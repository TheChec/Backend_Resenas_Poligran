require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("../routes")
const app = express()
const conection_mongoDB = require("../database/config")
const { boomErrorHandler, errorHandler, logErrors } = require('../utils/BoomErrors')
const PORT = process.env.PORT || 3000
const path = require('path');

app.use(express.json())

const whitelist = process.env.URL_PRODUCTION || ['http://localhost:8080', 'http://localhost:4200', 'https://frontend-resenas-poligran.vercel.app']

const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
app.use(cors(options_cors))
app.use(router)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Escuchando en http://localhost:"+PORT)
})

conection_mongoDB()


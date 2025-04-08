require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("../routes")
const app = express()
const conection_mongoDB = require("../database/config")
const { boomErrorHandler, errorHandler, logErrors } = require('../utils/BoomErrors')
const PORT = process.env.PORT || 3000

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


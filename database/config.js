const mongoose = require('mongoose')

const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI).then((res) => console.log("Base de datos conectada correctamente"))
      .catch((err) => console.error(err))
}

module.exports = dbConnect
const User = require('../models/user')
const { verifyPassword } = require('../utils/bcrypt')
const boom = require('@hapi/boom')
const LoginCtrl = {}


LoginCtrl.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const LoginUser = await User.findOne({ email: email })

        if (!LoginUser) {
            throw new Error("El usuario no existe")
        }

        const isMatch = await verifyPassword(password, LoginUser.password)


        if (!isMatch) {
            throw new Error("Las contraseñas no son correctas")
        }

        res.status(200).send(
            {
                status: 200,
                message: "Usuario identificado, iniciando sesión...",
                data: {
                    _id: LoginUser._id,
                    role: LoginUser.role,
                    name: LoginUser.name,
                    lastName: LoginUser.lastname,
                    img: LoginUser.img,
                }
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                message: "Ha ocurrido un error al intentar iniciar sesión",
                error: error.message
            }
        )
    }
}

module.exports = LoginCtrl
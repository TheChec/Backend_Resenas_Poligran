const User = require('../models/user')
const boom = require('@hapi/boom')
const {hashPassword} = require('../utils/bcrypt')
const UserCtrl = {}

/**
 * Middleware de ejemplo
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

UserCtrl.GetUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send({
            status: 200,
            message: "Se han obtenido correctamente todos los usuarios",
            data: users
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error al obtener los usuarios",
            error: error.message
        });
    }
};

UserCtrl.GetUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return next(boom.notFound("Usuario no encontrado"));

        res.status(200).send({
            status: 200,
            message: "Usuario encontrado con éxito",
            data: user
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error al intentar buscar un solo usuario",
            error: error.message
        });
    }
};

UserCtrl.PostUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        newUser.password = await hashPassword(newUser.password)

        if (!newUser.img) {
            throw(new Error,  "Error al enviar la imagen")
        }

        const user = await User.create(newUser);
        res.status(201).send({
            status: 201,
            message: "Se ha creado con éxito el usuario",
            data: user
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error al intentar crear un usuario",
            error: error.message
        });
    }
};

UserCtrl.UpdateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) return next(boom.notFound("Usuario no encontrado"));

        res.status(200).send({
            status: 200,
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error al intentar actualizar el usuario",
            error: error.message
        });
    }
};

UserCtrl.DeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return next(boom.notFound("Usuario no encontrado"));

        res.status(200).send({
            status: 200,
            message: "Usuario eliminado correctamente",
            data: deletedUser
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error al intentar eliminar el usuario",
            error: error.message
        });
    }
};

module.exports = UserCtrl;

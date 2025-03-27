const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user.controller');

router.get("/", UserCtrl.GetUsers); // Obtener todos los usuarios
router.get("/:id", UserCtrl.GetUserById); // Obtener usuario por ID
router.post("/", UserCtrl.PostUser); // Crear usuario
router.put("/:id", UserCtrl.UpdateUser); // Actualizar usuario
router.delete("/:id", UserCtrl.DeleteUser); // Eliminar usuario

module.exports = router;

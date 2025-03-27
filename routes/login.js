const express = require('express')
const router = express.Router()
const LoginCtrl = require('../controllers/login.controller')

router.post("/", LoginCtrl.Login)

module.exports = router
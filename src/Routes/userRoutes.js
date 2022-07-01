'use strict'


//Librerias

var express = require('express')
var userController = require('../Controllers/userController')

//Middlewares

var authUtils = require('../../security/auth')

//Inicio Router

var userRouter = express.Router()

//Rutas de usuario

userRouter.post('/register', userController.registerUser)

userRouter.post('/login', userController.loginUser)

userRouter.get('/userInfo/:id', authUtils.verifyTokenUser, userController.getUser)

userRouter.post('/changeData', authUtils.verifyTokenUser, userController.changeData)

//Exportación del modulo

module.exports = userRouter

'use strict'

//librerias

var validator = require('validator');

var bcryptjs = require('bcryptjs')

var jwt = require('jsonwebtoken')

//Modelo

var userModel = require('../Models/userModel')


//Controlador

const userController = {
    //Registrar Usuario
    registerUser: (req, res) => {
        var params = req.body

        try {
            const validateName = !validator.isEmpty(params.name)
            const validateEmail = !validator.isEmpty(params.email)
            const validatePassword = !validator.isEmpty(params.password)
            const validateAge = !validator.isEmpty(params.name)
        }  catch {
            return res.status(400).send({
                status: 'error',
                message: ('Se requiere que todos los campos sean diligenciados')
            })
        }

        //Verificar que un usuario no este repetido

        userModel.findOne({name: params.name}).exec((err, queryResult) => {
            if (err) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Ha habido un error al guardar los datos'
                })
            } else if (queryResult) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Hay un usuario registrado con este nombre'
                })
            } else {
                var user = new userModel()

                //Encriptación Contraseña
                var salt = bcryptjs.genSaltSync(10)
                var cryptPassword = bcryptjs.hashSync(params.password, salt)

                user.password = cryptPassword
                user.email = params.email
                user.age = params.age
                user.name = params.name
                user.profilePicture = null

                user.save((err, queryResult) => {
                    if (err || !queryResult) {
                        return res.status(400).send({
                            status: 'error',
                            message: 'Ha habido un error al guardar los datos'
                        })
                    } else {
                        return res.status(201).send({
                            status: 'success'
                        })
                    }
                })
            }
        })
    },
    //Inicio de Sesión de Usuario
    loginUser: (req, res) => {
        var params = req.body

        try {
            var validateName = !validator.isEmpty(params.name)
            var validatePassword = !validator.isEmpty(params.password)
        } catch {
            return res.status(400).send({
                status: 'error',
                message: ('Se requiere que todos los campos sean diligenciados')
            })
        }

        userModel.findOne({"name": params.name}).exec((err,queryResult)=>{

            if(err){
                return res.status(400).send({
                    status: 'error',
                    message: 'Ha habido un error al consultar los datos'
                })
            } else if (!queryResult) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se han encontrado resultados con estos datos'
                })
            } else {
                //Validación de usuario
                const checkPassword = bcryptjs.compareSync(params.password, queryResult.password)

                //Genereción Token JWT

                if (checkPassword) {
                    const token = jwt.sign({
                        name: queryResult.name,
                        id : queryResult._id
                    }, process.env.JWT_KEY)

                    queryResult.password = null

                    return res.header('API_KEY',token).status(201).send({
                        status : 'success',
                        user : queryResult
                    })
                } else {
                    return res.status(400).send({
                        status: 'error',
                        message: 'La contraseña ingresada es incorrecta'
                    })
                }
            }
        })
    },
    //Obtener información de un usuario
    getUser: (req, res) => {
        var userId = req.params.id

        if (!userId || userId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el usuario ingresado'
            })
        } else {
            userModel.findById(userId, (err, queryResult) => {
                if (err || !queryResult) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el usuario ingresado'
                    })
                } else {
                    queryResult.password = null
                    return res.status(200).send({
                        status: 'success',
                        user: queryResult
                    });
                }
            })
        }
    },
    //Cambiar imagen de perfil
    changeProfilePicture: (req, res) => {
        var params = req.body

        userModel.findOne({_id: params.id}).exec((err,queryResult)=>{

            if(err){
                return res.status(400).send({
                    status: 'error',
                    message: 'Ha habido un error al consultar los datos'
                })
            } else if (!queryResult) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se han encontrado resultados con estos datos'
                })
            } else {
                //Validación de usuario
                const checkPassword = bcryptjs.compareSync(params.password, queryResult.password)

                if (checkPassword) {
                    userModel.updateOne({_id: params.id}, {$set: {profilePicture: params.imageUrl}}).exec((err, queryResult) => {

                        if (err) {
                            return res.status(400).send({
                                status: 'Error',
                                message: 'Error al retornar los datos'
                            })
                        } else if (!queryResult) {
                            return res.status(404).send({
                                status: 'Error',
                                message: 'No se han encontrado datos relacionados'
                            })
                        } else {
                            return res.status(200).send({
                                status: 'Success'
                            })
                        }
            
                    })
                } else {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Solo le usuario dueño de la cuenta puede cambiar su imagen de perfil'
                    })
                }
            }
        })
    }
}

//Exportación del modulo

module.exports = userController
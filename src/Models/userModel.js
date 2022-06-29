'use strict'

//Importe e inicialización de esquemas Mongoose

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Esquema de Usuario

var userSchema = schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    profilePicture: String
})

//Exportación del Esquema

module.exports = mongoose.model('User', userSchema)
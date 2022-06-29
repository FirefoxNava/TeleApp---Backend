'use strict'

//Importe e inicialización de esquemas Mongoose

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Esquema de Usuario

var articleSchema = schema({
    name: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    image: String,
    comments: [Object]
})

//Exportación del Esquema

module.exports = mongoose.model('Article', articleSchema)
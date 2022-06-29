'use strict'

//Librerias y Modulos

var mongoose = require('mongoose');
var app = require('./app')

//Importe e Inicialización DOTENV
require('dotenv').config()

//Ajustes Mongoose
mongoose.Promise = global.Promise;

//Ruta MongoDB

var dbUrl = 'mongodb+srv://'+process.env.MONGO_CREDENTIAL+'@cluster0.gourjms.mongodb.net/TeleAppDataBase?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true}).then(() => {
    console.log('Conexión establecida con MongoDB')
    //Ejecución Express

    app.listen(process.env.PORT, () => {
        console.log('Servidor corriendo en el puerto ' + process.env.PORT)
    })
})
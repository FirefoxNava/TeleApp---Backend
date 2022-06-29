'use strict'

//Configuración de Express Js

//Importes

var express = require('express')
var bodyParser = require('body-parser')

//Ejecución Express Js

var app = express()

//Carga de rutas

const userRoutes = require('./src/Routes/userRoutes')
const articleRoutes = require('./src/Routes/articleRoutes')


//Middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, API_KEY');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Expose-Headers', 'API_KEY')
    next();
});


//Inyección de Rutas a Express Js

app.use('/user', userRoutes)
app.use('/article', articleRoutes)

//Exportar

module.exports = app;
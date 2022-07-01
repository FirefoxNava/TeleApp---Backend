'use strict'


//Librerias

var express = require('express')
var articleController = require('../Controllers/articleController')

//Middlewares

var authUtils = require('../../security/auth')

//Inicio Router

var articleRouter = express.Router()

//Rutas de Publicaciones

articleRouter.post('/save', authUtils.verifyTokenUser, articleController.createArticle)

articleRouter.post('/addComment', authUtils.verifyTokenUser, articleController.addComment)

articleRouter.get('/articleInfo/:id', authUtils.verifyTokenUser, articleController.getArticle)

articleRouter.get('/articles', authUtils.verifyTokenUser, articleController.getArticles)

articleRouter.get('/articleAuthor/:id', authUtils.verifyTokenUser, articleController.getArticlesByAuthorId)

//Exportación del modulo

module.exports = articleRouter
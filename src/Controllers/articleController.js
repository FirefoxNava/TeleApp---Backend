'use strict'

//librerias

var validator = require('validator');

//Modelo

var articleModel = require('../Models/articleModel')


//Controlador

const articleController = {
    //Crear Publicación
    createArticle: (req, res) => {
        var params = req.body

        try {
            const validateName = !validator.isEmpty(params.name)
            const validateContent = !validator.isEmpty(params.content)
        }  catch {
            return res.status(400).send({
                status: 'error',
                message: ('Se requiere que todos los campos sean diligenciados')
            })
        }

        var article = new articleModel()

        article.content = params.content
        article.authorName = params.authorName
        article.authorId = params.authorId
        article.image = params.image

        article.save((err, queryResult) => {
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
    },
    //Comentar Publicación
    addComment: (req, res) => {
        var params = req.body

        articleModel.findOneAndUpdate({_id: params.id}, {$push: {comments: params.comment}}).exec((err, queryResult) => {
            if (err) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            } else {
                return res.status(200).send({
                    status: 'success'
                });
            }

        })
    },
    //Obtener información de publicación
    getArticle: (req, res) => {
        var articleId = req.params.id

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe esta publicación'
            })
        } else {
            articleModel.findById(articleId, (err, queryResult) => {
                if (err || !queryResult) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe esta publicación'
                    })
                } else {
                    return res.status(200).send({
                        status: 'success',
                        queryResult
                    });
                }
            })
        }
    },
    //Obtener todas las publicaciones
    getArticles: (req, res) => {
        articleModel.find({}).sort('date').exec((err, queryResult) => {

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
                    status: 'Success',
                    articles: queryResult
                })
            }

        })
    },
    //Obtener Articulos por Usuario
    getArticlesByAuthorId: (req, res) => {
        var authorId = req.params.id

        if (!authorId || authorId == null || authorId == undefined){
            return res.status(404).send({
                status: 'error',
                message: 'Se debe ingresar una ID'
            })
        } else {
            articleModel.find({"authorId" : authorId}).sort('date').exec((err, queryResult) => {

                if (err) {
                    return res.status(400).send({
                        status: 'Error',
                        message: 'Error al retornar los datos'
                    })
                } else {
                    return res.status(200).send({
                        status: 'Success',
                        articles: queryResult
                    })
                }
    
            })
        }
    }
}

//Exportación del modulo

module.exports = articleController
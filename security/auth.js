//Librerias

var jwt = require('jsonwebtoken')


var authUtils = {
    verifyTokenUser : (req, res, next) => {
        //Verificar Header con Token
        const token = req.header('API_KEY')

        if (!token) return res.status(401).send({
            status : 'error',
            message : 'Acceso Denegado'
        })

        try {
            jwt.verify(token, process.env.JWT_KEY)
            return next()
        } catch{
            return res.status(400).send({
                status : 'error',
                message : 'Token no Valido'
            })
        }
    },
}

module.exports = authUtils
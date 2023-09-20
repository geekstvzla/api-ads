var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')
var mikrowispModel = require('../models/mikrowisp.js')

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index', { title: 'SERVIDOR CONEXPRO' });
})

router.post('/signin', async function(req, res, next) {

    let userEmail = req.query.email
    let userPass = req.query.password
    let apiSettings = await mikrowispModel.apiSettings()
    let params = {
        method: 'post',
        params: {
            codigo: userPass, correo: userEmail, token : apiSettings.token
        },
        url: apiSettings.url+'GetClientsDetails'
    }
    let apiReq = await mikrowispModel.apiRequest(params)

    if(apiReq.hasOwnProperty('datos')) {

        let userData = apiReq.datos[0]
        let userStatusCode = (userData.estado === "ACTIVO") ? 1 : 0
        let params = [
            userEmail,
            userData.nombre,
            userData.id
        ]
        let client = await usersModel.checkClientInfo(params)

        res.send({
            response: {
                data: {
                    id: userData.id,
                    email: userData.correo,
                    name: userData.nombre,
                    /*status: userData.estado,
                    statusCode: userStatusCode*/
                    status: "SUSPENDIDO",
                    statusCode: 0
                },
                message: "Autenticación exitosa!",
                status: "success",
                statusCode: 1
            }
        })

    } else {

        res.send({
            response: {
                message: "Usuario o contraseña incorrecta",
                status: "error",
                statusCode: 0,
            }
        })

    }

})

router.post('/recoverPassword', async function(req, res, next) {

    let userEmail = req.query.email
    let data = await usersModel.recoverPassword(userEmail)

    if(data.hasOwnProperty('datos')) {

        let userData = data.datos[0]

        res.send({
            response: {
                data: {
                    id: userData.id,
                    name: userData.nombre,
                    password: userData.codigo
                },
                message: "Datos enviados a tu correo electrónicosss2!",
                status: "success",
                statusCode: 1
            }
        })

    } else {

        res.send({
            response: {
                message: "No se encontró ningun usuario con ese correo electrónico",
                status: "error",
                statusCode: 0,
            }
        })

    }

})

module.exports = router;

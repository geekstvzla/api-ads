var express = require('express')
var router = express.Router()
var clientModel = require('../models/clients.js')
var mikrowispModel = require('../models/mikrowisp.js')

/* GET home page. */
router.get('/', async function(req, res, next) {

    res.render('index', { title: 'SERVIDOR CONEXPRO' });

});

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

        let user_data = apiReq.datos[0]
        let userStatusCode = (user_data.estado === "ACTIVO") ? 1 : 0
        let params = [
            userEmail,
            user_data.nombre,
            user_data.id
        ]
        let client = await clientModel.checkClientInfo(params)

        res.send({
            response: {
                data: {
                    id: user_data.id,
                    name: user_data.nombre,
                    status: user_data.estado,
                    statusCode: userStatusCode
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
        });

    }

})

router.post('/recoverPassword', async function(req, res, next) {

    let userEmail = req.query.email
    let apiSettings = await mikrowispModel.apiSettings()
    let params = {
        method: 'post',
        params: {
            correo: userEmail, token : apiSettings.token
        },
        url: apiSettings.url+'GetClientsDetails'
    }
    let apiReq = await mikrowispModel.apiRequest(params)

    if(apiReq.hasOwnProperty('datos')) {

        let user_data = apiReq.datos[0]

        res.send({
            response: {
                data: {
                    id: user_data.id,
                    name: user_data.nombre,
                    password: user_data.codigo
                },
                message: "Datos enviados a tu correo electrónico!",
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

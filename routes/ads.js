var express = require('express')
var router = express.Router()
var adsModel = require('../models/ads.js')
var clientModel = require('../models/clients.js')
var mikrowispModel = require('../models/mikrowisp.js')

/* Ver Publicidad */
router.get('/seeAds/', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let p = await clientModel.clientExist(params)
    res.send(p)
    /*let apiSettings = await mikrowispModel.apiSettings()
    let params = {
        method: 'post',
        params: {
            correo: userEmail, token : apiSettings.token
        },
        url: apiSettings.url+'GetClientsDetails'
    }
    let apiReq = await mikrowispModel.apiRequest(params)*/

    /*if(apiReq.hasOwnProperty('datos')) {

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

    }*/

})

module.exports = router;

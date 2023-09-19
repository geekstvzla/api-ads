var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')
var mikrowispModel = require('../models/mikrowisp.js')

router.post('/clientStatus', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let client = await usersModel.clientDetails(params)

    let apiSettings = await mikrowispModel.apiSettings()
    params = {
        method: 'post',
        params: {
            correo: client[0].client_email, token : apiSettings.token
        },
        url: apiSettings.url+'GetClientsDetails'
    }
    let apiReq = await mikrowispModel.apiRequest(params)
    let clientData = apiReq.datos[0]
    let clientStatusCode = (clientData.estado === "ACTIVO") ? 1 : 0
   
    res.send({
        response: {
            data: {
                status: clientData.estado,
                statusCode: clientStatusCode
            },
            message: "Estatus del cliente",
            status: "success",
            statusCode: 1
        }
    })

})

module.exports = router;

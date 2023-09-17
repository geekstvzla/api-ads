var express = require('express')
var router = express.Router()
var adsModel = require('../models/ads.js')
var clientModel = require('../models/clients.js')
var mikrowispModel = require('../models/mikrowisp.js')

/* Ver Publicidad */
router.get('/seeAds/', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let client = await clientModel.clientExist(params)

    if(client.length > 0) {

        let ads = await clientModel.adsToSee(params)
        res.send(ads)

    } else {

        res.send({
            response: {
                message: "No se encontró ningun cliente con ese ID",
                status: "error",
                statusCode: 0
            }
        })

    }

})

module.exports = router;

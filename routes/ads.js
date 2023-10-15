var express = require('express')
var router = express.Router()
var adsModel = require('../models/ads.js')
var usersModel = require('../models/users.js')

/* Ver Publicidad */
router.get('/seeAds/', async function(req, res, next) {

    let host = req.hostname
    let userId = req.query.userId
    let params = [userId, host]
    let client = await usersModel.clientExist(params)

    if(client) {

        let ads = await adsModel.adsToSee(params)
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

/* Vio publicidad */
router.post('/viewedAd/', async function(req, res, next) {

    let userId = req.query.userId
    let adId = req.query.adId
    let params = [userId, adId]
    let response = await adsModel.viewedAd(params)

    res.send(response)


})

module.exports = router;

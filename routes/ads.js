var express = require('express')
var router = express.Router()
var adsModel = require('../models/ads.js')
var usersModel = require('../models/users.js')

/* Ver Publicidad */
router.get('/see-ads/', async function(req, res, next) 
{

    let host = req.hostname
    let userId = req.query.userId
    let params = [userId, host]
    let client = await usersModel.userExist(params)

    if(client) 
    {

        let ads = await adsModel.adsToSee(params)
        res.send(ads)

    } 
    else 
    {

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
router.post('/viewed-ad/', async function(req, res, next) 
{

    let userId = req.query.userId
    let adId = req.query.adId
    let params = [userId, adId]
    let response = await adsModel.viewedAd(params)

    res.send(response)


})

module.exports = router;

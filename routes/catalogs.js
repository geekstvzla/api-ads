var express = require('express')
var router = express.Router()
var catalogsModel = require('../models/catalogs.js')

router.get('/ads-types-enabled', async function(req, res, next)
 {

    let data = await catalogsModel.adsTypesEnabled()
    res.send(data)

})

router.get('/currencies-enabled', async function(req, res, next)
 {

    let data = await catalogsModel.currenciesEnabled()
    res.send(data)

})

router.get('/genders', async function(req, res, next)
 {

    let data = await catalogsModel.genders()
    res.send(data)

})

module.exports = router;

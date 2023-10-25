var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')

router.post('/activateClient', async function(req, res, next) {

    let data = await usersModel.activateClient(req.query.userId)

    res.send(data)

})

router.post('/clientBalance', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let data = await usersModel.clientBalance(params)

    res.send(data)

})

router.post('/clientStatus', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let data = await usersModel.clientStatus(params)

    res.send(data)

})

module.exports = router;

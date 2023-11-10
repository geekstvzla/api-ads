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

router.post('/clientDeviceToken', async function(req, res, next) {

    let token = req.query.token
    let userId = req.query.userId
    let params = [userId, token]
    let data = await usersModel.clientDeviceToken(params)

    res.send(data)

})

router.post('/signup', async function(req, res, next) {

    let birthday = req.query.birthday
    let email = req.query.email
    let genderId = req.query.genderId
    let name = req.query.name
    let password = req.query.password
    let params = [name, email, password, genderId, birthday]
    let data = await usersModel.signup(params)

    res.send(data)

})

module.exports = router;

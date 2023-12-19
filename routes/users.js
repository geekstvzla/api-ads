var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')

router.post('/activateUserAccount', async function(req, res, next) {

    let userId = req.query.userId
    let params = [userId]
    let data = await usersModel.activateUserAccount(params)

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

router.post('/recover-password', async function(req, res, next) {

    let email = req.query.email
    let params = [email]
    let data = await usersModel.recoverPassword(params)

    res.send(data)

})

router.post('/sign-in', async function(req, res, next) {

    let email = req.query.email
    let password = req.query.password
    let deviceToken = req.query.token
    let params = [email, password, deviceToken]
    let data = await usersModel.signin(params)

    res.send(data)

})

router.post('/sign-up', async function(req, res, next) {

    let birthday = req.query.birthday
    let email = req.query.email
    let genderId = req.query.genderId
    let name = req.query.name
    let password = req.query.password
    let deviceToken = req.query.token
    let params = [name, email, password, genderId, birthday, deviceToken]
    let data = await usersModel.signup(params)

    res.send(data)

})

module.exports = router;

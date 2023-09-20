var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index', { title: 'SERVIDOR CONEXPRO' });
})

router.post('/signin', async function(req, res, next) {

    let params = {userEmail: req.query.email, userPass: req.query.password}
    let signin = await usersModel.signin(params)

    res.send(signin)

})

router.post('/recoverPassword', async function(req, res, next) {

    let data = await usersModel.recoverPassword(req.query.email)

    res.send(data)

})

module.exports = router;

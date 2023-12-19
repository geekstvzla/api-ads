var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')

router.get('/', async function(req, res, next) {
    res.render('index', { title: 'SERVIDOR CONEXPRO' });
})

/*
router.post('/recoverPassword', async function(req, res, next) {

    let data = await usersModel.recoverPassword(req.query.email)

    res.send(data)

})*/

module.exports = router;

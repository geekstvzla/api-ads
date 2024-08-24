var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')

router.get('/', async function(req, res, next) 
{
    res.render('index', { title: 'SERVIDOR CONEXPRO' });

})

module.exports = router;

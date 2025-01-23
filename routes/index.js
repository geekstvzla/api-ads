var express = require('express');
var router = express.Router();
var usersModel = require('../models/users.js');

router.get('/', async function(req, res, next) 
{

    try 
    {
    
        res.render('index', { title: 'SERVIDOR CONEXPRO' });

    } catch (err) {

        console.log("Ocurrió un error en index.js");
        console.log(err);
        next(err);

    };

});

module.exports = router;

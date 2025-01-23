var express = require('express');
var router = express.Router();
var usersModel = require('../models/users.js');

router.get('/', async function(req, res, next) 
{

    if(err)
    {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    } 
    else 
    {
    
        res.render('index', { title: 'SERVIDOR CONEXPRO' });

    };

});

module.exports = router;

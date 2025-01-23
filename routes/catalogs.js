var express = require('express');
var router = express.Router();
var catalogsModel = require('../models/catalogs.js');

router.get('/currencies-enabled', async function(req, res, next)
 {

    if(err)
    {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    } 
    else 
    {

        req.on("close", () => {
            console.log("closed connection");
        });

        let data = await catalogsModel.currenciesEnabled();
        res.send(data);

    };

})

router.get('/genders', async function(req, res, next)
{

    if(err)
    {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    } 
    else 
    {
        let data = await catalogsModel.genders();
        res.send(data);
    };

});

module.exports = router;

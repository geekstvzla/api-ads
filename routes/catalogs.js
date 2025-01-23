var express = require('express');
var router = express.Router();
var catalogsModel = require('../models/catalogs.js');

router.get('/currencies-enabled', async function(req, res, next)
 {

    try 
    {

        req.on("close", () => {
            console.log("closed connection en catalog.js");
        });

        let data = await catalogsModel.currenciesEnabled();
        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error en catalog.js");
        console.log(err);
        next(err);

    };

})

router.get('/genders', async function(req, res, next)
{

    try 
    {
        let data = await catalogsModel.genders();
        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error en catalog.js");
        console.log(err);
        next(err);

    };

});

module.exports = router;

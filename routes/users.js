var express = require('express');
var router = express.Router();
var mail = require('../models/emails.js');
var usersModel = require('../models/users.js');

router.get('/activate-account', async function(req, res, next) 
{

    try 
    {

        let userId = req.query.userId;
        let params = [userId];
        let data = await usersModel.activateAccount(params);
        
        res.render('users/activateUserAccount', {message: data.response.message});

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

});

router.post('/user-balance', async function(req, res, next) 
{

    try 
    {

        let userId = req.query.userId;
        let params = [userId];
        let data = await usersModel.userBalance(params);

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

});

router.post('/user-status', async function(req, res, next) 
{

    try 
    {

        let userId = req.query.userId;
        let params = [userId];
        let data = await usersModel.userStatus(params);

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

})

router.post('/user-device-token', async function(req, res, next) 
{

    try 
    {

        let token = req.query.token;
        let userId = req.query.userId;
        let params = [userId, token];
        let data = await usersModel.userDeviceToken(params);

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

});

router.post('/recover-password', async function(req, res, next) 
{

    try 
    {

        let email = req.query.email
        let params = [email]
        let data = await usersModel.recoverPassword(params)

        if(data.response.statusCode === 1)
        {

            emailParams = {email: email, password: data.response.password}
            mail.recoverUserPassword(emailParams)

        }

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

});

router.post('/sign-in', async function(req, res, next) 
{

    try 
    {

        let email = req.query.email
        let password = req.query.password
        let deviceToken = req.query.token
        let params = [email, password, deviceToken]
        let data = await usersModel.signIn(params)
        
        if(data.response.statusCode === 3)
        {
        
            let url = req.protocol+"://"+req.get('host')+"/users/activate-user-account?userId="+data.response.userId
            emailParams = {email: email, url: url}
            mail.activateUserAccount(emailParams)

        }

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

})

router.post('/sign-up', async function(req, res, next) 
{

    try 
    {

        let birthday = req.query.birthday
        let email = req.query.email
        let genderId = req.query.genderId
        let name = req.query.name
        let password = req.query.password
        let deviceToken = req.query.token
        let params = [name, email, password, genderId, birthday, deviceToken]
        let data = await usersModel.signUp(params);
        
        if(data.response.statusCode === 1)
        {
        
            let url = req.protocol+"://"+req.get('host')+"/users/activate-user-account?userId="+data.response.userId
            emailParams = {email: email, url: url}
            mail.activateUserAccount(emailParams)

        }

        res.send(data);

    } catch (err) {

        console.log("Ocurrió un error");
        console.log(err);
        next(err);

    };

});

module.exports = router;

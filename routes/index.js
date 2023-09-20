var express = require('express')
var router = express.Router()
var usersModel = require('../models/users.js')
var mikrowispModel = require('../models/mikrowisp.js')

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index', { title: 'SERVIDOR CONEXPRO' });
})

router.post('/signin', async function(req, res, next) {

    let userEmail = req.query.email
    let userPass = req.query.password
    let params = {userEmail: userEmail, userPass: userPass}
    
    let signin = await usersModel.signin(params)
    res.send(signin)

})

router.post('/recoverPassword', async function(req, res, next) {

    let userEmail = req.query.email
    let data = await usersModel.recoverPassword(userEmail)

    if(data.hasOwnProperty('datos')) {

        let userData = data.datos[0]

        res.send({
            response: {
                data: {
                    id: userData.id,
                    name: userData.nombre,
                    password: userData.codigo
                },
                message: "Datos enviados a tu correo electrónicosss2!",
                status: "success",
                statusCode: 1
            }
        })

    } else {

        res.send({
            response: {
                message: "No se encontró ningun usuario con ese correo electrónico",
                status: "error",
                statusCode: 0,
            }
        })

    }

})

module.exports = router;

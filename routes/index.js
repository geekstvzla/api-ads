var express = require('express')
var router = express.Router()
var request = require('../utils/AjaxRequest.js')
var clientModel = require('../models/clients.js')

/* GET home page. */
router.get('/', async function(req, res, next) {

    res.render('index', { title: 'SERVIDOR CONEXPRO' });

});

router.post('/signin', async function(req, res, next) {

    let userEmail = req.query.email;
    let userPass = req.query.password;

    let options = {
        method: 'post',
        params: {
            codigo: userPass, correo: userEmail, token : 'QldmZUhaNnkzcGxJbFNiZ0xKenlFQT09'
        },
        url: 'http://172.16.40.58/api/v1/GetClientsDetails'
    }

    await request.ajax(options)
    .then(async function (response) {

        if(response.status === 200 && response.hasOwnProperty('data')) {

            /* Check if exist user data */
            if(response.data.hasOwnProperty('datos')) {

                let client = await clientModel.check_client_info();

                let user_data = response.data.datos[0];

                res.send({
                    response: {
                        data: {
                            id: user_data.id,
                            name: user_data.nombre,
                            status: user_data.estado
                        },
                        message: "Autenticación exitosa!",
                        status: "success",
                        status_code: 1
                    }
                });

            } else {

                res.send({
                    response: {
                        message: "Usuario o contraseña incorrecta",
                        status: "error",
                        status_code: 0,
                    }
                });

            }

        } else {
            
            throw {
                message: "Error after response"
            }

        }
        
    })
    .catch(function(error) { 

        res.send({
            response: {
                error: error,
                message: "Ocurrió un error",
                status: "error",
                status_code: 0
            }
        })

    })

})

module.exports = router;

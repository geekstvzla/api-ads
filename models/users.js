let db = require('../config/database.js')
mikrowispModel = require('./mikrowisp.js')

const checkUserInfo = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_check_client_info(?,?,?,@response);`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {

                db.query('SELECT @response as response', (err2, result2) => {

                    if(err2) {
    
                        reject({
                            response: {
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } else {
                    
                        let outputParam = JSON.parse(result2[0].response);
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    })
    
}

const clientExist = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM conexpro.vw_clients c WHERE c.client_id = ?;`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {

                resolve(result)
    
            }
    
        })

    })

}

const clientDetails = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM conexpro.vw_clients c WHERE c.client_id = ?;`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {

                resolve(result)
    
            }
    
        })

    })

}

const recoverPassword = (userEmail) => {

    return new Promise(async function(resolve, reject) { 

        let apiSettings = await mikrowispModel.apiSettings()
        let apiParams = {
            method: 'post',
            params: {
                correo: userEmail, token : apiSettings.token
            },
            url: apiSettings.url+'GetClientsDetails'
        }

        let apiReq = await mikrowispModel.apiRequest(apiParams)

        resolve(apiReq)

    })

}

const signin = (params) => {
    
    return new Promise(async function(resolve, reject) { 

        let apiSettings = await mikrowispModel.apiSettings()
        let apiParams = {
            method: 'post',
            params: {
                codigo: params.userPass, correo: params.userEmail, token : apiSettings.token
            },
            url: apiSettings.url+'GetClientsDetails'
        }

        let apiReq = await mikrowispModel.apiRequest(apiParams)

        if(apiReq.hasOwnProperty('datos')) {

            let userData = apiReq.datos[0]
            let userStatusCode = (userData.estado === "ACTIVO") ? 1 : 0
            let params = [
                userData.correo,
                userData.nombre,
                userData.id
            ]
            let client = await checkUserInfo(params)

            resolve({
                response: {
                    data: {
                        id: userData.id,
                        email: userData.correo,
                        name: userData.nombre,
                        /*status: userData.estado,
                        statusCode: userStatusCode*/
                        status: "SUSPENDIDO",
                        statusCode: 0
                    },
                    message: "Autenticación exitosa!",
                    status: "success",
                    statusCode: 1
                }
            })

        } else {

            resolve({
                response: {
                    message: "Usuario o contraseña incorrecta",
                    status: "error",
                    statusCode: 0
                }
            })

        }

    })

}

module.exports = {
    checkUserInfo,
    clientDetails,
    clientExist,
    recoverPassword,
    signin
}
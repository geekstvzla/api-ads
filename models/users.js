let db = require('../config/database.js')
mikrowispModel = require('./mikrowisp.js')

const activateClient = () => {

    return new Promise(async function(resolve, reject) { 

        let apiSettings = await _this.apiSettings()
        let params = {
            method: 'post',
            params: {
                correo: "manuales2010@gmail.com", token : apiSettings.token
            },
            url: apiSettings.url+'GetClientsDetails'
        }

        let apiReq = await _this.apiRequest(params)

        resolve(apiReq)

    })


}


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

const clientDetails = (sqlParams) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM conexpro.vw_clients c WHERE c.client_id = ?;`
        db.query(queryString, sqlParams, async function(err, clientData) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {
                

                let apiSettings = await mikrowispModel.apiSettings()
                apiParams = {
                    method: 'post',
                    params: {
                        correo: clientData[0].client_email, token : apiSettings.token
                    },
                    url: apiSettings.url+'GetClientsDetails'
                }
                let apiReq = await mikrowispModel.apiRequest(apiParams)
                let clientData = apiReq.datos[0]
                let clientStatusCode = (clientData.estado === "ACTIVO") ? 1 : 0

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

        if(apiReq.hasOwnProperty('datos')) {

            let userData = apiReq.datos[0]
    
            resolve({
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
    
            resolve({
                response: {
                    message: "No se encontró ningun usuario con ese correo electrónico",
                    status: "error",
                    statusCode: 0,
                }
            })
    
        }

    })

}

const signin = (params) => {
    
    return new Promise(async function(resolve, reject) { 

        let apiParams = {
            codigo: params.userPass, correo: params.userEmail
        }

        let apiReq = await mikrowispModel.apiRequest('post', 'GetClientsDetails', apiParams)

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
    activateClient,
    checkUserInfo,
    clientDetails,
    clientExist,
    recoverPassword,
    signin
}
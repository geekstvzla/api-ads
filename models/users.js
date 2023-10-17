let db = require('../config/database.js')
mikrowispModel = require('./mikrowisp.js')

const activateClient = (userId) => {

    return new Promise(async function(resolve, reject) { 
        
       
        var dataClient = await clientDetails(userId)

        if(dataClient.hasOwnProperty('client_id')) {

            let apiParams = {idcliente: dataClient.mikrowisp_id}
            let apiReq = await mikrowispModel.apiRequest('post', 'ActiveService', apiParams)

            if(apiReq.hasOwnProperty('estado')) {

                if(apiReq.estado === "error") {

                    resolve({
                        response: {
                            message: "El cliente ya se encuentra en estatus ACTIVO",
                            status: "success",
                            statusCode: 1
                        }
                    })

                } else {

                    resolve({
                        response: {
                            message: "Cliente activado exitosamente!",
                            status: "success",
                            statusCode: 1
                        }
                    })

                }

            } else {

                resolve({
                    response: {
                        message: "Error al tratar de consultar al cliente en Mikrowisp",
                        status: "error",
                        statusCode: 0
                    }
                })

            }

        } else {

            resolve({
                response: {
                    message: "Error al tratar de consultar al cliente en la Base de Datos",
                    status: "error",
                    statusCode: 0
                }
            })

        }

    }).catch(function(error) {

        return(error)
      
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

    }).catch(function(error) {

        return(error)
      
    })
    
}

const clientExist = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM vw_clients c WHERE c.client_id = ?;`
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

                resolve((result.length > 0) ? true : false)
    
            }
    
        })

    }).catch(function(error) {

        return(error)
      
    })

}

const clientDetails = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM vw_clients c WHERE c.client_id = ?;`
        db.query(queryString, params, async function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {
                
                resolve(result[0])
    
            }
    
        })

    }).catch(function(error) {

        return(error)
      
    })

}

const clientStatus = (params) => {

    return new Promise(async function(resolve, reject) { 

        let data = await clientDetails(params)
        let apiParams = {correo: data.client_email}
        let apiReq = await mikrowispModel.apiRequest('post', 'GetClientsDetails', apiParams)
       
        if(apiReq.hasOwnProperty('datos')) {

            let clientData = apiReq.datos[0]
            let clientStatusCode = (clientData.estado === "ACTIVO") ? 1 : 0

            resolve({
                response: {
                    data: {
                        "status": clientData.estado,
                        "statusCode": clientStatusCode
                    },
                    message: "Estatus del cliente",
                    status: "success",
                    statusCode: 1
                }
            })

        } else {

            resolve({
                response: {
                    message: apiReq.mensaje,
                    status: "error",
                    statusCode: 0
                }
            })

        }

    }).catch(function(error) {

        return(error)
      
    })

}

const getAppUserId = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT c.client_id FROM vw_clients c WHERE c.mikrowisp_id = ?;`
        db.query(queryString, params, async function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } else {
                
                resolve(result[0])
    
            }
    
        })

    }).catch(function(error) {

        return(error)
      
    })


}

const recoverPassword = (userEmail) => {

    return new Promise(async function(resolve, reject) { 

        let apiParams = {correo: userEmail}
        let apiReq = await mikrowispModel.apiRequest('post', 'GetClientsDetails', apiParams)

        if(apiReq.hasOwnProperty('datos')) {

            let userData = apiReq.datos[0]
    
            resolve({
                response: {
                    data: {
                        id: userData.id,
                        name: userData.nombre,
                        password: userData.codigo
                    },
                    message: "Datos enviados a tu correo electrónico!",
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

    }).catch(function(error) {

        return(error)
      
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

            let userId = [userData.id]
            let data = await getAppUserId(userId)

            resolve({
                response: {
                    data: {
                        id: data.client_id,
                        email: userData.correo,
                        dateSuspended: userData.fecha_suspendido,
                        name: userData.nombre,
                        status: userData.estado,
                        statusCode: userStatusCode
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

    }).catch(function(error) {

        return(error)
      
    })

}

module.exports = {
    activateClient,
    checkUserInfo,
    clientDetails,
    clientExist,
    clientStatus,
    recoverPassword,
    signin
}
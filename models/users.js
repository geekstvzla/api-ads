let db = require('../config/database.js')
mikrowispModel = require('./mikrowisp.js')

const activateUserAccount = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_activate_account_user(?,@response);`
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

const clientBalance = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT cb.currency_id, cb.currency_name, cb.currency_abb, cb.currency_symbol, cb.amount
                           FROM vw_client_balance cb 
                           WHERE cb.client_id = ? 
                           AND cb.currency_id = (SELECT s.value FROM settings s WHERE s.name = "default-currency");`
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
                
                if(result[0]) {

                    resolve(result[0])

                } else {

                    resolve({
                        currency_id: null,
                        currency_name: null,
                        currency_abb: null,
                        currency_symbol: null,
                        amount: 0
                    })

                }
    
            }
    
        })

    }).catch(function(error) {

        return(error)
      
    })

}

const clientDeviceToken = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_client_device_token(?,?,@response);`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    error: err,
                    response: "error"
                })
    
            } else {
                
                db.query('SELECT @response as response', async (err2, result2) => {

                    if(err2) {
                        
                        reject({
                            error: err,
                            response: "Error fetching data from the database"
                        })
            
                    } else {
                        
                        let outputParam = JSON.parse(result2[0].response)
                        resolve(outputParam)
                        
                    }   

                })
    
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

const recoverPassword = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_recover_password(?,@response);`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0,
                        error: err
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

const signin = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_sign_in(?,?,?,@response);`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0,
                        error: err
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

const signup = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_sign_up(?,?,?,?,?,?,@response);`
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

const userExist = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM vw_users u WHERE c.user_id = ?;`
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


module.exports = {
    activateUserAccount,
    clientBalance,
    clientDetails,
    clientDeviceToken,
    clientStatus,
    recoverPassword,
    signin,
    signup,
    userExist
}
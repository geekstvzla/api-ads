let db = require('../config/database.js')

const activateUserAccount = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_activate_account_user(?,@response);`
        db.query(queryString, params, function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } 
            else 
            {

                db.query('SELECT @response as response', (err2, result2) => 
                {

                    if(err2) 
                    {
    
                        reject({
                            response: {
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } 
                    else 
                    {
                    
                        let outputParam = JSON.parse(result2[0].response);
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}

const userDetails = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT * FROM vw_users u WHERE u.user_id = ?;`
        db.query(queryString, params, async function(err, result) {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } 
            else 
            {
                
                resolve(result[0])
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}

const userBalance = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT ub.currency_id, ub.currency_name, ub.currency_abb, ub.currency_symbol, ub.amount
                           FROM vw_user_balance ub 
                           WHERE ub.user_id = ? 
                           AND ub.currency_id = (SELECT s.value FROM settings s WHERE s.name = "default-currency");`
        db.query(queryString, params, async function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } 
            else 
            {
                
                if(result[0]) 
                {

                    resolve({response: result[0]})

                } 
                else 
                {

                    resolve({
                        response: {
                            currency_id: null,
                            currency_name: null,
                            currency_abb: null,
                            currency_symbol: null,
                            amount: 0
                        }
                    })

                }
    
            }
    
        })

    }).catch(function(error) 
    {

        resolve(error)
      
    })

}

const userDeviceToken = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_user_device_token(?,?,@response);`
        db.query(queryString, params, function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    error: err,
                    response: "error"
                })
    
            } 
            else 
            {
                
                db.query('SELECT @response as response', async (err2, result2) => 
                {

                    if(err2) 
                    {
                        
                        reject({
                            error: err,
                            response: "Error fetching data from the database"
                        })
            
                    } 
                    else 
                    {
                        
                        let outputParam = JSON.parse(result2[0].response)
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}

const userStatus = (params) => 
{

    return new Promise(async function(resolve, reject) 
    { 

        let data = await userDetails(params)
        resolve({
            response: {
                data: {
                    "status": data.status_desc,
                    "statusCode": data.status_id
                },
                message: "Estatus del usuario",
                status: "success",
                statusCode: 1
            }
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}

const recoverPassword = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_recover_password(?,@response);`
        db.query(queryString, params, function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0,
                        error: err
                    }
                })
    
            } 
            else 
            {

                db.query('SELECT @response as response', (err2, result2) => 
                {

                    if(err2) 
                    {
    
                        reject({
                            response: {
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } 
                    else 
                    {
                    
                        let outputParam = JSON.parse(result2[0].response);
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}

const signIn = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_sign_in(?,?,?,@response);`
        db.query(queryString, params, function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0,
                        error: err
                    }
                })
    
            } 
            else 
            {

                db.query('SELECT @response as response', (err2, result2) => 
                {

                    if(err2) 
                    {
    
                        reject({
                            response: {
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } 
                    else 
                    {
                    
                        let outputParam = JSON.parse(result2[0].response);
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })
    
}

const signUp = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_sign_up(?,?,?,?,?,?,@response);`
        db.query(queryString, params, function(err, result) 
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } 
            else 
            {

                db.query('SELECT @response as response', (err2, result2) => 
                {

                    if(err2) 
                    {
    
                        reject({
                            response: {
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } 
                    else 
                    {
                    
                        let outputParam = JSON.parse(result2[0].response);
                        resolve(outputParam)
                        
                    }   

                })
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })
    
}

const userExist = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT * FROM vw_users u WHERE c.user_id = ?;`
        db.query(queryString, params, function(err, result) {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                })
    
            } 
            else 
            {

                resolve((result.length > 0) ? true : false)
    
            }
    
        })

    }).catch(function(error) 
    {

        reject(error)
      
    })

}


module.exports = {
    activateUserAccount,
    userBalance,
    userDetails,
    userDeviceToken,
    userStatus,
    recoverPassword,
    signIn,
    signUp,
    userExist
}
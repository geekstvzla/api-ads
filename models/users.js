let db = require('../config/database.js')

const activateAccount = (params) => 
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

        return error
      
    })

}

const activeUsers = () =>
{

    return new Promise(function(resolve, reject) 
    { 
        
        let queryString = `SELECT COUNT(*) active_users FROM users WHERE status_id = 1;`;
        db.query(queryString, null, async function(err, result) {

            if(err) 
            {
          
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                });
    
            } 
            else 
            {
                
                resolve({users: result[0]["active_users"]});
    
            }
    
        });

    }).catch(function(error) 
    {

        return error
      
    });

}

const saveUserInfo = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_update_user_info(?,?,?,?,?,?,@response);`
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
    
        });

    }).catch(function(error) 
    {

        return error
      
    })

}

const searchUserBy = (userString) =>
{

    return new Promise(function(resolve, reject) 
    { 
        
        if(validEmail(userString)) {
            var filterBy = `WHERE UPPER(email) LIKE "${userString}%" ORDER BY email ASC;`;
        } else if(!isNaN(userString)) {
            var filterBy = `WHERE dni LIKE "${userString}%" ORDER BY dni ASC;`;
        } else {
            var filterBy = `WHERE UPPER(name) LIKE UPPER("${userString}%") ORDER BY name ASC;`;
        };

        let queryString = `SELECT * FROM vw_users `+filterBy;
        db.query(queryString, null, async function(err, result) {

            if(err) 
            {
          
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                });
    
            } 
            else 
            {
                
                resolve({users: result});
    
            }
    
        });

    }).catch(function(error) 
    {

        return error
      
    });

}

const validEmail = (string) => {

    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(string);

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
                
                resolve({response: result[0]})
    
            }
    
        })

    }).catch(function(error) 
    {

        return error
      
    })

}

const userInfo = (userId) =>
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT u.user_id,
                                  u.name,
                                  u.dni,
                                  u.email,
                                  ub.currency_id, 
                                  ub.currency_name, 
                                  ub.currency_abb, 
                                  ub.currency_symbol, 
                                  ub.amount
                           FROM  vw_users u
                           INNER JOIN vw_user_balance ub ON ub.user_id = u.user_id
                           WHERE u.user_id = ? 
                           AND ub.currency_id = (SELECT s.value FROM settings s WHERE s.name = "default-currency");`
        db.query(queryString, [userId], async function(err, result)
        {

            if(err) 
            {
    
                reject({
                    response: {
                        message: "Error al tratar de ejecutar la consulta",
                        status: "error",
                        statusCode: 0
                    }
                });
    
            } 
            else 
            {
                
                resolve({userInfo: result[0]}); 
    
            }
    
        })

    }).catch(function(error) 
    {

        return error
      
    });

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

        return error
      
    });

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

        return error
      
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
                    "statusDesc": data.response.status_desc,
                    "statusId": data.response.status_id
                },
                message: "Estatus del usuario",
                status: "success",
                statusCode: 1
            }
        })

    }).catch(function(error) 
    {

        return error
      
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

        return error
      
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

        return error
      
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
                                message: "Error al tratar de obtener la respuesta",
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

        return error
      
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

        return error
      
    })

}


module.exports = {
    activateAccount,
    activeUsers,
    userBalance,
    userDetails,
    userDeviceToken,
    userStatus,
    recoverPassword,
    saveUserInfo,
    searchUserBy,
    signIn,
    signUp,
    userExist,
    userInfo
}
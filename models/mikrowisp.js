let db = require('../config/database.js')
var request = require('../utils/AjaxRequest.js')

const apiSettings = () => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM conexpro.vw_api_settings;`

        db.query(queryString, function(err, result) {

            if(err) {
    
                reject({
                    error: err,
                    response: "error"
                });
    
            } else {
                
                resolve(result[0])
    
            }
    
        })

    })
    
}

const apiRequest = (params) => {

    return new Promise(function(resolve, reject) { 

        request.ajax(params)
        .then(async function (response) {

            if(response.status === 200 && response.hasOwnProperty('data')) {

                resolve(response.data)

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
                    statusCode: 0
                }
            })
    
        })

    })
    
}

module.exports = {
    apiRequest,
    apiSettings
}
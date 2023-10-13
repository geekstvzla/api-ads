var _this = this
let db = require('../config/database.js')
var request = require('../utils/AjaxRequest.js')

exports.apiSettings = () => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT * FROM vw_api_settings;`

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

    }).catch(function(error) {

        return(error)
      
    })
    
}

exports.apiRequest = (method, path, params) => {

    return new Promise(async function(resolve, reject) { 

        let apiSettings = await _this.apiSettings()

        params.token = apiSettings.token
        let apiParams = {
            method: method,
            params: params,
            url: apiSettings.url+path
        }

        request.ajax(apiParams)
        .then(async function (response) {

            if(response.status === 200 && response.hasOwnProperty('data')) {

                resolve(response.data)

            } else {
            
                throw {
                    message: "Error after response"
                }
    
            }
        
        }).catch(function(error) { 
    
            reject({
                response: {
                    error: error,
                    message: "Ocurrió un error",
                    status: "error",
                    statusCode: 0
                }
            })
    
        })

    })
    .catch(function(error) {

        return(error)
      
    })
    
}
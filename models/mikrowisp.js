var _this = this
let db = require('../config/database.js')
var request = require('../utils/AjaxRequest.js')

exports.activateClient = () => {

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

exports.apiSettings = () => {

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

exports.apiRequest = (params) => {

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
    
}

exports.userExist = () => {

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
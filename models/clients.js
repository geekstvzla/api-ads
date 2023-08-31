let db = require('../config/database.js');

const checkClientInfo = (params) => {

    return new Promise(function(resolve, reject) { 

        let queryString = `CALL sp_check_client_info(?,?,?,@response);`
        db.query(queryString, params, function(err, result) {

            if(err) {
    
                reject({
                    error: err,
                    response: "error"
                })
    
            } else {

                db.query('SELECT @response as response', (err2, result2) => {
                    
                    let outputParam = JSON.parse(result2[0].response);
                    resolve(outputParam)

                })
    
            }
    
        })

    })
    
}

module.exports = {
    checkClientInfo
}
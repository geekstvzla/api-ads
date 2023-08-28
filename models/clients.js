let db = require('../config/database.js');

const check_client_info = () => {

    return new Promise(function(resolve, reject) { 

        db.query('SELECT * FROM clients', function(err, rows) {

            if(err) {
    
                reject({
                    error: err,
                    response: "error"
                });
    
            } else {
                
                resolve(rows);
    
            }
    
        });

    });
    
};

module.exports = {
    check_client_info
};
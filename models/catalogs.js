let db = require('../config/database.js')

const genders = () => {

    return new Promise(function(resolve, reject) { 

        let queryString = `SELECT gender_id, gender_description FROM vw_genders WHERE gender_status_id = 1;`
        db.query(queryString, async function(err, result) {

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

    }).catch(function(error) {

        console.log(error)
        return(error)
      
    })

}

module.exports = {
    genders
}
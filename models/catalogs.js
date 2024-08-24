let db = require('../config/database.js')

const currenciesEnabled = () => {

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT c.currency_id,
                                  c.name AS currency_desc,
                                  c.abbreviation AS currency_abb,
                                  c.symbol AS currency_symbol
                           FROM currency c
                           WHERE c.status_id = 1
                           ORDER BY name ASC;`
        db.query(queryString, async function(err, result) 
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
                
                resolve({
                    response: {
                        currencies: result,
                        status: "success",
                        statusCode: 1
                    }
                })
    
            }
    
        })

    }).catch(function(error) 
    {

        console.log(error)
        return error
      
    })

}

const genders = () => {

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `SELECT gender_id, gender_description FROM vw_genders WHERE gender_status_id = 1;`
        db.query(queryString, async function(err, result) 
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
                
                resolve({resonse: result})
    
            }
    
        })

    }).catch(function(error) 
    {

        console.log(error)
        return error
      
    })

}

module.exports = {
    currenciesEnabled,
    genders
}
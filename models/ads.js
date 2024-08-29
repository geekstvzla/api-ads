let db = require('../config/database.js')
usersModel = require('./users.js')

const adsToSee = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        /*let queryString = `
            SELECT a.ad_id,
                a.sponsor_id,
                a.sponsor_name
            FROM vw_ads a
            WHERE a.ad_id NOT IN(
                SELECT ua.ad_id
                FROM user_ads ua
                WHERE ua.user_id = ?
                AND ua.status_id = 1
            )
            AND a.ad_status_id = 1
            AND a.ad_due_date > NOW()
            ORDER BY a.ad_id ASC
            LIMIT 1;`*/
        let queryString = `
            SELECT (ROUND((RAND() * (21 - 1)) + 1)) AS ads_id;`
            
        db.query(queryString, params, function(err, adsId) 
        {

            if(err)
            {

                reject({
                    response: {
                        error: err,
                        message: "Error al tratar de ejecutar la consulta en la línea 25",
                        status: "error",
                        statusCode: 0
                    }
                })

            }
            else
            {

                let adId = adsId[0].ads_id
                let queryString = `
                SELECT a.ad_id,
                       a.sponsor_id,
                       a.sponsor_name
                FROM vw_ads a
                WHERE a.ad_id = ?
                AND a.ad_status_id = 1
                AND a.ad_due_date > NOW()
                LIMIT 1;`

                db.query(queryString, [adId], function(err, adsData) 
                {

                    if(err) 
                    {
            
                        reject({
                            response: {
                                error: err,
                                message: "Error al tratar de ejecutar la consulta",
                                status: "error",
                                statusCode: 0
                            }
                        })
            
                    } 
                    else 
                    {
        
                        if(adsData.length > 0) {
        
                            let adId = adsData[0].ad_id
                            let queryString = `
                                SELECT a.ads_type_id,
                                        a.ads_type_desc,
                                        a.ads_url,
                                        a.play_time,
                                        a.ads_orientation_id,
                                        a.ads_orientation_desc
                                FROM vw_ads a
                                WHERE a.ad_id = ?
                                AND a.ads_content_status_id = 1
                                ORDER BY a.ads_content_order ASC;`
                            db.query(queryString, [adId], function(err, adsContent) 
                            {
        
                                if(err) 
                                {
        
                                    reject({
                                        response: {
                                            message: "Error al tratar de ejecutar la consulta",
                                            status: "error",
                                            statusCode: 0,
                                            host: params[1]
                                        }
                                    })
        
                                } 
                                else 
                                {
        
                                    resolve({
                                        response: {
                                            data: {
                                                ad_content: adsContent,
                                                ad_id: adsData[0].ad_id,
                                                sponsor_id: adsData[0].sponsor_id,
                                                sponsor_name: adsData[0].sponsor_name
                                            },
                                            message: "Se encontraron ADS",
                                            status: "success",
                                            statusCode: 1
                                        }
                                    })
        
                                }
        
                            })
        
                        } 
                        else 
                        {
        
                            resolve({
                                response: {
                                    message: "No se encontraron ADS disponibles para mostrar",
                                    status: "success",
                                    statusCode: 3
                                }
                            })
        
                        }
            
                    }

                })

            }
    
        })

    }).catch(function(error) 
    {

        console.log("ERROR adsToSee")
        console.log(error)
        return error
      
    })

}

const createNewAd = (params) =>
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_create_ad(?,?,@response);`
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

        console.log("ERROR creating new ad")
        console.log(error)
        return error
      
    })

}

const createAdContent = (params) =>
    {
    
        return new Promise(function(resolve, reject) 
        { 
    
            let queryString = `CALL sp_create_ad_content(?,?,?,?,?,@response);`
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
    
            console.log("ERROR creating new ad")
            console.log(error)
            return error
          
        })
    
    }

const viewedAd = (params) => 
{

    return new Promise(function(resolve, reject) 
    { 

        let queryString = `CALL sp_viewed_ad(?,?,@response);`
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

        console.log("ERROR viewedAd")
        console.log(error)
        return error
      
    })

}

module.exports = {
    adsToSee,
    createNewAd,
    createAdContent,
    viewedAd
}
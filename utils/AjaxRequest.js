var axios = require('axios')

const ajax = (ajaxData) => {

    return new Promise((resolve, reject) => {

        request(ajaxData)
        .then(function (response) {

            if(response.status === 419) {

                CSRFToken()
                .then(function (response2) {

                    if(response2) {
                        resolve(ajax(ajaxData))
                    }else{
                        reject(error2)
                    }

                })
                .catch(error2 => {
                    reject(error2)
                })

            } else {
                resolve(response)
            }

        })
        .catch(error => {
            reject(error)
        })

    })

}

const request = (ajaxData) => {

    return new Promise((resolve, reject) => {

        const options = {
            headers: (ajaxData.headers) ? ajaxData.headers : null,
            method: ajaxData.method,
            data: (ajaxData.params && ajaxData.method === "post") ? ajaxData.params : null,
            params: (ajaxData.params && ajaxData.method === "get") ? ajaxData.params : null,
            url: ajaxData.url
        };

        axios(options)
        .then(async function (response) {
            resolve(response)
        })
        .catch(error => {

            if(error.response) {

                if(error.response.status === 419) {
                    resolve({status: 419})
                } else {
                    reject(error)
                }

            } else {
                reject(error)
            }

        })

    })

}

const CSRFToken = () => {

    return new Promise((resolve, reject) => {

        let ajaxData = {
            method: "get",
            url: "/getCSRFToken"
        }

        ajax(ajaxData)
        .then(function (response) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token
            resolve({message: "Token generated", response: true})
        })
        .catch(error => {
            resolve({message: "Error generating token", response: false})
        })

    })

}

module.exports = { ajax, CSRFToken };



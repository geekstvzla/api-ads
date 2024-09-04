import axios from "axios"

export const ajax = (ajaxData) => {

    return new Promise((resolve, reject) => {
        
        if(ajaxData.formData) {

            axios.post(ajaxData.url, ajaxData.formData)
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

        } else {

            var options = {
                method: ajaxData.method,
                url: ajaxData.url
            };
    
            if(ajaxData.formData) { options.formData = ajaxData.formData };
            if(ajaxData.headers) { options.headers = ajaxData.headers };
            if(ajaxData.params) { options.params = ajaxData.params };

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

        }

    })

}

export default ajax

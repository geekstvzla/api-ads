var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', async function(req, res, next) {

  const options = {
      method: 'post',
      data: {'codigo': 'bdso9f', 'correo': 'manuales2010@gmail.com', 'token' : 'QldmZUhaNnkzcGxJbFNiZ0xKenlFQT09'},
      url: 'http://172.16.40.58/api/v1/GetClientsDetails'
};

  await axios(options)
  .then(async function (response) {

      let userData = response.data.datos[0]
 
      console.log(userData)
  })
  .catch(function(error) { 

      console.log("ERROR")
      console.log(error.data)

  })

  res.send('SAPE 7')

})

router.get('/test', async function(req, res, next) {

    const options = {
        method: 'post',
        data: {'idcliente': 2, 'token' : 'QldmZUhaNnkzcGxJbFNiZ0xKenlFQT09'},
        url: 'http://172.16.40.58/api/v1/GetClientsDetails'
    };

    await axios(options)
    .then(async function (response) {
        console.log(response.data)
    })
    .catch(error => 

        console.log("ERROR")
        //console.log(error.data)
    )
    
    res.send('SAPE 2')

});

module.exports = router;

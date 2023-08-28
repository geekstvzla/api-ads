var mysql = require('mysql');

let settings = {
    host    : 'localhost',
    user    : 'root',
    password: '123456',
    database: 'conexpro'
};

let db = mysql.createConnection(settings);
  
module.exports = db;
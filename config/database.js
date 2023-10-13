var mysql = require('mysql');

let settings = {
    host    : 'localhost',
    user    : 'conexpro',
    password: 'apiC0n3xpr0',
    database: 'ads'
};

let db = mysql.createConnection(settings);
  
module.exports = db;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    databse: 'studyhubdb',
    insecureAuth : true
});


module.exports = connection;
const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();




router.get('/checkLogin', function(req, res) {

    var username = req.query.username;
    var password = req.query.password;
 
    connection.query('SELECT * FROM studyhubdb.user WHERE (Username = ? AND Pword = ?)', [username, password], function(err, result, fields) {
       if (!err) {
          res.send(result);
       } else {
          console.log(err)
       }
    })
 
 })






 module.exports = router;
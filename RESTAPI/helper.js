const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
var SqlString = require('sqlstring');
const fs = require('fs');
const file = require('../client/localdata.json');

const router = express.Router();




router.get('/checkLogin', function(req, res) {

    var username = req.query.username;
    var password = req.query.password;
 
    connection.query('SELECT * FROM studyhubdb.user WHERE (Username = ? AND Pword = ?)', [username, password], function(err, result, fields) {
       if (!err) {

         file.Username = username;
         file.LoggedIn = true;
         file.AccType = result[0].Usertype;
         fs.writeFile('./client/localdata.json', JSON.stringify(file), function writeJSON(err) {
               if (err) return console.log(err);
               console.log(JSON.stringify(file));
            });

         res.send(result);
       } else {
          console.log(err)
       }
    })
 
 })


 router.get('/getLoggedUser', function(req, res) {

   fs.readFile('./client/localdata.json', (err, data) => {
      if (err) throw err;
      let loggedUser = JSON.parse(data).Username;
      console.log(loggedUser);
      res.send(loggedUser)
  });
   

})


router.get('/getLoggedType', function(req, res) {

   fs.readFile('./client/localdata.json', (err, data) => {
      if (err) throw err;
      let loggedUser = JSON.parse(data).AccType;
      res.send(loggedUser)
  });
   

})




 module.exports = router;
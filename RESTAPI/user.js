const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.user', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});


router.post('/', function(req, res) {

    console.log(req)
    console.log(req.body)
    let user = req.body;
 
    console.log(user.Username)



    connection.query("INSERT INTO studyhubdb.user VALUES (?, ?, ?, ?, ?, ?)", [user.Username, user.Email, user.Pword, user.Fname, user.Lname, user.Type], function(err, result, fields) {


        if (!err) {
            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })





module.exports = router;

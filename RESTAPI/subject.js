const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.subject', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});

router.post('/', function(req, res) {

    let sub = req.body;
 

    connection.query("INSERT INTO studyhubdb.subject VALUES (?, ?)", [sub.Username, sub.Subject], function(err, result, fields) {


        if (!err) {
            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })

module.exports = router;

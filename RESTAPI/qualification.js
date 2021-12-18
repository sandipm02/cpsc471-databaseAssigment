const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.qualification', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});

router.post('/', function(req, res) {

    let qual = req.body;
 

    connection.query("INSERT INTO studyhubdb.qualification VALUES (?, ?, ?, ?, ?)", [qual.Username, qual.Major, qual.Graddate, qual.Gpa, qual.Accredidation], function(err, result, fields) {


        if (!err) {
            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })

module.exports = router;

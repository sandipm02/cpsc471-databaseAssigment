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
 

    connection.query("INSERT INTO studyhubdb.qualification VALUES (?, ?, ?, ?, ?)", [qual.Username, qual.Major, qual.Graddate, qual.Gpa, qual.Accrediation], function(err, result, fields) {


        if (!err) {
            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })


 router.post('/edit', function(req, res) {

    let q = req.body;
 

    connection.query("UPDATE studyhubdb.qualification SET studyhubdb.qualification.Major = ?, studyhubdb.qualification.Graddate = ?, studyhubdb.qualification.Gpa = ?, studyhubdb.qualification.Accreditation = ? WHERE studyhubdb.qualification.Username = ?", [q.Major, q.Graddate, q.Grade, q.Accreditation, q.Username], function(err, result, fields) {


        if (!err) {

            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })


module.exports = router;

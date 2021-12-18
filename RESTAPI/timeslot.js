const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.timeslot', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});

router.get('/tutor', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.timeslot WHERE studyhubdb.timeslot.T_username=?',[req.query.username], (err, rows, fields)=>{
        if(!err){
        res.send(rows);
        //console.log(rows);
    }
        else
        console.log(err);
    })


});

router.post('/', function(req, res) {

    let t = req.body;


    var part = t.StartTime.split(":");
    var hour = parseInt(part[0]);
    var min = parseInt(part[1]);
    var Time_start = hour * 60 + min;
    
    var Time_end = Time_start + (t.duration * 60);

    connection.query("INSERT INTO studyhubdb.timeslot (T_username, S_username, User_date, Time_start, Time_end, IsApproved) VALUES (?, ?, ?, ?, ?, '0')", [t.T_username, t.S_username, t.User_date, Time_start, Time_end], function(err, result, fields) {


        if (!err) {

            res.send(result);
            } else {
            console.log(err)
            }

    })


 
 })

module.exports = router;

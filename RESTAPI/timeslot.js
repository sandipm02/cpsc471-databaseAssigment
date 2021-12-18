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

module.exports = router;

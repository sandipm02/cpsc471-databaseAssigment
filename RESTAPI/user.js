const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const file = require('../client/localdata.json');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.user', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});

router.get('/tutors', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.user WHERE Usertype = "Tutor"', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});

router.get('/tutor', (req, res)=>{

    var username = req.query.username;

    connection.query('SELECT * FROM studyhubdb.user JOIN studyhubdb.qualification ON studyhubdb.user.Username = ? AND studyhubdb.user.Username = studyhubdb.qualification.Username AND studyhubdb.user.Usertype = "Tutor" JOIN studyhubdb.subject ON studyhubdb.subject.Username = studyhubdb.user.Username JOIN studyhubdb.location ON studyhubdb.location.ID = studyhubdb.user.Locationid', [username], (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});


router.post('/', function(req, res) {

    let user = req.body;
 

    connection.query("INSERT INTO studyhubdb.user VALUES (?, ?, ?, ?, ?, ?, ?)", [user.Username, user.Email, user.Pword, user.Fname, user.Lname, user.Type, user.Locationid], function(err, result, fields) {


        if (!err) {

            file.Username = user.Username;
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





module.exports = router;

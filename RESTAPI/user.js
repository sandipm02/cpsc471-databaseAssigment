const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const file = require('../client/localdata.json');
const fs = require('fs');
const SqlString = require('mysql/lib/protocol/SqlString');
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

    var sqlsub = "";
    var sqlacc = "";
    var sqlloc = "";
    var sqlrat = "";


    var subject = req.query.subject;
    var accreditation = req.query.accreditation;
    var location = req.query.location;
    var rating = req.query.rating;
    

    var locString = location.toString();

    var part = rating.split('.');
        var ratingNo = part[0];

    console.log(ratingNo)
    console.log(subject)
    console.log(location)
    console.log(accreditation)

    if (subject != "Any Subject") {
        sqlsub = "JOIN studyhubdb.subject ON studyhubdb.subject.Subjectname = " + SqlString.escape(subject) +" AND studyhubdb.user.Username = studyhubdb.subject.Username ";
    } else {
        sqlsub = "JOIN studyhubdb.subject ON studyhubdb.user.Username = studyhubdb.subject.Username ";
    }
    if (accreditation != "Any Qualifications") {
        sqlacc = "JOIN studyhubdb.qualification ON studyhubdb.qualification.Accreditation = " + SqlString.escape(accreditation) + " AND studyhubdb.user.Username = studyhubdb.qualification.Username ";
    } else {
        sqlacc = "JOIN studyhubdb.qualification ON studyhubdb.user.Username = studyhubdb.qualification.Username ";
    }
    
    if (location != "Any Location") {
        sqlloc = "JOIN studyhubdb.location ON studyhubdb.location.Id = " + SqlString.escape(locString) + " AND studyhubdb.user.Locationid = studyhubdb.location.Id ";
    } else {
        sqlloc = "JOIN studyhubdb.location ON studyhubdb.user.Locationid = studyhubdb.location.Id ";
    }
    if (rating != "Any Rating"){
        
        
        sqlrat = "JOIN (SELECT studyhubdb.rating.T_username, COUNT(*) AS Total_ratings, AVG(Stars) AS Avg_stars FROM studyhubdb.rating GROUP BY studyhubdb.rating.T_username HAVING Avg_stars > " + SqlString.escape(ratingNo) + ") AS r"

    } else {
        sqlrat = "JOIN (SELECT studyhubdb.rating.T_username, COUNT(*) AS Total_ratings, AVG(Stars) AS Avg_stars FROM studyhubdb.rating GROUP BY studyhubdb.rating.T_username) AS r"
    }

    var sql = "SELECT DISTINCT * FROM studyhubdb.user " + sqlsub + sqlacc + sqlloc + sqlrat;

    console.log(sql)

    connection.query(sql, (err, rows, fields)=>{
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

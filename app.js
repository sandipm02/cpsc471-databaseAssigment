const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./client')));


const userRoutes = require('./RESTAPI/user');
const tutorRoutes = require('./RESTAPI/tutor');
const locationRoutes = require('./RESTAPI/location');
const studentRoutes = require('./RESTAPI/student');
const qualificationRoutes = require('./RESTAPI/qualification');
const timeslotRoutes = require('./RESTAPI/timeslot');
const connection = require('./connection');
const e = require('express');

app.use('/user', userRoutes);
app.use('/tutor', tutorRoutes);
app.use('/location', locationRoutes);
app.use('/student', studentRoutes);
app.use('/qualification', qualificationRoutes);
app.use('/timeslot', timeslotRoutes);

app.get('/checkLogin', function(req, res) {

   var username = req.query.username;
   var password = req.query.password;


   
   var indexPage = 'client/index.html';

   connection.query('SELECT * FROM studyhubdb.user WHERE (Username = ? AND Pword = ?)', [username, password], function(err, result, fields) {
      console.log(password)
      console.log(username)
      if (result.length > 0) {
         console.log("Valid Account")
         
      } else {
         console.log("Invalid Account")
         console.log(err)
      }
   })

})

module.exports = app;
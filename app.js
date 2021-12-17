const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json());


const userRoutes = require('./RESTAPI/user');
const tutorRoutes = require('./RESTAPI/tutor');
const locationRoutes = require('./RESTAPI/location');
const studentRoutes = require('./RESTAPI/student');
const qualificationRoutes = require('./RESTAPI/qualification');
const timeslotRoutes = require('./RESTAPI/timeslot');
const helperRoutes = require('./RESTAPI/helper');

app.use('/user', userRoutes);
app.use('/tutor', tutorRoutes);
app.use('/location', locationRoutes);
app.use('/student', studentRoutes);
app.use('/qualification', qualificationRoutes);
app.use('/timeslot', timeslotRoutes);
app.use('/helper', helperRoutes);




module.exports = app;
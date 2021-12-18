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
const locationRoutes = require('./RESTAPI/location');
const qualificationRoutes = require('./RESTAPI/qualification');
const timeslotRoutes = require('./RESTAPI/timeslot');
const helperRoutes = require('./RESTAPI/helper');
const subjectRoutes = require('./RESTAPI/subject');

app.use('/user', userRoutes);
app.use('/location', locationRoutes);
app.use('/qualification', qualificationRoutes);
app.use('/timeslot', timeslotRoutes);
app.use('/helper', helperRoutes);
app.use('/subject', subjectRoutes);




module.exports = app;
const express = require('express');
const app = express();




const userRoutes = require('./RESTAPI/user');

app.use('/user', userRoutes);

module.exports = app;
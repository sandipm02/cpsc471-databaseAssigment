const express = require('express');
const bodyparser = require('body-parser');
const connection = require('../connection')
const router = express.Router();

router.get('/', (req, res)=>{

    connection.query('SELECT * FROM studyhubdb.user', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })


});





module.exports = router;

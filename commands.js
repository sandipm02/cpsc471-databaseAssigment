var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var Username ;
var userType;
var sid;

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "./public/")));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    databse: 'studyhubdb',
    insecureAuth : true
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
          
    });
  });
  
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname +  '/login.html'));
});

app.post('/checkLogin', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        con.query('SELECT * FROM user WHERE Username = ? AND Pword = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                userID = results[0].ID;
                userType = results[0].TYPE;
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/goHome');
            } else {
                response.redirect('/goLogin');
            }
        });
    } else {
        response.redirect('/goLogin');
    }
});

app.get('/goLogin', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/goHome', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

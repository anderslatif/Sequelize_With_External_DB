var express = require("express");
var path = require("path");
var Promise = require("bluebird");

var app = express();

// For SSL
var https = require("https");
var fs = require("fs"); // to read the private and public key files

var privateKey = fs.readFileSync(__dirname + "/sslcert/privateSSL", 'utf8');
var certificate = fs.readFileSync(__dirname + "/sslcert/public", 'utf8');
var sslOptions = {"key": privateKey, "cert": certificate};

var serverSSL = https.createServer(sslOptions, app);


// syncing the models to the database and associating the mapping (persistence layer)
var db = require('./models/db');


// traditional http
db.sequelize.sync().then( function() {
     var server = app.listen(3000, function(err) {
        if (err) {
            console.log('Cannot listen on port %d', server.address().port)
        }
        console.log('Listening on port %d', server.address().port);
    });
});

// https and SSL
db.sequelize.sync().then( function() {
     var server = serverSSL.listen(3001, function(err) {
        if (err) {
            console.log('Cannot listen on port %d', server.address().port)
        }
        console.log('Listening on port %d', server.address().port);
    });
});


app.get("/", function(req, res) {
    res.sendFile( __dirname + "/index.html" );
});

app.get("/users", function(req, res) {
    var usersList = [];

    return db.User.findAll().then( function(users) {

        return users.forEach( function(user) {
            usersList.push({firstName: user.firstName, lastName: user.lastName});
        })
    }).then( function() {
        res.json({usersList: usersList});
    });
});

app.get("/newuser/:firstName/:lastName", function(req, res) {
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;

    var newUser = {firstName: firstName, lastName: lastName};

    return db.User.create(newUser)
        .catch( function(error) {
            console.log("Error happened while creating a new user    ");
            console.log(error)
        });
});








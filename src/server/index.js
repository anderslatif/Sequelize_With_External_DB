var express = require("express");
var path = require("path");

var app = express();

// app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", function(req, res) {
    res.sendFile( __dirname + "/index.html" );
});

var server = app.listen(3000, function(err) {
    if (err) {
        console.log('Cannot listen on port %d', server.address().port)
    }
    console.log('Listening on port %d', server.address().port);
});



console.log("Database");
var Sequelize = require('sequelize');  // the is the library method
var sequelize = require('./db-helper/sequelize.js')();
//var User = require('./models/user.js');





//console.log("@@@@@@@@@@@@@", sequelize.User);

// force: true will drop the table if it already exists
/*sequelize.User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});*/


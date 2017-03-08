var express = require("express");
var path = require("path");
var Promise = require("bluebird");

var app = express();

console.log("Database");
var db = require('./models/db');



db.sequelize.sync().then( function() {
     var server = app.listen(3000, function(err) {
        if (err) {
            console.log('Cannot listen on port %d', server.address().port)
        }
        console.log('Listening on port %d', server.address().port);
    });
});


app.get("/", function(req, res) {
    res.sendFile( __dirname + "/index.html" );
    console.log("!!!!!!!!", db);
    //db.User.findAll(db);
});










//console.log("@@@@@@@@@@@@@", sequelize.User);

// force: true will drop the table if it already exists
/*sequelize.User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});*/


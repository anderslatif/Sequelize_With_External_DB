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



var Sequelize = require('sequelize');
var DatabaseConstants = require("./DatabaseConstants");


var sequelize = new Sequelize(DatabaseConstants.DATABASE_NAME, DatabaseConstants.DATABASE_USERNAME, DatabaseConstants.DATABASE_PASSWORD, {
    host: DatabaseConstants.DATABASE_HOST,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
});

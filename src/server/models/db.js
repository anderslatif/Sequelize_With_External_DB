"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var DB_CONST = require("../db-helper/DatabaseConstants.js");
var config = require("../config.json")['database'];
var sequelize = new Sequelize(DB_CONST.DATABASE_NAME, DB_CONST.DATABASE_USERNAME, DB_CONST.DATABASE_PASSWORD, config);
//var sequelize = new Sequelize('mysql://sequelizeuser:keanodejsmandatory1@192.168.8.103:3306/sequelize', config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
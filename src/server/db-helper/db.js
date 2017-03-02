var sequelize = require('../db-helper/sequelize')();
var inflection = sequelize.Utils.inflection;
var Promise = require('bluebird');


var db = {};

/*
 *Load in the models, and inject them into our db object
 */
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    }).forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[inflection.camelize(model.name)] = model;
});

Promise.map(Object.keys(db), function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
        console.log('associating:' + modelName);
    }
}).then(function() {
    sequelize.sync({ force: false, logging: function() { return true; } });
});

module.exports = db;
module.exports = function () {
    var Sequelize = require('sequelize');
    var DatabaseConstants = require("./DatabaseConstants");

    var sequelize = new Sequelize(DatabaseConstants.DATABASE_NAME, DatabaseConstants.DATABASE_USERNAME, DatabaseConstants.DATABASE_PASSWORD, {
        host: DatabaseConstants.DATABASE_HOST,
        dialect: 'mysql',

        pool: {
            max: 100,
            min: 0,
            idle: 100000
        },
        logging: function() { return false; }, //console.log
    });
    return sequelize;
};


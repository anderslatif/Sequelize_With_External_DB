module.export = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
    }, {
        tableName: "users",
        classMethods: {
            associate: function (models) {

            },
            syncing: function(force) {
               User.sync({
                   force: true
               }).catch(function (error) {
                   console.log('error creating invoiced_event table');
                   console.log(error);
               });
            },
            getAll: function (models) {
                return User.findAll({})
            }
        }
    });
    return User;
};


module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define("Organization", {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        org: {
            type: DataTypes.STRING
        },
        volunteers: {
            type: DataTypes.INTEGER
        },
        hours: {
            type: DataTypes.INTEGER
        }
    });
    return Organization;
};
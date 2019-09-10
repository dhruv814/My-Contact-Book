module.exports = function (sequelize, Sequelize) {
    
    var Contacts = sequelize.define('contact', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        user_id: {
            type: Sequelize.INTEGER,
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        phone:{
            type:Sequelize.BIGINT,
            validate:{
                notEmpty: true
            }
        }
    });
    return Contacts;
}
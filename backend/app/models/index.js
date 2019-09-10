"use strict";

var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..','..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user');
const Contact = require('./contacts');

//models
const user = User(sequelize, Sequelize);
const contact = Contact(sequelize, Sequelize);

user.hasMany(contact, {foreignKey: 'user_id',as:'users', sourceKey:'id'});
contact.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'contacts'
});

sequelize.sync({force:false}).then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

module.exports = {
    contact,user
};
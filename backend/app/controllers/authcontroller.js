var exports = module.exports = {};
fs = require('fs');
const { removeContact, addContact, updateContact, getContacts , getContactsByUserId} = require('../services/contact-service');
const {getUserByUsername , getUserInfoById } = require('../services/user-service')
exports.signup = function (req, res) {
    
    console.log("inside singup controller");
    res.send(true);
}

exports.signin = function (req, res) {
    console.log("inside singin controller");
    res.send(true);
}


exports.addContact = function (req, res) {
    addContact(req.body);
    res.send(true);
}

exports.getContact = async function (req, res) {
    let result = await getContacts();
    res.send(result);
}

exports.getContactById = async function (req, res) {
    let result = await getContactsByUserId(req.params.id);
    res.send(result);
}

exports.updateContact = async function (req, res) {

    let result = await updateContact(req.params.id, req.body);
    res.send(result);
}

exports.deleteContact = async function (req, res) {

    await removeContact(req.params.id);
    res.send(true);
}

exports.getUserId = async function (req, res) {
    let result = await getUserByUsername(req.params.username);
    res.send(result);
}

exports.getUserById = async function (req,res){
    console.log(req.params.id);
    
    let result = await getUserInfoById(req.params.id);
    res.send(result);
}


var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {


    app.post('/signup', passport.authenticate('local-signup'), authController.signup);

    app.post('/signin', passport.authenticate('local-signin'), authController.signin);
 
    app.post('/contacts', authController.addContact);

    app.get('/contacts',authController.getContact);

    app.get('/contacts/:id',authController.getContactById);

    app.put('/contacts/:id',authController.updateContact);

    app.delete('/contacts/:id',authController.deleteContact);

    app.get('/user/:username',authController.getUserId);

    app.get('/users/:id',authController.getUserById);

}
var express = require('express');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').config();
var exphbs = require('express-handlebars')
var cors = require('cors');

//set view engin
app.set('views', './app/views/')
app.set('view engine', 'hbs');

app.use(cors());

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions   

//Models
var models = require("./app/models");




//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

app.listen(8000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Node's enviornment variable (contains what the enviorment is)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Moved all CONFIG functionality
var config =  require('./server/config/config')[env];

// Moved all EXPRESS functionality and took out __dir
require('./server/config/express')(app, config);

// Moved all Mongoose code
require('./server/config/mongoose')(config);

// using mongoose to look up a user
// Strategy is how passport implements the authentication
// there are strategies for Twitter, FB, etc
var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        // make sure user was found
        User.findOne({username:username}).exec(function(err, user){
            //TODO: need to check password as well
            if(user && user.authenticate(password)) {
                // if found
                return done(null, user);
            } else {
                return done(null,false);
            }
        })
    }
));

// have to tell passport how to serialize and de-serialize the use
passport.serializeUser(function(user, done){
   if(user){
       done(null, user._id);
   }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

// Moved all Routes
require('./server/config/routes')(app);

// tell the app to start listening to requests
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');

// -----> Lanch app in terminal -> nodemon server.js


var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    // Through mongoose user model & mongoose user model we'll get list of all our users
    User.find({}).exec(function(err, colleciton) {
        res.send(colleciton);
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    // with the user data correct we'll create the user record inside the db using mongoose
    User.create(userData, function(err, user) {
        debugger;
        if(err) {
            // Formating the error msg
            // if user tries to create username that exists here is the Mongo error message
            if(err.toString().indexOf('E11000') > -1) {
                // if matches we'll create new error code with our format
                err = new Error('Duplicate Username');
            }
            res.status(400);
            // send the reason back to the client using the reason property
            return res.send({ reason:err.toString() })
        }

        // if no error --> log user in --> send back to client
        req.logIn(user, function(err) {
            if(err) { return next(err); }
            res.send(user);
        });


    })
};
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

exports.updateUser = function(req, res) {
    var userUpdates = req.body;

    // check that the current user id matches the update id
    if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstname;
    req.user.lastName = userUpdates.lastname;
    req.user.username = userUpdates.username;

    // code to update current user
    // TODO: need to make admin able to update other users
    if(userUpdates.password && userUpdates.password.length > 0) {

        // if password is sent to the server update it
        req.user.sale = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.sale, userUpdates.password);
    }

    // save to DB using Mongoose
    req.user.save(function(err) {
        // if error
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()})
        }
        // if no error get the current value
        res.send(req.user);

    })

}

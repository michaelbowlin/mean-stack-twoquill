var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function () {
        // using mongoose to look up a user
        // Strategy is how passport implements the authentication
        // there are strategies for Twitter, FB, etc
    passport.use(new LocalStrategy(
        function (username, password, done) {
            // make sure user was found
            User.findOne({username: username}).exec(function (err, user) {
                //TODO: need to check password as well
                if (user && user.authenticate(password)) {
                    // if found
                    return done(null, user);
                } else {
                    return done(null, false);
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

}
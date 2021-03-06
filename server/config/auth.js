var passport = require('passport');


// middleware that will authenticate user when someone logs in with POST
// trying to login using an XHR post (not the typical way to use passport)
exports.authenticate = function(req, res, next){

    // local -> is the strategy we're using
    var auth = passport.authenticate('local', function(err, user){
        if(err) {return next(err);}
        // failed to authenticate the user
        if(!user) { res.send({success:false})}

        // create a session (we have to tell passport to login the user since we're using XHR -> not the typical way)
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            // send to the client a JSON object saying we were able to login the user
            // also send the user down
            res.send({success:true, user: user});
        })
    })

    // need to call the auth function
    auth(req, res, next);
};

exports.requiresApiLogin =  function(req, res, next) {
    // separates the authentication logic out from the handling logic
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requireRole = function(role) {
    return function(req, res, next) {
        // req.user is the current user logged in
        // === -1 ---> if that role isn't found
        // also need to add a check that the user's been authenticated
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
}
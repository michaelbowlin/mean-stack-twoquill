var passport = require('passport');

module.exports = function(app) {

    // partials is anything with the word partials
    // :partialPath is a placeholder
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // middleware that will authenticate user when someone logs in with POST
    // trying to login using an XHR post (not the typical way to use passport)
    app.post('/login', function(req, res, next){

        // local -> is the strategy we're using
        var auth = passport.authenticate('local', function(err, user){
            if(err) {console.log('Loser ---->'); return next(err);}
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
    });

    // Index View:
    // this allows index for any route that is not built
    // good for clientside routing --> can be dangerous if typos
    app.get('*', function(req, res){
    res.render('index');
    });
}
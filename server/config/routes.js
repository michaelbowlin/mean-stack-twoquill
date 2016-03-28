var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {

    // chain of Middleware into our app.get call
            // ** don't want to invoke() requiresApiLogin because Express with do that
    app.get('/api/users', auth.requireRole('admin'), function(req, res) {
        // Through mongoose user model & mongoose user model we'll get list of all our users
        User.find({}).exec(function(err, colleciton) {
            res.send(colleciton);
        })
    });

    // partials is anything with the word partials
    // :partialPath is a placeholder
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        // call the logout function on request added by the Passport module
        req.logout();
        // End the response
        res.end();
    });

    // Index View:
    // this allows index for any route that is not built
    // good for clientside routing --> can be dangerous if typos
    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
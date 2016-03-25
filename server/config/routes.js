var auth = require('./auth');

module.exports = function (app) {

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
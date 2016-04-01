var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {

    // chain of Middleware into our app.get call
            // ** don't want to invoke() requiresApiLogin because Express with do that
    app.get('/api/users', auth.requireRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    // delegate the call off to a controller
    // using a method called get courses
    app.get('/api/courses', courses.getCourses);

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

    // provide a 404 error if api isn't hit successfully
    app.all('/api/*', function(req, res) {
       res.send(404);
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
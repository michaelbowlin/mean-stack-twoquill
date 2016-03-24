var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')
    passport = require('passport');


module.exports = function (app, config) {
            // Compile function that gets used by the middleware
        function compile(str, path) {
            return stylus(str).set('filename', path);
        }

            // Configure view engine
        app.set('views', config.rootPath + '/server/views');
            // Set the view engine // TODO: need to change from jade to EJS
        app.set('view engine', 'jade');
            // Express's logging
        app.use(logger('dev'));
            // allows us to parse URL encoded and JSON
            // now need to use 2 lines of code
            // 1) app.use(bodyParser.urlencoded({extended: true}));
            // 2) app.use(bodyParser.json());
            // this is the OLD --> app.use(bodyParser());

            // Cookie parser
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
            // session middleware
        app.use(session({secret: 'multi vision unicorns'}));
        app.use(passport.initialize());
            // Configuring the stylus middleware
        app.use(passport.session());
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
            // two options in addition to the secret we have to explicitly choose an option
        app.use(session({secret: 'multi vision unicorns',resave:false,saveUninitialized:false}));

            // Execute the passport middleware


            // Set up static routing to our public directory by using Express's static middleware
            // this tells Express that anytime requests come in that match up to the /public dir to go ahead and serve that file
            // this is STATIC ROUTE HANDLING
        app.use(express.static(config.rootPath + '/public'));

}

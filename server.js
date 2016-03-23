var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

// Node's enviornment variable (contains what the enviorment is)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Compile function that gets used by the middleware
function compile(str, path) {
    return stylus(str).set('filename', path);
}

// Configure view engine
app.set('views', __dirname + '/server/views');
// Set the view engine // TODO: need to change from jade to EJS
app.set('view engine','jade');
// Express's logging
app.use(logger('dev'));
// allows us to parse URL encoded and JSON
    // now need to use 2 lines of code
    // 1) app.use(bodyParser.urlencoded({extended: true}));
    // 2) app.use(bodyParser.json());
// this is the OLD --> app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring the stylus middleware
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

// Set up static routing to our public directory by using Express's static middleware
// this tells Express that anytime requests come in that match up to the /public dir to go ahead and serve that file
// this is STATIC ROUTE HANDLING
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
   res.render('partials/' + req.params.partialPath);
});

// add a route that delivers index page
// typical way is to coordinate your routes so that clientside is same as serverside
// app.get('/');

// this allows index for any route that is not built
// good for clientside routing --> can be dangerous if typos
app.get('*', function(req, res){
    res.render('index');
});

// tell the app to start listening to requests
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');

// -----> Lanch app in terminal -> nodemon server.js
var express = require('express');

// Node's enviornment variable (contains what the enviorment is)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Configure view engine
app.set('views', __dirname + '/server/views');

// Set the view engine // TODO: need to change from jade to EJS
app.set('view engine','jade');

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
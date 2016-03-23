var express = require('express'),
    mongoose = require('mongoose');

// Node's enviornment variable (contains what the enviorment is)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Moved all CONFIG functionality
var config =  require('./server/config/config')[env];

// Moved all EXPRESS functionality and took out __dir
require('./server/config/express')(app, config);

// Moved all Mongoose code
require('./server/config/mongoose')(config);

// Moved all Routes
require('./server/config/routes')(app);

// tell the app to start listening to requests
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');

// -----> Lanch app in terminal -> nodemon server.js


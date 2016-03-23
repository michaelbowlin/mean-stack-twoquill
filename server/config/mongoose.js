var mongoose = require('mongoose');

module.exports = function(config) {
    // Moongose is a NODE application that helps connect MongoDB and Node apps
    // works off of schemas and is controversial
    //      multivision is the name of the database and mongo will create it
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened ====> BEach');
    });
}
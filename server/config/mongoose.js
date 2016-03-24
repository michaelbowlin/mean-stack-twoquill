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

    // Schema for user type
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    // Model for user type
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            User.create({firstName:'mike',lastName:'mike',username:'mike'});
            User.create({firstName:'michael',lastName:'michael',username:'michael'});
            User.create({firstName:'john',lastName:'john',username:'john'});
        }
    });

    // =====> in Mongo: db.users.find()
}


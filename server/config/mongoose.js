var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    // Method to check user password
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    // Model for user type
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var salt, hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mike')
            User.create({firstName:'mike',lastName:'mike',username:'mike', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'esther'),
            User.create({firstName:'esther',lastName:'esther',username:'esther', salt: salt, hashed_pwd: hash, roles: '[]' });
        }
    });
    // =====> in Mongo: db.users.find()
};


// *** abstracted Salt and Hash functionality into new utility class --> encryptionjs


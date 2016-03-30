var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

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

function createDefaultUsers() {
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
}

exports.createDefaultUsers = createDefaultUsers;
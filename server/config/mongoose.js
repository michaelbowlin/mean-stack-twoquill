var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        hashed_pwd: String
    });

    // Method to check user password
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    // Model for user type
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'mike')
            User.create({firstName:'mike',lastName:'mike',username:'mike', salt: salt, hashed_pwd: hash });
        }
    });

    // =====> in Mongo: db.users.find()
}

//TODO: Should be sending Hash and Salt down to client!

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

/* Old Way - Deprecated
function hashPwd(salt, pwd) {
    // HMAC --> Hash Message Authentication Code (sha1 - algorithm)
    var hmac = crypto.createHmac('sha1', 'salt');
    return hmac.update(pwd).digest('hex');
}
*/
 function hashPwd(salt, pwd) {
     // HMAC --> Hash Message Authentication Code (sha1 - algorithm)
     var hmac = crypto.createHmac('sha1',salt);
     hmac.setEncoding('hex');
     hmac.write(pwd);
     hmac.end();
     return hmac.read()
 }




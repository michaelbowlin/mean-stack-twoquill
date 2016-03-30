var crypto = require('crypto');

//TODO: Should be sending Hash and Salt down to client!

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
}

/* Old Way - Deprecated
 function hashPwd(salt, pwd) {
 // HMAC --> Hash Message Authentication Code (sha1 - algorithm)
 var hmac = crypto.createHmac('sha1', 'salt');
 return hmac.update(pwd).digest('hex');
 }
 */
exports.hashPwd = function(salt, pwd) {
    // HMAC --> Hash Message Authentication Code (sha1 - algorithm)
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read()
}
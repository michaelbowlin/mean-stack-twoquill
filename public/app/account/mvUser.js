// User resource object
angular.module('app').factory('mvUser', function($resource) {

    var UserResource = $resource('/api/users/:id', {_id: "@id"},
        // here we're adding in another parameter
        // key is upadate and the value is an object that has configuration properties for this operation
        // isArray: false means a single object
        {
        update: {method:'PUT', isArray:false}
    });

    // this will add the isAdmin reference to every instance of a user
    // * testing isAdmin --> True/False
    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
});
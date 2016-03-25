// User resource object
angular.module('app').factory('mvUser', function($resource) {
    var UserResource = $resource('/api/users/:id', {_id: "@id"});
    // this will add the isAdmin reference to every instance of a user
    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
});
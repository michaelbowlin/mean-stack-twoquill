// adding in the q lib for a promise
angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {

            // communicate back to the controller using a promise
            var dfd = $q.defer();

            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    // Create a new instance of the mvUser
                    // Bring in new dependency (top) mvUser
                    var user = new mvUser();
                    // takes the data from the POST and adds it into the user object we created
                    angular.extend(user, response.data.user);
                    // Current user equal to that user
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;

        },

        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            // defered promise
            var dfd = $q.defer();

            // $save since it's a resource object
            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
               dfd.reject(response.data.reason);
            });

            // return promise
            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized')
            }
        },

        authorizeAuthenticatedUserForRoute: function (role) {
            if (mvIdentity.isAuthorized()) {
                return true;
            } else {
                return $q.reject('not authorized')
            }
        }



    }
});

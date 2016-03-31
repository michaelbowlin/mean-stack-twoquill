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

        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();
            debugger;
            // make copy of user resource object because you don't want to update the object
            // unless you know the save is successful
            var clone = angular.copy(mvIdentity.currentUser);

            // copy the new data onto the clone object
            angular.extend(clone, newUserData);

            // Need to do a PUT instead of a POST
            clone.$update().then(function() {
                // is successful update the current user
                mvIdentity.currentUser = clone;
                // resole the defer
                dfd.resolve();
            }, function(response) {
                // or reject the defer with the reason it failed
                dfd.reject(response.data.reason);
            });

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
            if (mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized')
            }
        }



    }
});

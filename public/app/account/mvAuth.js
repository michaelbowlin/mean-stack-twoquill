// adding in the q lib for a promise
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return {
        authenticateUser: function(username, password) {

            // communicate back to the controller using a promise
            var dfd = $q.defer();

            $http.post('/login', {username:username, password:password}).then(function(response){
                if(response.data.success) {
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
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function(){
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }

    }
});

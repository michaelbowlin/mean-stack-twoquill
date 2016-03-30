angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier) {

    // Get the data from the current user
    $scope.email = mvIdentity.currentUser.username;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;

    // Update View
    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname,
        };

        // only update pwd if user changed
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        // delegate the responsibly of calling to the server to the auth service
        mvAuth.updateCurrentuser(newUserData).then(function() {
            mvNotifier.notify('Your user account has been updated')
        }, function(reason) {
           mvNotifier.error(reason);
        });

    }

});
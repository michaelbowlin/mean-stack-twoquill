angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){
   $scope.signup = function() {
       debugger;
       var newUserData = {
           username: $scope.email,
           password: $scope.password,
           firstName: $scope.fname,
           lastName: $scope.lname
       };

       // pass data into the auth
       // then add handlers based on the success/failure of that call
       mvAuth.createUser(newUserData).then(function(){
           debugger;
           mvNotifier.notify('User account created!');
           $location.path('/');
       }, function(reason) {
           mvNotifier.error(reason);
       });

   }
});


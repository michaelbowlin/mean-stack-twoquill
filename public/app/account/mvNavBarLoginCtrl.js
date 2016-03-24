angular.module('app').controller('mvNavBarLoginCtrl',function($scope, $http){
    $scope.signin = function(username, password) {
        //console.log("I'm not done yet");
        $http.post('/login', {username:username, password:password}).then(function(response){
            debugger;
          if(response.data.success) {
              console.log('logged in!');
          } else {
              console.log('failed to login');
          }
        })
    }
});
angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses){

    // one solution for is HTTP caching
    // -- angular keeps a list of all requests made over XHR
    $scope.courses =  mvCachedCourses.query();

});
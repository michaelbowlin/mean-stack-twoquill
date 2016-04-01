angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCourse, $routeParams) {
    // Client property -> id -> (mvCourseDetailCtrl.js)
    // Server property -> _id -> (mvCourse.js)
    $scope.course = mvCourse.get({_id:$routeParams.id})
});
angular.module('app').controller('mvCourseListCtrl', function($scope, mvCourse) {
    // will need a RESOURCE to query
    $scope.courses = mvCourse.query();
});
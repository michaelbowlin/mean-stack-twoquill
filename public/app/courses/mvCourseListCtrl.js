angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
    // will need a RESOURCE to query
    $scope.courses = mvCachedCourses.query();

    // Sort options
    $scope.sortOptions = [
        {value:"title",text: "Sort by Title"},
        {value:"published",text: "Sort by Publish Date"},
    ];

    // auto sort the list by first item: title in this case
    $scope.sortOrder = $scope.sortOptions[0].value;
});
angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams) {
    // Client property -> id -> (mvCourseDetailCtrl.js)
    // Server property -> _id -> (mvCourse.js)
    // $scope.course = mvCourse.get({_id:$routeParams.id})

    // query returns an arry that exposes a promise resolves when the data comes back
    // contained in the $promise property
    mvCachedCourses.query().$promise.then(function(collection){
        // iterate through collection, find course and put it on the scope
        collection.forEach(function(course) {
            if(course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    })
});
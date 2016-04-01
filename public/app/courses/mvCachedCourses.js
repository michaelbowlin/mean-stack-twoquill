angular.module('app').factory('mvCachedCourses', function(mvCourse) {
   var courseList;

    return {
        // query method is implementing a call to the course resource (mvCourse) function
        // because the return of the cache course query function is the same thing as
        // calling course.query --- which will give you the same empty array
        query: function() {
            // is list populated?
            if(!courseList) {
                courseList = mvCourse.query();
            }

            return courseList;
        }
    }
});
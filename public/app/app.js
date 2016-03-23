// define angular module
angular.module('app', ['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    // turn on HTML5 mode for routing
    // in layout.jade need to add base(href="/")
    $locationProvider.html5Mode(true);

    // define routes
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main', controller: 'mvMainCtrl'
        });


});

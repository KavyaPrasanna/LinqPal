var app = angular.module("app", ['UserApp', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl : 'templates/List.html',
            controller: 'basicInfoController'
        })
        .when('/form', {
            templateUrl: 'templates/form.html',
            controller: 'addUserCtrl'
        })
        .when('/adminlogin', {
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        })
        .when('/welcome', {
            templateUrl: 'templates/welcome.html',
            controller: 'addUserCtrl'
        })
        .otherwise({
            template : "<h1>None</h1><p>This URL is not expected.</p>"
        });
});

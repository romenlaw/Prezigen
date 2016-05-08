angular.module('preziAdmin', ['ngRoute']);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home/home.view.html',
        constructor: 'homeCtrl'
    })
    .when('/suppliers', {
        templateUrl: 'suppliers/suppliers.view.html',
        constructor: 'suppliersCtrl'
    })
    .otherwise({ redirectTo: '/' });
}

angular
.module('preziAdmin')
.config(['$routeProvider', config]);

(function () {


angular.module('preziAdmin', ['ngRoute']);
    
    config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
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
    //$locationProvider.html5Mode(true);
}

angular
.module('preziAdmin')
.config(['$routeProvider', '$locationProvider', config])

;

})();

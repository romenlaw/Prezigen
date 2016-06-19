(function () {


angular.module('preziAdmin', ['ngRoute', 'angularUtils.directives.dirPagination']);
    
    config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'adminCtrl',
            controllerAs: 'vm'
        })
    .when('/suppliers', {
            templateUrl: 'suppliers/suppliers.view.html',
            controller: 'suppliersCtrl'
        })
    .when('/products', {
            templateUrl: 'products/products.view.html',
            controller: 'productsCtrl'
        })
    .otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
}

angular
.module('preziAdmin')
.config(['$routeProvider', '$locationProvider', config])

;

})();

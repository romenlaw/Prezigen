(function () {
    angular.module('preziAdmin')
.controller('adminCtrl', adminCtrl)
.factory("sharedData", sharedData)
    ;
    
    adminCtrl.$inject = ['$scope', '$http', 'sharedData'];
    function adminCtrl($scope, $http, sharedData) {
        var vm = this;
        vm.pageSize = 10;
        vm.suppliers = {};

        $http.get("/api/suppliers")
            .then(function successCallback(response) {
            vm.suppliers = response.data;
            sharedData.setSuppliers(response.data);
        },
            function errorCallback(response) {
            console.log("error finding all suppliers " + response);
        });
        $scope.$watch('vm.suppliers', function (newValue, oldValue) {
            if (newValue !== oldValue) sharedData.setSuppliers(newValue);
        });
    };

    function sharedData() {
        var suppliers= {};
        /*
        $http.get("/api/suppliers")
            .then(function successCallback(response) {
            suppliers = response.data;
        },
            function errorCallback(response) {
            console.log("error finding all suppliers " + response);
        });
        */
        return {
            getSuppliers: function () {
                return suppliers;
            },
            setSuppliers: function (sups) {
                suppliers = sups;
            }
        };
    };
})();
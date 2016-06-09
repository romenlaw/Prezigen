(function () {
    angular.module('preziAdmin')
    .directive('personform', personform)
    ;

    function personform() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/personform/personform.template.html',
            scope: {
                persons: "=persons"
            }
        }
    }
})();
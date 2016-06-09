(function () {
    angular
    .module('preziAdmin')
    .directive('addressform', addressform)
    ;

    function addressform() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/addressform/addressform.template.html',
            scope: {
                addresses: "=addresses"
            }
        }
    }
})();
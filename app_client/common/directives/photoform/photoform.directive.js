(function () {
    angular
    .module('preziAdmin')
    .directive('photoform', photoform)
    ;
    
    function photoform() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/photoform/photoform.template.html',
            scope: {
                photos: "=photos"
            }
        }
    }
})();
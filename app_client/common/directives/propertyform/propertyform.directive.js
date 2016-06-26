(function () {
    angular
    .module('preziAdmin')
    .directive('propertyform', propertyform)
    ;
    
    function propertyform() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/propertyform/propertyform.template.html',
            scope: {
                properties: "=properties"
            }
        }
    }
})();
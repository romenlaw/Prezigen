(function () {
    angular.module('preziAdmin')
    .directive('tagform', tagform)
    ;
    
    function tagform() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/tagform/tagform.template.html',
            scope: {
                tags: "=tags"
            }
        }
    }
})();
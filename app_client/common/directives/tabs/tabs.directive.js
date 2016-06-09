(function () {
    angular.module('preziAdmin')
    .directive('tab', tabDirective)
    .directive('tabset', tabsetDirective)
    ;
    function tabsetDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: '/common/directives/tabs/tabset.template.html',
            bindToController: true,
            controllerAs: 'tabset',
            controller: function () {
                var self = this;
                self.tabs = [];
                
                self.addTab = function addTab(tab) {
                    self.tabs.push(tab);
                    if (self.tabs.length === 1) {
                        tab.active = true;
                    }
                }
                
                self.select = function (selectedTab) {
                    angular.forEach(self.tabs, function (tab) {
                        if (tab.active && tab !== selectedTab) {
                            tab.active = false;
                        }
                    });
                    selectedTab.active = true;
                }
            }
        }
    }
    function tabDirective() {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
            scope: {
                heading: '@'
            },
            require: '^tabset',
            link: function (scope, elem, attr, tabsetCtrl) {
                scope.active = false;
                tabsetCtrl.addTab(scope);
            }
        }
    }
})();
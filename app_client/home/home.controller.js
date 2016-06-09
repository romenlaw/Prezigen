(function () {


angular.module('preziAdmin')
.controller('homeCtrl', homeCtrl);

function homeCtrl($scope){
    $scope.pageHeader = {
        title : 'Prezi Admin',
        strapline: 'the finest prezent ideas site around'
    };
    $scope.sidebar = {
        content: "looking for presents? look no further than Prezigen"
    };
}

})();
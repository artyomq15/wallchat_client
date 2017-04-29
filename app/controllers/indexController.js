'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
  	
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }

    $scope.authentification = authService.authentification;
    if (!$scope.authentification.isAuth) {
    	$location.path('/login');
    };

}]);

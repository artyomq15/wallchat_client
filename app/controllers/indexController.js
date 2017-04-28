'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
  	
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentification = authService.authentification;
    if (!$scope.authentification.isAuth) {
    	$location.path('/home');
    };

}]);

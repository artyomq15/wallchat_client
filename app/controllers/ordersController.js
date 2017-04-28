'use strict';
app.controller('ordersController', ['$scope', 'ordersService','authService', function ($scope, ordersService, authService) {
	$scope.authentication = authService.authentification;
    console.log($scope.authentication);
    $scope.orders = [];

    ordersService.getOrders().then(function (results) {

        $scope.orders = results.data;

    }, function (error) {
        //console.log(error.data.message);

    });

}]);

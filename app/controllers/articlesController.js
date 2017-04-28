'use strict';
app.controller('userController', ['$scope', 'userService','authService', function ($scope, userService, authService) {
	$scope.authentication = authService.authentification;
    console.log($scope.authentication);
    $scope.users = [];

    userService.getUser().then(function (results) {

        $scope.users = results.data;
        for (var i = 0; i < $scope.users.length; i++) {
        	if ($scope.authentication.userName == $scope.users[i].UserName) {

        		$scope.user = $scope.users[i];
        	};
        };
        

    }, function (error) {
        //alert(error.data.message);
    });

}]);


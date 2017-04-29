'use strict';
app.controller('userController', ['$scope', 'userService','authService', function ($scope, userService, authService) {
	var userId;
    $scope.authentication = authService.authentification;
    console.log($scope.authentication);
    $scope.users = [];
    $scope.editedSuccessfully = false;
    $scope.message = "";
    $scope.profileInfo = {
        Id: 3,
        UserName: "kala",
        Name:"",
        Surname:""
    }

    userService.getUser().then(function (results) {

        $scope.users = results.data;
        console.log($scope.users);
        for (var i = 0; i < $scope.users.length; i++) {
        	if ($scope.authentication.userName == $scope.users[i].UserName) {

        		$scope.user = $scope.users[i];
        	};
        };
    var user = $scope.user; 
    userId = $scope.user.Id;

    }, function (error) {
        //alert(error.data.message);
    });

    $scope.editUserProfile = function (){
        console.log($scope.profileInfo);
        userService.editUserProfile($scope.profileInfo).then(function (response){
            $scope.message = "User Profile " + userId + " edited";
            $scope.editedSuccessfully = true;
            console.log(response + ' '+$scope.message);
        },
        function (response){
            console.log("error " + response);
        });
    };
    

}]);


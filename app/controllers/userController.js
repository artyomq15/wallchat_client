'use strict';
app.controller('userController', ['$scope', 'userService','authService', function ($scope, userService, authService) {
	
    
    $scope.authentification = authService.authentification;
    console.log($scope.authentification);

    var userId = $scope.authentification.userId;
    var userName = $scope.authentification.userName;

    $scope.users = [];
    $scope.editedSuccessfully = false;
    $scope.message = "";
    $scope.profileInfo = {
        Id: null,
        UserName: null,
        Name:"",
        Surname:""
    }
    $scope.profileInfo.Id = userId;
    $scope.profileInfo.UserName = userName;

    userService.getUser().then(function (results) {

        $scope.users = results.data;
        console.log($scope.users);
        for (var i = 0; i < $scope.users.length; i++) {
        	if ($scope.authentification.userName == $scope.users[i].UserName) {

        		$scope.user = $scope.users[i];
        	};
        };
    var user = $scope.user; 

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


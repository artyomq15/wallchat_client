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
        Surname:"",
        DateBirth:"12.04.1998",
        Email: null,
        PhoneNumber: null,
        Information: null
    }
    $scope.profileInfo.Id = userId;
    $scope.profileInfo.UserName = userName;

    userService.getUser(userId).then(function (results) {

        $scope.user = results.data;
        console.log($scope.user);
        
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
            $scope.editedSuccessfully = false;
            console.log("error " + response);
        });
    };
    

}]);


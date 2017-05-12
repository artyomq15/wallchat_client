'use strict';
app.controller('userController', ['$scope', 'userService','authService', '$routeParams', function ($scope, userService, authService, $routeParams) {
	$scope.ready = false;
    
    $scope.authentification = authService.authentification;
    console.log($scope.authentification);

    var _userId = $scope.authentification.userId;
    var userName = $scope.authentification.userName;

    $scope.users = [];
    $scope.editedSuccessfully = false;
    $scope.message = "";
    $scope.profileInfo = {
        UserName: null,
        ProfileImageUrl: null,
        Name:"",
        Surname:"",
        DateBirth:"12.04.1998",
        Email: null,
        PhoneNumber: null,
        Information: null
    }
    $scope.profileInfo.Id = _userId;
    $scope.profileInfo.UserName = userName;


    var userId = $routeParams["userId"]; 
    if (userId==undefined) {
        userId = _userId;
    };
    console.log(userId);

    userService.getUser(userId).then(function (results) {

        $scope.user = results.data;
        console.log($scope.user);
        $scope.ready = true;
        
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


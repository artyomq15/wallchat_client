'use strict';
app.controller('userController', ['$scope', 'userService','authService','subscriptionsService', '$routeParams', function ($scope, userService, authService,subscriptionsService, $routeParams) {
	
    $scope.ready = false;
    
    $scope.authentification = authService.authentification;
    console.log($scope.authentification);

    var _userId = $scope.authentification.userId;

    $scope.users = [];

    $scope.subscribes = [];
    $scope.subscribesInfo = [];

    $scope.subscribers = [];
    $scope.subscribersInfo = [];

    $scope.mySubscribes = [];

    $scope.editedSuccessfully = false;

    $scope.message = "";

    $scope.profileInfo = {
        Id: null,
        UserName: null,
        ProfileImageUrl: null,
        Name:"",
        Surname:"",
        DateBirth:"12.04.1998",
        Email: null,
        PhoneNumber: null,
        Information: null
    }

    $scope.profileInfo.UserName = $scope.authentification.userName;
    $scope.profileInfo.Id = _userId;

    var userId = $routeParams["userId"]; 
    if (userId==undefined) {
        userId = _userId;
    };

    console.log(userId);

    

    userService.getUser(userId).then(function (results) {

        $scope.user = results.data;
        console.log($scope.user);

        $scope.getSubscribes(userId);
        
        
        
    var user = $scope.user; 

    }, function (error) {
        //alert(error.data.message);
    });

    $scope.getSubscribes = function(userId){

            subscriptionsService.getSubscribes(userId).then(function (results){
            $scope.subscribes = results.data;
            console.log($scope.subscribes);
            $scope.getSubscribesInfo();
        },
        function (error){
            console.log("error = " + error);
        });
    };

    $scope.getSubscribesInfo = function (){
        userService.getAllUsers().then(function (results){
            $scope.users = results.data;
            console.log($scope.users);

            subscriptionsService.getMySubscribes().then(function (results){


            $scope.mySubscribes = results.data;

            for (var i=0; i<$scope.subscribes.length;i++){
                for (var j = 0; j < $scope.users.length; j++) {
                    if ($scope.subscribes[i].UserId == $scope.users[j].Id) {

                        
                        for (var k = 0; k < $scope.mySubscribes.length; k++) {
                            if ($scope.mySubscribes[k].UserId == $scope.users[j].Id) {

                                $scope.users[j].isSubsscribe = true;  

                            };
                        };

                                                      
                        
                        $scope.subscribesInfo.push($scope.users[j]);
                    }
                };
            };

            console.log($scope.subscribesInfo);

            $scope.ready = true;


            },
            function (error){
            console.log("ErRoR" + error);
            });
        },
        function (error){
            console.log("ErRoR" + error);
        });
    };

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

    $scope.subscribe = function (userId){
        subscriptionsService.subscribe(userId).then(function (response){
            console.log(response);
        },
        function (error){
            console.log("error.subscribe = " + error);
        });
    };

    $scope.unsubscribe = function (userId){
        subscriptionsService.unsubscribe(userId).then(function (response){
            console.log(response);
        },
        function (error){
            console.log("error.unsubscribe = " + error);
        });
    };


    

}]);


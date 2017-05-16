'use strict';
app.controller('userController', ['$scope', 'userService','authService','subscriptionsService', '$routeParams', '$route', '$location',  function ($scope, userService, authService,subscriptionsService, $routeParams, $route, $location) {
	
    $scope.ready = false;
    
    $scope.authentification = authService.authentification;
    console.log($scope.authentification);

    var _userId = $scope.authentification.userId;

    $scope.users = [];

    $scope.subscribes = [];
    $scope.subscribesInfo = [];

    $scope.subscribers = [];
    $scope.subscribersInfo = [];

    $scope.allSubscriptions = [];

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

        var location = "/editprofile" ;
        if (location != $location.path()) {
            $scope.getAllSubscriprions();

        }
        
        
        
        
        var user = $scope.user; 

    }, function (error) {
        //alert(error.data.message);
    });


    $scope.getAllSubscriprions = function (){
        subscriptionsService.getAllSubscriprions().then(function (results){
            $scope.allSubscriptions = results.data;
            console.log("AllSubs");
            console.log($scope.allSubscriptions);

            for (var i = 0; i < $scope.allSubscriptions.length; i++) {
                if ($scope.allSubscriptions[i].SubscriberId == userId) {
                    $scope.subscribes.push($scope.allSubscriptions[i]);
                } else if ($scope.allSubscriptions[i].UserId == userId) {
                    $scope.subscribers.push($scope.allSubscriptions[i]);
                };
            };

            

            //var location = "/user/"+ _userId ;

            
            /*if (location != $location.path() && "/user" != $location.path() ) {
                $scope.getSubscribesInfo();

            };*/
            $scope.getSubscribesInfo();
            


        },
        function (error){
            console.log("AllSubs error " + error);
        });
    };

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
                                break;

                            };
                        };                  
                        $scope.subscribesInfo.push($scope.users[j]);
                        break;
                    }

                };
            };


            for (var i=0; i<$scope.subscribers.length;i++){
                for (var j = 0; j < $scope.users.length; j++) {

                    if ($scope.subscribers[i].SubscriberId == $scope.users[j].Id) {
                        
                        for (var k = 0; k < $scope.mySubscribes.length; k++) {
                            if ($scope.mySubscribes[k].UserId == $scope.users[j].Id) {

                                $scope.users[j].isSubsscribe = true;  
                                break;

                            };
                        };                  
                        $scope.subscribersInfo.push($scope.users[j]);
                        break;
                    }

                };
            };

            console.log("subRRRRsinfo");
            console.log($scope.subscribersInfo);

            console.log("subsinfo");
            console.log($scope.subscribesInfo);

            if ($scope.user.Id != $scope.authentification.userId) {
                for (var k = 0; k < $scope.mySubscribes.length; k++) {
                        if ($scope.mySubscribes[k].UserId == $scope.user.Id) {
                            console.log("suuuubsinfo");
                            $scope.user.isSubsscribe = true;  
                            break;

                    };
                }; 
            };

            
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
        if ($scope.profileInfo.Name == "") {
            $scope.profileInfo.Name = $scope.user.Name;
        };
        if ($scope.profileInfo.Surname == "") {
            $scope.profileInfo.Surname = $scope.user.Surname;
        };
        if ($scope.profileInfo.Email == null) {
            $scope.profileInfo.Email = $scope.user.Email;
        };
        if ($scope.profileInfo.PhoneNumber == null) {
            $scope.profileInfo.PhoneNumber = $scope.user.PhoneNumber;
        };
        if ($scope.profileInfo.Information == null) {
            $scope.profileInfo.Information = $scope.user.Information;
        };
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


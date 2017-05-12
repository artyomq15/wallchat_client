'use strict';
app.controller('subscriptionsController', ['$scope', 'subscriptionsService', '$routeParams', function ($scope, subscriptionsService,  $routeParams) {
	
    
    
    

    $scope.subscribers = [];
    


    var userId = $routeParams["userId"]; 
    
    console.log(userId);

    

    //$scope.getSubscribers = function (userId){
        subscriptionsService.getSubscribers(userId).then(function (results){
            $scope.subscribers = results.data;
            console.log($scope.subscribers);
        },
        function (error){
            console.log("error = " + error);
        });
    //};

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


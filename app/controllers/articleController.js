'use strict';
app.controller('articleController', ['$scope','$route','$routeParams', '$location' ,'articleService','authService', 'subscriptionsService' , function ($scope, $route, $routeParams, $location, articleService, authService, subscriptionsService) {
	$scope.ready = false;
    $scope.authentification = authService.authentification;
    console.log($scope.authentification);
    $scope.subsArticles = [];
    $scope.articles = [];
    var userId = $scope.authentification.userId;
    console.log($scope.authentification.userId);
    $scope.article = {
    	Text: null,
    	Header: null,
    	ShortDescription: null,
    	ImageUrl: null,
        UserId: null
    };    
    $scope.article.UserId = userId;
    articleService.getArticles().then(function (results) {
        $scope.articles = results.data;
        console.log($scope.articles);
        if ($location.path() == "/articles") {
            subscriptionsService.getSubscribes($scope.authentification.userId).then(function (response){
                $scope.subscribes = response.data;
                for (var i = 0; i < $scope.subscribes.length; i++) {
                    for (var j = 0; j < $scope.articles.length; j++) {
                        if ($scope.subscribes[i].UserId == $scope.articles[j].UserId) {
                            $scope.subsArticles.push($scope.articles[j]);
                        };
                    };
                };
                for (var i = 0; i < $scope.articles.length; i++) {
                    if($scope.articles[i].UserId == $scope.authentification.userId){
                        $scope.subsArticles.push($scope.articles[i]);
                    }
                };
                $scope.ready = true;   
                console.log($scope.subsArticles);
            },
            function (error){
                console.log("Error " + error);
            });
        } else if ($location.path() == "/user/"+$routeParams["userId"]+"/articles") {
            for (var i = 0; i < $scope.articles.length; i++) {
                if($scope.articles[i].UserId == $routeParams["userId"]){
                    $scope.subsArticles.push($scope.articles[i]);
                }
            };
            $scope.ready = true;  
            console.log($scope.subsArticles);
        };
    }, function (error) {
        //alert(error.data.message);
    });
    $scope.sendArticle = function () {
    	console.log($scope.article);
    	articleService.sendArticle($scope.article).then(function (response){
    		$scope.message = "Article sended";
    		console.log(response + ' '+$scope.message);
            $route.reload();
    	},
    	function (response){
    		console.log("error" + response);
 
    	});
    };
    $scope.deleteArticle = function(articleId){
    	articleService.deleteArticle(articleId).then(function (response){
    		$scope.message = "Article " + articleId + " deleted";
    		console.log(response + ' '+$scope.message);
    		$route.reload();
    	},
    	function (response){
    		console.log("error" + response);
     	});
    };
}]);


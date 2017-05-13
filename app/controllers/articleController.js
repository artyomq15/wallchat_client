'use strict';
app.controller('articleController', ['$scope','$route', 'articleService','authService', function ($scope, $route, articleService, authService) {
	$scope.ready = false;

    $scope.authentification = authService.authentification;
    console.log($scope.authentification);
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
        $scope.ready = true;       

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


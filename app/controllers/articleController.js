'use strict';
app.controller('articleController', ['$scope', 'articleService','authService', function ($scope, articleService, authService) {
	$scope.authentication = authService.authentification;
    console.log($scope.authentication);
    $scope.articles = [];

    

    $scope.article = {
    	Text: "0",
    	Header: "0",
    	ShortDescription:"0",
    	ImageUrl: "0"
    };
    




    articleService.getArticles().then(function (results) {

        $scope.articles = results.data;
        console.log($scope.articles);        

    }, function (error) {
        //alert(error.data.message);
    });

    $scope.sendArticle = function () {
    	console.log($scope.article);
    	articleService.sendArticle($scope.article).then(function (response){
    		$scope.message = "Article sended";
    		console.log(response + ' '+$scope.message);
    	},
    	function (response){
    		console.log("error" + response);
 
    	});
    };

    $scope.deleteArticle = function(articleId){
    	articleService.deleteArticle(articleId).then(function (response){
    		$scope.message = "Article " + articleId + " deleted";
    		console.log(response + ' '+$scope.message);
    		$window.location.reload();
    	},
    	function (response){
    		console.log("error" + response);
 
    	});
    };


}]);


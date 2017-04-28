'use strict';
app.factory('articleService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var articleServiceFactory = {};

	var _getArticles = function () {

	return $http.get(serviceBase + "api/articles").then(function (results) {
	  return results;
	});

	};

	var _sendArticle = function(article){
		return $http.post(serviceBase + "api/articles", article).then(function (response){
			return response;
		});
			
	};

	var _deleteArticle = function(articleId){
		return $http.delete(serviceBase + "api/articles/" + articleId).then(function (result){
			return result;
		});
	};



	articleServiceFactory.getArticles = _getArticles;
	articleServiceFactory.sendArticle = _sendArticle;
	articleServiceFactory.deleteArticle = _deleteArticle;

  return articleServiceFactory;

}]);

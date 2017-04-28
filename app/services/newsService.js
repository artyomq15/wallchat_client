'use strict';
app.factory('newsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var profileServiceFactory = {};

	var _getNews = function () {

	return $http.get(serviceBase + "api/news").then(function (results) {
	  return results;
	});

	};

	newsServiceFactory.getNews = _getNews;

  return newsServiceFactory;

}]);

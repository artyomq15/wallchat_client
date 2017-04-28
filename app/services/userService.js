'use strict';
app.factory('userService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var userServiceFactory = {};

	var _getUser = function () {

	return $http.get(serviceBase + "api/users").then(function (results) {
	  return results;
	});

	};

	userServiceFactory.getUser = _getUser;

  return userServiceFactory;

}]);

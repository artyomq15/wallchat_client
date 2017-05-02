'use strict';
app.factory('userService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var userServiceFactory = {};
	
	var _getUser = function (userId) {

	return $http.get(serviceBase + "api/users/"+userId).then(function (results) {
	  return results;
	});

	};

	var _editUserProfile = function (profileInfo){

		return $http.put(serviceBase + "api/users/", profileInfo).then(function (response){
			return response;
		});
	};

	userServiceFactory.getUser = _getUser;
	userServiceFactory.editUserProfile = _editUserProfile;
  return userServiceFactory;

}]);

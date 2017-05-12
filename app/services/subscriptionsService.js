'use strict';
app.factory('subscriptionsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var subscriptionsServiceFactory = {};
	
	var _getMySubscribers = function () {

	return $http.get(serviceBase + "api/subscriptions/").then(function (results) {
	  return results;
	});

	};


	var _getSubscribers = function (userId) {

	return $http.get(serviceBase + "api/subscriptions/user/"+userId).then(function (results) {
	  return results;
	});

	};


	var _subscribe = function (userId) {
	console.log("USERID" + userId);
	return $http.post(serviceBase + "api/subscriptions/subscribe/"+userId).then(function (results) {
	  return results;
	});

	};

	var _unsubscribe = function (userId) {

	return $http.post(serviceBase + "api/subscriptions/unsubscribe/"+userId).then(function (results) {
	  return results;
	});

	};





	

	subscriptionsServiceFactory.getMySubscribers = _getMySubscribers;
	subscriptionsServiceFactory.getSubscribers = _getSubscribers;
	subscriptionsServiceFactory.subscribe = _subscribe;
	subscriptionsServiceFactory.unsubscribe = _unsubscribe;
  return subscriptionsServiceFactory;

}]);

'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

  var serviceBase = ngAuthSettings.apiServiceBaseUri;
  var clientId = ngAuthSettings.clientId;
  var authServiceFactory = {};


  var _authentification = {
    isAuth: false,
    userName: "",
    userId:""
  };

  var _saveRegistration = function (registration) {
    _logOut();

    return $http.post(serviceBase + "api/users/register", registration).then(function (response) {
      return response;
    });

  };

  var _login = function (loginData) {

    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=" + clientId;
    var deferred = $q.defer();

    $http.post(serviceBase + "token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })
    .success(function (response) {

      localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, userId: response.userId, refreshToken: response.refresh_token });

      _authentification.isAuth = true;
      _authentification.userName = loginData.userName;
      console.log("+++" + response.userId);
      _authentification.userId = response.userId;

      deferred.resolve(response);
    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _logOut = function () {
    localStorageService.remove('authorizationData');

    _authentification.isAuth = false;
    _authentification.userName = "";
    _authentification.userId = "";
    _authentification.refreshToken = "";

    

  };

  var _fillAuthData = function () {

    var authData = localStorageService.get('authorizationData');
    console.log(authData);
    if(authData)
    {
      _authentification.isAuth = true;
      _authentification.userName = authData.userName;
      _authentification.userId = authData.userId;
      _authentification.refreshToken = authData.refreshToken;
      console.log(_authentification.refreshToken + " fill");
    }

  };

  var _refreshToken = function () {
    var deferred = $q.defer();
    var authData = localStorageService.get('authorizationData');

    if(authData) {
      console.log(authData);
      var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + clientId;
      console.log(data);
      localStorageService.remove('authorizationData');

      $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
          localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, userId : response.userId, refreshToken: response.refresh_token });
          _fillAuthData();
          deferred.resolve(response);
      }).error(function (err, status) {
          //_logOut();
          console.log(err);
          deferred.reject(err);
      });

    }
    return deferred.promise;
  }

  var _deleteRefreshToken = function (tokenId) {
    return $http.delete(serviceBase + "api/RefreshTokens?tokenId=" + tokenId).then(function (result) {
      return result;
    })
  }

  authServiceFactory.saveRegistration = _saveRegistration;
  authServiceFactory.login = _login;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.refreshToken = _refreshToken;
  authServiceFactory.authentification = _authentification;
  authServiceFactory.deleteRefreshToken = _deleteRefreshToken;

  return authServiceFactory;

}]);

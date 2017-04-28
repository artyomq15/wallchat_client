'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

  var authInterceptorServiceFactory = {};

  var _request = function (config) {

    config.headers = config.headers || {};

    var authData = localStorageService.get('authorizationData');
    if(authData) {
      config.headers.Authorization = 'Bearer ' + authData.token;
    }

    return config;
  };

  var _responseError = function (rejection) {
    if(rejection.status === 401) {
      console.log(1);
      var authService = $injector.get('authService');
      var authData = localStorageService.get('authorizationData');

      if (authData) {
        authService.refreshToken();
        console.log("REFRESH");
        //нужно подождать collback
        //$location.path('/refresh');
        return $q.reject(rejection);
      }

      //authService.logOut();

      $location.path('/home');
    }
    return $q.reject(rejection);
  }

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;

}]);

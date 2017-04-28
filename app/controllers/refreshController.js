'use strict';
app.controller('refreshController', ['$scope', '$location', 'localStorageService', 'authService', function ($scope, $location, localStorageService, authService) {

  $scope.authentification = authService.authentification;
  $scope.tokenRefreshed = false;
  $scope.tokenResponse = null;

  console.log($scope.authentification);

  $scope.refreshToken = function () {
      var authData = localStorageService.get('authorizationData');
      var oldRefreshToken = authData.refreshToken;

      authService.refreshToken().then(function (response) {
          $scope.tokenRefreshed = true;
          $scope.tokenResponse = response;

          // console.log(oldRefreshToken);
          authService.deleteRefreshToken(oldRefreshToken);
      },
       function (err) {
           $location.path('/login');
       });
  };

}]);

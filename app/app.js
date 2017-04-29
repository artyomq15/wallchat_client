var app = angular.module("authApp", ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix(''); 
  $routeProvider.when("/home", {
    controller: "homeController",
    templateUrl: "./app/templates/home.html"
  });

  $routeProvider.when("/refresh", {
    controller: "refreshController",
    templateUrl: "./app/templates/refresh.html"
  });

  $routeProvider.when("/login", {
    controller: "loginController",
    templateUrl: "./app/templates/login.html"
  });

  $routeProvider.when("/signup", {
    controller: "signupController",
    templateUrl: "./app/templates/signup.html"
  });

  $routeProvider.when("/user", {
    controller: "userController",
    templateUrl: "./app/templates/user.html"
  });

  $routeProvider.when("/editprofile", {
    controller: "userController",
    templateUrl: "./app/templates/editprofile.html"
  });

  $routeProvider.when("/orders", {
      controller: "ordersController",
      templateUrl: "./app/templates/orders.html"
  });

  $routeProvider.when("/articles", {
      controller: "articleController",
      templateUrl: "./app/templates/articles.html"
  });

  $routeProvider.otherwise({ redirectTo: "/user"});

});

app.constant('ngAuthSettings', {
    apiServiceBaseUri: "http://lord17-001-site1.ctempurl.com/",
    clientId: 'jsApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
  authService.fillAuthData();
}]);
angular
  .module("Londate", ['ui.router', 'ngResource', 'angular-jwt'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(setupInterceptor)
  .config(Router);

setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/public/templates/home.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/public/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/public/templates/login.html",
      controller: "LoginController as login"
    })
    .state("users", {
      url: "/users",
      templateUrl: "/public/templates/users.html",
      controller: "UsersController as users"
    })
    .state("userShow", {
      url: "/users/:id",
      templateUrl: "/public/templates/userShow.html",
      controller: "UsersController as users"
    });

  $urlRouterProvider.otherwise("/");
}
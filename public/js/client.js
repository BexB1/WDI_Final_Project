angular
  .module("Londate", ['ui.router', 'ngResource', 'angular-jwt', 'satellizer'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(setupInterceptor)
  .config(oAuthConfig)
  .config(Router);

oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {

  $authProvider.facebook({
    url: '/oauth/facebook',
    clientId: "340220859652020"
  });
}

setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("usersIndex", {
      url: "/users",
      templateUrl: "/templates/users.html",
      controller: "UsersController as users"
    })
    .state("userShow", {
      url: "/users/:id",
      templateUrl: "/templates/users/userShow.html",
      controller: "UsersShowController as users"
    })
    .state("events", {
      url: "/events",
      templateUrl: "/templates/events/index.html",
      controller: "EventsController as events"
    });

  $urlRouterProvider.otherwise("/");
}
angular
  .module("Londate", ['ui.router', 'ngResource', 'angular-jwt', 'satellizer'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(oAuthConfig)
  .config(Router);

oAuthConfig.$inject = ["$authProvider", "API_URL"];
function oAuthConfig($authProvider, API_URL) {

  $authProvider.facebook({
    url: API_URL + '/oauth/facebook',
    clientId: "1682382068748124"
  });
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
      controller: "UsersShowController as user"
    })    
    .state("userEdit", {
      url: "/users/:id/edit",
      templateUrl: "/templates/users/edit.html",
      controller: "UsersEditController as user"
    })
    .state("events", {
      url: "/events",
      templateUrl: "/templates/events/index.html",
      controller: "EventsController as events"
    })    
    .state("myEvents", {
      url: "/events/self",
      templateUrl: "/templates/events/myEvents.html",
      controller: "EventsController as events"
    })

  $urlRouterProvider.otherwise("/");
}
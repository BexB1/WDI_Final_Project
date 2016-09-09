angular
  .module("Londate")
  .controller("MainController", MainController);

MainController.$inject = ["$state", "TokenService", "$rootScope"];
function MainController($state, TokenService, $rootScope) {
  var self = this;
  
  this.currentUser = TokenService.decodeToken();
  this.errorMessage = null;

  this.logout = function logout() {
    TokenService.clearToken();
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = TokenService.decodeToken();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You are not authorized to view this content, please log in.";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });

}
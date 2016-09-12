angular
  .module("Londate")
  .controller("MainController", MainController);

MainController.$inject = ["$state", "$auth", "$rootScope"];
function MainController($state, $auth, $rootScope) {
  var self = this;
  
  this.currentUser = $auth.getPayload();
  this.errorMessage = null;

  this.authenticate = function(provider) {
    $auth.authenticate(provider);

    this.currentUser = $auth.getPayload();
  }

  this.logout = function logout() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You are not authorized to view this content, please log in.";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });

}
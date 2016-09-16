angular
  .module("Londate")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$state", "$rootScope"];
function LoginController($auth, $state, $rootScope) {

  this.credentials = {};

  // this.authenticate = function(provider) {
  //   $auth.authenticate(provider)
  //     .then(function() {
  //       $rootScope.$broadcast("loggedIn");
  //       $state.go('events');
  //     });
  // }

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('events');
    })
  }
}
angular
  .module("Londate")
  .controller("LoginController", LoginController);

LoginController.$inject = ["User", "$state", "$rootScope"];
function LoginController(User, $state, $rootScope) {

  this.credentials = {};

  this.submit = function submit() {
    User.login(this.credentials, function(res) {
      console.log(res);
      $state.go("home");
    });
  }

  $rootScope.$broadcast("loggedIn");
}
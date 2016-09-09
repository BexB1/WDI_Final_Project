angular
  .module("Londate")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope"];
function RegisterController(User, $rootScope) {
  var self = this;
  
  this.user = {};

  this.submit = function submit() {
    User.register(this.user, function(res) {
      console.log(res);
      $state.go("home");
    })
  }

  $rootScope.$broadcast("loggedIn");
}
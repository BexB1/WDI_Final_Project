angular
  .module("Londate")
  .controller("UsersController", UsersController);

UsersController.$inject = ["User", "$resource"];
function UsersController(User, $resource) {
  var self = this;

  this.all = User.query();

  var userShow = $resource("http://localhost:3000/api/users/:id",
    { id: '@_id' },
    { update: { method: "GET"}
  })

  this.selected = null;
  this.new = {};

  this.select = function select(user) {
    this.selected = User.get({ id: user._id });
  }
}
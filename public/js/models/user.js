angular
  .module('Londate')
  .factory('User', User);

User.$inject = ["$resource", "API_URL"];
function User($resource, API_URL) {
  return $resource(API_URL + "/users/:id", { id: '@_id' }, {
    update: { method: "PUT" },
    login: { method: "POST", url: API_URL + "/login" },
    register: { method: "POST", url: API_URL + "/register" }
  });
}
angular
  .module("Londate")
  .service("Meetup", Meetup)

Meetup.inject = ["$http"];
function Meetup($http) {
  this.getEvents = function(params) {
    return $http({
      method: "GET",
      url: "/api/meetups/events",
      params: params
    })
    .then(function(res) {
      return res.data;
    });
  };

  this.getCategories = function() {
    return $http({
      method: "GET",
      url: "/api/meetups/categories"
    })
    .then(function(res) {
      return res.data;
    });
  }
}
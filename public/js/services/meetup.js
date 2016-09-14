angular
  .module("Londate")
  .service("Meetup", Meetup)

Meetup.inject = ["$http"];
function Meetup($http) {
  this.getEvents = function(params) {
    return $http({
      method: "GET",
      url: "/api/meetups",
      params: params
    })
    .then(function(res) {
      return res.data;
    });
  };
}
angular
  .module("Londate")
  .service("Meetup", Meetup)

Meetup.inject = ["$http"];
function Meetup($http) {
  this.getEvents = function() {
    return $http.get("/api/meetups")
    .then(function(res) {
      return res.data;
    });
  };
}
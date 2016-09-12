angular
  .module("Londate")
  .controller("EventsController", EventsController);

EventsController.$inject = ["$state", "TokenService", "$rootScope", "Meetup"];
function EventsController($state, TokenService, $rootScope, Meetup) {
  var self = this;

  // this.all = Event.query();

  Meetup.getEvents()
  .then(function(events) {
    self.all = events;
  })

}
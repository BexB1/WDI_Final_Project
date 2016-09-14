angular
  .module("Londate")
  .controller("EventsController", EventsController);

EventsController.$inject = ["$state", "TokenService", "$rootScope", "Meetup"];
function EventsController($state, TokenService, $rootScope, Meetup) {
  var self = this;

  // this.all = Event.query();

  this.mapCenter = { lat: 51.5, lng: -0.1 };

  this.category = 1;

  this.allCategories = [];

  this.all = [];

  navigator.geolocation.getCurrentPosition(function(position) {
    $rootScope.$evalAsync(function() {
      self.mapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      self.getEvents();
    });
  });

  this.getEvents = function() {
    Meetup.getEvents({
      lat: self.mapCenter.lat,
      lng: self.mapCenter.lng,
      category: self.category
    })
    .then(function(events) {
      console.log("EVENTS: " + events);
      self.all = events;
    })
  }

  this.getCategories = function(categories) {
    Meetup.getCategories({
      name: name
    })
    .then (function(categories){
      self.allCategories = categories;
      console.log(self.allCategories);
    })
  }

  self.getCategories();

}
angular
  .module("Londate")
  .controller("EventsController", EventsController);

EventsController.$inject = ["$state", "$rootScope", "Meetup", "$auth", 'User'];
function EventsController($state, $rootScope, Meetup, $auth, User) {
  var self = this;
  this.currentUser = $auth.getPayload();

  this.getUser = function() {
    if(!self.currentUser) return null;
    User.get({ id: self.currentUser._id }, function(user) {
      self.currentUser = user;
    });
  }

  this.toDate = new Date(event.time).toLocaleString();

  this.getUser();

  this.mapCenter = { lat: 51.5, lng: -0.1 };

  this.category = [];

  this.radius = 1;

  this.allCategories = [];

  this.savedEvents = [];

  this.all = [];

  $rootScope.$on("mapMoved", function(){
    self.getEvents();
  })

  $rootScope.$on("saveEvent", function(e, location){
    $rootScope.$applyAsync(function() {
      self.currentUser.events.push(location);
      self.currentUser.$update();
    });
  });

  navigator.geolocation.getCurrentPosition(function(position) {
    $rootScope.$evalAsync(function() {
      self.mapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      self.getCategories();
      
    });
  });

  this.getEvents = function() {
    return Meetup.getEvents({
      lat: self.mapCenter.lat,
      lng: self.mapCenter.lng,
      category: self.category.join(","),
      radius: self.radius
    })
    .then(function(events) {
      self.all = events;
      // console.log(self.all[0].category);
      // console.log("Categories here ", self.allCategories);
    })
  }

  this.getCategories = function() {
    return Meetup.getCategories({
      name: self.name
    })
    .then(function(categories){
      self.allCategories = categories;
    })
  }

  this.updateCategory = function(categoryId) {
    var index = this.category.indexOf(categoryId);
    if(index === -1) {
      this.category.push(categoryId);
    }
    else {
      this.category.splice(index, 1);
    }

    this.getEvents();
  }

  $rootScope.$watch('categoryIds', $rootScope.updateIds, true);

}
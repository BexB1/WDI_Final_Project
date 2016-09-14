angular
  .module("Londate")
  .directive("gMap", gMap);

function gMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="g-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },
    link: function(scope, element) {

      var eventMarkers = [];

      if(!scope.center) {
        throw new Error("You must include a `center` attribute in your g-map directive");
      }

      var map = new google.maps.Map(element[0], {
        center: scope.center,
        zoom: 14,
        disableDefaultUI: true
      });

      google.maps.Circle.prototype.contains = function(latLng) {
        return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
      }

      var playerMarker = new google.maps.Marker({
        position: map.getCenter(),
        map: map, 
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        draggable: true
      })

      var playerCircle = new google.maps.Circle({
        map: map,
        radius: 1609.34,
        strokeColor: '#ffffff',
        strokeOpacity: 0.2,
        fillColor: '#66ff66',
        fillOpacity: 0.3,
      })

      playerCircle.bindTo('center', playerMarker, 'position');
      var playerCircleBounds = playerCircle.getBounds();

      scope.$watch('markers.length', updateMarkers);

      function updateMarkers() {

        playerMarker.setPosition(playerMarker.getPosition());

        eventMarkers.forEach(function(eventMarkers) {
          eventMarkers.setMap(null);
        });

        scope.markers.forEach(function(location) {

          if(location.venue) {
            var eventMarker = new google.maps.Marker({
              position: { lat: location.venue.lat, lng: location.venue.lon },
              map: map,
              animation: google.maps.Animation.DROP
            });

            eventMarker.addListener('click', function() {
              console.log(location);
            });

            eventMarkers.push(eventMarker);
          }
        });
      }

      scope.$watch('center.lat', updateMap);
      scope.$watch('center.lng', updateMap);

      // Reset markers on drag end

      google.maps.event.addListener(playerMarker, 'dragend', function() {
        updateMarkers();
      });

      function updateMap() {
        console.log("Updating map center", scope.center);
        map.panTo(scope.center);
        playerMarker.setPosition(scope.center);
      }
    }
  }
}











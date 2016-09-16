angular
  .module("Londate")
  .directive("gMap", gMap)

gMap.inject = ["$rootScope"];
function gMap($rootScope) {
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

      scope.$watchCollection('markers', updateMarkers);

      function updateMarkers() {

        playerMarker.setPosition(playerMarker.getPosition());

        eventMarkers.forEach(function(eventMarkers) {
          eventMarkers.setMap(null);
        });

        scope.markers.forEach(function(location) {

          // var icon = "";

          // switch (category.location) {
          //   case 0:
          //       icon = "red";
          //       break;
          //   case 1:
          //       icon = "blue";
          //       break;
          //   case 2:
          //       icon = "yellow";
          //       break;
          // }

          // var icon = "http://maps.google.com/mapfiles/ms/icons/" + icon + ".png";
          var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
          console.log(location.group.category);
          if(location.venue) {
            var eventMarker = new google.maps.Marker({
              position: { lat: location.venue.lat, lng: location.venue.lon },
              map: map,
              icon: icon,
              animation: google.maps.Animation.DROP
              // icon: new google.maps.MarkerImage(icon)
            });

            var toDate = new Date(location.time).toLocaleString();

            var contentString = 
              '<div id="content">'
              +'<h5>'
              +'<a href="'
              +location.event_url
              +'" target="_blank">'
              +location.name
              +"</a>"
              +"</h5>"
              +"<br />"
              +"<h6>"
              +location.group.name
              +"</h6><br />"
              +toDate
              +"<br />"
              +"<h6>Attending: "
              +location.yes_rsvp_count
              +"</h6>"
              +"<br />"
              +location.venue.address_1
              +"<br />"
              +'<button class="saveBtn">Save</button>'
              +'</div>';

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            google.maps.event.addDomListener(infowindow, 'domready', function() {
              var button = document.querySelector('button');
              button.onclick = function() {
                $rootScope.$broadcast("saveEvent", location);
              }
            });

            eventMarker.addListener('click', function() {
              infowindow.open(map, eventMarker);
            });

            eventMarkers.push(eventMarker);

          }
        });
      }

      scope.$watch('center.lat', updateMap);
      scope.$watch('center.lng', updateMap);

      // Reset markers on drag end

      google.maps.event.addListener(playerMarker, 'dragend', function() {
        var newCenter = playerMarker.getPosition().toJSON();
        $rootScope.$applyAsync(function() {
          scope.center.lat = newCenter.lat;
          scope.center.lng = newCenter.lng;

          $rootScope.$broadcast("mapMoved");
        });
        $rootScope.$broadcast("markerMoved", playerMarker.getPosition().toJSON());
      });

      function updateMap() {
        console.log("Updating map center", scope.center);
        map.panTo(scope.center);
        playerMarker.setPosition(scope.center);
      }
    }
  }
}











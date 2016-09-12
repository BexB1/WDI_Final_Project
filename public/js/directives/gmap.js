angular
  .module("Londate")
  .directive("gMap", gMap);

function gMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="g-map"></div>',
    scope: {
      center: '='
    },
    link: function(scope, element) {

      if(!scope.center) {
        throw new Error("You must include a `center` attribute in your g-map directive");
      }

      var map = new google.maps.Map(document.getElementById("map"), 
      {
        center: scope.center,
        zoom: 14,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
      });

      map.addListener('click', function(e) {
        var marker = new google.maps.Marker({
          position: e.latLng,
          map: map, 
          animation: google.maps.Animation.BOUNCE,
          icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        });

          marker.addListener('click', function() {
            this.setAnimation(null);
          });
        });

      scope.$watch('center.lat', updateMap);
      scope.$watch('center.lng', updateMap);

      function updateMap() {
        map.panTo(scope.center);
      }
    }
  }
}











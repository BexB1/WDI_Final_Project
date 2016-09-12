angular
  .module("Londate")
  .controller("MapsController", MapsController);

MapsController.$inject = ["$interval"];
function MapsController($interval) {

  var self = this;

  this.all = [
    { center: { lat: 51.5, lng: -0.1 } },
    { center: { lat: 52.381, lng: -2.241 } }
  ];
}
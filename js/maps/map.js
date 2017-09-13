
Map = {

  markers: [],

  infoWindow: null,

  mapCenter: { lat: -3.792678, lng: 35.545009 },

  initMap: function() {

    // build map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: this.mapCenter,
      zoom: 6
    });

    // // add the infoWindow that will be used by all markers
    // this.infoWindow = new google.maps.InfoWindow();


    // // build markers
    // for (var i = 0; i < Model.Locations.length; i++) {
    //   this.markers.push(Marker.buildMarker(Model.Locations[i], this.infoWindow));
    // }

    return map;
  }
};
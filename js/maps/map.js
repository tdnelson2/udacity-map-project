
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

    return map;
  }
};
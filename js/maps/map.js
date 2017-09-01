var Map = {
  map: null,
  init: function () {
    // Constructor creates a new map - only center and zoom are required.
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -3.792678, lng: 35.545009},
      styles: styles,
      zoom: 7,
      mapTypeControl: false
    })
    SidebarViewModel.markers.push("Map has been setup");
    MarkerStylers.init()
    Markers.createMarkers();
  }
}
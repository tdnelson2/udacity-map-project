
MarkerStylers = {

  // window for display details about the location at each marker.
  largeInfowindow: null,

  // what the icon will look like when user is not interacting with it
  defaultIcon: null,

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  highlightedIcon: null,


  currentInfoWindow: null,

  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  makeMarkerIcon: function(markerColor, width, heigth) {
    var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(width, heigth),
    new google.maps.Point(0, 0),
    new google.maps.Point(width/2, heigth),
    new google.maps.Size(width,heigth));
    return markerImage;
  },



  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  displayInfoWindow: function(marker, infowindow) {
    var map = AppDelegate.getMap();
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      this.currentInfoWindow = infowindow;
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  },

  updateMarkers: function(markerIndex) {
    var markers = AppDelegate.getMarkers();
    for (var i = 0; i < markers.length; i++) {
      if(i === markerIndex) {
        markers[i].setIcon(this.highlightedIcon);
        if(
          markerIndex != null 
          && this.currentInfoWindow.marker != null 
          && this.currentInfoWindow.marker != markers[markerIndex]
          ) {
          this.currentInfoWindow.marker = null;
          console.log("info window should clear")
        }
      } else {
        markers[i].setIcon(this.defaultIcon);
      }
    }
  },

  highlightMarker: function(markerIndex) {
    this.updateMarkers(markerIndex);
  },

  unhighlightAllMarkers: function() {
    this.updateMarkers(null);
  },

  init: function() {
    this.largeInfowindow = new google.maps.InfoWindow();
    this.defaultIcon = this.makeMarkerIcon('ffffff', 29, 47);
    this.highlightedIcon = this.makeMarkerIcon('0091ff', 42, 68);
  }
}
var map;
var markers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -3.792678, lng: 35.545009},
    styles: styles,
    zoom: 6,
    mapTypeControl: false
  });

  // window for display details about the location at each marker.
  var largeInfowindow = new google.maps.InfoWindow();

  // Create an array of markers on initialize.
  for (var i = 0; i < initialLocations.length; i++) {
    // Get the position from the location array.
    var position = initialLocations[i].coordinates;
    var title = initialLocations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    // marker.addListener('click', function() {
    //   populateInfoWindow(this, largeInfowindow);
    // });
    // display infoWindow on mouseover.
    marker.addListener('mouseover', function() {
      // this.setIcon(highlightedIcon);
      displayInfoWindow(this, largeInfowindow);
    });
    marker.addListener('mouseout', function() {
      // this.setIcon(defaultIcon);
      // removeInfoWindow();
    });

    // display all markers by default.
    var bounds = new google.maps.LatLngBounds();
    marker.setMap(map);
    bounds.extend(marker.position);
  }
}



// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function displayInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}
Marker = {
  buildMarker: function(infoWindow, map, locationIndex, locationList, currentLocation) {
    var location = locationList()[locationIndex];
    var marker = new google.maps.Marker({
      position: location.coordinates,
      map: map,
      title: location.title
    });

    marker.addListener('click', (function(infoWindow, marker, index, locationList, currentLocation){
      return function() {
          InfoWindow.populateInfoWindow(infoWindow, marker, index);
          currentLocation(locationList()[index]);
      }
    })(infoWindow, marker, locationIndex, locationList, currentLocation));

    return marker;
  }
}
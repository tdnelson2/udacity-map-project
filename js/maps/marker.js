Marker = {
  buildMarker: function(infoWindow, map, locationIndex, markers, locationListKO, currentLocationKO) {
    var location = locationListKO()[locationIndex];
    var marker = new google.maps.Marker({
      position: location.coordinates,
      map: map,
      icon: MarkerStylers.defaultIcon,
      title: location.title,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', (function(infoWindow, marker, markers, index, locationListKO, currentLocationKO){
      return function() {
          MarkerStylers.bounce(marker, markers);
          InfoWindow.populateInfoWindow(infoWindow, marker, markers, index, currentLocationKO);
          currentLocationKO(locationListKO()[index]);
      }
    })(infoWindow, marker, markers, locationIndex, locationListKO, currentLocationKO));

    markers.push(marker);
  }
}
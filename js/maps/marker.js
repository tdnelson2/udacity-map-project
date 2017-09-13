Marker = {
    buildMarker: function(location, infoWindow, map) {
        var marker = new google.maps.Marker({
          position: location.coordinates,
          map: map,
          title: location.title
        });

        marker.addListener('click', (function(infoWindow, marker, index){
            return function() {
                InfoWindow.populateInfoWindow(infoWindow, marker, index);
            }
        })(infoWindow, marker, Model.Locations.indexOf(location)));

        return marker;
    }
}
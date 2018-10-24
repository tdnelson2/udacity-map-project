import markerStylers from './marker-stylers.js';
import infoWindowObj from '../views/info-window-view-model.js';
import myMap from './map.js';

var marker = {
  buildMarker: function(map, mapBounds, markers,
                        infoWindow, locationIndex,
                        locationListKO, currentLocationKO,
                        mapIsFullScreenKO, isMobile) {
    var location = locationListKO()[locationIndex];
    var marker = new google.maps.Marker({
      position: location.coordinates,
      map: map,
      icon: markerStylers.defaultIcon,
      title: location.title,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', (function(map, infoWindow, marker, 
                                          markers, index, locationListKO, 
                                          currentLocationKO, mapIsFullScreenKO){
      return function() {
          markerStylers.bounce(marker, markers);
          infoWindowObj.populateInfoWindow(map, infoWindow, marker, 
                                        markers, index, currentLocationKO, 
                                        mapIsFullScreenKO);
          currentLocationKO(locationListKO()[index]);
      };
    })(map, infoWindow, marker, markers, locationIndex, 
       locationListKO, currentLocationKO, mapIsFullScreenKO));

    marker.addListener('click', function() {
      myMap.repositionForInfoWindow(map, marker, isMobile);
    });

    markers.push(marker);
    mapBounds.extend(marker.position);
  }
};

export default marker;
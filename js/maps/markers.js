
var Markers = {
	self: this,

	markers: [],

	updateMarkers: function(thisLocationIndex) {
	    for (var i = 0; i < this.markers.length; i++) {
	    if(thisLocationIndex === i) {
	      this.markers[i].setIcon(MarkerStylers.highlightedIcon);
	      MarkerStylers.displayInfoWindow(this.markers[i], MarkerStylers.largeInfowindow);
	    } else {
	      this.markers[i].setIcon(MarkerStylers.defaultIcon);
	    }
	  }
	},


	createMarkers: function() {
	  var initialLocations = AppDelegate.getModel();
	  var map = AppDelegate.getMap();

	  // Create an array of markers on initialize.
	  for (var i = 0; i < initialLocations.length; i++) {
	    // Get the position from the location array.
	    var position = initialLocations[i].coordinates;
	    var title = initialLocations[i].title;
	    // Create a marker per location, and put into markers array.
	    var marker = new google.maps.Marker({
	      position: position,
	      title: title,
	      icon: MarkerStylers.defaultIcon,
	      animation: google.maps.Animation.DROP,
	      id: i
	    });


	    // Push the marker to our array of markers.
	    this.markers.push(marker);

	    // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', (function( index ){
        	return function() {
        		MarkerStylers.highlightMarker(index);
        		console.log(index);
        	}
        })( i ));

        marker.addListener('mouseover', (function( index ){
        	return function() {
        		MarkerStylers.highlightMarker(index);
        		console.log(index);
        	}
        })( i ));

	    marker.addListener('mouseout', function() {
	      MarkerStylers.unhighlightAllMarkers()
	    });

	    // display all markers by default.
	    var bounds = new google.maps.LatLngBounds();
	    marker.setMap(map);
	    bounds.extend(marker.position);
	  }
	}
}
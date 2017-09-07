// lahash's vimeo api call and query: https://api.vimeo.com/users/lahash/videos?query=tanzania&access_token=56cf73847a95b1e6fef352aedc5bb1d5

// central hub for tying the model, sidebar and map together
var AppDelegate = {

	getModel: function() {
		return Model.initialLocations;
	}, 
	getMap: function() {
		return Map.map;
	},
	getMarkers: function() {
		return Markers.markers;
	},
	highlightMarker: function(index) {
		MarkerStylers.highlightMarker(index);
	},
	unhighlightMarkers: function() {
		MarkerStylers.unhighlightAllMarkers();
	},
	buildLocation: function(location) {
		return Model.buildLocation(location);
	},
	displayInfoWindow: function(index, shouldShowVideo) {
		InfoWindow.displayInfoWindow(index, InfoWindow.largeInfowindow, shouldShowVideo);
	},
	queryAndDisplayVideos: function(index, queries) {
		InfoWindowVideoContent.queryAndDisplay(index, queries);
	},
	embedVideo: function(link) {
      InfoWindowVideoContent.embedVideo(link);
	},
	displayVideo: function(index) {
		InfoWindowVideoContent.display(index);
	}
}


// init knockoutjs to manage sidebar view
ko.applyBindings(new SidebarViewModel.view(null));
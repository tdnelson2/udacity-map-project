

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
	updateMarkers: function(index) {
		Markers.updateMarkers(index);
	},
	buildLocation: function(location) {
		return Model.buildLocation(location);
	}
}


// init knockoutjs to manage sidebar view
ko.applyBindings(new SidebarViewModel.view(null));
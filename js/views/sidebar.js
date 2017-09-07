var SidebarViewModel = {
	view: function() {
	    var self = this;
	    var initialLocations = AppDelegate.getModel();

	    self.locationList = ko.observableArray([]);

	    // displays details within the sidebar 
	    // about the selected location
	    self.currentLocation = ko.observable();

	    // pull data from the model into an observable array
	    initialLocations.forEach(function(locationItem) {
	        self.locationList.push( AppDelegate.buildLocation(locationItem) );
	    });

	    self.renderLocation = function(location) {
	        self.currentLocation(location);
	        var thisLocationIndex = self.locationList().indexOf(location);
	        AppDelegate.displayInfoWindow(thisLocationIndex, false);
	        AppDelegate.highlightMarker(thisLocationIndex);
	    }
	}
}
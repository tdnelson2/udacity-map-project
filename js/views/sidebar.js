 var SidebarViewModel = {
	view: function() {
		var self = this;
        self.map;
        self.infoWindow;
        self.markers = [];
        self.locationList = ko.observableArray([]);
        self.countries = ko.observableArray([{name: 'All'}]);
        self.selectedCountry = ko.observable(self.countries()[0]);
        // displays details within the sidebar
        // about the selected location
        self.currentLocation = ko.observable();

        self.indexOfCurrentLocation = function() {
        	return self.locationList().indexOf(self.currentLocation());
        }

        self.renderLocationClick = function(location) {
        	self.currentLocation(location);
        	var thisMarker = self.markers[self.indexOfCurrentLocation()]
        	MarkerStylers.bounce(thisMarker, self.markers);
			InfoWindow.populateInfoWindow(self.infoWindow, thisMarker, self.markers, self.indexOfCurrentLocation(), self.currentLocation);
        }

	    self.filterByCountry = function(location) {
	    	self.currentLocation(null);
	    	MarkerStylers.unhighlightAllMarkers(self.markers);
	    	var markersToHide = [];
	    	for (var i = 0; i < self.locationList().length; i++) {
	    		var loc = self.locationList()[i]
	    		var selected = self.selectedCountry().name;
	    		if(selected == 'All') {
	    			loc.hide(false);
	    		} else if(loc.country != selected) {
	    			loc.hide(true);
	    			markersToHide.push(i);
	    		} else if(loc.hide() === true) {
	    			loc.hide(false);
	    		}
	    	}
	    	MarkerStylers.hideSpecifiedMarkers(self.markers, markersToHide);
	    }

        // recieve notification from callback when Google Maps is ready to load
        notifier.subscribe(function() {
        	self.map = Map.initMap();
        	self.infoWindow = new google.maps.InfoWindow();
		    MarkerStylers.init();
			for (var i = 0; i < self.locationList().length; i++) {
				Marker.buildMarker(self.infoWindow, self.map, i, self.markers, self.locationList, self.currentLocation);
			}
        }, self, "mapReadyForInit");


        /////////* SETUP */////////

        self.init = function() {
            var countries = [];

            // pull data from the model into an observable array
            Model.Locations.forEach(function(locationItem) {
                self.locationList.push( new Model.Location(locationItem) );

                // build an array of countries which are represented in
                // the locationList for use in the option select menu
                if(!countries.includes(locationItem.country)) {
                    countries.push(locationItem.country);
                    self.countries.push({ name: locationItem.country });
                }
            });
        }

        self.init();
    }
}
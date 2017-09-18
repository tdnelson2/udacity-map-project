 var SidebarViewModel = {
	view: function(isMobileDevice) {
		var self = this;
        self.mobileMode = isMobileDevice;
        self.map;
        self.infoWindow;
        self.markers = [];

        /////////* BINDINGS PROPERTIES */////////

        // Our model. A list of partner locations.
        self.locationList = ko.observableArray([]);

        // The countries in which we have partners.
        self.countries = ko.observableArray([{name: 'All'}]);

        // The country currently selected in the dropdown filter.
        self.selectedCountry = ko.observable(self.countries()[0]);

        // Used for toggling the sidebar.
        self.shouldShowSidebar = ko.observable(!isMobileDevice);

        // Used for toggling map size.
        self.mapShouldBeFullScreen = ko.observable(isMobileDevice);

        // Injects css into the map div for sizing the map.
        self.sizeCanvas = ko.pureComputed(function() {
            return self.mapShouldBeFullScreen() ? "map map-full-screen" : "map map-normal";
        });

        // Displays details within the sidebar
        // about the selected location.
        self.currentLocation = ko.observable();

        /////////*******************/////////
        /////////* HELPER FUNCTIONS*/////////
        /////////*******************/////////

        // Close infoWindow and unhighlight markers.
        self.hideDetails = function() {
            MarkerStylers.unhighlightAllMarkers(self.markers);
            self.infoWindow.close();
        }

        // Get the index of the selected loction.
        self.indexOfCurrentLocation = function() {
        	return self.locationList().indexOf(self.currentLocation());
        }

        /////////**********************/////////
        /////////* BINDINGS FUNCTIONS */////////
        /////////**********************/////////

        // Show the location description and infoWindow
        // associated with the location
        self.renderLocationClick = function(location) {
            if(self.mobileMode){self.toggleSidebar()};
        	self.currentLocation(location);
        	var thisMarker = self.markers[self.indexOfCurrentLocation()]
        	MarkerStylers.bounce(thisMarker, self.markers);
                                    //    map, infoWindow, marker, markers, index, currentLocationKO, mapIsFullScreenKO
			InfoWindow.populateInfoWindow(self.map, self.infoWindow,
                                          thisMarker, self.markers,
                                          self.indexOfCurrentLocation(),
                                          self.currentLocation,
                                          self.mapShouldBeFullScreen);
        }

        // Show/hide sidebar.
        self.toggleSidebar = function() {
            self.shouldShowSidebar(self.shouldShowSidebar() ? false : true);
            self.mapShouldBeFullScreen(self.mapShouldBeFullScreen() ? false : true);
            google.maps.event.trigger(self.map, "resize");
        }

        // Filters the location list view and shows/hides markers.
	    self.filterByCountry = function(location) {
	    	self.currentLocation(null);
            self.hideDetails();
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

        /////////**************************/////////
        /////////* MAP & VIEW MODEL SETUP */////////
        /////////**************************/////////

        // Recieves notification from when Google Maps is ready to load.
        notifier.subscribe(function() {
        	self.map = Map.initMap();
        	self.infoWindow = new google.maps.InfoWindow();
		    MarkerStylers.init();
			for (var i = 0; i < self.locationList().length; i++) {
                                    // map, markers,
                                    // infoWindow, locationIndex,
                                    // locationListKO, currentLocationKO,
                                    // mapIsFullScreenKO
				Marker.buildMarker(self.map, self.markers, self.infoWindow,
                                   i, self.locationList, self.currentLocation,
                                   self.mapShouldBeFullScreen);
			}
        }, self, "mapReadyForInit");

        // Recieve notification if there is no response from Google Maps.
        notifier.subscribe(function() {
            alert("ERROR: Google Maps failed to load");
        }, self, "mapTimeout");

        // Setup the view model.
        self.init = function() {
            var countries = [];

            // Pull data from the model into an observable array.
            Model.Locations.forEach(function(locationItem) {
                self.locationList.push( new Model.Location(locationItem) );

                // Build an array of countries which are represented in
                // the locationList for use in the option select menu.
                if(!countries.includes(locationItem.country)) {
                    countries.push(locationItem.country);
                    self.countries.push({ name: locationItem.country });
                }
            });
        }

        self.init();
    }
}
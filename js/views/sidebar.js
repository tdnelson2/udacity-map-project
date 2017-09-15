 var SidebarViewModel = {
	view: function(isMobileDevice) {
		var self = this;
        self.mobileMode = isMobileDevice;
        self.map;
        self.infoWindow;
        self.markers = [];
        self.locationList = ko.observableArray([]);
        self.countries = ko.observableArray([{name: 'All'}]);
        self.selectedCountry = ko.observable(self.countries()[0]);
        self.shouldShowSidebar = ko.observable(!isMobileDevice);
        self.mapShouldBeFullScreen = ko.observable(isMobileDevice);
        // injects css for sizing the map
        self.sizeCanvas = ko.pureComputed(function() {
            return self.mapShouldBeFullScreen() ? "map map-full-screen" : "map map-normal";
        })
        // displays details within the sidebar
        // about the selected location
        self.currentLocation = ko.observable();

        self.hideDetails = function() {
            MarkerStylers.unhighlightAllMarkers(self.markers);
            self.infoWindow.close();
        }

        self.indexOfCurrentLocation = function() {
        	return self.locationList().indexOf(self.currentLocation());
        }

        self.renderLocationClick = function(location) {
            if(self.mobileMode){self.toggleSidebar()};
        	self.currentLocation(location);
        	var thisMarker = self.markers[self.indexOfCurrentLocation()]
        	MarkerStylers.bounce(thisMarker, self.markers);
			InfoWindow.populateInfoWindow(self.infoWindow, thisMarker, self.markers, self.indexOfCurrentLocation(), self.currentLocation, self.mapShouldBeFullScreen);
        }

        self.toggleSidebar = function() {
            self.shouldShowSidebar(self.shouldShowSidebar() ? false : true);
            self.mapShouldBeFullScreen(self.mapShouldBeFullScreen() ? false : true);
            google.maps.event.trigger(self.map, "resize");
        }

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

        // recieve notification from callback when Google Maps is ready to load
        notifier.subscribe(function() {
        	self.map = Map.initMap();
        	self.infoWindow = new google.maps.InfoWindow();
		    MarkerStylers.init();
			for (var i = 0; i < self.locationList().length; i++) {
				Marker.buildMarker(self.infoWindow, self.map, i, self.markers, self.locationList, self.currentLocation, self.mapShouldBeFullScreen);
			}
        }, self, "mapReadyForInit");

        // recieve notification if there is no response from Google Maps
        notifier.subscribe(function() {
            alert("ERROR: Google Maps failed to load");
        }, self, "mapTimeout");


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
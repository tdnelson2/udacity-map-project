 var SidebarViewModel = {
	view: function() {
		var self = this;
        self.map;
        self.infoWindow;
        self.locationList = ko.observableArray([]);
        self.countries = ko.observableArray([{name: 'All'}]);
        self.selectedCountry = ko.observable(self.countries()[0]);
        // displays details within the sidebar
        // about the selected location
        self.currentLocation = ko.observable();

        self.renderLocationHover = function(location) {
        	self.currentLocation(location);
        }

        self.renderLocationClick = function(location) {
        	self.currentLocation(location);
        }

        // recieve notification from callback when Google Map is ready to load
        notifier.subscribe(function() {
        	self.map = Map.initMap();
        	self.infoWindow = new google.maps.InfoWindow();
			for (var i = 0; i < self.locationList().length; i++) {
				var marker = Marker.buildMarker(self.infoWindow, self.map, i, self.locationList, self.currentLocation);
				self.locationList()[i].marker = marker;
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
                if(!countries.includes(Model.Locations.country)) {
                    countries.push(locationItem.country);
                    self.countries.push({ name: locationItem.country });
                }
            });
        }

        self.init();
    }
}
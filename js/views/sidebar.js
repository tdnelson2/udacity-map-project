 var SidebarViewModel = {
	view: function() {

        var self = this;

        var initialLocations = AppDelegate.getModel();

        self.timeItemWasClicked = 0;

        /////////* BINDINGS PROPERTIES */////////

        self.locationList = ko.observableArray([]);
        self.countries = ko.observableArray([{name: 'All'}]);
        self.selectedCountry = ko.observable(self.countries()[0]);

        // displays details within the sidebar
        // about the selected location
        self.currentLocation = ko.observable();

        /////////* HELPER FUNCTIONS */////////
        self.currentTime = function() {
            var d = new Date();
            return d.getTime();
        }

        self.shouldRespondToHover = function() {
            return ((self.currentTime() - self.timeItemWasClicked) > 5000);
        }

        /////////* BINDINGS FUNCTIONS */////////

        self.closeSidebar = function() {
            AppDelegate.hideSidebar();
        }

        self.openSidebar = function() {
            AppDelegate.showSidebar();
        }

	    self.renderLocationHover = function(location) {

            // if user had just clicked on an item, the video will appear
            // therefore we temporatily disable hover to prevent them from
            // mousing over another item and closing the the video before
            // they have a chance to interact with it
            if(self.shouldRespondToHover()) {
                self.currentLocation(location);
                var index = self.locationList().indexOf(location);
                AppDelegate.highlightMarker(index);
    	        AppDelegate.displayInfoWindow(index, false);
            }
	    }

	    self.renderLocationClick = function(location) {
            self.currentLocation(location);
            var index = self.locationList().indexOf(location);
            AppDelegate.highlightMarker(index);
            AppDelegate.displayInfoWindow(index, true);
            self.timeItemWasClicked = self.currentTime();
	    }

	    self.filterByCountry = function(location) {
	    	self.currentLocation(null);
	    	AppDelegate.closeInfoWindow();
	    	AppDelegate.unhighlightMarkers();
	    	var markersToHide = [];
	    	for (var i = 0; i < self.locationList().length; i++) {
	    		var loc = self.locationList()[i]
	    		var selected = self.selectedCountry().name;
	    		if(selected == 'All') {
	    			loc.hide(false);
	    		} else if(loc.country() != selected) {
	    			loc.hide(true);
	    			markersToHide.push(i);
	    		} else if(loc.hide() === true) {
	    			loc.hide(false);
	    		}
	    	}
	    	AppDelegate.hideSpecifiedMarkers(markersToHide);
	    }

        /////////* SETUP */////////

        self.init = function() {
            var countries = [];

            // pull data from the model into an observable array
            initialLocations.forEach(function(locationItem) {
                self.locationList.push( AppDelegate.buildLocation(locationItem) );

                // build an array of countries which are represented in
                // the locationList for use in the option select menu
                if(!countries.includes(locationItem.country)) {
                    countries.push(locationItem.country);
                    self.countries.push({name: locationItem.country});
                }
            });

            // adjust whether the sidebar is shown or not
            // depending on the size of the window
            if($( window ).width() > 500){
                AppDelegate.hideHamburgerMenuButton();
            } else {
                AppDelegate.mobileMode();
            }
        }

        self.init();
	}
}
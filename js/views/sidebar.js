var ViewModel = function(locationIndex) {
    var self = this;

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push( new Location(locationItem) );
    });

    self.currentLocation = ko.observable( self.locationList()[locationIndex] );

    self.renderLocation = function(location) {
        self.currentLocation(location);
    }
}
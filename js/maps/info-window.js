var InfoWindow = {

  populateInfoWindow: function(infoWindow, marker, markers, index, currentLocationKO) {
    // Check to make sure the infowWindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
      infoWindow.marker = marker;
      var infoWindowHTML = document.getElementById("info-window-template").innerHTML;
      infoWindow.setContent(infoWindowHTML);
      infoWindow.open(map, marker);
      ko.applyBindings(new InfoWindow.ViewModel(index),
                 document.getElementById('partner-info-window'));

      // Make sure the marker property is cleared if the infoWindow is closed.
      infoWindow.addListener('closeclick', function(){
        MarkerStylers.unhighlightAllMarkers(markers);
        currentLocationKO(null);
        infoWindow.setMarker = null;
      });
    }
  },

  ViewModel: function(index) {
    var self = this;
    self.currentLocation = ko.observable(Model.Locations[index]);
    self.embeddedVideo = ko.observable('');
    self.videoThumbs = ko.observableArray([]);
    self.fetchVideo = function(thumb) {
      InfoWindowVideoContent.embedVideo(thumb.link, self.embeddedVideo);
    };

    // add links to videos and embed the top result
    InfoWindowVideoContent.render(self.currentLocation,
                    self.videoThumbs,
                    self.embeddedVideo);
  }
}
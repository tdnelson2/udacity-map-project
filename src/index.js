import ko from 'knockout';
import $  from 'jquery';
// import './styles.css';
// import './maps/marker-stylers.js';
// import './maps/marker.js';
// import './maps/map-styles.js';
// import './maps/map.js';
// import './views/info-window-view-model.js';
var notifier = new ko.subscribable();
export default notifier;
import PrimaryViewModel from './views/main-view-model.js';

/////////* MANAGE MAP SETUP */////////

// This is called when Google Maps load.
// It tells ViewModel to init map.

function initMap() {
  notifier.notifySubscribers("map is ready", "mapReadyForInit");
}

function gmapsError() {
  console.log('Google Maps failed to load.');
  alert('Google Maps failed to laod for unknown reasons');
}

window.initMap = initMap;
window.gmapsError = gmapsError;

function fetchGoogleMaps() {
  var gmaps = document.createElement('script');
  gmaps.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4VQB1Ok9qXO6yhZ5RC6SRPdmMp24FkEY&v=3&callback=initMap');
  gmaps.setAttribute('onerror', 'gmapsError()');
  gmaps.setAttribute('async', '');
  gmaps.setAttribute('defer', '');
  document.head.appendChild(gmaps);
}

fetchGoogleMaps();


/////////* LOAD VIEW MODEL */////////

var isMobileDevice = $( window ).width() < 700;

// Init knockoutjs ViewModel.
ko.applyBindings(new PrimaryViewModel(isMobileDevice));
// Partner data
var initialLocations = [
	{
		title: 'Rwanda Partners',
		coordinates: {
			lat: -1.953768,
			lng: 30.096305
		}
	}, {
		title: 'Kampala House',
		coordinates: {
			lat: 0.311491,
			lng: 32.574313
		}
	}, {
		title: 'Grace & Healing Ministry',
		coordinates: {
			lat: -6.158543,
			lng: 35.744421
		}
	}, {
		title: 'Nipe Tumaini',
		coordinates: {
			lat: -1.285289,
			lng: 36.579728
		}
	}, {
		title: 'Path of Hope',
		coordinates: {
			lat: -3.671110,
			lng: 33.424168
		}
	}
];

var Location = function(data) {
    this.clickCount = ko.observable(data.title);
    this.name = ko.observable(data.coordinates);
}
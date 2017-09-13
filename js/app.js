// TODO: restucture app using PubSub method described here: http://www.wrapcode.com/communication-between-multiple-view-models-in-knockoutjs-mvvm-the-right-approach/
var notifier = new ko.subscribable();

// call back used when Google Maps load to notify the ViewModel that map is ready to init
function mapReady() {
	notifier.notifySubscribers("map is ready", "mapReadyForInit");
}

// init knockoutjs to manage sidebar view
ko.applyBindings(new SidebarViewModel.view(), document.getElementById('sidebar'));
View this project here: [https://tdnelson2.github.io/map/](https://tdnelson2.github.io/map/)
# Partner Map
The purpose of this project is to demonstrate my abilty to use JS APIs and organization libraries. The rubic asks that all DOM updates be handeled by either the [Google Maps API](https://developers.google.com/maps/) or [Knockoutjs](http://knockoutjs.com/). It uses the [Google Maps API](https://developers.google.com/maps/) to show locations using markers and info windows. It uses the [Vimeo API](https://developer.vimeo.com/api/start) to show videos about those locations from the non-profit [Lahash International](http://lahash.org/) (An organization at which my wife happens to work).

## Installation
Clone to your machine if you wish to view/edit. HTML is in `index.html`. Launch this file in you favorite browser to run the code. The different components are as follows. The main view model is at `js\views\main-view-model.js`. There's a separate view model for the info window at `js\views\info-window-view-model.js`. Maps and marker related code is in `js\maps\`. The model can be found in `js\models\model.js`. Finally the app initializer is `js\app.js`. The app follows the MVVM pattern of organization so `PrimaryViewModel.view` acts as the hub for all other code that updates the view.

## Use
In the sidebar, you can filter the locations by country using the drop-down menu. Click on a location and you will see information about it below. An info window will also appear above the marker on the map.

## Mobile support
When opened on a phone or small tablet, the sidebar is hidden by default. When you click on a marker, details about the location appear in an info window above the videos. The sidebar can be reached via the chevron button on the left side. Drop-down menu should function like it does on non-mobile devices except when you click on a list item, it'll close the sidebar and shows all the location details via the info window instead of within the sidebar.


(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	// setup app config vars
	Ti.App.config = {
		os: osname,
        screenBiggest: height > width ? height : width,
        screenWidth: width,
        screenHeight: height
	};
	
	var Window = require('ui/ApplicationWindow');
	new Window().open();
})();

(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
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

//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var LoadingView = require('ui/views/LoadingView');
	var MainView = require('ui/views/MainView');
	var SideMenuView = require('ui/views/SideMenuView');
	var WebBrowser = require('ui/views/WebBrowser');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		left: 0,
		width: Ti.App.config.screenWidth,
		zIndex: 10
	});
	
	// side menu
	var sideMenu = new SideMenuView();
	sideMenu.open();
	
	// construct main UI
	var mainView = new MainView();
	self.add(mainView);	
	
	//construct loading UI
	var loadingView = new LoadingView();
	self.add(loadingView);
	
	// remove loading screen when done
	Ti.App.addEventListener('iLepraInitDone', function onInit(e){
		Ti.App.removeEventListener('iLepraInitDone', onInit);
		self.remove(loadingView);
		sideMenu.visible = true;
	});
	
	// menu toggling
	// menu animations
	var isToggled = false;
	var allowToggle = true;
	var animateLeft	= Ti.UI.createAnimation({
		left: 200,
		duration: 300
	});
	var animateRight	= Ti.UI.createAnimation({
		left: 0,
		duration: 200
	});	
	Ti.App.addEventListener('iLepraToggleMenu',function(){
		if( !allowToggle ) return;
		
		if( !isToggled ){
			self.animate(animateLeft);
			isToggled = true;
		} else {
			self.animate(animateRight);
			isToggled = false;
		}

		Ti.App.fireEvent("iLepraToggleWebView", {enabled: !isToggled});
	});
	Ti.App.addEventListener("iLepraAllowMenu", function(data){
		allowToggle = data.allow;
	});
	
	// handle external links
	Ti.App.addEventListener("iLepraExternalLink", function(data){
		var browser = new WebBrowser(data.url);
		browser.open();
	});
	
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;

//FirstView Component Constructor
function WebBrowser(url) {
	var self = Titanium.UI.createWindow({
		modal: true,
		navBarHidden: true
	});
	
	//create toolbar
	var back = Ti.UI.createButton({
		title : 'Назад',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	back.addEventListener("click", function(){
		self.close();
		self = null;
	});
	
	// spacer
	var spacer = Ti.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var safari = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ACTION
	});
	safari.addEventListener("click", function(){
		Titanium.Platform.openURL(url);
	});
	
	var toolbar = Titanium.UI.createToolbar({
		top : 0,
		height: 40,
		barColor:'#000',
		items : [back, spacer, safari]
	});
	self.add(toolbar);
	
	//create webview
	var web = Titanium.UI.createWebView({
		url: url,
		top: 40
	});
    self.add(web);

	return self;
}

module.exports = WebBrowser;

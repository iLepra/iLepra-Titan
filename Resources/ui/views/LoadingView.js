//FirstView Component Constructor
function LoadingView() {
	//create UI
	var self = Ti.UI.createView({
		backgroundColor: "#000000",
		layout: 'vertical'
	});
	
	var spacer = Ti.UI.createView({
		height: '25%'
	});
	self.add(spacer);
	
	var image = Ti.UI.createImageView({
		image: '/images/icon-big.png',
		width: '50%',
		height: '50%'
	});
	self.add(image);
	
	//loading indicator
	var indicator = Titanium.UI.createActivityIndicator({
		style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color:'#fff',
		message:'Загружаемся...',
		height:'auto',
		width:'auto'
	});
	self.add(indicator);
	
	indicator.show();

	return self;
}

module.exports = LoadingView;

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
	
	//label 
	var label = Ti.UI.createLabel({
		color: '#FFFFFFF',
		text: "Загружаемся..",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontSize: 24},
		height: 'auto',
		width: 'auto'
	});
	self.add(label);
	
	return self;
}

module.exports = LoadingView;

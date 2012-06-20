function MenuHeader(header, color, bgcolor) {	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		backgroundColor: bgcolor,
		height:'auto'
	});
	
	var customLabel = Ti.UI.createLabel({
	    top:7, 
	    bottom:7, 
	    left:19, 
	    right:19,
	    height:'auto',
	    text: header,
	    font: {fontSize:17, fontWeight:'bold'},
	    color: color
	});
	 
	self.add(customLabel);
	
	return self;
}

module.exports = MenuHeader;

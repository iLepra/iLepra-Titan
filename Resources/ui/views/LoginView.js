function LoginView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		backgroundColor: "#FFFFFF",
		layout: 'vertical',
		height: '100%',
		widht: '100%',
		contentWidth: 'auto',
  		contentHeight: 'auto'
	});
	
	var image = Ti.UI.createImageView({
		image: '/images/icon-big.png',
		width: '30%',
		height: '30%'
	});
	self.add(image);
	
	var label = Ti.UI.createLabel({
		color: '#000000',
		text: L('welcome'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontSize: 24},
		height: 'auto',
		width: 'auto'
	});
	self.add(label);
	
	var login = Ti.UI.createTextField({
		hintText: 'Логин',
	    height: 35,
	    width: '80%',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    value: 'yamalight'
	});
	self.add(login);
	
	var pass = Ti.UI.createTextField({
		hintText: 'Пароль',
	    height: 35,
	    width: '80%',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    passwordMask: true,
	    value: 'My lepra is mine'
	});
	self.add(pass);
	
	Ti.API.log('cap: '+Ti.App.captchaURL)
	var captchaImage = Ti.UI.createImageView({
		width: '80%',
		height: '100',
		image: Ti.App.captchaURL
	});
	self.add(captchaImage);
	
	var captcha = Ti.UI.createTextField({
		hintText: 'Буквы с картинки',
	    height: 35,
	    width: '80%',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	self.add(captcha);
	
	var subview = Ti.UI.createView({
		layout: 'horizontal',
		height: 'auto',
		width: 'auto'
	});
	var remSwitch = Titanium.UI.createSwitch({
    	value:false,
    	titleOff: 'нет',
    	titleOn: 'да'
	});
	subview.add(remSwitch);
	var rememberLabel = Ti.UI.createLabel({
		text:'Помнить меня',
    	height:'auto',
    	width:'auto',
    	font:{fontSize:24},
	    color:'#000'
	});
	subview.add(rememberLabel);
	self.add(subview);
	
	var btn = Ti.UI.createButton({
		title: 'YARRR!',
   		width: '40%',
   		height: 50
	});
	self.add(btn);
	
	btn.addEventListener('click', function(){
		var data = {
            user: login.value,
            pass: pass.value,
            captcha: captcha.value.toLowerCase(),
        	save: remSwitch.value ? 1 : 0,
        	logincode: Ti.App.loginCode
    	};
    	
    	var activityIndicator = Titanium.UI.createActivityIndicator({
			bottom:10, 
			height:50,
			width:50,
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			message: 'Логинимся...'
		});
		activityIndicator.show();
		self.add(activityIndicator);
		
		// get lepra
        var httpClient = Ti.Network.createHTTPClient({
        	onload: function(e){
        		var cookie = this.getResponseHeader("Set-Cookie");
        		Ti.API.info('Response Status: ' + this.status);
    			Ti.API.info('Response Header - Cookie: ' + cookie);
    			Ti.API.info('Response Header - Location: ' + this.getLocation());
    			
    			httpClient.onload = function(e){
    				Ti.API.info('Response Status 2: ' + this.status);
    				
    				var data = this.responseText;
		            if(data.indexOf('class="error"') > 0){
		                // get error
		                /*var errorReg = /<div class="error">(.+?)<\/div>/g,
		                	eres = errorReg.exec(data),
		                	errorMessage = "Unknown error";
		                if(eres != null){
		                	var errorMessage = eres[1];
		                }*/
		                
		                activityIndicator.hide();
		                
		                var dialog = Ti.UI.createAlertDialog({
						    message: "Вы что-то ввели неправильно! Перепроверьте и попробуйте еще раз.",
						    ok: 'Okay',
						    title: 'iLepra Error!'
						}).show();
		
		                // get new captcha
		                Ti.App.iLepra.Util.processCaptcha(data);
		
		                // dispatch error event and die
		                captchaImage.image = Ti.App.captchaURL;
		            }else{
		            	// save cookies
		            	Ti.App.config.cookies = cookie;
		            	Ti.App.Properties.setString('cookie', Ti.App.config.cookies);
		            	
		                // process user's data
		                Ti.App.iLepra.Util.processMain(data);
		                
		                var MainView = require('ui/windows/MainWindow');
						new MainView().open();
		
		                // dispatch ready event
		                Ti.API.log('auth ok')
		            }
    			};
        		
        		httpClient.abort();
        		httpClient.autoRedirect = true;
			    httpClient.open("GET", "http://leprosorium.ru/");
			    httpClient.send();
	        },
	        autoRedirect: false
	    });
        httpClient.open("POST", "http://leprosorium.ru/login/");
        httpClient.send( data );
	});
	
	return self;
}

module.exports = LoginView;

(function(){        
    Ti.App.addEventListener('iLepraMenuSelect', function onMenuSelect(data){
    	Ti.App.fireEvent('iLepraToggleMenu');
    	
    	Ti.API.log(data);
    	
    	switch(data.entry){
    		case "posts":
    			setTimeout(function(){
    				$.mobile.changePage("#postsPage");
    			}, 520)
    			break;
    		case "mystuff":
    			setTimeout(function(){
    				$.mobile.changePage("#mystuffPage");
    			}, 520)
    			break;	
    		case "inbox":
    			setTimeout(function(){
    				$.mobile.changePage("#inboxPage");
    			}, 520)
    			break;
    		case "favs":
    			setTimeout(function(){
    				$.mobile.changePage("#favsPage");
    			}, 520)
    			break;	
    		case "mysubs":
    			setTimeout(function(){
    				iLepra.sub.list = iLepra.userSubLepras;
            		iLepra.sub.fetch = false;
    				$.mobile.changePage("#subsPage");
    			}, 520)
    			break;
    		case "subs":
    			setTimeout(function(){
    				iLepra.sub.fetch = true;
    				$.mobile.changePage("#subsPage");
    			}, 520)
    			break;
    		case "gov":
    			setTimeout(function(){
    				$.mobile.changePage("#govPage");
    			}, 520)
    			break;    		
    		case "chat":
    			setTimeout(function(){
    				$.mobile.changePage("#chatPage");
    			}, 520)
    			break;
    		case "exit":
    			setTimeout(function(){
    				$.mobile.showPageLoadingMsg();
		            $(document).bind(iLepra.events.ready, function(event){
		            	$(document).unbind(event);
		            	// bind event listener for initialization
					    $(document).bind(iLepra.events.init, function(event){
					        $(document).unbind(event);
							// navigate to login page
					        $.mobile.changePage("#loginPage");
					    });
					    iLepra.init();
		            });
		            iLepra.doLogout();
    			}, 520)
    			break;	
    		
    		
    		case "profile":
    			
    			break;
    	}
    });
})();
function MainView() {
	// vars
	var showOrganize = false,
		showRefresh = false,
		showBack = false,
		showMenu = true,
		forceTitle = false;
	
	// view
	var self = Ti.UI.createView({ width: 'auto', height: 'auto' });
	
	var togglePicker = function(e){
		if(self.children.indexOf(picker) == -1){
			self.add(picker);
		}else{
			self.remove(picker);
		}
	};
	
	var updateToolbar = function(){
		var items;

		if(showBack){
			items = [back, flexSpace];
			if(forceTitle){
				items.push(title);
				items.push(flexSpace);
			}
		}else{
			if(showMenu){
				items = [menu, flexSpace, title, flexSpace];
			}else{
				items = [flexSpace, title, flexSpace];
			}
		}

		if( showOrganize ){
			items.push(organize);
		}
		if( showOrganize && showRefresh){
			items.push( Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE, width: 5 }) );
		}
		if( showRefresh ){
			items.push(refresh);
		}
		
		toolbar.items = items;
	}
	Ti.App.addEventListener('iLepraToolbarButtons', function(data){
		if(typeof data.showMenu != "undefined") 
			showMenu = data.showMenu;
		if(typeof data.showOrganize != "undefined") 
			showOrganize = data.showOrganize;
		if(typeof data.showRefresh != "undefined") 
			showRefresh = data.showRefresh;
		if(typeof data.showBack != "undefined") 
			showBack = data.showBack;
		if(typeof data.title != "undefined") 
			title.text = data.title;
		if( showBack &&  typeof data.title != "undefined"){ 
			forceTitle = true;
		}else{
			forceTitle = false;
		}
		updateToolbar();
	});
	
	// toolbar menu button
	var menu = Ti.UI.createButton({
	    backgroundImage: '/icons/slidemenu_32.png',
	    width: 22,
	    height: 22,
	    title: ''
	});
	menu.addEventListener('click', function(){
		Ti.App.fireEvent('iLepraToggleMenu');
	});
	
	// toolbar organize button
	var organize = Ti.UI.createButton({ systemButton: Titanium.UI.iPhone.SystemButton.BOOKMARKS });
	organize.addEventListener('click', togglePicker);
	
	// toolbar refresh button
	var refresh = Ti.UI.createButton({ systemButton: Titanium.UI.iPhone.SystemButton.REFRESH });
	refresh.addEventListener('click', function(){
		Ti.App.fireEvent("iLepraDoRefresh");
	});

	var back = Ti.UI.createButton({ title: 'Назад' });
	back.addEventListener('click', function(){
		showBack = false;
		updateToolbar();
		Ti.App.fireEvent("iLepraPostBack");
	});
	
	// toolbar title
	var title = Ti.UI.createLabel({
		text: "iLepra",
		color: "#FFFFFF",
		width: 150,
		textAlign: "center",
		font: {
			fontWeight: 'bold',
			fontSize: 16
		}
	});
	
	// toolbar spacer
	var flexSpace = Ti.UI.createButton({
	    systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	// toolbar 
	var toolbar = Ti.UI.iOS.createToolbar({
	    items:[menu, flexSpace, title, flexSpace],
	    top: 0,
	    height: 40,
	    borderTop:false,
	    borderBottom:true,
	    barColor:'#000'
	}); 
	self.add(toolbar);
	
	// webview with content
	var web = Ti.UI.createWebView({
		url:'/html/index.html',
		top: 40,
		bottom: 0,
		width: Ti.App.config.screenWidth
	});
	self.add(web);
	Ti.App.addEventListener("iLepraToggleWebView", function(data){
		web.touchEnabled = data.enabled;
	})
	
	// main page section picker
	var picker = Ti.UI.createPicker({
	  bottom: 0
	});
	picker.add([
		Ti.UI.createPickerRow({title:'Главная', data:'main'}),
		Ti.UI.createPickerRow({title:'Все', data:'all'}),
		Ti.UI.createPickerRow({title:'Подлепры', data:'sub'})
	]);
	picker.selectionIndicator = true;
	picker.addEventListener("change", function(e){
		togglePicker();
		Ti.App.fireEvent("iLepraMainChange", {val: e.row.data});
	});
	
	// chat bar
	var repositionChat = function(e){
		chatbar.bottom = 0;
	};
	var chatInput = Ti.UI.createTextField({ hintText:"Написать в чятик", color:"#fff", width: 200 })
	chatInput.addEventListener('focus', function(){
		chatbar.bottom = 216;
	});
	chatInput.addEventListener('blur', function(){
		var val = chatInput.value;
		chatInput.value = "";

		Ti.App.fireEvent("iLepraSubmitChat", {val: val});

		repositionChat();
	})
	chatInput.addEventListener('return', repositionChat)
	var chatButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.DONE });
	chatButton.addEventListener('click', function(){
		chatInput.blur();
	})
	var chatbar = Ti.UI.iOS.createToolbar({
	    items: [chatInput, flexSpace, chatButton],
	    bottom: 0,
	    height: 40,
	    borderTop: true,
	    borderBottom: false,
	    barColor: '#29282d'
	}); 
	Ti.App.addEventListener("iLepraChatBar", function(data){
		if(data.show){
			Ti.API.log('showing chat bar');
			web.bottom = 40;
			self.add(chatbar);
		}else{
			Ti.API.log('removing chat bar');
			web.bottom = 0;
			self.remove(chatbar);
		}
	})
	Ti.App.addEventListener("iLepraChatText", function(data){
		chatInput.value = data.val;
	})
	
	return self;
}

module.exports = MainView;

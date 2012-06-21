(function(){
    var data = null,
        refreshInterval = null,

        // dom
        chatList = null,
        chatLimit = 64;

    var refreshMessages = function(){
        Ti.API.log("rerendering");
        // clean old
        chatList.empty();
        // render posts
        var p = "",
            i, max = data.length > chatLimit ? chatLimit : data.length;
        for(i = 0; i < max; i++)
            p += _.template(chatTemplate, data[i]);
        chatList.append(p);
        // redraw styles
        chatList.listview('refresh');
        Ti.API.log("renrered ok");
    }

    var requestNewChatData = function(isInit){
        Ti.API.log("getting new data");
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            data = iLepra.chat.messages.slice(0);
            data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
            refreshMessages();
            if( typeof isInit != 'undefined' && isInit ){
                // hide loading msg
                $.mobile.hidePageLoadingMsg()
            }
            Ti.API.log("got data");
        });
        iLepra.chat.getMessages();
    }

    // render page on creation
    $(document).on('pagecreate', "#chatPage", function(){
        chatList = $("#chatList");
    });
    $(document).on('pagebeforehide', "#chatPage", function(){
        clearInterval( refreshInterval );
    	Ti.App.fireEvent("iLepraChatBar", {show: false});
    });
    $(document).on('pageshow', "#chatPage", function(){
    	Ti.App.fireEvent("iLepraChangeTitle", {title: "Лепрочятик"});
    	Ti.App.fireEvent("iLepraChatBar", {show: true});

        $.mobile.showPageLoadingMsg()
        requestNewChatData(true);

        Ti.API.log("setting interval");

        // set refresh interval
        refreshInterval = window.setInterval(requestNewChatData, 10000 );

        Ti.API.log("interval ok:" + refreshInterval);
    });

    Ti.App.addEventListener("iLepraSubmitChat", function(data){
        var text = data.val;

        // clear interval to evade overlap
        Ti.API.log("clearing");
        window.clearInterval( refreshInterval );

        Ti.API.log("requesting");
        $.mobile.showPageLoadingMsg();
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.hidePageLoadingMsg();
            // get data
            data = iLepra.chat.messages.slice(0);
            data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
            Ti.API.log("rendering");
            // render
            refreshMessages();
            Ti.API.log("set new interval");
            // put refresh interval back
            refreshInterval = window.setInterval(requestNewChatData, 10000 );
        });
        iLepra.chat.sendMessage(text);
    });

    $(document).on("tap", "li.chatMessage", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var username = $(this).data('user');

        Ti.App.fireEvent("iLepraChatText", {val: username+": "});
    });
})();
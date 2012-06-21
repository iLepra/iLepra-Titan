window.addEventListener('load', function(){
    // jquery mobile stuff
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.loadingMessage = "Загружаемся ...";
    $.mobile.fixedtoolbar.prototype.options.tapToggle = false;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    /*$(document).on(iLepra.config.defaultTapEvent, "a", function(e){
        var link = $(this).attr('href');
        if(link.indexOf('http://') != -1){
            e.preventDefault();
            e.stopImmediatePropagation();
            window.open(link);
        }
    });*/
});
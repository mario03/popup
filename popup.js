(function(){

    var popupModule = {};
    var width;
    var height;
    var url;

    function setJsPopupSettings(w , h, u){

        width = w || 400;
        height = h || 500;
        url = u || document.URL;
        if(u === undefined){
            console.error("Missing property: url" + document.url);
        }
    }

    function getJsPopupSettings(){

        var settings = {};

        settings.centerLeft = window.screenX + (window.innerWidth - width) / 2;
        settings.centerTop = window.screenY + (window.innerHeight - height) / 2;

        return settings;
    }

    function modalPopup(){

        var settings = getJsPopupSettings();
        window.showModalDialog( url,
            "shad",
            "dialogWidth:" + width +
            "px;dialogHeight:"  + height +
            "px;dialogLeft:"+ settings.centerLeft +
            ";dialogTop:" + settings.centerTop
        );
    }

    function windowPopup(){

        var settings = getJsPopupSettings();
        window.open(url,
            "shad",
            "width=" + width +
            ",height=" + height +
            ",left=" + settings.centerLeft +
            ",top=" + settings.centerTop
        );
    }

    function setBodyScroll(){

        document.body.style.overflow = 'auto';
        document.body.style.width = 'auto';
    }

    function initControlPopup(control, overlay, dataLink, content_id){

        if(dataLink !== undefined && content_id !== undefined){

            var content =  document.getElementById(content_id);

            control.onclick = function(){

                getPopupData(dataLink, content, overlay);
            }
        } else {

            control.onclick = function(){

                showPopup(overlay);
            }
        }
    }

    function showPopup(overlay){

        overlay.style.display = 'block';
        overlay.scrollTop = 0;
        document.body.style.width = document.body.style.width;
        document.body.style.overflow = 'hidden';
    }

    function getPopupData(dataLink, content, overlay){

        var xhr = new XMLHttpRequest();

        xhr.open('GET', dataLink, true);

        xhr.onreadystatechange = function() {

            if (xhr.readyState !== 4) return;

            content.innerHTML = xhr.responseText;
            showPopup(overlay);
        }

        xhr.send(null);
    }

    function initOverlayPopup(overlay){

        overlay.onclick = function(event) {

            e = event || window.event
            if (e.target === this) {
                overlay.style.display = 'none';
                setBodyScroll();
            }
        }
    }

    function initClosePopup(close, overlay){

        close.onclick = function() {

            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            setBodyScroll();
        }
    }

    function initPopup(settings){

        var properties = [ "control_id","overlay_id","close_id" ];

        for(var i = 0; i < properties.length; i++){

            if(settings[properties[i]] === undefined){

                console.error("Missing property:" + properties[i], settings);
                return;
            }
        }

        var control = document.getElementById(settings.control_id);
        var overlay = document.getElementById(settings.overlay_id);
        var close = document.getElementById(settings.close_id);

        initControlPopup(control, overlay, settings.dataLink, settings.content_id);
        initOverlayPopup(overlay);
        initClosePopup(close, overlay);
    }

    popupModule.setJsPopupSettings = setJsPopupSettings;
    popupModule.modalPopup = modalPopup;
    popupModule.windowPopup = windowPopup;
    popupModule.initPopup = initPopup;

    window.popupModule = popupModule;

})();
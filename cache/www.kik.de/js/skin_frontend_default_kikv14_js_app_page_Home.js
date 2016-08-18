(function($) {

    App.page.Home = {
        
        slider: null,
        
        init: function() {
            if ($jq('.kikSlider').length) {
                this.slider = new App.module.Slider( $jq('.kikSlider'), 7 );
            }
            //Comment if Overlay is not required. MaxValue is 3 so that overlay is displayed 3 times.
            //if(App.config.code == 'de24') {
            //    this._checkCookie(3);
            //}
        },


        _setCookie: function(cname, cvalue, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else {
                var expires = "";
            }
            document.cookie = cname + "=" + cvalue + expires + "; path=/";

        },

        _getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return 0;
        },

        _checkCookie: function(maxCount) {
            var value = parseInt(this._getCookie("saleOverlay"));
            if(value < maxCount) {
                $jq('.sale_overlay').show();
                this._setCookie("saleOverlay", value+1, 1);
            }
        }
};

	$(document).on(App.Autoloader.EVENT_COMPLETE, function() {
        App.page.Home.init();
    });

})(jQuery);
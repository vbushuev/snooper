(function($) {

    App.generic.Header = {

        mouseOverCart: false,
        mouseOverTimeoutId: 0,
	    headerTTL: 5,
	    KEY_TOP_LINKS: 'kikHeaderTopLinks',
	    KEY_TIMESTAMP: 'kikHeaderTopLinksTimestamp',

        init: function() {
            this.loadTopLinks();
            this._initLangSelector();
            this._initCartTopLink();
	        this._initSearchRequiredChecker();
            this._initGlobalMessages();

            if (App.config.code == 'de24' && ('ontouchstart' in window)) {
                this._checkCookie();
            }
        },

        _checkForMobileAvailability: function() {
            var response = false;
            var mobileUrl = App.config.deMobileUrl;
            var desktopUrl = App.config.deDesktopUrl;

            if ( screen.width <= 640 && location.origin + '/' == desktopUrl) {
                response = confirm('Für www.kik.de ist eine mobile Version verfügbar. Möchten Sie diese aktivieren?');
            }else{
                if (screen.width > 640 && location.origin + '/' == mobileUrl) {
                    location.href = desktopUrl + location.pathname.substring(1);
                }
            }

            if (response == true) {
                location.href = mobileUrl + location.pathname.substring(1) + location.search;
            }else{
                this._setCookie("mobileCheck", 1);
            }

        },

        _setCookie: function(cname, cvalue) {
            var now = new Date();
            var time = now.getTime();
            expireTime = time + 2400*36000;
            now.setTime(expireTime);

            document.cookie = cname + "=" + cvalue+ ";expires=" +now.toGMTString();
        },

        _getCookie: function(name) {
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return 0;
        },

        _checkCookie: function() {
            var value = this._getCookie("mobileCheck");
            if(value == 0) {
                this._checkForMobileAvailability();
            }
        },

	    /*Event nur abfeuern, wenn Input gefüllt ist, sonst Text rot färben.
	    * Bei 'focus' Text wieder schwarz färben.
	    * */
	    _initSearchRequiredChecker: function() {
		    var buttonObj = $('.form-search .button'),
		        searchObj, searchVal = '',
		        eventVal  = buttonObj.attr('onmousedown'),
                selfClass = App.generic.Header;
		    buttonObj.removeAttr('onmousedown');

            $('#search_mini_form').on('submit', function() {
                searchObj = $('#search');
                searchVal = $.trim(searchObj.val());
                selfClass.checkForm(searchVal, searchObj, eventVal);
            });

            $('#results-search_mini_form').on('submit', function() {
                searchObj = $('#results-search');
                searchVal = $.trim(searchObj.val());
                selfClass.checkForm(searchVal, searchObj, eventVal);
            });


		    buttonObj.on('click', function() {
                if (this.form.id == 'search_mini_form') {
                    searchObj = $('#search');
                } else {
                    searchObj = $('#results-search');
                }
                searchVal = $.trim(searchObj.val());

			    if (!searchVal) {
				    searchObj.css('color', '#CF1400');
				    return false;
			    } else {
				    eval(eventVal);
			    }
		    });
		},

        checkForm: function(searchVal, searchObj, eventVal) {
            if (!searchVal) {
                searchObj.css('color', '#CF1400');
                return false;
            } else {
                eval(eventVal);
            }

            searchObj.focus(function() {
                $(this).css('color', '#000');
            });
        },

        _initLangSelector: function() {
            $('.current-website').on('click', function() {
                $('.lang-selector').toggleClass('open');
            });
        },

        _initCartTopLink: function() {
            var linksContainer = $('#top-links');
            var self = App.generic.Header;
            linksContainer.on('mouseenter', '.li-top-link-cart', function () {
                self.mouseOverTimeoutId = setTimeout(function() {
                    if ( $('.shopping-cart-loader:visible').length === 0 && $('.block-cart:visible').length === 0 ) {
                        self._loadCart(App.config.appCartUrl, '.block-cart');
                    }
                }, 50);
                self.mouseOverCart = true;
            });

            linksContainer.on('mouseleave', '.li-top-link-cart', function () {
                $('.block-cart').stop().slideUp(200);
                self.mouseOverCart = false;
                clearTimeout(self.mouseOverTimeoutId);
            });

        },

        _loadCart: function(url, target) {
            $('.shopping-cart-img').css('visibility', 'hidden');
            $('.shopping-cart-loader').show();
            $.get(url, '', function (data) {
                $('.shopping-cart-img').css('visibility', 'visible');
                $('.shopping-cart-loader').hide();

                if (data.success && App.generic.Header.mouseOverCart) {
                    //$(target).replaceWith('http://www.kik.de/data.html');
                    $(target).replaceWith('http://'+document.location.hostname+'?q=data.html');
                    $('.block-cart').slideDown(200);
                }
            }, 'json');
        },

        loadTopLinks: function() {
            var topLinksElement = $('#top-links');
            if (topLinksElement.hasClass('skip-links')) {
                return;
            }

            var savedTopLinks = this._retrieveTopLinks();
            if (savedTopLinks) {
                topLinksElement.html(savedTopLinks);
            } else {
                $.get( App.config.topLinksUrl , '', function(data) {
                    if (data.success) {
                        topLinksElement.html(data.content);
                        App.generic.Header._storeTopLinks(data.content);
                    }
                }, 'json');
            }
        },

        clearCachedTopLinks: function() {
            App.generic.Storage.clear(this.KEY_TOP_LINKS);
        },

        _storeTopLinks: function(html) {
            // Save html
            App.generic.Storage.store(this.KEY_TOP_LINKS, html);

	        // Set timestamp for header TTL
            App.generic.Storage.store(this.KEY_TIMESTAMP, App.Date.getTime());

            // Save current status, if user is logged in or not
            App.generic.Storage.store('kikloggedIn', App.config.isLoggedIn ? 1 : 0);
        },

        _retrieveTopLinks: function() {
            // Get html from local storage
            var val = App.generic.Storage.retrieve(this.KEY_TOP_LINKS),
                timestamp = App.generic.Storage.retrieve(this.KEY_TIMESTAMP),
	            now = App.Date.getTime();
                pageBody = $('body');

	        // Invalidate if storage is older than headerTTL
	        var invalidate = (timestamp) ? ((now - parseInt(timestamp)) / 60000) >= this.headerTTL : true;

            // If logged in status has changed, since we last stored the data, the html must be invalid
            if ( (App.generic.Storage.retrieve('kikloggedIn') === '1') != App.config.isLoggedIn
	            || pageBody.is('.checkout-cart-index')
	            || pageBody.is('.checkout-onepage-success')
	            || invalidate )
            {
                val = null;
                this.clearCachedTopLinks();
            }

            return val;
        },

        _initGlobalMessages: function() {
            var $globalNotices = $('#global-notices');
            $globalNotices.on('click', '.global-site-notice', function() {
                var noticeId = 'kiknotice' + $(this).attr('class').replace('global-site-notice', '').replace(' ', '_');
                $(this).remove();
                App.generic.Storage.Cookie.store(noticeId, 1, 0);
            });

            if (!App.generic.Storage.Cookie.retrieve('kiknotice_notice-oldbrowser')) {
                $('.global-site-notice.notice-oldbrowser').removeClass('hidden');
            }

            if (location.search.indexOf('?requestedUrl=') === 0) {
                var trans       = Translator;
                var template    = $('#global-notice-template').html();
                template = template.replace('%type%', 'redirect');
                template = template.replace('%text%', trans.translate('You were redirected because of reasons'));
                $globalNotices.append(template)
            }
        }
    };

})(jQuery);

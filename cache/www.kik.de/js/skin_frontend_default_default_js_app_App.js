var App;

(function($) {

    App =
    {
	    queryString: null,

        config: {
            /* @type {string} */
            appBaseUrl: '',
            /* @type {boolean} */
            secure: false,
            /* @type {string} */
            skinUrl: '',
            /* @type {boolean} */
            isSecure: false,
            /* @type {boolean} */
            isAjax: false,
            /* @type {boolean} */
            isLoggedIn: false,
            /* @type {string} */
            topLinksUrl: '',
            /* @type {string} */
            appCartUrl: ''
        },
        
        init: function() {
            $(document).on(App.Autoloader.EVENT_COMPLETE, this.onModulesLoaded);
            App.Autoloader.scan( this.config.appBaseUrl + 'module/' );
	        App.generic.Header.init();
            App.generic.HrefDecoder.init();
	        App.Browser.init();
        },
        
        onModulesLoaded: function() {
        },

		tick: function(callback) {
			window.setTimeout(callback.bind(this), 0);
		},

	    getQueryString: function() {
		    if (null === this.queryString) {
			    var str = window.location.search;
			    var objURL = {};

			    str.replace(
				    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
				    function($0, $1, $2, $3){
					    objURL[$1] = $3;
				    }
			    );
			    this.queryString = objURL;
		    }

		    return this.queryString;
	    },

	    getParam: function(key) {
		    var qs = this.getQueryString();
		    if (qs[key] === undefined) {
			    key = encodeURI(key);
			    return (qs[key] === undefined) ? null : qs[key];
		    }

		    return qs[key];
	    }
    };

    App.Autoloader =
    {
        EVENT_COMPLETE: 'onAutoloaderComplete',
        
        _scanAttr: 'data-module_autoloader',
        _loadedScripts: [],
        _loadingProgress: 0,

        /**
         * Scans for certain tags in the dom to automatically load module scripts.
         * Triggers an event once all scripts are loaded.
         * 
         * @usage:
         * <code data-module_autoloader="Slider" class="hidden"></code>
         * $(document).on(App.Autoloader.EVENT_COMPLETE, function() {
         *      var slider = new App.module.Slider();
         * });
         */
        scan: function( srcModuleDir ) {
            var self = this;
            var tags = $('code[' + this._scanAttr + ']');
            
            if (tags.length === 0) {
                $(document).trigger(App.Autoloader.EVENT_COMPLETE);
                return;
            }

            tags.each(function() {
                var moduleId = $(this).attr(self._scanAttr), src;
				if(App.config['minifyFiles']) {
					src = srcModuleDir + '/' + moduleId + '/cache/www.kik.de/js/_min.js';
				} else {
					src = srcModuleDir + '/' + moduleId + '.js';
				}
                
                // If src is empty -> abort
                if (moduleId == "") return;

                // If module js was already loaded -> abort
                if ($.inArray(moduleId, self._loadedScripts) === -1) {
                    
                    self._loadedScripts.push(moduleId);
                    //$.getScript(src, function() {
					self._getScript(src, function() {
                        self._loadingProgress++;
                        // If all scripts were loaded, trigger event
                        if (self._loadedScripts.length === self._loadingProgress) {
							$(document).trigger(App.Autoloader.EVENT_COMPLETE);
                        }
                    });
                    
                }

            });
        },

		_getScript: function(src, callback) {
			return $.getScript(src, callback);
		}
    };

	App.Data = {
		data: {},

		get: function(key) {
			return (this.data[key] === undefined) ? null : this.data[key];
		},

		set: function(key, val) {
			this.data[key] = val;
		},

		setData: function(data) {
			if (typeof data === 'object') {
				this.data = data;
			}
		}
	};

	App.Browser = {
		isIE : false,
		IEVersion: 0,

		init: function() {
			var v = this.IEVersion = this.getIEVersion();
			this.isIE = !!(typeof v === 'number' && v % 1 === 0);
		},

		getIEVersion: function() {
			var ua = window.navigator.userAgent,
				msie = ua.indexOf('MSIE '),
				trident = ua.indexOf('Trident/');

			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}

			if (trident > 0) {
				// IE 11 (or newer) => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}

			// Other browser
			return false;
		},

		// Is IE lower or equal to 9
		isIElte9: function() {
			return (!this.isIE) ? false : !!(this.IEVersion <= 9);
		}
	};

	App.Date = {
		getTime: function() {
			return new Date().getTime();
		}
	}

    // Define empty namespaces
    // Will be filled dynamically in different contexts
    App.module = {};
    App.page = {};
    App.generic = {};

})(jQuery);

function App() {}
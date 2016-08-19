/**
* JavaScript functions for cookiehandling
*
* @package    StWD
* @access	  public
* @author	  Dominique Stender <dstender@st-webdevelopment.de?>
* @copyright  2004 (Dominique Stender); All rights reserved
* @version    1.0.0
*/

  /**
  * Sets a cookie
  *
  * @param string name Name of the cookie
  * @param string value Value of the cookie
  * @param string expired Time when the cookie will expire
  * @param string path path for which the cookie is valid
  * @param string domain domain for which the cookie is valid
  * @param string secure flag weather the cookie is SSL enabled or not
  * @return void
  */
  function cookie_set(name, value, expires, path, domain, secure) {
    var cur_cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = cur_cookie;
  } // end: function  cookie_set()



  /**
  * retrieves the contents of a cookie
  *
  * @param string name Name of the cookie
  * @return mixed string containing the cookies value, NULL if the cookie does not exist
  */
  function cookie_get(name) {
    var dc      = document.cookie;
    var prefix  = name + "=";
    var begin   = dc.indexOf("; " + prefix);

    if (begin == -1) {
      begin = dc.indexOf(prefix);

      if (begin != 0) {
        return null;
      } // end: if
    } else {
      begin += 2;
    } // end: if
    var end = document.cookie.indexOf(";", begin);

    if (end == -1) {
      end = dc.length;
    } // end: if

    return unescape(dc.substring(begin + prefix.length, end));
  } // end: function cookie_get()


  /**
  * removes a cookie
  *
  * @param string name Name of the cookie
  * @param path path for which the cookie is valid
  * @param string domain domain for which the cookie is valid
  * @return void
  */
  function cookie_delete(name, path, domain) {
    if (cookie_get(name)) {
      document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    } // end: if
  } // end: function cookie_delete()



  /**
  * Minor fixes for dates
  *
  * @param date an instance of the Date object
  * @return void
  */
  function fix_date(date) {
    var base = new Date(0);
    var skew = base.getTime();

    if (skew > 0) {
      date.setTime(date.getTime() - skew);
    } // end: if
  } // end: function fix_date()

/*
 * function.js
 *
 * The content of this file is (c) 2003 - 2007 dmc
 * digital media center GmbH
 * All rights reserved
 *
 * This software is the confidential and proprietary
 * information of dmc digital media center GmbH.
 *
 */


/**
 * global functions used by many extensions
 *
 * $Id: functions.js 19010 2011-03-21 06:44:39Z dst $
 */

	/**
	* flag to prevent double submits by doubleclicks on buttons
	*/
	var doubleclickFormSubmitFlag = false;

	/**
	* performs a form submit of the form defined by ctype and uid
	* and prevents a double click form submit
	*
	* @access public
	* @param  ctype    the name of the extension
	* @param  uid      the uid of the pageelement
	* @return void
	*/
	function doubleclickCheckFormSubmit(ctype, uid) {
		var form			= document.getElementById(ctype + '[' + uid + ']' + '[form]');

		if (doubleclickFormSubmitFlag == false) {
			if (form) {
				doubleclickFormSubmitFlag = true;
				form.submit();
			} // end: if
		} // end: if
	} // end: function

	/**
	* Change the value of the object with the given id
	*
	* @access	public
	* @param  	id    		the id of the form element to get changed
	* @param  	newValue    the new value for the form element to get changed
	* @return	boolean		result of the change
	*/
	function changeFormElementvalue(id, newValue) {
		var returnValue		= false;
		var formElement		= document.getElementById(id);

		if (formElement) {
			formElement.value = newValue;
			returnValue = true;
		} // end: if

		return returnValue;
	} // end: if

	/**
	* Trigger "needs cookie" warning in layer.
	*
	* @access public
	* @return void
	*/
	function cookieWarning(cookieName, getName, warnText) {
		var cookieSessionId = cookie_get(cookieName);
		var myDiv 			= false;

		if (typeof document.getElementById('mb3HeaderWarnings') == 'object'
			&& document.getElementById('mb3HeaderWarnings') != null) {
			myDiv = document.getElementById('mb3HeaderWarnings');

			if (!cookieSessionId
				&& document.location.href.indexOf(getName + '=') == -1) {

				myDiv.innerHTML 			= warnText;
				myDiv.style['visibility']	= 'visible';
				myDiv.style['display']		= 'block';
			} // end: if
		}
	} // end: function

	/**
	* Redirects the user if no session cookie is set and URL-based sessionIds are
	* allowed within the system.
	*
	* @access public
	* @return void
	*/
	function noCookieRedirect(cookieName, getName, sessionId) {
		var cookieSessionId = cookie_get(cookieName);
		var paramAppend		= '&';
		var redirectString	= getName + '=' + sessionId;

		if (cookieSessionId == null) {
			// no cookie set in browser

			// fix appender-char if no params exist
			if (document.location.href.indexOf('?') == -1) {
				// appended & because typo3 has a small bug
				// if there is no 'id=' in the query typo3 thinks that ftu=... is the id
				paramAppend = '?&';
			}

			// redirect to self with url-param
			document.location.href = document.location.href + paramAppend + redirectString;
		} // end: if
	} // end: function

	var dmcOnloadFuncs = new Array();
	/**
	* calls specified functions for the body onLoad Event
	* the function which wants to be called, adds itself to an array and than it gets called
	* current function calls:
	* __utmSetTrans() - send the Google Analytics Form @ the basket checkout (wk step6) - according global variable: utmTrans
	* __initZoom() - initiate the zoom-layer-script - according global variable: initZoom
	* __foofoo() - sample for further function calls  - according global variable: foofoo
	*
	* @access	public
	* @return	void
	*/
	function dmcOnLoad() {

		for(var i=0; i<dmcOnloadFuncs.length; i++) {

			if (typeof dmcOnloadFuncs[i] == 'function') {
				dmcOnloadFuncs[i]();
			}
		}
	} // end: function

	/**
	*
	* @access public
	* @param  func
	* @return void
	*/
	function addOnloadFunction(func) {
		if (typeof func == 'function') {
			dmcOnloadFuncs.push(func);
		}
	} // end: function

	/**
	*
	* @access public
	* @param  url
	* @param  name
	* @param  parameter
	* @return popuphandler
	*/
	function openWindow(url, name, parameter) {
		// Wenn ein Parameter uebergeben wird --> diesen uebernehmen
		if (parameter) {
			size = parameter;
		}

		var popuphandler = window.open(url,name,size);
		popuphandler.window.focus();

		return popuphandler;
	} // end: function

	/**
	*
	* @access public
	* @param  url
	* @param  name
	* @param  parameter
	*/
	function openJQueryPopupWindow(url, name, parameter) {
				
		name	 = '<span style="font-size:17px;font-weight:bold">'+name+'</span>';
		popupurl = url+"?TB_iframe=true&";
		
		// Wenn ein Parameter uebergeben wird --> diesen uebernehmen
		if (parameter) {
			size = parameter.replace(/\,/g, "&");
			popupurl = url+"?TB_iframe=true&"+size;
		}

		tb_show(name, popupurl, false);

	} // end: function


	/*
	Copyright (c) 2005 JSON.org

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The Software shall be used for Good, not Evil.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

	var JSON = {
		org: 'http://www.JSON.org',
		copyright: '(c)2005 JSON.org',
		license: 'http://www.crockford.com/JSON/license.html',

		stringify: function (arg) {
	    	var c, i, l, s = '', v;
	    	var numeric = true;

	    	switch (typeof arg) {
	    		case 'object':
	      			if (arg) {
	        			if(Array.prototype.isPrototypeOf(arg)){
	          			// do a test whether all array keys are numeric
	          				for (i in arg) {
	            				if (isNaN(i) || !isFinite(i)) {
	              					numeric = false;
	              					break;
	            				} // end: if
	          				} // end: for

	          				if (numeric == true) {
	            				for (i = 0; i < arg.length; ++i) {
	              					if (typeof arg[i] != 'undefined') {
	                					v = this.stringify(arg[i]);
	                					if (s) {
	                  						s += ',';
	                					} // end: if
	                					s += v;
	              					} else {
	                					s += ',null';
	              					} // end: if
	            				} // end: for
	            				return '[' + s + ']';
	          				} else {
	            				for (i in arg) {
	                				v = arg[i];
	                				if (typeof v != 'undefined' && typeof v != 'function') {
	                  					v = this.stringify(v);
	                  					if (s) {
	                    					s += ',';
	                  					}
	                  					s += this.stringify(i) + ':' + v;
	                				} // end: if
	            				} // end: for
	            				// return as object
	            				return '{' + s + '}';
	          				} // end: if
	        			} else if (typeof arg.toString != 'undefined') {
	          				for (i in arg) {
	            				v = arg[i];
	            				if (typeof v != 'undefined' && typeof v != 'function') {
	              					v = this.stringify(v);
	              					if (s) {
	                					s += ',';
	              					} // end: if
	              					s += this.stringify(i) + ':' + v;
	            				} // end: if
	          				} // end: for
	          				return '{' + s + '}';
	        			} // end: if
	      			} // end: if
	      			return 'null';

				case 'number':
	      			return isFinite(arg) ? String(arg) : 'null';

				case 'string':
			      	l = arg.length;
					s = '"';
	      			for (i = 0; i < l; i += 1) {
	        			c = arg.charAt(i);
	        			if (c >= ' ') {
	          				if (c == '\\' || c == '"') {
	            				s += '\\';
	          				} // end: if
	          				s += c;
			        	} else {
	          				switch (c) {
	            				case '\b':
	              					s += '\\b';
	              					break;
	            				case '\f':
	              					s += '\\f';
	              					break;
	            				case '\n':
	              					s += '\\n';
	              					break;
	            				case '\r':
	              					s += '\\r';
	              					break;
	            				case '\t':
	              					s += '\\t';
	              					break;
	            				default:
	              					c = c.charCodeAt();
	              					s += '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
	          				} // end: if
	        			} // end: if
	      			} // end: for
	      			return s + '"';

				case 'boolean':
	      			return String(arg);

	   			default:
	      			return 'null';
	    	} // end: switch
	  	},

		parse: function (text) {
	    	var at = 0;
	    	var ch = ' ';

	    	function error(m) {
	      		throw {
	        		name: 'JSONError',
	        		message: m,
	        		at: at - 1,
	        		text: text
	      		};
	    	} // end: function

	    	function next() {
	      		ch = text.charAt(at);
	      		at += 1;
	      		return ch;
	    	} // end: function

	    	function white() {
	      		while (ch != '' && ch <= ' ') {
	        		next();
	      		} // end: while
	    	} // end: function

	    	function str() {
	      		var i, s = '', t, u;

	      		if (ch == '"') {
					outer:      while (next()) {
	          			if (ch == '"') {
	            			next();
	            			return s;
	          			} else if (ch == '\\') {
	            			switch (next()) {
	            				case 'b':
	              					s += '\b';
	              					break;
	            				case 'f':
	              					s += '\f';
	              					break;
	            				case 'n':
	              					s += '\n';
	              					break;
	            				case 'r':
	              					s += '\r';
	              					break;
	            				case 't':
	              					s += '\t';
	              					break;
	            				case 'u':
	              					u = 0;
	              					for (i = 0; i < 4; i += 1) {
	                					t = parseInt(next(), 16);
	                					if (!isFinite(t)) {
	                  						break outer;
	                					} // end: if
	                					u = u * 16 + t;
	              					} // end: for
	              					s += String.fromCharCode(u);
	              					break;
	            				default:
	              					s += ch;
	            			} // end: switch
	          			} else {
	            			s += ch;
	          			} // end: if
	        		} // end: while
	      		} // end: if
	      		error("Bad string");
	    	} // end: function

	    	function arr() {
	      		var a = [];

	      		if (ch == '[') {
	        		next();
	        		white();
	        		if (ch == ']') {
	          			next();
	          			return a;
	        		} // end: if
	        		while (ch) {
	          			a.push(val());
	          			white();
	          			if (ch == ']') {
	            			next();
	            			return a;
	          			} else if (ch != ',') {
	            			break;
	          			} // end: if
	          			next();
	          			white();
	        		} // end: while
	      		} // end: if
	      		error("Bad array");
	    	} // end: function

	    	function obj() {
	      		var k, o = {};

	      		if (ch == '{') {
	        		next();
	        		white();
	        		if (ch == '}') {
	          			next();
	          			return o;
	        		} // end: if
	        		while (ch) {
	          			k = str();
	          			white();
	          			if (ch != ':') {
	            			break;
	          			}
	          			next();
	          			o[k] = val();
	          			white();
	          			if (ch == '}') {
	            			next();
	            			return o;
	          			} else if (ch != ',') {
	            			break;
	          			} // end: if
	          			next();
	          			white();
	        		} // end: while
	      		} // end: if
	      		error("Bad object");
	    	} // end: function

	    	function assoc() {
	      		var k, a = [];

	      		if (ch == '<') {
	        		next();
	        		white();
	        		if (ch == '>') {
	          			next();
	          			return a;
	        		}
	        		while (ch) {
	          			k = str();
	          			white();
	          			if (ch != ':') {
	            			break;
	          			} // end: if
	          			next();
	          			a[k] = val();
	          			white();
	          			if (ch == '>') {
	            			next();
	            			return a;
	          			} else if (ch != ',') {
	            			break;
	          			} // end: if
	          			next();
	          			white();
	        		} // end: while
	      		} // end: if
	      		error("Bad associative array");
	    	} // end: function

	    	function num() {
	      		var n = '', v;

		  		if (ch == '-') {
	        		n = '-';
	        		next();
	      		} // end: if
	      		while (ch >= '0' && ch <= '9') {
	        		n += ch;
	        		next();
	      		} // end: while
	      		if (ch == '.') {
	        		n += '.';
	        		while (next() && ch >= '0' && ch <= '9') {
	          			n += ch;
	        		} // end: while
	      		} // end: if
	      		if (ch == 'e' || ch == 'E') {
	        		n += 'e';
	        		next();
	        		if (ch == '-' || ch == '+') {
	          			n += ch;
	          			next();
	        		} // end: if
	        		while (ch >= '0' && ch <= '9') {
	          			n += ch;
	          			next();
	        		} // end: while
	      		} // end: if
	      		v = +n;
	      		if (!isFinite(v)) {
	        		error("Bad number");
	      		} else {
	        		return v;
	      		} // end: if
	    	} // end: function

	    	function word() {

			  	switch (ch) {
	        		case 't':
	          			if (next() == 'r' && next() == 'u' && next() == 'e') {
	            			next();
	            			return true;
	          			} // end: if
	          			break;
	        		case 'f':
	          			if (next() == 'a' && next() == 'l' && next() == 's' &&
	              			next() == 'e') {
	            			next();
	            			return false;
	          			} // end: if
	          			break;
	        		case 'n':
	          			if (next() == 'u' && next() == 'l' && next() == 'l') {
	            			next();
	            			return null;
	          			} // end: if
	          			break;
	      		} // end: switch
	      		error("Syntax error");
	    	} // end: function

	    	function val() {

		  		white();
	      		switch (ch) {
	        		case '{':
	          			return obj();
	        		case '[':
	          			return arr();
	        		case '<':
	          			return assoc();
	        		case '"':
	          			return str();
	        		case '-':
	          			return num();
	        		default:
	          			return ch >= '0' && ch <= '9' ? num() : word();
	      		} // end: switch
	    	} // end: function

	    	return val();
	  	}
	};




/*
 * jQuery clueTip plugin
 * Version 1.0.7  (January 28, 2010)
 * @requires jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/*
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/

;(function($) { 
  $.cluetip = {version: '1.0.6'};
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $cluetipWait, $dropShadow, imgCount;
  
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      return this.removeData('thisInfo').unbind('.cluetip');
    }
    return this.each(function(index) {
      var link = this, $this = $(this);
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(true, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = +opts.cluezIndex;
      $this.data('thisInfo', {title: link.title, zIndex: cluezIndex});
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $(['<div id="cluetip">',
          '<div id="cluetip-outer">',
            '<h3 id="cluetip-title"></h3>',
            '<div id="cluetip-inner"></div>',
          '</div>',
          '<div id="cluetip-extra"></div>',
          '<div id="cluetip-arrows" class="cluetip-arrows"></div>',
        '</div>'].join(''))
        [insertionType](insertionElement).hide();
        
        $cluetip = $('#cluetip').css({position: 'absolute'});
        $cluetipOuter = $('#cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
        $cluetipInner = $('#cluetip-inner');
        $cluetipTitle = $('#cluetip-title');        
        $cluetipArrows = $('#cluetip-arrows');
        $cluetipWait = $('<div id="cluetip-waitimage"></div>')
          .css({position: 'absolute'}).insertBefore($cluetip).hide();
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-1, opacity:.1, top: 1+i, left: 1+i}));
        }
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle && !js) {
        return true;
      }
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'),10)||0) + (parseInt($cluetip.css('paddingRight'),10)||0) + dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if (tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }
      
      var localContent;
      function returnFalse() { return false; }

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({
          left: (posX > 0 && opts.positionBy != 'bottomTop') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0),
          zIndex: $this.data('thisInfo').zIndex
        });
        $cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js.call(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tpl ? tipParts[0] : '');
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }          
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') !== 0) {
        if (/\.(jpe?g|tiff?|gif|png)$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;
          var ajaxSettings = {
            cache: false, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $this.data('thisInfo').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');  
                }
              }
            },
            success: function(data, textStatus) {       
              cluetipContents = opts.ajaxProcess.call(link, data);
              if (isActive) {
                if (optionSuccess) {optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);}
                $cluetipInner.html(cluetipContents);
              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);}
              var imgs = $cluetipInner[0].getElementsByTagName('img');
              imgCount = imgs.length;
              for (var i=0, l = imgs.length; i < l; i++) {
                if (imgs[i].complete) {
                  imgCount--;
                }
              }
              if (imgCount && !$.browser.opera) {
                $(imgs).bind('load error', function() {
                  imgCount--;
                  if (imgCount<1) {
                    $cluetipWait.hide();
                    if (isActive) { cluetipShow(pY); }
                  }
                }); 
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              } 
            }
          };
          var ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);
          
          $.ajax(ajaxMergedSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        
        var $localContent = $(tipAttribute + (/#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner);
        $closeLink.bind('click.cluetip', function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          $cluetip.bind('mouseleave.cluetip', function() {
            cluetipClose();
          });
        } else {
          $cluetip.unbind('mouseleave.cluetip');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({zIndex: $this.data('thisInfo').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.openSpeed || 0);
      if (opts.dropShadow) { $dropShadow.css({height: tipHeight, width: tipInnerWidth, zIndex: $this.data('thisInfo').zIndex-1}).show(); }
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
        clearTimeout(closeOnDelay);        
      }
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass();
      opts.onHide.call(link, $cluetip, $cluetipInner);
      $this.removeClass('cluetip-clicked');
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) {
        $cluetipArrows.css({top: ''});
      }
    };

    $(document).bind('hideCluetip', function(e) {
      cluetipClose();
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.bind('focus.cluetip', function(event) {
          activate(event);
        });
        $this.bind('blur.cluetip', function(event) {
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $this[opts.clickThrough ? 'unbind' : 'bind']('click', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove.cluetip');}
          });           
        } else {
          $this.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $this.unbind('mousemove.cluetip');
          });
        }
        $this.bind('mouseover.cluetip', function(event) {
          $this.attr('title','');
        }).bind('mouseleave.cluetip', function(event) {
          $this.attr('title', $this.data('thisInfo').title);
        });
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    localPrefix:      null,       // string to be prepended to the tip attribute if local is true
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    escapeTitle:      false,    // whether to html escape the title attribute
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs
    
    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // short-circuit function to run just before clueTip is shown. 
    onActivate:       function(e) {return true;},
    // function to run just after clueTip is shown. 
    onShow:           function(ct, ci){},
    // function to run just after clueTip is hidden.
    onHide:           function(ct, ci){},
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend, 
    // will be queued first within the default callbacks. 
    // The only exception is error, which overrides the default
    ajaxSettings: {
                      // error: function(ct, ci) { /* override default error callback */ }
                      // beforeSend: function(ct, ci) { /* called first within default beforeSend callback }
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';

  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);

// namespace registering and doc at the same time :)
if (typeof dmc != 'object')
	dmc = {}

if (typeof dmc.Utils != 'object')
	dmc.Utils = {}

if (typeof dmc.Utils.Console != 'object')
	dmc.Utils.Console = {}

if (typeof dmc.WALZ != 'object')
	dmc.WALZ = {}

if (typeof dmc.WALZ.Search != 'object')
	dmc.WALZ.Search = {}

if (typeof dmc.WALZ.Product != 'object')
	dmc.WALZ.Product = {}

if (typeof dmc.WALZ.ProductList != 'object')
	dmc.WALZ.ProductList = {}


dmc.WALZ.Search = {
	SelectedFilters : [],
	Instance : null,
	FilterUrl : ""
};


/*
 *
 * dmc Utils
 * @author zwargdan
 */
var Utils = {
	/*
	 * Method ParsePopupParams
	 * parse the "Popup display parameters" maintained in the Backend to an object for reusing with fancybox
	 * PARAMS: parameters e.g. "width=500,height=500," ...
	 * RETURN: [object] Width[int], Height[int], Scrolling[bool]
	 */
	ParsePopupParams : function(parameters) {
		var paramObj = {
			Width:800,
			Height:500,
			Scrolling:true
		}

		var paramsList = parameters.split(',');

		for(i = 0; i < paramsList.length; i++) {
			var keyValue = paramsList[i].split('=');
			switch(keyValue[0]) {
				case 'width': {
					paramObj.Width = parseInt(keyValue[1]);
					break;
				}
				case 'height': {
					paramObj.Height = parseInt(keyValue[1]);
					break;
				}
				case 'scrollbars': {
					paramObj.Scrolling = ((keyValue[1] == '0' || keyValue[1] == 'no') ? false : true);
					break;
				}
			}
		}

		return paramObj;
	},

	/*
	 * Method InputHint
	 * set for each input-field with a data-hint property a default value
	 * PARAMS: null
	 * RETURN: null
	 */
	InputHint : function() {
        $('input[data-hint], textarea[data-hint]').each(function(_, element) {
			var caption = $(element).attr("data-hint");
			$(element).addClass('datahint');

            $(element).focus(function() {

                if($(element).val() == caption) {
					$(element).val('');
                }
                if($(element).get(0).tagName == 'textarea' && $(element).text() == caption) {
                    $(element).text('');
				}
                $(element).removeClass('datahint');
			});

			$(element).blur(function() {
				if($(element).val() == '') {
					$(element).val(caption);
                    $(element).addClass('datahint');
                }
				if($(element).get(0).tagName == 'textarea' && $(element).text() == '') {
					$(element).text(caption);
                    $(element).addClass('datahint');
				}
			});

			if($(element).val() == '') {
				$(element).val(caption);
                $(element).addClass('datahint');
			}
			if($(element).get(0).tagName == 'textarea' && $(element).text() == '') {
				$(element).text(caption);
                $(element).addClass('datahint');
			}

            if($(element).val() != caption && $(element).val() != '') {
                $(element).removeClass('datahint');
            }
            if($(element).get(0).tagName == 'textarea' && $(element).text() != caption) {
                $(element).removeClass('datahint');
            }
		});

		$('form').bind('submit', function() {
			$('input[data-hint], textarea[data-hint]').each(function(_, element) {
				var caption = $(element).attr("data-hint");
				if($(element).val() == caption) {
					$(element).val('');
				}
				if($(element).get(0).tagName == 'textarea' && $(element).text() == caption) {
					$(element).text('');
				}
			});
		});
	},

	/*
	 * Method GetWindowHeight
	 * get the total height of the viewport
	 * PARAMS: null
	 * RETURN: Number
	 */
	GetWindowHeight : function () {
		if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            return window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            return document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientHeight ) ) {
            //IE 4 compatible
            return document.body.clientHeight;
        }
		return 0;
	},

	/*
	 * Method GetWindowScrollY
	 * get the y Value of vertical scrolling
	 * PARAMS: null
	 * RETURN: Number
	 */
	GetWindowScrollY : function() {
		var scrollY = 0;
		if( document.documentElement && document.documentElement.scrollTop ) {
			scrollY = document.documentElement.scrollTop;
		}
		else if( document.body && document.body.scrollTop ) {
			scrollY = document.body.scrollTop;
		}
		else if( window.pageYOffset ) {
			scrollY = window.pageYOffset;
		}
		else if( window.scrollY ) {
			scrollY = window.scrollY;
		}
		return scrollY;
	},

	/*
	 * Method ToggleFooterByScrollTop
	 * switches the position regarding to the current scrollTop
	 * PARAMS: null
	 * RETURN: null
	 */
	ToggleContainerPositionScrollTop : function () {
		// whether that's below the form
		if(typeof $('.navContainer').get(0) != undefined && $('#jsLazyloadanchors').css('display') == 'block') {
			// we need to proove if offset is available, since it throws erros if not:
			var thresholdTop = $('.navContainer').offset() ?
				($('.navContainer').height() + $('.navContainer').offset().top + $('#jsLazyloadanchors').height() + 10) :
				$('.navContainer').height() + $('#jsLazyloadanchors').height() + 10;
			var thresholdBottom = ($('body').height() - $('#scrollHide').height() - $('#footerGfx').height() - $('#footerHead').height());

			if ( ($(document).scrollTop() + Utils.GetWindowHeight()) <= thresholdBottom &&
				 ($(document).scrollTop() + Utils.GetWindowHeight()) >= thresholdTop ) {
				// if so, ad the fixed class
				$('#jsLazyloadanchors').addClass('fixed');
			} else {
				// otherwise remove it
				$('#jsLazyloadanchors').removeClass('fixed');
			}
		}
	},

	/*
	 * Method AppendFlyout
	 * puts the HTML into the related Menuitem
	 * PARAMS: html Snippet [string]
	 * RETURN: null
	 */
	AppendFlyout : function (html) {
		var naviContainer = $(document.createElement('div'));
		naviContainer.append($(html));




		$('.groupNavi ul li').each(function(i, element) {
			$(element).find('div').append(naviContainer.find('#navLayerContainer' + i.toString()));

            // set width of navi Item (mapped as "itemprop" in TV)
            var navItemWidth = $('#navLayerContainer' + i.toString()).attr('itemprop');
            $(element).find('> a').css('width',navItemWidth+'px');

			var inner = 0;
			$(element).hover(
				function() {
					inner = 0;
					setTimeout(function() {
						if(inner == 0) {
							$('#navLayerContainer' + i.toString()).parent().css('display', 'block');
                            $(element).addClass('hover');
							inner = 1;
						}
					}, 300);
				},
				function() {
					$('#navLayerContainer' + i.toString()).parent().css('display', 'none');
                    $(element).removeClass('hover');
					inner = -1;
				}
			);

			$('#navLayerContainer' + i.toString()).hover(function() {
				$('#navLayerContainer' + i.toString()).parent().css('display', 'block');
				inner = 1;
			},
			function() {
				$('#navLayerContainer' + i.toString()).parent().css('display', 'none');
				inner = -1;
			});
		});
	},

	/*
	 * Method CheckFrameContent
	 * Start a "Thread" to check the Contentn of an IFrame
	 * PARAMS: Iframe [object], callback [function]
	 * RETURN: null
	 */
	AppendCompareGroupFlyout : function (html) {
		var naviContainer = $('.navigation > ul li:eq(2)');
		naviContainer.after($(html));

		naviContainer.hover(
			function() {
				inner = 0;
				setTimeout(function() {
					if(inner == 0) {
						naviContainer.show();
						inner = 1;
					}
				}, 300);
			},
			function() {
				//naviContainer.hide();
				inner = -1;
			}
		);

		naviContainer.hover(function() {
				$(this).show();
				inner = 1;
			},
			function() {
				//$(this).hide();
				inner = -1;
			});


	},

	/*
	 * Method CheckFrameContent
	 * Start a "Thread" to check the Contentn of an IFrame
	 * PARAMS: Iframe [object], callback [function]
	 * RETURN: null
	 */
	CheckFrameContent : function (object, callback) {
		if($(object).contents().find('div').get(0) != null) {
			if(callback)
				callback();
		}
		else {
			setTimeout(function() {
				Utils.CheckFrameContent(object, callback);
			}, 500);
		}
	},

	/*
	 * Method CheckPersonalChars
	 * Checks all valid characters for personalization products
	 * PARAMS: string [String]
	 * RETURN: Boolean
	 */
	 checkPersonalChars : function(string){
		var returnValue = true;

		//pattern with not valid characters
		strPattern = /[^\x20-\xFF]/;

		// check if the pattern matches
		if(string.search(strPattern) != -1) {
			// the text includes not valid characters
			returnValue = false;
		}

		return returnValue;
	 },

	/*
	 * Method fCut stands for fancyCut:
	 * Cut a string by a given number of words and add '...' at the end-
	 * PARAMS: stringData [String], Number of words [int]
	 * RETURN: cutted string
	 */
	fCut : function(stringData, words){
		if(typeof stringData != 'undefined'){
			return (stringData.split(' ', words).join(' ') + '...');
		}else{
			return '';
		}
	},

	/*
	 * Method ApplyFancyBoxAnchors
	 * set the right anchor pos for all a tags
	 * PARAMS: null
	 * RETURN: null
	 */
	FormatAnchors : function() {
		//remove empty anchors
		$('a[onclick*="openWindow"], a[onclick*="alertLayer"]').each(function(i, element) {
			$(element).attr('href', 'javascript:void(0);');
		});

		$('a[href*="window.print()"]').removeAttr('target');
	},

	/*
	 * Method GetParam
	 * gets the params in the location
	 * PARAMS: s (param name)
	 * RETURN: param value
	 */
	GetParam : function(s) {
		var qs = document.location.search;
		qs = qs.split("+").join(" ");
		var param;
		var tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(qs)) {
			if(tokens[1] == s){
				param = decodeURIComponent(tokens[2]);
			}
		}
		return param;
	},

	/*
	 * Method FillEmptyCarouselItemsUpTo
	 * filling carousel list up to [count] empty items
	 * PARAMS: selector[String], count[int]
	 * RETURN: null
	 */
	FillEmptyCarouselItemsUpTo : function(selector, count) {
		var length = $(selector + ' li').length;
		if(length < count) {
			for(var i = 1; i <= count - length; i++) {
				var emptyCarouselItem = $(document.createElement('li'));
				emptyCarouselItem.addClass('empty');
				if(i == count - length)
					emptyCarouselItem.addClass('last');
				$(selector).append(emptyCarouselItem);
			}
		}
	},

	/*
	 * Method GetRandom
	 * creates a random number betwwen to given numbers
	 * PARAMS: min[int], max[int]
	 * RETURN: random number [int]
	 */
	GetRandom :  function(min, max){
		if( min > max ) {
			return( -1 );
		}
		if( min == max ) {
			return( min );
		}
		return( min + parseInt( Math.random() * ( max-min+1 ) ) )
	},

	// pass in the 'created_at' string returned from twitter
	// stamp arrives formatted as Tue Apr 07 22:52:51 +0000 2011
	parseTwitterDate : function (date){
		var tmp = date.split(' ');
		var days = {'Mon':'Montag','Tue':'Dienstag','Wed':'Mittwoch','Thu':'Donnerstag','Fri':'Freitag','Sat':'Samstag','Sun':'Sontag'};
		var months = {'Jan':'1','Feb':'2','Mar':'3','Apr':'4','May':'5','Jun':'6','Jul':'7','Aug':'8','Sep':'9','Oct':'10','Nov':'11','Dec':'12'};
		return days[tmp[0]]+', '+tmp[2]+'.'+months[tmp[1]]+'.'+tmp[5];
	},

	/*
	 * Method ClearCarouselContainer
	 * removes all jcarousel container before jcarousel begin to init
	 * PARAMS: selector[String]
	 * RETURN: null
	 */
	ClearCarouselContainer : function(selector) {
		//reset jcarousel
		var bkp = $(selector + ' ul');
		$(selector + ' .jcarousel-container').remove();
		$(selector + ' .jcarousel-clip').remove();
		$(selector + ' .jcarousel-item').remove();
		$(selector).append(bkp);
	},

	/*
	 * Method for ul-based Select boxes
	 * The function replaces a normal select-box with  a div-based select box
	 * Hint: this function only works with hrefs, for better refactoring,
	 *       proove if the old select ha an onchange event.
	 * PARAMS: id for DOM-el [string], special string for no-sort [string]
	 * RETURN: null
	 */
	FancySelect : function(wrapperId, noSort, noSortAlt) {
		// Checker whether this wrapper has already been initialized
		// so that there is no new fancyselect getting created
		if ($('#'+wrapperId).data('initialized') != true) {
			// define all needed DOM-elements:
			// container for the active select
			var mySelect = $('<div class="selectWrapper"></div>');
			mySelect.append('<div class="selectedButton"><a></a></div>');
			mySelect.append('<div class="selectedList" style="display:none"><ul></ul></div>');
			// the link to show the optionlist
			var mySelectLink = mySelect.find('.selectedButton > a');
			// the option list
			var myOptions = mySelect.find('.selectedList > ul');

			// define click functions to display/hide option list
			mySelectLink.click(function(){
				mySelect.find('.selectedList').animate({height: 'toggle'}, 200);
			});
			myOptions.hover(function(){}, function(){
				mySelectLink.trigger('click');
			});

			// insert the new dropdown after the old one:
			$('#'+wrapperId).after(mySelect);

			// Set this wrapper to "initialized" status
			// see IF condition above
			$('#'+wrapperId).data('initialized', true);

			// copy old options and write it in new div
			$('#'+wrapperId+' > option').each(function(){
				var that = this;
				// set selected option for link
				if($(this).attr('selected')){
					// special case for "none sort order", if not just take innerHTML from option tag
					mySelectLink.html( $(this).html() == noSort ? noSortAlt : $(this).html() );
				}
				// copy all options in list, class-attr. for special case "none sort order"
				var myClass = $(this).html() == noSort ? ' class="noSort"' : '';
				var myLi = $('<li '+myClass+'><a href="'+$(this).attr('value')+'">'+$(this).html()+'</a></li>');
				myLi.click(function(){
					mySelectLink.html( $(that).html() == noSort ? noSortAlt : $(that).html() );
					mySelectLink.trigger('click');
					mySelectLink.unbind('click');
				});
				myOptions.append(myLi);
			});
		}
	}
}
/*
 *
 * Accordion designed for Templavoila Contents
 * @author zwargdan
 */
var Accordion = {
	Init : function (selector) {
        var accElements = $(selector).children();
		$(selector).find('> div:first').addClass('first');
		$(selector).find('> div:last').addClass('last');

		accElements.each(function(i, element) {
			if(!$(element).hasClass('opened')) {
				$(element).addClass('closed');
			}
			else {
				var elementAccChildElements = $(element).find('> :not(:first)');
				$(elementAccChildElements).css('display', 'block');
			}

			var header = $(element).find('.csc-textpicHeader');
			if(header.get(0) != null) {
				$(element).find('.csc-textpicHeader').remove();
				var childElements = $(element).children();
				$(element).children().remove();
                $(element).append(header);
				$(element).append(childElements);
			}

			/*var toggleButton = $(document.createElement('a'));
            toggleButton.attr('href','javascript:void(0)');
			$(element).append(toggleButton);*/

			var allOtherAccChildElements = $(element).find('> :not(:first):not(:last)');
			if(!$(element).hasClass('opened')) {
				allOtherAccChildElements.css('display', 'none');
			}
		});
	},

	ApplyActiveItemByIndex : function(index, selector) {
		$(selector).find('> div').removeClass('opened').addClass('closed');
		$(selector).find('> div').eq(index - 1).removeClass('closed').addClass('opened');

		var allOtherAccChildElements = $(selector).find('> div').eq(index - 1).find(' :not(:first):not(:last)');
        allOtherAccChildElements.slideDown('slow');

	},

	AddEventListener : function(event, selector) {
		var accElements = $(selector).children();
		accElements.each(function(i, element) {
			$(element).find(':first, :last').bind(event, function() {
				var allOtherAccChildElements = $(element).find('> :not(:first):not(:last)');

				if($(element).hasClass('closed')) {
					$(element).removeClass('closed').addClass('opened');
					allOtherAccChildElements.slideDown('slow', function() { Utils.ToggleContainerPositionScrollTop(); });
				} else {
					$(element).removeClass('opened').addClass('closed');
					allOtherAccChildElements.slideUp('slow', function() { Utils.ToggleContainerPositionScrollTop(); });
				}
				return false;
			});
		});
	}
}
dmc.WALZ.Search = {
	SelectedFilters : [],
	Instance : null,
	FilterUrl : ""
};

/*
 *
 * Custom Checklist
 * @author zwargdan
 */
var Checklist = {
	Create : false,

	Init : function (selector, checked) {
		var sourceContainer;
		var nativeInput;

        var FF = $.browser; //check Firefox version

		if(Checklist.Create) {
			sourceContainer = $(selector);
		}
		else {
			sourceContainer = $(selector).parent();
			nativeInput = $(selector).parent().find('input');
			$(selector).parent().find('input').remove();
		}

		var itemContentTmp = $(sourceContainer).html();
		$(sourceContainer).html('');

		var container = $(document.createElement('div'));
		container.addClass('imageCheckbox');

		var newContent = $(document.createElement('span'));
		newContent.html(itemContentTmp);

		$(sourceContainer).append(container);
		$(sourceContainer).append(newContent);

		if(Checklist.Create) {
			var nativeInput = $(document.createElement('input'));
			nativeInput.attr('type', 'checkbox');
			$(container).append(nativeInput);
		}
		else {
			$(container).append(nativeInput);

		}

		var chkImg = $(document.createElement('img'));
		$(container).append(chkImg);

		if($(container).find('input').attr('checked') || checked) {
			$(chkImg).addClass('checked');


            var imgSrc = $(chkImg).css('background-image').replace('url(', '').replace(')', '');
            imgSrc = imgSrc.replace(/"/g, ''); // remove " in the background-image-url. Most Browsers need this

			$(chkImg).attr('src', imgSrc);
		}
		if(checked) {
			$(container).find('input').attr('checked', 'true');
		}

        var imgSrc = $(chkImg).css('background-image').replace('url(', '').replace(')', '');
        imgSrc = imgSrc.replace(/"/g, ''); // remove " in the background-image-url. Most Browsers need this


		chkImg.attr('src', imgSrc);
		chkImg.bind('click', function() {
			var input = $(this).prev();
			if(!$(this).hasClass('checked')) {
				$(this).addClass('checked');

                var imgSrc = $(this).css('background-image').replace('url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, ''); // remove " in the background-image-url. Most Browsers need this

				$(this).attr('src', imgSrc);

				input.attr('checked', 'true');
			}
			else {
				$(this).removeClass('checked');

                var imgSrc = $(this).css('background-image').replace('url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, ''); // remove " in the background-image-url. Most Browsers need this

				$(this).attr('src', imgSrc);

				input.removeAttr('checked');
			}
		});
	},

	BindResetLink : function (selector) {
		$(selector).bind('click', function() {
			$('.checked').each(function(i, element) {
				var input = $(this).prev();
				input.removeAttr('checked');

				$(element).removeClass('checked');

                var imgSrc = $(this).css('background-image').replace('url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, ''); // remove " in the background-image-url. Most Browsers need this

				$(this).attr('src', imgSrc);
			});
			return false;
		});
	},

	SetState : function (selector) {
		var tmpArr = new Array();
		$(selector).each(function(_, element) {
			var checked = $(element).find('input').attr('checked');
			tmpArr.push(checked ? true : false);
		});

		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data) {
				data.checkListState = tmpArr;

				cookieDataUpdated = JSON.stringify(data);
				cookie_set('mb3pc',cookieDataUpdated,'','/');
			}
		}
	},

	GetState : function (selector) {

	},

	ResetState : function (selector) {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data && data.checkListState) {
				data.checkListState = null;

				cookieDataUpdated = JSON.stringify(data);
				cookie_set('mb3pc',cookieDataUpdated,'','/');
			}
		}
	}
}

dmc.WALZ.ProductList = {
	_this : null,

	Init : function() {
		_this = this;

		_this.SetFlexHeight();
		//###LZYLD If lzyld cookie is set then load it and jump to pos
		_this._getLzyLdState();

		//###LZYLD
		$('.jsShowAll').unbind('click');
		$('.jsShowAll').click(function() {
			dmc.WALZ.ProductList.InitLazyload();
		});
		//###LZYLD remove
		$('.jsShowNProductsperPage').unbind('click');
		$('.jsShowNProductsperPage').click(function() {
			dmc.WALZ.ProductList.UnloadLazyload();
		});

		$('#refineNav .refineGroup').each(function(groupIndex, item) {
			var totalCount = $(item).find('.refineGroupItems input[type=checkbox]').length;
			if(totalCount < 9) {
				var list = $(item).find('.refineGroupItems');
				list.css('height', 'auto');
				list.css('overflow-y', 'visible');
			}
		});
	},

	InitLazyload : function() {
		//###LZYLD If show all then store pos on click
		dmc.WALZ.ProductList._addLzyLdClickEvent();
		Lazyload.OnPageComplete = function() {
			prodListflexHeight();
			dmc.WALZ.ProductList._addLzyLdClickEvent();
		}
		Lazyload.AddScrollEvent('.jsonData');
		Lazyload.AppendScrollAnchors('#jsLazyloadanchors', '.contentContainer');
		Lazyload.Active = true;

		$('.jsShowNProductsperPage').css('display', 'block');
		$('.jsPageNumbers').css('display', 'none');
		$('.jsShowAll').css('display', 'none');
	},

	UnloadLazyload : function() {
		dmc.WALZ.ProductList._removeLzyLdState();
		delete Lazyload.OnPageComplete;
		Lazyload.RemoveScrollEvent();

		// Remove all product rows but do not delete econda cross sell
		$(".prodLine", Lazyload.Json.listContainer).each(function(){
			$(this).remove();
		});

		$('.jsShowNProductsperPage').css('display', 'none');
		$('.jsPageNumbers').css('display', 'inline');
		$('.jsShowAll').css('display', 'inline');

		Lazyload.CurrentPage = 0;
		Lazyload.Complete = false;
		Lazyload.Busy = false;
		Lazyload.Paging(false);
		Lazyload.Active = false;
	},

	_addLzyLdClickEvent : function() {
		$('.prodListItem a').click(function() {
			dmc.WALZ.ProductList._setLzyLdState();
		});
	},

	_setLzyLdState : function() {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data) {
				//save last visited product pos
				data.lazyloadState = {
					scrollY: Utils.GetWindowScrollY(),
					currentPage: Lazyload.CurrentPage
				};

				cookieDataUpdated = JSON.stringify(data);
				cookie_set('mb3pc',cookieDataUpdated,'','/');
			}
		}
	},

	_getLzyLdState : function() {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data && data.lazyloadState && typeof $('.jsonData').get(0) != 'undefined' ) {
				dmc.WALZ.ProductList.InitLazyload();

				//from cache
				var lastPage = data.lazyloadState.currentPage;
				//get all cached pages from 1 to count - 1
				for(var i = 0; i < lastPage; i++) {
					Lazyload.OnPageComplete = function() {
						prodListflexHeight();
						dmc.WALZ.ProductList._addLzyLdClickEvent();
						//if all pages from cache loaded,
						//flush cache and ...
						if(Lazyload.CachedPages == lastPage)
							Lazyload.FlushCache = true;
					};

					Lazyload.OnLazyLoadFlushCache = function() {
						prodListflexHeight();
						dmc.WALZ.ProductList._addLzyLdClickEvent();
						//... scroll to last visited product
						window.scrollTo(0, data.lazyloadState.scrollY);
					};

					Lazyload.Paging(true);
				}

				dmc.WALZ.ProductList._removeLzyLdState();
			}
		}
	},

	_removeLzyLdState : function() {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data && data.lazyloadState) {
				data.lazyloadState = null;
			}
			cookieDataUpdated = JSON.stringify(data);
			cookie_set('mb3pc',cookieDataUpdated,'','/');
		}
	},

	SetListView : function(viewtype) {
		//dmc.Utils.Console.Log('dmc.WALZ.ProductList.SetListView [' + arguments[0].toString() + ']');

		if (viewtype == 'lines') {
			$('#listcontainer').addClass('listView');
			$('#tilelist').attr('src','/cache/www.walzkidzz.de/img/fileadmin_templates_BABY_baby_global_img_icons_view_1.gif');
			$('#tilelist').addClass('cursor');
			$('#linelist').attr('src','/cache/www.walzkidzz.de/img/fileadmin_templates_BABY_baby_global_img_icons_view_2_active.gif');
			$('#linelist').removeClass('cursor');
			$.cookie('listview', 'lines', { path: '/' });
		} else {
			$('#listcontainer').removeClass('listView');
			$('#tilelist').attr('src','/cache/www.walzkidzz.de/img/fileadmin_templates_BABY_baby_global_img_icons_view_1_active.gif');
			$('#tilelist').removeClass('cursor');
			$('#linelist').attr('src','/cache/www.walzkidzz.de/img/fileadmin_templates_BABY_baby_global_img_icons_view_2.gif');
			$('#linelist').addClass('cursor');
			$.cookie('listview', 'tiles', { path: '/' });
		}
	},

	SetFlexHeight : function() {
        // get height of each row
        var rowHeights = [];
        $(".prodLine").each(function(){ // (we do this in an own each-loop due to a bug in IE7!)
            var tmpHeight  = 0;
            $(this).find(".prodName").each(function(){
                tmpHeight = $(this).height() > tmpHeight ? $(this).height() : tmpHeight;
            });
            rowHeights.push(tmpHeight);
        });

        // set height and price of each row
        $(".prodLine").each(function(i,el){
            // set max height:
            if(rowHeights[i] > 16){
               $(el).find('.productOverviewContainer').each(function(){
                    $(this).find('.prodListInfo').css('padding-bottom','131px');

                    $(this).find('.prodName').css('height','32px');
               });
            };
            // get large Price
            if ($(el).find('.prodListInfo').hasClass('largePrice')){
                $(el).addClass('largePriceContainer');
                if(rowHeights[i] > 16){
                    $(el).find('.prodListInfo').css('padding-bottom','146px');
                }
            };
        });
	},

	/* functionality that serves for the colorbox images on the product overview page */
	triggerColorBoxImages: function() {
		var timeout;

		// Clicking a colorbox leads to (1) changing the product's image, (2) updating the product link and (3)
		// changing the colorboxes' classes
		$('.prodListItem a.colorBox').unbind('click');
		$('.prodListItem a.colorBox').click(function() {
			var data = $(this).attr('rel').split('|'); // from rel: PRODUCT_PK [0]|ARTICLENUMBER [1]|URL_detail [2]|COLOUR [3]
			dmc.WALZ.ProductList.switchColorBoxImage(data[0], data[1]);
		});

		// When hovering a colorbox, it should receive the "active" border
		$('.prodListItem a.colorBox').unbind('mouseenter');
		$('.prodListItem a.colorBox').mouseenter(function() {
			window.clearTimeout(timeout);

			$(this).siblings('a.colorBox').removeClass('border');
			$(this).addClass('border');
		});

		// When leaving the colorbox, reset the colorboxes after a pre-defined
		// timeout
		$('.prodListItem a.colorBox').unbind('mouseleave');
		$('.prodListItem a.colorBox').mouseleave(function() {
			var obj = $(this);
			timeout = window.setTimeout(function() {
				obj.parent().children('a.colorBox').removeClass('border');
				obj.parent().children('a.colorBox.active').addClass('border');
			}, 300)
		});
	},

	/* Look for colorFilter variable and change all color boxes of the current page */
	changeColorBoxImages: function() {
		var switchedProducts = new Array();

		if (dmc.WALZ.ProductList.colorFilter != '' && dmc.WALZ.ProductList.colorFilter != null) {
			colors = dmc.WALZ.ProductList.colorFilter.split("|"); // colorFilter may have more than one colour, divided by |
			colors.reverse(); // The last chosen color should be the one that is activated on the productlist

			for (i=0; i<colors.length; i++) {
				color = colors[i];

				if (typeof(productConf['colourMapping'][color]) != 'undefined') {
					for (productPkArticleNumber in productConf['colourMapping'][color]) {
						data = productPkArticleNumber.split('|');
						if (typeof(switchedProducts[data[0]]) == "undefined") {
							dmc.WALZ.ProductList.switchColorBoxImage(data[0], data[1]);
							switchedProducts[data[0]] = true;
						}
					}
				}
			}

		}
	},

	/* Switch the image for a specific product */
	switchColorBoxImage: function(productPk, articleNumber) {
		var imgClass		= productPk + 'MainImage';
		var oldContainer	= $('.prodListItem .' + imgClass);
		var imageURL		= '';

		if (typeof(productConf[productPk]['images'][articleNumber]) == "undefined" ||
				typeof(productConf[productPk]['images'][articleNumber][0]) == "undefined") {
			imageURL = productConf[productPk]['images']['default'];
		} else {
			imageURL = productConf[productPk]['images'][articleNumber][0];
		}

		// IE has problems with jquery's load event, so no animation for it
		if (imageURL != oldContainer.attr('src')) {
			if(!$.browser.msie){
				$('.prodListItem a.colorBox').unbind('click'); // delete click event during animation

				// copy image container
				var newContainer = oldContainer.clone().css({'z-index' : '3'});
				newContainer.hide();
				newContainer.css('margin-top', '-' + oldContainer.height() + 'px');

				//animation
				newContainer.attr('src', imageURL).load(function(){
					oldContainer.after(newContainer);
					oldContainer.fadeOut(800, function(){
						oldContainer.remove();
						newContainer.css('margin-top', '0px');
						newContainer.css('z-index','1');
					});
					newContainer.fadeIn(800,function(){
						dmc.WALZ.ProductList.triggerColorBoxImages(); // animation finished, add click event again
					});
				});
			} else {
				oldContainer.attr('src', imageURL);
			}
		}

		// Change active colorbox
		$('.prodListItem .' + imgClass).parents('.prodListItem').find('a.colorBox').each(function() {
			var data = $(this).attr('rel').split('|'); // from rel: PRODUCT_PK [0]|ARTICLENUMBER [1]|URL_detail [2]|COLOUR [3]
			if (data[1] == articleNumber) {
				$(this).siblings('a.colorBox').removeClass('active').removeClass('border');
				$(this).addClass('active').addClass('border');

				// Change product detail page link
				$('.prodListItem .' + imgClass).parents('.prodListItem').find('a.productDetailURL').attr('href', data[2]);
			}
		});
	}
}


// Cookie functionality for Belgium, France, the Netherlands and Poland
dmc.Utils.cookieHeader = {
	numMaxVisible: {
		'default': 1
	},
	bgColorClasses: {
		'304': 'c304',
		'311': 'c311'
	},

    main: function(hint, hintLinktext, pageId, agreement, pathImg, hintLinkRight, linkedString) {
		var cookieBar = this.getCookie('hideCB');
		var num = '#';

		if (cookieBar == null || cookieBar != 'hide') {
			this.setVisible(hint, hintLinktext, pageId, agreement, pathImg, hintLinkRight, linkedString);

			if (cookieBar != null && cookieBar.indexOf('show-') == 0) {
				num = cookieBar.substr(cookieBar.lastIndexOf('-') + 1);
			}

			if (isNaN(num)) {
				var numMaxVisibleLoc = (this.numMaxVisible[window.config.clientPk] ? this.numMaxVisible[window.config.clientPk] : this.numMaxVisible['default']);
				this.setCookieView('show' + (numMaxVisibleLoc != '' ? '-' + numMaxVisibleLoc : ''));
			} else if (num == 1) {
				this.setCookieView('hide');
			} else {
				this.setCookieView('show-' + (num - 1));
			}
		}
	},

	getCookie: function(xName) {
		var nameEQ = xName + "=";
		var ca = document.cookie.split(';');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}

			if (c.indexOf(nameEQ) == 0) {
				return(unescape(c.substring(nameEQ.length, c.length)));
			}
		}
		return null;
	},

    setCookieView: function(view) {
		$.cookie('hideCB', view, {path: '/'});
	},

    setVisible: function(hint, hintLinktext, pageId, agreement, pathImg, hintLinkRight, linkedString) {

		if(typeof linkedString != "undefined" && linkedString != "")
		{
			hint = hint.replace(linkedString,'<a href="' + pageId + '">' + linkedString + '</a>');
		}

        $('#chmain').append(
			'<p class="left">' + hint +
			(hintLinkRight != true ?
				' &nbsp;<a href="' + pageId + '">' + hintLinktext + '</a>' :
				''
			) +
			'</p>'
		);
        $('#chmain').append(
			'<p class="right">' +
			(agreement != "" ?
				'<a href="javascript: void(0);">' + agreement + '</a> &nbsp;' :
				''
			) +
			(hintLinkRight == true ?
				'<a href="' + pageId + '">' + hintLinktext + '</a> ' :
				''
			) +
			'<a href="javascript: void(0);"><img id="close" src="' + pathImg + '" /></a></p>'
		);
		if (this.bgColorClasses[window.config.clientPk]) {
			$('#cookieheader').addClass(this.bgColorClasses[window.config.clientPk]);
		}
        $('#cookieheader').css('display', 'block');

		$('#chmain p.right a').click(function() {
			$(this).parent().parent().parent().slideUp(500, function() {
				dmc.Utils.cookieHeader.setCookieView('hide');
			});
		});
    }
};


//@Todo obsolete
function setListview(viewtype){
	dmc.WALZ.ProductList.SetListView(viewtype);
}

function prodListflexHeight() {
	dmc.WALZ.ProductList.SetFlexHeight();
}

/**
* Functions to regain the focus after a click on the add to basket button in IE
* startFocusTimer ist called by the onload event of the popup. It starts the function "regainFocusRecursive",
* that sets the focus to the popup every 100 millisconds.
* After seven seconds the recursive iteration is stopped.
*/
function startFocusTimer(){
	regainFocusRecursive();
	setTimeout('stopFocusTimer()', 5000);
}

function regainFocusRecursive(){
	self.focus();
	popupFocus = setTimeout('regainFocusRecursive()', 100);
}

function stopFocusTimer(){
	window.onblur = '';
	window.clearTimeout(popupFocus);
}

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);
  // focusses the next lottery input field  
function lottery_nextField(e, source, nextNumber) {
 	if (!e) var e = window.event;
 	// no controlchars
 			//console.log(e);
 	if (e.keyCode > 32)
 	{	
 		if(document.getElementById('lottery_solution_' + nextNumber)){
 			// fixes firefox bug 
 			document.getElementById('lottery_solution_' + nextNumber).setAttribute('autocomplete','off');
 			//focus the next field
 			document.getElementById('lottery_solution_' + nextNumber).focus();
 		}
 	}
} //function

// focusses the previous lottery input field 
function lottery_previousField(e, source, nextNumber){
	if (!e) var e = window.event;
	// fixes firefox bug 
 	document.getElementById('lottery_solution_' + (nextNumber-1)).setAttribute('autocomplete','off');
	// if the user presses backspace
	if(e.keyCode == 8 && source.value== ''){
	 		if((nextNumber-2) >= 0){
		 		//focus the last field
		 		document.getElementById('lottery_solution_' + (nextNumber-2)).focus();
		 		document.getElementById('lottery_solution_' + (nextNumber-2)).value="";
			}
	 	}
}
//cheks if the user tries to input a space character and blocks it
function lottery_checkSpace(e){
	if (!e) var e = window.event;
	if (e.charCode == 32){
		return false;
	}
	return true;
}

// *********************************************************************************
// Preliminary functionality to prepare required objects and variables
// *********************************************************************************
if (typeof dmc != 'object')
	dmc = {};

if (typeof dmc.WALZ != 'object')
	dmc.WALZ = {};

if (typeof dmc.WALZ.Product != 'object')
	dmc.WALZ.Product = {};

// *********************************************************************************
// Main class dmc.Product for dmc_mb3_product elements
// *********************************************************************************
dmc.Product = (function() {
	// Constructor including variables for the instances only
    function Product(config) {

    	this.lastCampainArtnumber 	= '';
    	this.confClientPk			= '';
    	this.confClientName 		= '';
    	this.confLanguagePk 		= '';
    	this.confIsoCode2 			= '';

		// Required base information for each product object instance
		this.selfUID = config.selfUID;
		this.parentContainer = config.parentContainer;

		// set block element (parentContainer) that contains all product detail elements
        // default is #productDetail, can be set by parameter for different views, e.g. print
        if(!config.parentContainer){
			this.parentContainer = 'productDetail';
        }
		this.parentContainerObj = document.getElementById(this.parentContainer);

		// Configuration variables
		this.relTypeComponent = 1; // 2^0
		this.relTypeComponentSpecify = 4294967296; // 2^32

		// id of block element that contains the fully designed variant select field + label
		this.selectFieldTemplateContainer = 'selectFieldTemplateContainer';

		// Custom event that will be triggered if article has been changed on
		// product content element.
		this.onArticleChanged = new dmc.Utils.CustomEvent();

		// Class variables for parts of product data for better readability
		this.dataProduct = {};
		this.dataArticles = {};
		this.dataComponents = {};
		this.dataMedia = {};
		this.dataCrossselling = {};

		this.components = [];
		this.components[this.relTypeComponent] = [];
		this.components[this.relTypeComponentSpecify] = [];

		// Mapping from Article number + size to component
		this.componentArticleMapping = [];
		this.componentArticleMapping[this.relTypeComponent] = [];
		this.componentArticleMapping[this.relTypeComponentSpecify] = [];

		// Mapping from Component to Article number + size
		this.articleComponentMapping  = [];
		this.articleComponentMapping[this.relTypeComponent] = [];
		this.articleComponentMapping[this.relTypeComponentSpecify] = [];
		this.specifyingComponentComponentMapping = [];
		this.specifyingComponentCount = 0;
		this.specifyingComponentList = [];

		this.selectFields = [];
		this.selectFieldClass = 'productComponent_' + this.selfUID;


		this.fieldArticleOrderNumber = 'productArticleOrderNumber_' + this.selfUID;
		this.fieldProductPrice = 'productPrice_' + this.selfUID;
		this.fieldAvailabilityLink = 'productAvailLink_' + this.selfUID;
		this.fieldAvailability = 'productAvail_' + this.selfUID;
		this.fieldCopytext = 'productCopytext_' + this.selfUID;
		this.fieldWarning = 'productWarning_' + this.selfUID;
		this.fieldSeals = 'productSeals_' + this.selfUID;
		this.fieldBulkyFeeNotice = 'productBulkyFeeNotice';
		this.fieldDeliveryServiceIcon = 'deliveryServiceIcon';
		this.fieldProductAmountForm = 'productAmountForm_' + this.selfUID;
		this.fieldProductBasketPk = 'productBasketPk_' + this.selfUID;
		this.fieldProductBasketProductPk = 'productBasketProductPk_' + this.selfUID;
		this.divProductComponentList = 'productComponentList';

		this.fieldGravureInput = 'productGravureInput_' + this.selfUID;
		this.fieldGravureText = 'productGravureText_' + this.selfUID;
		this.fieldGravureMessageBefore = 'productGravureMessageBefore_' + this.selfUID;
		this.fieldGravureMessageAfter = 'productGravureMessageAfter_' + this.selfUID;
		this.gravureForm = 'productGravureForm_' + this.selfUID;
		this.gravureContainer = 'gravureContainer_' + this.selfUID;
		this.productGravureAbstractContent = 'productGravureAbstractContent';
		this.productGravureHint = 'productGravureHint';
		this.productYardwareNotice = 'productYardwareNotice';

		this.crosssellingTargetContainer = 'crosssellingTargetContainer';
		this.crosssellingContainer = 'crosssellings';
		this.productCrossSellingNotice = 'productCrossSellingNotice';

		this.divProductManufacturerImages = 'prodLogos';
		this.divProductManufacturer2Images = 'prodSubLogos';
		this.divProductCareInfoImages = 'careInfo';

		this.basketButtonClass = '.buBasket';
		this.productForm = 'productForm_' + this.selfUID;


		this.configStockTypeCSSPrefix = 'stock_';

		this.mediaRelTypeLarge = 560;
		this.mediaRelTypeThumb2 = 554;
		this.mediaRelTypeCareInfo = 506;
		this.mediaRelTypeTestInfo = 508;
		this.mediaRelTypeOther = 509;
		this.mediaRelTypeManufacturer = 507;
		this.mediaRelTypeManufacturer2 = 577;
		this.mainImage = 'dmc_mb3_product_pi1' + this.selfUID + 'MainImage';
		this.thumbImageList = 'dmc_mb3_product_pi1' + this.selfUID + 'ImageLinks';

		this.specifyingChosenComponents = [];

		this.addToBasketParams = {};
		this.chosenArtSize;

		this.debug = true;

		// Read config out of config object
		if (config) {
			for (var prop in config) {
				if(config.hasOwnProperty(prop)){
					this[prop] = config[prop];
				}
			}
		}
    }






	// Public functionality shared across all instances
	// base functions
	Product.prototype = {
		_instances: [],

		getInstance: function() {
			var key = this.selfUID.toString();

			if (typeof this._instances[key] == 'object') {
				return this._instances[key];
			} else {
				this._instances[key] = this;
				this._instances[key].selfUID = key;
				return this._instances[key];
			}
		},

		init: function() {
			var key = this.selfUID.toString();

			// Create new instance and initialize it
			if (this._instances[key] == null) {
				this._instances[key] = this;
				this._instances[key].selfUID = key;
			}

			this.inject();

			this.readProductData();
			this.processComponents();
			this.createSelectFields();

			var articleSpecificallyChosen = this.getOrdernumberArtsize();
			if (!articleSpecificallyChosen) {
				this.selectBestAvailableCheapestArticle();
			}

			this.change();

			this.refreshArticleByKQpriAnchorParam();
		},

		inject: function() {
			var _this = this;

			$(this.parentContainerObj).find(this.basketButtonClass).click(function() {
				$(this).parents('form').submit();
			});

			$(this.parentContainerObj).find('#' + this.productForm).submit(function(event) {
				_this.addToBasket(event, _this.selfUID);
			});
		},

		update: function() {
			// Reset the mapping data
			this.componentArticleMapping[this.relTypeComponent] = [];
			this.componentArticleMapping[this.relTypeComponentSpecify] = [];
			this.articleComponentMapping[this.relTypeComponent] = [];
			this.articleComponentMapping[this.relTypeComponentSpecify] = [];
			this.specifyingComponentComponentMapping = [];

			this.processComponents();

			this.createSelectFields();

			var articleSpecificallyChosen = this.getOrdernumberArtsize();
			if (!articleSpecificallyChosen) {
				this.selectBestAvailableCheapestArticle();
			}

			this.change();
		},

		change: function(sourceComponentPk) {
			this.getChosenComponents();
			this.refillSelectFields(sourceComponentPk);

			var currentArticle = this.getCurrentArticle();
			this.updatePage(currentArticle);

			this.onArticleChanged.trigger(this.selfUID, this, currentArticle);
			this.debugLog(currentArticle.artNumber + ' - ' + currentArticle.artSize);
		},






		// Processing data functions
		processComponents: function() {
			// Extract components of Products
			this.extractComponents(this.dataProduct);

			// Extract components of all Articles
			for (var artNumber in this.dataArticles) {
				if(this.dataArticles.hasOwnProperty(artNumber)){
					for (var artSize in this.dataArticles[artNumber]) {
						if(this.dataArticles[artNumber].hasOwnProperty(artSize)){
							this.extractComponents(this.dataArticles[artNumber][artSize], artNumber, artSize);
						}
					}
				}
			}

			this.createComponentComponentMapping();
		},

		// Extracts ordernumber and artsize out of the URL and chooses the right article for it
		getOrdernumberArtsize: function() {
			var returnValue = false;
			var ordersize = dmc.Utils.findQueryStringParam("ordersize");

			var artSize = '';
			if (typeof(ordersize) != "undefined" && ordersize != "") {
				artSize = ordersize;
			}

			var ordernumber = dmc.Utils.findQueryStringParam("ordernumber");

			if (typeof(ordernumber) != "undefined" &&
					ordernumber != "" &&
					typeof this.componentArticleMapping[this.relTypeComponentSpecify] != "undefined" &&
					this.componentArticleMapping[this.relTypeComponentSpecify][ ordernumber ] != "undefined"
				) {
				var artNumber = ordernumber;
				this.debugLog('Ordernumber: ' + artNumber + ', Size: ' + artSize);

				// If no artSize has been chosen select the cheapest / best available
				// article within this artNumber. If one is found, use that as returnValue
				// so that selectBestAvailableCheapestArticle won't get called without an
				// artNumber
				if (artSize == '') {
					this.debugLog('No artSize chosen, using selectBestAvailableCheapestArticle(' + artNumber + ')');
					returnValue = this.selectBestAvailableCheapestArticle(artNumber);
				} else {
					returnValue = this.setComponentsByArtNumber(artNumber, artSize);
					// If the article chosen by artNumber + artSize is not available
					// same as above, but search not within the current artNumber
					if (!returnValue) {
						this.debugLog('artNumber + artSize not available, using selectBestAvailableCheapestArticle()');
						returnValue = this.selectBestAvailableCheapestArticle();
					}
				}
			}

			return returnValue;
		},

		selectBestAvailableCheapestArticle: function(chosenArtNumber) {
			var returnValue = false;
			var availability = [];

			for (var artNumber in this.dataArticles) {
				if(this.dataArticles.hasOwnProperty(artNumber)){
					// If called with an artNumber, only look within those
					if ( typeof chosenArtNumber != 'undefined' &&
							(chosenArtNumber > 0 || chosenArtNumber != '') &&
							chosenArtNumber != artNumber) {
						continue;
					}

					// Take stockTypeCode and currentPricePlain, add them and use them
					// as natural sortkey
					for (var artSize in this.dataArticles[artNumber]) {
						if(this.dataArticles[artNumber].hasOwnProperty(artSize)){
							var stockTypeCode = this.dataArticles[artNumber][artSize].stockTypeCode;
							var currentPricePlainInt = this.dataArticles[artNumber][artSize].currentPricePlain * 100;

							if (stockTypeCode != 0) {
								var key = (stockTypeCode * 10000000)  + currentPricePlainInt;
								if (typeof availability[key] == "undefined") availability[key] = [];
								availability[key].push({'artNumber': artNumber, 'artSize': artSize});
							}
						}
					}
				}
			}

			// Only do the following if at least one article is available
			if (dmc.Utils.ArrayNotEmpty(availability) === true) {
				availability = dmc.Utils.sortNaturalKeyAssoc(availability);

				// Set that article and then stop
				for (var stockTypeCodeCurrentPricePlainInt in availability) {
					if(availability.hasOwnProperty(stockTypeCodeCurrentPricePlainInt)){
						var bestAvailableCheapestArticle = availability[stockTypeCodeCurrentPricePlainInt][0];
						this.setComponentsByArtNumber(bestAvailableCheapestArticle.artNumber, bestAvailableCheapestArticle.artSize);
						this.debugLog('Best available and cheapest article (' + stockTypeCodeCurrentPricePlainInt + '): ' + bestAvailableCheapestArticle.artNumber + ' ' + bestAvailableCheapestArticle.artSize);
						returnValue = true;
						break;
					}
				}
			}

			return returnValue;
		},

		setComponentsByArtNumber: function(artNumber, chosenArtSize) {
			var returnValue = false;

			// Check whether this article chosen by artNumber and artSize is available --
			// if not, do not set components but return false so that selectBestAvailableCheapestArticle
			// might find another available article within that artNumber
			if (typeof chosenArtSize != 'undefined'
				&& (chosenArtSize > 0 || chosenArtSize != '')
				&& (this.dataArticles[artNumber][chosenArtSize].stockTypeCode == 0)) {

				returnValue = false;

			} else {
				for (var artSize in this.componentArticleMapping[this.relTypeComponentSpecify][artNumber]) {
					if(this.componentArticleMapping[this.relTypeComponentSpecify][artNumber].hasOwnProperty(artSize)){
						// To choose the right size
						if ( typeof chosenArtSize != 'undefined' &&
								(chosenArtSize > 0 || chosenArtSize != '') &&
								chosenArtSize != artSize) {
							continue;
						}

						for (var componentPk in this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize]) {
							if(this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize].hasOwnProperty(componentPk)){
								for (var i in this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize][componentPk]) {
									if(this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize][componentPk].hasOwnProperty(i)){
										// Select the right component value within the select fields
										if ($(this.parentContainerObj).find('#component_' + componentPk).length > 0) {
											$(this.parentContainerObj).find('#component_' + componentPk + ' select').val(this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize][componentPk][i].relCode);
											this.getChosenComponents();
											this.refillSelectFields(componentPk);
										}

										break; // Only the first component is required
									}
								}
							}
						}

						returnValue = true;
						break; // Only the first size is required for choosing an article
					}
				}
			}

			return returnValue;
		},

		getCurrentArticle: function() {
			var relevantArticles = [];

			// If we have components, choose the article that has all the currently chosen components...
			var componentLength = 0;
			for (var componentPk in this.specifyingChosenComponents) {
				if(this.specifyingChosenComponents.hasOwnProperty(componentPk)){
					componentLength++;
					var relCode = this.specifyingChosenComponents[componentPk];

					if(this.articleComponentMapping[this.relTypeComponentSpecify].hasOwnProperty(componentPk)){
						for (var i in this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode]) {
							if(this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode].hasOwnProperty(i)){
								var artNumber = this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode][i].artNumber;
								var artSize = this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode][i].artSize;

								if (typeof relevantArticles[artNumber + '|' + artSize] == 'undefined') relevantArticles[artNumber + '|' + artSize] = 0;
								relevantArticles[artNumber + '|' + artSize]++;
							}
						}
					}else{
						componentLength--;
					}
				}
			}

			// ...otherwise use the first available article
			if (componentLength == 0) {
				outer: {
					for (var artNumber in this.dataArticles) {
						if(this.dataArticles.hasOwnProperty(artNumber)){
							for (var artSize in this.dataArticles[artNumber]) {
								if(this.dataArticles[artNumber].hasOwnProperty(artSize)){
									if (typeof relevantArticles[artNumber + '|' + artSize] == 'undefined') relevantArticles[artNumber + '|' + artSize] = 0;
									relevantArticles[artNumber + '|' + artSize]++;
									break outer;
								}
							}
						}
					}
				}
			}

			var sortedRelevantArticles = dmc.Utils.getSortedArrayByValue(relevantArticles, 'desc');

			for (var artNumberArtSize in sortedRelevantArticles) {
				if(sortedRelevantArticles.hasOwnProperty(artNumberArtSize)){
					var arrArtNumberArtSize = artNumberArtSize.split('|');
					var currentArticle = {	'artNumber': arrArtNumberArtSize[0],
											'artSize': arrArtNumberArtSize[1] };
					break;
				}
			}

			return currentArticle;
		},

		getCurrentArticlePk: function() {
			var currentArticle = this.getCurrentArticle();
			return this.dataArticles[ currentArticle.artNumber ][ currentArticle.artSize ].articlePk;
		},

		refillSelectFields: function(sourceComponentPk) {
			if (typeof sourceComponentPk == 'undefined') {
				for (var sourceComponentPk in this.specifyingChosenComponents) {
					break;
				}
			}

			this.fillSelectFieldsWithComponentData(sourceComponentPk);
			this.getChosenComponents();
		},

		updatePage: function(currentArticle) {
			var articleVO = this.dataArticles[currentArticle.artNumber][currentArticle.artSize];

			// Variant field
			this.setGravure(articleVO, currentArticle);

			// Base fields like Product text and its list components
			this.displayCopytext(articleVO, currentArticle);
			this.displayComponents(articleVO, currentArticle);
			this.displayArtNumber(articleVO, currentArticle);
			this.displayAvailability(articleVO, currentArticle);
			this.displayManufacturerImages(articleVO, currentArticle);
			this.displayCareInfoImages(articleVO, currentArticle);
			this.displayTestInfoOtherTuevImages(articleVO, currentArticle);
			this.displayYardWareNotice(articleVO, currentArticle);

			// Prices and fees
			this.displayPrice(articleVO, currentArticle);
			this.displayAdditionalFeeNotice(articleVO, currentArticle);
			this.displayDeliveryServiceIcon(articleVO, currentArticle);
			this.displayBulkyDeliveryNote(articleVO, currentArticle);
			this.displayNewIcon(articleVO, currentArticle);

			// Images
			this.displayImages(articleVO, currentArticle);

			// Crossselling
			this.displayCrossSelling(articleVO, currentArticle);
		},



        // check if anchor param is set. if set then update article with kqpri data and load article
		refreshArticleByKQpriAnchorParam: function()
		{
			var preSelectedArticle = null;
			var paramIdentifier = "KQpriArticle";

			var anchorString = window.location.href.split('#')[1];
			if(typeof anchorString != typeof undefined && anchorString.indexOf(paramIdentifier) == 0)
			{
				var resultArray	= anchorString.substr(paramIdentifier.length).split(";");

				var artNumber 	= resultArray[0];
				var artSize 	= !resultArray[2] ? "0" : resultArray[2];

				// KQpri update
				var kqpriConfList 					= new Array();
				kqpriConfList[artNumber] 			= new Array();
				kqpriConfList[artNumber][artSize] 	= new Array();
				kqpriConfList[artNumber][artSize]['stockTypeCode']		= resultArray[3];
				kqpriConfList[artNumber][artSize]['stockAmount'] 		= resultArray[4];
				kqpriConfList[artNumber][artSize]['weeksToDelivery'] 	= resultArray[5];
				this.doKqpriProductUpdate(kqpriConfList);

				// load param article
				preSelectedArticle = { artNumber: "" + artNumber + "", artSize: "" + artSize + "" };
				try
				{
					this.updatePage(preSelectedArticle);
				}
				catch(err)
				{
					this.debugLog("Anchor parameter for article was set 'artnumber(" + preSelectedArticle.artNumber + "), artSize(" + preSelectedArticle.artSize + ")' but could not be loaded.");
				}

				//
				// refresh component selection by param data
				//

				// parsing URL-Get-Parameters
				var urlParams = {}
				location.search.substr(1).split("&").forEach(function(item) {urlParams[item.split("=")[0]] = item.split("=")[1]});

				if(typeof urlParams['componentSelection'] != 'undefined')
				{
					var componentSelectionParam = decodeURI(urlParams['componentSelection']);

					// split param in pieces and refresh selections on component select fields
					var splitted = componentSelectionParam.split(";");
					splitted.forEach(function (item) {
						var rel = item.split("||")[0];
						var sel = item.split("||")[1];
						$("select.selectDetail[rel='" + rel + "']").val(sel);
						// trigger change event to refresh data in other select fields, depending on new selection
						$("select.selectDetail[rel='" + rel + "']").change();
					});
				}


			}
		},

		// Helper functions
		readProductData: function() {
			if (typeof componentConf != 'undefined' &&
					typeof componentConf[this.selfUID] != 'undefined') {

				this.dataProduct = componentConf[this.selfUID].product;
				this.dataArticles = componentConf[this.selfUID].articles;
				this.dataComponents = componentConf[this.selfUID].components;
				this.dataMedia = componentConf[this.selfUID].media;
				this.dataCrossselling = componentConf[this.selfUID].crossselling;

				for (var artNumber in this.dataArticles) {
					if(this.dataArticles.hasOwnProperty(artNumber)){
						for (var artSize in this.dataArticles[artNumber]) {
							if(this.dataArticles[artNumber].hasOwnProperty(artSize)){
								for (var sortKey in this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify]) {
									if(this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify].hasOwnProperty(sortKey)){
										var componentPk = this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify][sortKey].componentPk;

										// Gather components to create select fields
										if (typeof this.selectFields[componentPk] == 'undefined') {
											this.selectFields[componentPk] = [];
											this.specifyingComponentCount++;
										}

										if (typeof this.selectFields[componentPk][ this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify][sortKey].relCode ] == 'undefined') {
											this.selectFields[componentPk][ this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify][sortKey].relCode ] = this.dataArticles[artNumber][artSize].componentData[this.relTypeComponentSpecify][sortKey].relValue;
										}
									}
								}
							}
						}
					}
				}

				for(var componentPk in this.selectFields) {
					if(this.selectFields.hasOwnProperty(componentPk)){
						this.specifyingComponentList.push(componentPk);
					}
				}
			}
		},

		extractComponents: function(obj, artNumber, artSize) {
			var stockTypeCode	= 0;
			var selectable 		= 0;
			// Then it is a product, so use a default artNumber
			if (typeof artNumber == 'undefined') {
				artNumber = 0;
				artSize = 0;
			} else {
				stockTypeCode 	= this.dataArticles[artNumber][artSize].stockTypeCode;
				selectable 		= this.dataArticles[artNumber][artSize].selectable;
			}

			if ((typeof obj.componentData != 'undefined' && selectable == true) || artNumber == 0) {
				for (var componentType in obj.componentData) {
					if(obj.componentData.hasOwnProperty(componentType)){

						// Only check for components with these component rel types
						if (componentType != this.relTypeComponent &&
							componentType != this.relTypeComponentSpecify) {
							continue;
						}

						for (var sortKey in obj.componentData[componentType]) {
							if(obj.componentData[componentType].hasOwnProperty(sortKey)){
								var componentPk = obj.componentData[componentType][sortKey].componentPk;

								if (typeof this.components[componentType][componentPk] == 'undefined') this.components[componentType][componentPk] = [];

								this.components[componentType][componentPk][sortKey] = {
									'relCode': obj.componentData[componentType][sortKey].relCode,
									'relValue': obj.componentData[componentType][sortKey].relValue,
									'mediaPk': obj.componentData[componentType][sortKey].relMediaPk
								};

								// Create mapping component to article
								if (typeof this.articleComponentMapping[componentType][componentPk] == 'undefined') this.articleComponentMapping[componentType][componentPk] = [];
								if (typeof this.articleComponentMapping[componentType][componentPk][ obj.componentData[componentType][sortKey].relCode ] == 'undefined') this.articleComponentMapping[componentType][componentPk][ obj.componentData[componentType][sortKey].relCode ] = [];

								this.articleComponentMapping[componentType][componentPk][ obj.componentData[componentType][sortKey].relCode ].push({'artNumber': artNumber, 'artSize': artSize, 'sortKey': sortKey});

								// Create mapping article to component
								if (typeof this.componentArticleMapping[componentType][artNumber] == 'undefined') this.componentArticleMapping[componentType][artNumber] = [];
								if (typeof this.componentArticleMapping[componentType][artNumber][artSize] == 'undefined') this.componentArticleMapping[componentType][artNumber][artSize] = [];
								if (typeof this.componentArticleMapping[componentType][artNumber][artSize][componentPk] == 'undefined') this.componentArticleMapping[componentType][artNumber][artSize][componentPk] = [];

								this.componentArticleMapping[componentType][artNumber][artSize][componentPk].push({
									'relCode': obj.componentData[componentType][sortKey].relCode,
									'relValue': obj.componentData[componentType][sortKey].relValue,
									'mediaPk': obj.componentData[componentType][sortKey].relMediaPk,
									'sortKey': sortKey,
									'typeCodeList': this.dataComponents[componentPk].typeCodeList
								});
							}
						}
					}
				}
			}
		},

		createComponentComponentMapping: function() {
			var tempArr = [];

			for(var artNumber in this.componentArticleMapping[this.relTypeComponentSpecify]) {
				if(this.componentArticleMapping[this.relTypeComponentSpecify].hasOwnProperty(artNumber)){
					for (var artSize in this.componentArticleMapping[this.relTypeComponentSpecify][artNumber]) {
						if(this.componentArticleMapping[this.relTypeComponentSpecify][artNumber].hasOwnProperty(artSize)){
							var fieldsCreation = '', strCreation = '';
							var arrCreation = [], keys = [];

							for (var i = 0; i < this.specifyingComponentList.length; i++) {
								var currentComponentPk = this.specifyingComponentList[i];
								var currentRelCode = this.componentArticleMapping[this.relTypeComponentSpecify][artNumber][artSize][currentComponentPk][0].relCode;

								fieldsCreation = fieldsCreation + '["' + currentComponentPk + '|' + currentRelCode + '"]';
								strCreation = 'if (typeof this.specifyingComponentComponentMapping' + fieldsCreation + ' == "undefined") this.specifyingComponentComponentMapping' + fieldsCreation + ' = []';
								arrCreation.push(strCreation);

								keys.push('["' + currentComponentPk + '|' + currentRelCode + '"]');
							}

							var concatComponentList = arrCreation.join(';\n') + ';\n' + 'this.specifyingComponentComponentMapping' + keys.join('') + ' = true'+ ';\n';
							tempArr.push(concatComponentList);
						}
					}
				}
			}

			var jsCode = tempArr.join('');
			eval(jsCode);
		},

		createSelectFields: function() {
			var _this = this;
			var previousComponentPk = null;
			var loopArray = this.specifyingComponentComponentMapping;

			for (var i = 0; i < this.specifyingComponentCount; i++) {
				var createSelect = true;

				if (i > 0) {
					this.getChosenComponents();

					for (var chosenComponentPk in this.specifyingChosenComponents) {
						if(this.specifyingChosenComponents.hasOwnProperty(chosenComponentPk)){
							var chosenRelCode = this.specifyingChosenComponents[chosenComponentPk];

							if (typeof loopArray[chosenComponentPk + '|' + chosenRelCode] != 'undefined') {
								loopArray = loopArray[chosenComponentPk + '|' + chosenRelCode];
							}
						}
					}
				}

				// get sorted array by SORT_DOWN value
				var sortedLoopArray	= this.sortCurrentArticleSpecifyingComponents(loopArray);

				for (var m=0; m < sortedLoopArray.length; m++) {
					var componentPkRelCode = sortedLoopArray[m];
					var arrComponentPkRelCode = componentPkRelCode.split('|');
					var componentPk = arrComponentPkRelCode[0];
					var relCode = arrComponentPkRelCode[1];

					if (createSelect) {
						// Reset the select field if it already exists (in case of updating due to new KQpri data)
						if ($(this.parentContainerObj).find('#component_' + componentPk).length > 0) {
							$(this.parentContainerObj).find('#component_' + componentPk + ' select').html('');
							var template = $(this.parentContainerObj).find('#component_' + componentPk);

						} else {
							var template = $(this.parentContainerObj).find('#' + this.selectFieldTemplateContainer).clone();
							template.attr('id', 'component_' + componentPk);
							template.find('label').html(this.dataComponents[componentPk].name);
							template.find('select').
									attr('rel', componentPk).
									addClass(this.selectFieldClass).
									change(function() {
										_this.change($(this).attr('rel'));
									});

							// Size Guidance link
							if (typeof sizeGuidanceLink != 'undefined' &&
								typeof this.dataComponents[componentPk]['typeCodeList']['SIZE'] != 'undefined') {
								template.find('span').html(sizeGuidanceLink);
							}
						}
						createSelect = false;
					}

					template.find('select').append(
						$('<option></option>').val(relCode).html(this.selectFields[componentPk][relCode])
					);
				}

				if ($(this.parentContainerObj).find('#component_' + componentPk).length == 0) {
					if (previousComponentPk === null) {
						$(this.parentContainerObj).find('#' + this.selectFieldTemplateContainer).after(template);
					} else {
						$(this.parentContainerObj).find('#component_' + previousComponentPk).after(template);
					}
					previousComponentPk = componentPk;
				}
			}
		},

		fillSelectFieldsWithComponentData: function(sourceComponentPk) {

			if(typeof this.articleComponentMapping[this.relTypeComponentSpecify] !== 'undefined' &&
				!this.isEmpty(this.articleComponentMapping[this.relTypeComponentSpecify])){

				// Contains a multidimensional list of all components like 44 -> rosa, 44 -> gelb, 32 -> rosa and so on
				var loopArray = this.specifyingComponentComponentMapping;

				// Array of currently chosen components
				var alreadyChosenComponents = this.specifyingChosenComponents;

				for (var i = 0; i < this.specifyingComponentCount; i++) {
					var createSelect = true;

					if (i > 0) {
						this.getChosenComponents();

						for (var chosenComponentPk in this.specifyingChosenComponents) {
							if(this.specifyingChosenComponents.hasOwnProperty(chosenComponentPk)){
								var chosenRelCode = this.specifyingChosenComponents[chosenComponentPk];

								if (typeof loopArray[chosenComponentPk + '|' + chosenRelCode] != 'undefined') {
									loopArray = loopArray[chosenComponentPk + '|' + chosenRelCode];
									break;
								}
							}
						}
					}

					// get sorted array by SORT_DOWN value
					var sortedLoopArray	= this.sortCurrentArticleSpecifyingComponents(loopArray);

					for (var m=0; m < sortedLoopArray.length; m++) {
						var componentPkRelCode = sortedLoopArray[m];
						var arrComponentPkRelCode = componentPkRelCode.split('|');
						var componentPk = arrComponentPkRelCode[0];
						var relCode = arrComponentPkRelCode[1];

						if (createSelect) {
							var selectField = $(this.parentContainerObj).find('#component_' + componentPk + ' select');
							selectField.html('');

							createSelect = false;
						}

						selectField.append(
							$('<option></option>').val(relCode).html(this.selectFields[componentPk][relCode])
						);

						// Re-choose an already chosen component of the user
						if (typeof alreadyChosenComponents[componentPk] != 'undefined') {
							selectField.find('option[value=' + alreadyChosenComponents[componentPk] + ']').attr('selected', true);
						}

						var template = $(this.parentContainerObj).find('#component_' + componentPk);
						if(sortedLoopArray.length == 1){
							template.find('span.singleComponent').html(this.selectFields[componentPk][relCode]);
							template.find('select').hide();
						}else{
							template.find('span.singleComponent').html('');
							template.find('select').show();
						}
					}
				}
			}else{
				for(var component in this.specifyingChosenComponents){
					if(this.specifyingChosenComponents.hasOwnProperty(component)){
						var template = $(this.parentContainerObj).find('#component_' + component);
						template.hide();
					}
				}
			}
		},

		isEmpty: function(obj){
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) // ahja
					return false;
			}
			return true;
		},

		getChosenComponents: function() {
			var _this = this;

			$('.' + this.selectFieldClass).each(function() {
				_this.specifyingChosenComponents[ $(this).attr('rel') ] = $(this).val();
			});
		},

		getImages: function(obj, relTypeCode, excludeRelCodeNull) {
			var imageList = [];

			if (typeof obj != 'undefined' &&
				typeof obj[relTypeCode] != 'undefined') {
				for (var sortKey in obj[relTypeCode]) {
					if(obj[relTypeCode].hasOwnProperty(sortKey)){
						var mediaPk = obj[relTypeCode][sortKey].mediaPk;
						if (this.dataMedia[mediaPk].fileName &&
							this.dataMedia[mediaPk].fileName.length > 0 &&
								( (excludeRelCodeNull &&
								obj[relTypeCode][sortKey].relCode != null) ||
								!excludeRelCodeNull)
							) {
							var imagePath = (this.dataMedia[mediaPk].path != null) ? this.dataMedia[mediaPk].path + this.dataMedia[mediaPk].fileName : '' + this.dataMedia[mediaPk].fileName;
							imageList.push({'url': this.getImageLink(relTypeCode, imagePath),
											'path': imagePath,
											'index': this.dataMedia[mediaPk].index,
											'reference': this.dataMedia[mediaPk].reference});
						}
					}
				}
			}

			return imageList;
		},

		getMergedImages: function(productMediaList, articleMediaList, relTypeCode, excludeRelCodeNull) {
			var imageList = [];
			var productImages = this.getImages(productMediaList, relTypeCode, excludeRelCodeNull);
			var articleImages = this.getImages(articleMediaList, relTypeCode, excludeRelCodeNull);
			imageList = productImages.concat(articleImages);

			return imageList;
		},

		setGravure: function(articleVO, currentArticle) {
			var gravureFieldCount	= parseInt(articleVO.gravureHeadline);
			var gravureFieldLength	= parseInt(articleVO.gravureLength);

			// reset gravure info text
			$(this.parentContainerObj).find('#' + this.fieldGravureMessageBefore).text('');
			$(this.parentContainerObj).find('#' + this.fieldGravureMessageAfter).text('');

			// do we have a gravure, handle/display info text
			if (gravureFieldCount > 0 && gravureFieldLength > 0) {
				var textParts = infoGravureBefore.split('||');
				var newText = textParts[0] + gravureFieldLength + textParts[1];
				$(this.parentContainerObj).find('#' + this.fieldGravureMessageBefore).html(newText);
				$(this.parentContainerObj).find('#' + this.fieldGravureMessageAfter).html(infoGravureAfter);
			}

			// create Input Fields according to article values
			if (gravureFieldCount > 0 && gravureFieldLength > 0) {
				$(this.parentContainerObj).find('#' + this.fieldGravureInput).html('');

				for (var i = 0; i < gravureFieldCount; i++) {
					var input = $('<input />').
							attr('type', 'text').
							attr('maxLength', gravureFieldLength).
							attr('id', this.fieldGravureText + '_' + i).
							attr('name', this.fieldGravureText + '[' + i + ']').
							attr('class', 'gravure txt');

					if ($(this.parentContainerObj).find('#' + this.gravureForm).length > 0 &&
							$(this.parentContainerObj).find('#' + this.gravureForm).val().length > 0) {
						var rows = $(this.parentContainerObj).find('#' + this.gravureForm).val().split(textGravureSeparator);
						if (typeof rows[i] == 'undefined' || !rows[i]) {
							input.val('');
						} else {
							input.val(rows[i]);
						}
					}

					$(this.parentContainerObj).find('#' + this.fieldGravureInput).append(input);
				}

				if ($(this.parentContainerObj).find('#' + this.productGravureAbstractContent).length > 0 &&
						typeof ProductPersonalizationLayer == 'object') {
					$(this.parentContainerObj).find('#' + this.productGravureAbstractContent).html('');
					ProductPersonalizationLayer.inputLevel = true;
				}

				$(this.parentContainerObj).find('#' + this.fieldGravureInput).css({'display':'block'});
				$(this.parentContainerObj).find('#' + this.productGravureHint).css({'display':'block'});
			} else {
				$(this.parentContainerObj).find('#' + this.fieldGravureInput).css({'display':'none'});
				$(this.parentContainerObj).find('#' + this.productGravureHint).css({'display':'none'});
			}
		},

		displayComponents: function(articleVO, currentArticle) {
			var currentArticleComponents = [];

			// Delete old component information
			$(this.parentContainerObj).find('#' + this.fieldWarning).html('');
			$(this.parentContainerObj).find('#' + this.fieldSeals).html('');
			$(this.parentContainerObj).find('#' + this.divProductComponentList + ' div:not(:first-child)').remove();

			if (dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[this.relTypeComponent]) === false) {
				return;
			}

			// First case: You're having both product components and article components
			if (typeof this.componentArticleMapping[this.relTypeComponent][0] != 'undefined' &&
				typeof this.componentArticleMapping[this.relTypeComponent][0][0] != 'undefined' &&
				dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[this.relTypeComponent][0][0]) === true &&
				typeof this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber] != 'undefined' &&
				typeof this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize] != 'undefined' &&
				dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize]) === true) {

				currentArticleComponents = this.mergeComponentArrays(this.componentArticleMapping[this.relTypeComponent][0][0], this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize]);

			// Second case: You're only having product components
			} else if (typeof this.componentArticleMapping[this.relTypeComponent][0] != 'undefined' &&
				typeof this.componentArticleMapping[this.relTypeComponent][0][0] != 'undefined' &&
				dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[this.relTypeComponent][0][0]) === true) {

				currentArticleComponents = this.componentArticleMapping[this.relTypeComponent][0][0];

			// Third case: You're only having article components
			} else if (typeof this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber] != 'undefined' &&
				typeof this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize] != 'undefined' &&
				dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize]) === true) {

				currentArticleComponents = this.componentArticleMapping[this.relTypeComponent][currentArticle.artNumber][currentArticle.artSize];
			}


			// Create new component tables
			var newComponentTables = [];

			if (dmc.Utils.ArrayNotEmpty(currentArticleComponents) === true) {
				// Do a sorting over all components
				var sortedCurrentArticleComponents = this.sortCurrentArticleComponents(currentArticleComponents);

				// Iterate all components of current article
				for (var sortKey in sortedCurrentArticleComponents) {
					if(sortedCurrentArticleComponents.hasOwnProperty(sortKey)){
						// Chrome/IE do automatic array resortings when using componentPk as key, so
						// use a string within an object and split the value to get the "componentPk"
						var componentPkI = sortKey.split("|");
						var componentPk = componentPkI[0];

						var componentGroup = this.dataComponents[componentPk].group;
						if (componentGroup == "") componentGroup = 0;
						var componentName = this.dataComponents[componentPk].name;
						var componentValue = '';

						for (var i in currentArticleComponents[componentPk]) {
							if(currentArticleComponents[componentPk].hasOwnProperty(i)){
								componentValue += '<span>';

								if (currentArticleComponents[componentPk][i].mediaPk != null) {
									var mediaVO = this.dataMedia[ currentArticleComponents[componentPk][i].mediaPk ];
									componentValue += '<img src="' + this.getImageLink(560, mediaVO.path + mediaVO.fileName) + '" /><br />';
									componentValue += currentArticleComponents[componentPk][i].relValue;
								} else {
									componentValue += currentArticleComponents[componentPk][i].relValue;
								}
								if (typeof currentArticleComponents[componentPk][i]['typeCodeList']['WARNING'] != 'undefined') {
									componentValue += '</span><br />';
								} else {
									componentValue += '</span> ';
								}
							}
						}

						// Components for component table (list, link)
						if (typeof currentArticleComponents[componentPk][0]['typeCodeList']['LIST'] != 'undefined'  ||
							typeof currentArticleComponents[componentPk][0]['typeCodeList']['LINK'] != 'undefined') {
							// Create new table for current componentGroup
							if (typeof newComponentTables[componentGroup] == 'undefined') {
								// Retrieve the component table template
								newComponentTables[componentGroup] = $(this.parentContainerObj).
										find('#' + this.divProductComponentList + ' div.template').
										clone();

								newComponentTables[componentGroup].attr('class', '');

								if (componentGroup != 0) {
									newComponentTables[componentGroup].find('h4').html(componentGroup);
								}
							}

							// Make a copy of the template row and fill it
							var newComponentRow = $(newComponentTables[componentGroup]).find('table tr.componentRow:first-child').clone();
							$(newComponentRow).find('td.componentLabel').html(componentName);
							$(newComponentRow).find('td.componentValue').html(componentValue);
							$(newComponentTables[componentGroup]).find('table').append(newComponentRow);



						// Warnings
						} else if (typeof currentArticleComponents[componentPk][0]['typeCodeList']['WARNING'] != 'undefined') {
							$(this.parentContainerObj).find('#' + this.fieldWarning).append(componentValue);



						// Seals
						} else if (typeof currentArticleComponents[componentPk][0]['typeCodeList']['SEAL'] != 'undefined') {
							if (typeof currentArticleComponents[componentPk][0]['relValue'] != 'undefined') {
								var textlines = currentArticleComponents[componentPk][i].relValue.split(",");

								var template = '<p class="sealtext">';
									$.each( textlines, function( key, value ) {
										var parts = value.split('\t');
										if ( parts.length == 2 ) {
											template += parts[0] + '<span style="float: right;">' + parts[1] + '</span>';
										} else {
											template += value + ' ';
										}
									});

								template += '</p>';
								componentValue = componentValue.replace(currentArticleComponents[componentPk][i].relValue, template);
							}
							$(this.parentContainerObj).find('#' + this.fieldSeals).append(componentValue);

						}
					}
				}

				// Iterate all tables and append them to parent div
				for (var componentGroup in newComponentTables) {
					if(newComponentTables.hasOwnProperty(componentGroup)){
						// The first row within the template table is the template row itself, so remove it
						$(newComponentTables[componentGroup]).find('table tr:first-child').remove();
						$(this.parentContainerObj).find('#' + this.divProductComponentList).append(newComponentTables[componentGroup]);
					}
				}

				$(this.parentContainerObj).find('#' + this.divProductComponentList).css({'display':'block'});
			} else {
				$(this.parentContainerObj).find('#' + this.divProductComponentList).css({'display':'none'});
			}

		},

		displayArtNumber: function(articleVO, currentArticle) {
                        var prependedZeros = "";
                        var length = currentArticle.artNumber.length;
                        for(var i=length;i<7;i++){
                            prependedZeros += "0";
                        }
			$(this.parentContainerObj).find('#' + this.fieldArticleOrderNumber).text(prependedZeros + [currentArticle.artNumber.slice(0,length-3), '.',currentArticle.artNumber.slice(-3)].join('') + '.' + articleVO.adCode);
		},

		displayNewIcon: function(articleVO, currentArticle) {
			// Variables for current instance only
			this.newBannerWrap 			= 'productNewBanner_' 		   + this.selfUID + '_wrap';

			if (articleVO.showNewIcon) {
				$(this.parentContainerObj).find('#' + this.newBannerWrap).css({'display':'block'});
			} else {
				$(this.parentContainerObj).find('#' + this.newBannerWrap).css({'display':'none'});
			}
		},

		displayPrice: function(articleVO, currentArticle) {
			// Variables for current instance only
			this.oldPriceWrap 				= 'productOldPrice_' 			   + this.selfUID + '_wrap';
			this.currentPriceWrap 			= 'productCurrentPrice_' 		   + this.selfUID + '_wrap';
			this.recommendedRetailPriceWrap = 'productRecommendedRetailPrice_' + this.selfUID + '_wrap';
			this.reducedBannerWrap 			= 'productReducedBanner_' 		   + this.selfUID + '_wrap';

			this.oldPriceSpan 				= 'productOldPrice_span';
			this.oldPriceDescription 		= 'productOldPriceDescription';
			this.recommendedRetailPriceSpan = 'productRecommendedRetailPrice_span';
			this.currentPrice1Span 			= 'productCurrentPrice1_span';
			this.currentPrice2Span 			= 'productCurrentPrice2_span';
			this.currentPrice3Span 			= 'productCurrentPrice3_span';
			this.savingsSpan 				= 'productSavings_span';
			this.savings3Span 				= 'productSavings3_span';
			this.premiumPointSpan			= 'premiumPoints_span';

			this.hasSavingsAboveThreshold = articleVO.hasSavingsAboveThreshold;
			this.recommendedRetailPriceSavingPercentage = articleVO.recommendedRetailPriceSavingPercentage;
			this.oldPriceSavingPercentage = articleVO.oldPriceSavingPercentage;

			// Show current price
			$(this.parentContainerObj).find('#' + this.fieldProductPrice).text(articleVO.currentPrice);

			// Standard Hide / Show of wrapper fields
			$(this.parentContainerObj).find('#' + this.reducedBannerWrap).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.recommendedRetailPriceWrap).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.oldPriceWrap).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.oldPriceDescription).css({'display':'none'});

			$(this.parentContainerObj).find('#' + this.currentPriceWrap).css({'display':'block'});

			$(this.parentContainerObj).find('#' + this.savingsSpan).text('');
			$(this.parentContainerObj).find('#' + this.savings3Span).text('');

			if (this.hasSavingsAboveThreshold) {
				$(this.parentContainerObj).find('#' + this.reducedBannerWrap).css({'display':'block'});
				$(this.parentContainerObj).find('#' + this.currentPriceWrap).css({'display':'none'});

				// find out price difference of current price to recommended retail price and old price,
				// format it in the same way like oldPriceFormatted
				// and show it on web page.
				if (this.recommendedRetailPriceSavingPercentage >= this.oldPriceSavingPercentage) {
					var savings = articleVO.recommendedRetailPriceSaving;
					var diffPercent = this.recommendedRetailPriceSavingPercentage;

					// Standard price output
					$(this.parentContainerObj).find('#' + this.recommendedRetailPriceSpan).text(articleVO.recommendedRetailPrice);
					$(this.parentContainerObj).find('#' + this.currentPrice3Span).text(articleVO.currentPrice);

					if (articleVO.recommendedRetailPricePlain < 100
							&& diffPercent > articleVO.recommendedRetailPricePlain - articleVO.currentPricePlain ) {
						savings 	= Number(diffPercent).toFixed(0) + '%';
					}

					$(this.parentContainerObj).find('#' + this.savings3Span).text(savings);
					$(this.parentContainerObj).find('#' + this.recommendedRetailPriceWrap).css({'display':'block'});

				} else {
					var savings = articleVO.oldPriceSaving;
					var diffPercent = this.oldPriceSavingPercentage;

					// Standard price output
					$(this.parentContainerObj).find('#' + this.oldPriceSpan).text(articleVO.oldPrice);
					$(this.parentContainerObj).find('#' + this.currentPrice2Span).text(articleVO.currentPrice);
					$(this.parentContainerObj).find('#' + this.oldPriceDescription).css({'display':'block'});

					if (articleVO.oldPricePlain < 100
							&& diffPercent > articleVO.oldPricePlain-articleVO.currentPricePlain) {
						savings	= Number(diffPercent).toFixed(0) + '%';
					}

					$(this.parentContainerObj).find('#' + this.savingsSpan).text(savings);
					$(this.parentContainerObj).find('#' + this.oldPriceWrap).css({'display':'block'});
				}
			}

			$(this.parentContainerObj).find('#' + this.currentPrice1Span).text(articleVO.currentPrice);

			//display the promotion points factor for respective articles
			if (typeof (articleVO.promotionPoints) != "undefined" && articleVO.promotionPoints != null) {
				$(this.parentContainerObj).find('#' + this.premiumPointSpan).text(articleVO.promotionPoints);
			}

			// Show Block prices
			this.infoBlockPrice1		= 'infoBlockPrice1';
			this.articleBlockPrice1		= 'articleBlockPrice1';
			this.articleBlockAmount1	= 'articleBlockAmount1';
			this.infoBlockPrice2		= 'infoBlockPrice2';
			this.articleBlockPrice2		= 'articleBlockPrice2';
			this.articleBlockAmount2	= 'articleBlockAmount2';
			this.infoPriceGroup			= 'infoPriceGroup';

			// There might be two block prices available
			for (i = 1; i <= 2; i++) {
				$(this.parentContainerObj).find('#' + this['infoBlockPrice' + i]).css({'display':'none'});
				if (articleVO['blockAmount' + i] > 0) {
					$(this.parentContainerObj).find('#' + this['infoBlockPrice' + i]).css({'display':'block'});

					$(this.parentContainerObj).find('#' + this['articleBlockPrice' + i]).text(articleVO['blockPrice' + i]);
					$(this.parentContainerObj).find('#' + this['articleBlockAmount' + i]).text( blockPriceAmountText.replace('###BLOCKAMOUNT###', articleVO['blockAmount' + i] ) );
				}
			}

			$(this.parentContainerObj).find('#' + this.infoPriceGroup).css({'display':'none'});
			if (articleVO.priceGroupId  != '000'
				&& articleVO.blockAmount1 > 0) {
				$(this.parentContainerObj).find('#' + this.infoPriceGroup).css({'display':'block'});
			}


			// Show article's base unit price if available.
			this.baseUnitPriceContainer = 'baseUnitPriceInfo_' + this.selfUID;
			this.baseUnitPriceHeader = 'baseUnitPriceInfoHeader_' + this.selfUID;

			if (typeof articleVO.baseUnit == 'string' && articleVO.baseUnit != '') {
				$(this.parentContainerObj).find('#' + this.baseUnitPriceContainer + ' span.unit').text(articleVO.baseUnit);
				$(this.parentContainerObj).find('#' + this.baseUnitPriceContainer + ' span.baseprice').text(articleVO.baseUnitPrice);
				$(this.parentContainerObj).find('#' + this.baseUnitPriceHeader).css({'display':'block'});
				$(this.parentContainerObj).find('#' + this.baseUnitPriceContainer).css({'display':'block'});
			} // end: if
		},

		displayYardWareNotice: function(articleVO, currentArticle) {
			if(articleVO.stockUnit == 'M') {
				$(this.parentContainerObj).find('#' + this.productYardwareNotice).css({'display':'block'});
			}
		},

		displayAvailability: function(articleVO, currentArticle) {
			this.availField			= 'productAvailField_' + this.selfUID;
			this.availClassField	= 'productAvailFieldClass_' + this.selfUID;

			var availabilityLink = 'void(0)';
			var infoText = articleVO.stockTypeText;

			if (articleVO.stockTypeCode == 2 && articleVO.weeksToDelivery > 0) {
				infoText = weeksToDeliveryInfo.replace('{ORDERLINE_weeksToDelivery}', articleVO.weeksToDelivery);
			}

			$(this.parentContainerObj).find('#' + this.availField).attr('value', infoText);
			$(this.parentContainerObj).find('#' + this.availClassField).attr('value', this.configStockTypeCSSPrefix + articleVO.stockTypeCode);

			$(this.parentContainerObj).find('#' + this.fieldAvailabilityLink).attr('href', 'javascript: void(0);').unbind('click');
			if (typeof configStockTypeLink != "undefined") {
				if (typeof configStockTypeLink[articleVO.stockTypeCode] != "undefined" &&
					configStockTypeLink[articleVO.stockTypeCode]) {
					$(this.parentContainerObj).find('#' + this.fieldAvailabilityLink).click(function() {
						openWindow(configStockTypeLink[articleVO.stockTypeCode], '', 'width=480,height=390,scrollbars=1,status=0');
					});
				}
			}

			$(this.parentContainerObj).find('#' + this.fieldAvailability).
					attr('class', this.configStockTypeCSSPrefix + articleVO.stockTypeCode).
					html(infoText);
		},

		displayCopytext: function(articleVO, currentArticle) {
			// Only use article's copytext if it is available...
			if (articleVO.copyText != null &&
					articleVO.copyText.length > 0) {
				$(this.parentContainerObj).find('#' + this.fieldCopytext).html(articleVO.copyText);

			// ...otherwise use default text of product
			} else {
				$(this.parentContainerObj).find('#' + this.fieldCopytext).html(this.dataProduct.copyText);
			}
		},

		displayAdditionalFeeNotice: function(articleVO, currentArticle) {
			if(articleVO.deliveryTypeCode == 1) {
				$(this.parentContainerObj).find('#' + this.fieldBulkyFeeNotice).
						html(bulkyCostsInfo.replace('###bulkycosts###', articleVO.bulkyCosts)).
						css({'display':'block'});
			} else {
				$(this.parentContainerObj).find('#' + this.fieldBulkyFeeNotice).
						css({'display':'none'});
			}
		},

		displayDeliveryServiceIcon: function(articleVO, currentArticle) {
			// 24h / 48h delivery
			if (articleVO.status & 16 || articleVO.status & 32) {
				$(this.parentContainerObj).find('#' + this.fieldDeliveryServiceIcon).css({'display':'block'});
			} else {
				$(this.parentContainerObj).find('#' + this.fieldDeliveryServiceIcon).css({'display':'none'});
			}
		},

		displayImages: function(articleVO, currentArticle) {
		},

		imageToggle: function(obj, currentArticle) {
		},

		displayBulkyDeliveryNote: function(articleVO, currentArticle) {
			this.freeDeliveryNotice = 'productDeliveryNotice';

			// check if minDeliveryCostFree is set and compare it with price
			// Additional check for validating bulky good or not
			// Based on this check, the free delivery notice will be hidden/made visible
			if ((articleVO.currentPricePlain / 100 > minDeliveryCostFree / 100)
					&& minDeliveryCostFree != 0
					&& (articleVO.deliveryTypeCode & 1) == 0
					&& (articleVO.bulkyCosts.search(/(.)*[1-9](.)*/)) == -1
					) {
				// display free delivery headline
				$(this.parentContainerObj).find('#' + this.freeDeliveryNotice).css({'display':'block'});
				// replace text "zzgl. Versandkosten" by free delivery notice text
				// set class productDeliveryNoticeShort to nearest tag of text e.g. <a><span class="productDeliveryNoticeShort">shipping</span></a> to make your field replaced
				$('.productDeliveryNoticeShort').html(deliveryFreeShortText);
			}

			// display special text only if we are on baby_at or baby_ch
			else if( articleVO.deliveryTypeCode == 1 && displayDeliveryCostsText == true ){
				$(this.parentContainerObj).find('#' + this.freeDeliveryNotice).css({'display':'none'});
				$('.productDeliveryNoticeShort').html(plus_deliveryCostsBulky);
			}else{
				$(this.parentContainerObj).find('#' + this.freeDeliveryNotice).css({'display':'none'});
				$('.productDeliveryNoticeShort').html(plus_deliveryCostsText);
				// when switching back to non free delivery, show default
			} // end: if
		},

		displayManufacturerImages: function(articleVO, currentArticle) {
			// Master Manufacturer Images
			var imageList = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeManufacturer);
			var htmlString = '';

			if ($(this.parentContainerObj).find('#' + this.divProductManufacturerImages).find('a').length > 0){
				$(this.parentContainerObj).find('#' + this.divProductManufacturerImages).find('a').remove();
			}else{
				$(this.parentContainerObj).find('#' + this.divProductManufacturerImages).find('img').remove();
			}
			if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
					typeof imageList[0] != 'undefined') {
				for (i in imageList) {
					if(imageList.hasOwnProperty(i)){
						if (imageList[i].reference){
							htmlString+= '<a href="' + imageList[i].reference + '" ><img src="' + imageList[i].url + '" /></a>';

						}else{
							htmlString+= '<img src="' + imageList[i].url + '" />';
						}
					}
				}

				if ($(this.parentContainerObj).find('#' + this.divProductManufacturerImages).children(':first').length > 0) {
					$(this.parentContainerObj).find('#' + this.divProductManufacturerImages).children(':first').append(htmlString);
				} else {
					$(this.parentContainerObj).find('#' + this.divProductManufacturerImages).append(htmlString);
				}
			}

			// Subbrand Manufacturer Images
			var imageList = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeManufacturer2);
			var htmlString = '';

			$(this.parentContainerObj).find('#' + this.divProductManufacturer2Images + ' img').remove();
			if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
					typeof imageList[0] != 'undefined') {
				for (i in imageList) {
					if(imageList.hasOwnProperty(i)){
						htmlString+= '<img src="' + imageList[i].url + '" />';
					}
				}

				if ($(this.parentContainerObj).find('#' + this.divProductManufacturer2Images).children(':first').length > 0) {
					$(this.parentContainerObj).find('#' + this.divProductManufacturer2Images).children(':first').append(htmlString);
				} else {
					$(this.parentContainerObj).find('#' + this.divProductManufacturer2Images).append(htmlString);
				}
			}
		},

		displayCareInfoImages: function(articleVO, currentArticle) {
			var imageList = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeCareInfo);
			var htmlString = '';

			$(this.parentContainerObj).find('#' + this.divProductCareInfoImages + ' img').remove();
			if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
					typeof imageList[0] != 'undefined') {
				for (i in imageList) {
					if(imageList.hasOwnProperty(i)){
						htmlString+= '<img src="' + imageList[i].url + '" />';
					}
				}

 				$(this.parentContainerObj).find('#' + this.divProductCareInfoImages).append(htmlString);
			}
		},

		displayTestInfoOtherTuevImages: function(articleVO, currentArticle) {
			var imageListTestInfo = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeTestInfo);
			var imageListOther = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeOther);
			var imageList = imageListTestInfo.concat(imageListOther);
			var htmlString = '';

			if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
					typeof imageList[0] != 'undefined') {
				for (i in imageList) {
					if(imageList.hasOwnProperty(i)){
						htmlString+= '<span><img src="' + imageList[i].url + '" /></span>';
					}
				}

 				$(this.parentContainerObj).find('#' + this.fieldSeals).append(htmlString);
			}
		},

		displayCrossSelling: function(articleVO, currentArticle) {
		},

		addToBasket: function(event) {
		},

		checkFields: function(currentArticleVO) {
		},

		doKqpriProductUpdate: function(kqpriConfList) {
			for (var artNumber in kqpriConfList) {
				if(kqpriConfList.hasOwnProperty(artNumber)){
					if (typeof this.dataArticles[artNumber] != 'undefined') {
						for (var artSize in kqpriConfList[artNumber]) {
							if(kqpriConfList[artNumber].hasOwnProperty(artSize)){
								if (typeof this.dataArticles[artNumber][artSize] != 'undefined') {
									this.dataArticles[artNumber][artSize].stockAmount = kqpriConfList[artNumber][artSize]['stockAmount'];
									this.dataArticles[artNumber][artSize].stockTypeCode = kqpriConfList[artNumber][artSize]['stockTypeCode'];
									// make previously not selectable articles selectable, but never remove selectables.
									if (kqpriConfList[artNumber][artSize]['stockTypeCode'] == 1
										|| kqpriConfList[artNumber][artSize]['stockTypeCode'] == 2) {

										this.dataArticles[artNumber][artSize].selectable = true
									}

									if (typeof stockTypeText[kqpriConfList[artNumber][artSize]['stockTypeCode']] != 'undefined'){
										this.dataArticles[artNumber][artSize].stockTypeText = stockTypeText[kqpriConfList[artNumber][artSize]['stockTypeCode']];
									}
									this.dataArticles[artNumber][artSize].weeksToDelivery = kqpriConfList[artNumber][artSize]['weeksToDelivery'];
								}
							}
						}
					}
				}
			}

			this.update();
		},

		debugLog: function(msg) {
			if (this.debug &&
				typeof console != 'undefined') {
				console.info(msg);
			}
		},

		mergeComponentArrays: function(array1, array2) {
			var fullArray = new Array(array1, array2);
			var tmpArray = [], mergedArray = [];
			// Merge two component arrays considering their sortkeys

			// (1) build a new array containing both arrays with sortKey + componentPk as key
			for (var i in fullArray) {
				if(fullArray.hasOwnProperty(i)){
					for (var componentPk in fullArray[i]) {
						if(fullArray[i].hasOwnProperty(componentPk)){
							tmpArray[ fullArray[i][componentPk].sortKey + '|' + componentPk] = fullArray[i][componentPk];
						}
					}
				}
			}

			// (2) do a natural key sort on it
			var tmpArray = dmc.Utils.sortNaturalKeyAssoc(tmpArray);

			// (3) build the new sorted full array
			for (var sortKeyComponentPk in tmpArray) {
				if(tmpArray.hasOwnProperty(sortKeyComponentPk)){
					var aKeys = sortKeyComponentPk.split('|');

					mergedArray[ aKeys[1] ] = tmpArray[sortKeyComponentPk];
				}
			}

			return mergedArray;
		},

		sortCurrentArticleComponents: function(currentArticleComponents) {
			var sortOrder = [];
			for (var componentPk in currentArticleComponents) {
				if(currentArticleComponents.hasOwnProperty(componentPk)){
					for (var i in currentArticleComponents[componentPk]) {
						if(currentArticleComponents[componentPk].hasOwnProperty(i)){
							// For to get the right sorting order
							var sortKey = parseInt(currentArticleComponents[componentPk][i].sortKey, 10) + 10000000;
							sortOrder[ sortKey ] = componentPk + '|' + i;
						}
					}
				}
			}

			sortOrder = dmc.Utils.sortNaturalKeyAssoc(sortOrder);

			var sortedCurrentArticleComponents = {};
			for (var sortKey in sortOrder) {
				if(sortOrder.hasOwnProperty(sortKey)){
					var componentPkI = sortOrder[sortKey].split("|");
					var componentPk = componentPkI[0];
					var i = componentPkI[1];

					var objSortKey = componentPk.toString() + "|";

					// Chrome/IE do automatic array resortings when using componentPk as key, so
					// use a string within an object
					if (typeof sortedCurrentArticleComponents[objSortKey] == 'undefined') {
						sortedCurrentArticleComponents[objSortKey] = [];
					}
					sortedCurrentArticleComponents[objSortKey][i] = currentArticleComponents[componentPk][i];
				}
			}

			return sortedCurrentArticleComponents;
		},

		sortCurrentArticleSpecifyingComponents: function(currentArticleSpecifyingComponents) {
			var sortOrder = [];

			// Get current article since sorting of components might change for each article
			var currentArticle = this.getCurrentArticle();

			for (var chosenComponentPkChosenRelCode in currentArticleSpecifyingComponents) {
				if(currentArticleSpecifyingComponents.hasOwnProperty(chosenComponentPkChosenRelCode)){
					var arrChosenComponentPkChosenRelCode = chosenComponentPkChosenRelCode.split('|');
					var componentPk = arrChosenComponentPkChosenRelCode[0];
					var relCode = arrChosenComponentPkChosenRelCode[1];

					var artPos = 0;
					if (typeof currentArticle.artNumber != "undefined" && parseInt(currentArticle.artNumber) > 0) {
						for (var i in this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode]) {
							if(this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode].hasOwnProperty(i)){
								if (this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode][i].artNumber == currentArticle.artNumber) {
									artPos = i;
									break;
								}
							}
						}
					}

					var sortKey = parseInt(this.articleComponentMapping[this.relTypeComponentSpecify][componentPk][relCode][artPos].sortKey) + 10000000;

					// For to get the right sorting order
					sortOrder[ sortKey ] = componentPk + '|' + relCode;
				}
			}
			sortOrder = dmc.Utils.sortNaturalKeyAssoc(sortOrder);

			var sortedCurrentArticleSpecifyingComponents = [];
			var i = 0;
			for (var sortKey in sortOrder) {
				if(sortOrder.hasOwnProperty(sortKey)){
					sortedCurrentArticleSpecifyingComponents[i] = sortOrder[sortKey];
					i++;
				}
			}

			return sortedCurrentArticleSpecifyingComponents;
		}

	};


	return Product;
})();

// *********************************************************************************
// Sub custom class dmc.WALZ.Product that inherits from dmc.Product
// For to get all core and custom functionality, use this class instead
// of its parent
// *********************************************************************************
var dmc_mb3_product_pi1mediaIndex = 0;

dmc.WALZ.Product = function(config) {
	// Create this class as subclass from dmc.Product core class
	dmc.Product.call(this, config);


	// Overwrite / enhance base functionality
	dmc.WALZ.Product.prototype.updatePage = function(currentArticle) {
		dmc.Product.prototype.updatePage.call(this, currentArticle);

		var articleVO = this.dataArticles[currentArticle.artNumber][currentArticle.artSize];

		this.checkSubmitButton(articleVO, currentArticle);
	};

	dmc.WALZ.Product.prototype.displayArtNumber = function(articleVO, currentArticle) {
		dmc.Product.prototype.displayArtNumber.call(this, articleVO, currentArticle);

		// Special Display pattern for brand 7 = BABY OUTLET
		if (window.config.brandId == 7) {
			$(this.parentContainerObj).find('#' + this.fieldArticleOrderNumber).text(
					'EY0' +
					currentArticle.artNumber +
					articleVO.adCode +
					'10');
		}
	};

	dmc.WALZ.Product.prototype.displayImages = function(articleVO, currentArticle) {
		this.imgMax = 3;

		this.linkList = 'dmc_mb3_product_pi1' + this.selfUID + 'ImageLinks';
		$(this.parentContainerObj).find('#' + this.linkList).html('');

		var thumbMode = 'text';
		var containerDiv = 'dmc_mb3_product_pi1' + this.selfUID + 'AlternativeViews';
		if ($(this.parentContainerObj).find('#' + containerDiv).length == 0) {
			thumbMode = 'thumbs';
			containerDiv = 'dmc_mb3_product_pi1' + this.selfUID + 'AlternativeViewsAsThumbnails';
		}

		var imageList = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeLarge, true);

		if (imageList.length > 0 &&
				typeof imageList[0] != 'undefined') {

			// set the new image source of the big product image here:
			$(this.parentContainerObj).find('#' + this.mainImage).attr('src', imageList[0].url);
			$(this.parentContainerObj).find('#' + this.mainImage).css('display', '');

			dmc_mb3_product_pi1mediaIndex = parseInt(imageList[0].index);
		} else {
			// no image found
			$(this.parentContainerObj).find('#' + this.mainImage).css('display', 'none');
		}

		if (imageList.length > 1) {
			// Set initial ... as first element
			if (thumbMode == 'text' &&
					imageList.length < this.imgMax + 1) {
				var moreStart = $('<li></li>').attr('id', 'li_moreStart').css('display', 'none').text('...');
				$(this.parentContainerObj).find('#' + this.linkList).append(moreStart);
			} // end: if

			//Set numbers
			var _this = this;
			for (var i = 0; i < imageList.length; i++) {
				var template = (thumbMode == 'text') ? $('<li><a></a></li>') : $('<span><a><img /></a></span>');

				template.attr('id', 'li_' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);

				template.find('a').attr('rel', i)	.
						attr('id', this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i).
						attr('href', 'javascript: void(0);').
						attr('index', imageList[i].index).
						click(function() {
					_this.imageToggle($(this), currentArticle);
				});

				if (i == 0) {
					template.find('a').addClass('aktiv');
				}

				if (thumbMode == 'text') {
					template.find('a').text(i + 1);
				} else {
					template.find('img').attr('src', this.getImageLink(this.mediaRelTypeThumb2, imageList[i].path)).
							attr('class', 'thumbs');
				}

				$(this.parentContainerObj).find('#' + this.linkList).append(template);
			}

			// Set  '...' as last element
			if (thumbMode == 'text' &&
					imageList.length > this.imgMax + 1) {
				var moreEnd = $('<li></li>').attr('id', 'li_moreEnd').text('...');
				$(this.parentContainerObj).find('#' + this.linkList).append(moreEnd);
			} // end: if

			// generate navi elements 1 - 3 or generate all elements
			// if they all can be displayed
			// moreStart indicates whether you're having a limited list ("1 | 2 | ...") or not
			// if you don't have one, you don't need this logic
			if (thumbMode == 'text') {
				this.createImageLinks(currentArticle, imageList, 0);
			}
		} else {
			$(this.parentContainerObj).find('#' + containerDiv).css('display', 'none');
		} // end: if
	};

	dmc.WALZ.Product.prototype.imageToggle = function(obj, currentArticle) {
		var imageList = [];
		var productImages = this.getImages(this.dataProduct["mediaList"], this.mediaRelTypeLarge, true);
		var articleImages = this.getImages(this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeLarge, true);
		imageList = productImages.concat(articleImages);

		var thumbMode = 'text';
		var containerDiv = 'dmc_mb3_product_pi1' + this.selfUID + 'AlternativeViews';
		if ($(this.parentContainerObj).find('#' + containerDiv).length == 0) {
			thumbMode = 'thumbs';
			containerDiv = 'dmc_mb3_product_pi1' + this.selfUID + 'AlternativeViewsAsThumbnails';
		}

		var imgNum = obj.attr('rel');

		var imgURL = imageList[ imgNum ].url;
		$(this.parentContainerObj).find('#' + this.mainImage).attr('src', imgURL);
		dmc_mb3_product_pi1mediaIndex = parseInt(obj.attr('index'));

		$(this.parentContainerObj).find('#' + this.linkList + ' a').removeClass('aktiv');
		$(obj).addClass('aktiv');

		// generate navi elements 1 - 3 or generate all elements
		// if they all can be displayed
		// moreStart indicates whether you're having a limited list ("1 | 2 | ...") or not
		// if you don't have one, you don't need this logic
		if (thumbMode == 'text') {
			this.createImageLinks(currentArticle, imageList, imgNum);
		}
	};

	dmc.WALZ.Product.prototype.createImageLinks = function(currentArticle, imageList, imgNum) {
		var actId = this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + imgNum;
		var moreEnd = $(this.parentContainerObj).find('#li_moreEnd');
		var moreStart = $(this.parentContainerObj).find('#li_moreStart');

		if (imgNum < 3) {
			for (var i = 0; i < imageList.length; i++) {
				var aTag = $(this.parentContainerObj).find('#' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);
				var liTag = $(this.parentContainerObj).find('#li_' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);

				aTag.attr('class', '');
				if (i < this.imgMax + 1) {
					liTag.css('display', 'inline');
				} else {
					liTag.css('display', 'none');
				}
				if (aTag.attr('id') == actId) {
					aTag.attr('class', 'aktiv');
				}
				// show list and select
			}
			moreStart.css('display', 'none');
			moreEnd.css('display', 'inline');



		// generate navi elemets 'in the middle'
		// if we have many images show '...' in front of and after
		// the selected image
		} else if (imgNum >= 3 && imgNum < imageList.length - 2) {
			for (i = 0; i < imageList.length; i++) {
				var aTag = $(this.parentContainerObj).find('#' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);
				var liTag = $(this.parentContainerObj).find('#li_' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);

				aTag.attr('class', '');
				if (imgNum == i - 1 || imgNum == i || imgNum == i + 1) {
					liTag.css('display', 'inline');
				} else {
					liTag.css('display', 'none');
				}
				if (aTag.attr('id') == actId) {
					aTag.attr('class', 'aktiv');
				}

				// show list and select
				moreStart.css('display', 'inline');
				moreEnd.css('display', 'inline');
			}



		// here are the last elemetns build: special logic for hiding the '...'
		// and dsiplaying one additional navi element
		} else {
			for (i = 0; i < imageList.length; i++) {
				var aTag = $(this.parentContainerObj).find('#' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);
				var liTag = $(this.parentContainerObj).find('#li_' + this.selfUID + '_' + currentArticle.artNumber + '_' + currentArticle.artSize + '_' + i);

				aTag.className = '';
				if (imgNum == i - 1 || imgNum == i || imgNum == i + 1) {
					liTag.css('display', 'inline');
				}
				else {
					liTag.css('display', 'none');
				}
				//special logic for last images
				if (imageList.length - 1 == imgNum && imgNum == i + 2) {
					liTag.css('display', 'inline');
				}
				if (aTag.attr('id') == actId) {
					aTag.attr('class', 'aktiv');
				}
			}
			moreStart.css('display', 'inline');
			moreEnd.css('display', 'none');
		}
	};

	dmc.WALZ.Product.prototype.getImageLink = function(relTypeCode, imagePath) {
		var returnValue = '';
		var matches = imagePath.match(/static/);  //constant also set in connector typoscript constants

		if (matches && matches.length > 0) {
			returnValue = 'http://walz-images.walz.de/fsicache/' + imagePath;
		} else {
			// BrandId 7 = Outlet
			if (window.config.brandId == 7) { //change modulo for brand 7
				returnValue = 'http://babyoutlet-images.babyoutlet24.de/fsicache/images?type=image&profile=' + relTypeCode + '&source=' + imagePath;
			} else {
				returnValue = 'http://walz-images.walz.de/fsicache/images?type=image&profile=' + relTypeCode + '&source=' + imagePath;
			}
		}

		return returnValue;
	};

	dmc.WALZ.Product.prototype.displayCrossSelling = function(articleVO, currentArticle) {
		var sourceList = this.dataCrossselling[currentArticle.artNumber];
		var masterList = this.dataCrossselling[ this.dataProduct['productNumber'] ];

		$(this.parentContainerObj).find('#' + this.crosssellingTargetContainer).html('');

		if (sourceList && sourceList.length > 0) {
			this.renderProductlist(sourceList,
					$(this.parentContainerObj).find('#' + this.crosssellingTargetContainer),
					$(this.parentContainerObj).find('#' + this.crosssellingContainer),
					$(this.parentContainerObj).find('#' + this.productCrossSellingNotice));
		} else if (masterList && masterList.length > 0) {
			this.renderProductlist(masterList,
					$(this.parentContainerObj).find('#' + this.crosssellingTargetContainer),
					$(this.parentContainerObj).find('#' + this.crosssellingContainer),
					$(this.parentContainerObj).find('#' + this.productCrossSellingNotice));
		} else {
			$(this.parentContainerObj).find('#' + this.crosssellingContainer).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.productCrossSellingNotice).css({'display':'none'});
		}
	};

	// Special logic to include TUEV media items into seal component list
	dmc.WALZ.Product.prototype.displayComponents = function(articleVO, currentArticle) {
		dmc.Product.prototype.displayComponents.call(this, articleVO, currentArticle);

		this.mediaRelTypeTuev = 520;
		var componentValue = '';
		var imageList = this.getMergedImages(this.dataProduct["mediaList"], this.dataArticles[currentArticle.artNumber][currentArticle.artSize]["mediaList"], this.mediaRelTypeTuev);

		if (imageList.length > 0 &&
				typeof imageList[0] != 'undefined') {
			for (var i in imageList) {
				componentValue += '<span>';
				componentValue += '<img src="' + imageList[i].url + '" />';
				componentValue += '</span>';
			}

			$(this.parentContainerObj).find('#' + this.fieldSeals).append(componentValue);
		}
	};

	dmc.WALZ.Product.prototype.renderProductlist = function(itemList, targetContainerObj, crosssellingContainerObj, crossNoticeObj) {
		var targetList = [];

		for (var i = 0; i < itemList.length; i++) {
			var newNode = $(this.parentContainerObj).find('#plist' + itemList[i]).clone().attr('id', 'plist' + i );
			targetList[i] = newNode;
		}

		var rowDiv = $('<div></div>').attr('class', 'prodLine');
		for (var j = 0; j < targetList.length; j++) {
			var productDiv = targetList[j];

			// BrandId 7 = Outlet
			if (window.config.brandId == 7) { //change modulo for brand 7
				if (j % 4 == 0) {
					targetContainerObj.append(rowDiv);
					rowDiv.html('');
				}
			} else {
				if (j % 3 == 0) {
					targetContainerObj.append(rowDiv);
					rowDiv.html('');
				}
			}

			rowDiv.append(productDiv);
		}

		if (targetList.length > 0) {
			crosssellingContainerObj.css({'display':'block'});
			crossNoticeObj.css({'display':'block'});
		}
	};

	dmc.WALZ.Product.prototype.addToBasket = function(event) {
		var currentArticle = this.getCurrentArticle();
		var currentArticleVO = this.dataArticles[currentArticle.artNumber][currentArticle.artSize];

		if (currentArticleVO.stockTypeCode == 0 ||
			currentArticleVO.stockTypeCode == 3 ||
			currentArticleVO.stockTypeCode == 4) {
			// Don't submit to the basket
			event.preventDefault();
		} else {

			// Stokke Product - don't submit to the basket and open a special STOKKE Popup windows
			if (typeof this.addToBasketParams.isStokkeProduct != 'undefined' &&
					this.addToBasketParams.isStokkeProduct == 1) {
				// Don't submit to the basket
				event.preventDefault();

				window.open(this.addToBasketParams.stokkeLanguageURL + '&RETURNSUCCESS=' + this.addToBasketParams.stokkeReturnURL + '', this.addToBasketParams.target, "height=625,width=820,status=no,toolbar=no,menubar=no,location=no,scrollbars=no");
			} else {
				// Set Gravure field
				var gravureFieldCount	= parseInt(currentArticleVO.gravureHeadline);
				var gravureFieldLength	= parseInt(currentArticleVO.gravureLength);
				var gravureTextArray = [];
				if (gravureFieldCount > 0 && gravureFieldLength > 0) {
					for (var i = 0; i < gravureFieldCount; i++) {
						gravureTextArray.push( $(this.parentContainerObj).find('#' + this.fieldGravureText + '_' + i).val() );
					}

					if (typeof textGravureSeparator == 'undefined') {
						var textGravureSeparator = '###';
					}

					$(this.parentContainerObj).find('#' + this.gravureForm).val( gravureTextArray.join(textGravureSeparator) );
				}

				// Set amount
				var amount = 0;

				amount = $(this.parentContainerObj).find('#' + this.fieldProductAmountForm).val();
				if (amount < 1) {
					amount = 1;
				}

				$(this.parentContainerObj).find('#' + this.fieldProductBasketProductPk).val(this.dataProduct['productPk']);
				$(this.parentContainerObj).find('#' + this.fieldProductBasketPk).val(currentArticleVO.articlePk);

				// Don't submit to the basket if there are errors
				if ( (typeof this.addToBasketParams.confirmed == 'undefined' ||
						this.addToBasketParams.confirmed == false) &&
						!this.checkFields(currentArticleVO) ) {
					event.preventDefault();
				} else {
					// for the basket change event, do not open a new popup, since you want to
					// update the main windows out of the basket change popup
					if ((typeof this.addToBasketParams.noPopup == "undefined" &&
							typeof this.addToBasketParams.action == "undefined") ||
							(typeof this.addToBasketParams.action != "undefined" &&
							this.addToBasketParams.action != "basketChange")) {
						// do NOT load page from 'url' variable here! race condition w/ 2 Apache threads!
						var popup = window.open('/cache/www.walzkidzz.de/img/clear.gif', this.addToBasketParams.target, this.addToBasketParams.popupParams);
						popup.focus();
					} else if (typeof this.addToBasketParams.action != "undefined" &&
							this.addToBasketParams.action == "basketChange") {
						// When using self.close() directly, Chrome opens a new tab
						window.setTimeout("self.close();", 500);
					}
				}
			}
		}
	};

	dmc.WALZ.Product.prototype.checkFields = function(currentArticleVO) {
		var returnValue = true;

		// Check for Gravure
		var gravureFieldCount	= parseInt(currentArticleVO.gravureHeadline);
		var gravureFieldLength	= parseInt(currentArticleVO.gravureLength);

		var gravureTextPlain = '';
		var gravureTextArr = new Array();

		var messages = '';
		var gravureError = false;

		if (gravureFieldCount > 0 && gravureFieldLength > 0) {
			for (var i = 0; i < gravureFieldCount; i++) {
				var iptValue = $(this.parentContainerObj).find('#' + this.fieldGravureText + '_' + i).val();
				gravureTextArr[i] = dmc.Utils.trimString(iptValue);
			}

			gravureTextPlain = gravureTextArr.join('');

			if(gravureTextPlain.search(/[^\x20-\xFF]/) != -1 || gravureTextPlain.search(textGravureSeparator)!=-1){
				messages = noticeGravureError;
				returnValue = confirm(messages);
				gravureError = true;
			}

			// Wenn Feld leer dann Abfrage
			if (gravureTextPlain == "" && !gravureError) {
				messages = noticeGravureNo;
				returnValue = confirm(messages);
				gravureError = true;
			}
		}



		// Check for amount
		var amountObj = $(this.parentContainerObj).find('#' + this.fieldProductAmountForm);

		var yardWare = currentArticleVO.stockUnit;

		if (amountObj.length > 0 && returnValue) {
			// Meterware ?
			if (yardWare && yardWare== "M") {
				var splitText= noticeYardWare.split('||');
				messages = splitText[0] + (amountObj.val() * 10) + splitText[1] + amountObj.val() + splitText[2];
				returnValue = confirm(messages);
			} else if (amountObj.val() >= 10) {
				var splitText = noticeAmount.split('||');
				messages = splitText[0] + amountObj.val() + splitText[1];
				returnValue = confirm(messages);
			}

			if ( (yardWare && yardWare== "M") || (amountObj.val() >= 10) ) {
				if (!returnValue) {
					amountObj.val(1);
					amountObj.focus();
				}
			}
		}

		return returnValue;
	};

	// Special behavior of the gui-elemets button (into basket), notepad and giftdesk link,
	// when an article is sold out
	dmc.WALZ.Product.prototype.checkSubmitButton = function(articleVO, currentArticle) {
		this.notepadLink		= 'notepadLink';
		this.giftdeskLink		= 'giftdeskLink';
		this.compareListLink	= 'recommendLink';

		var butt = $(this.parentContainerObj).find('#textimage_add_to_basket_1');
		if (butt.length == 0) {
			butt = $(this.parentContainerObj).find('#textimage_change_1');
		}

		//  Logic for button ('into basket')
		if (butt.length > 0) {
			if (articleVO.stockTypeCode == 3 || articleVO.stockTypeCode == 0 || articleVO.stockTypeCode == 4){
				// set special alt and title Tag for button
				butt.attr('alt', buttInactiveAltTag).
						attr('title', buttInactiveAltTag).
						css('cursor', 'default').
						attr('src', buttInactive);

				$('.buBasket').css('cursor', 'default').attr('onclick', null).attr('href', 'javascript:void(0)');
				$('.buBasket').unbind();

				// if block exists and stocktype = 4 unhide
				if( $('#soldout2') && articleVO.stockTypeCode == 4 ){
					$('#soldout2').css({'display':'block'});
				}
				// if block exists and stocktype != 4 hide
				else if( $('#soldout2') && articleVO.stockTypeCode != 4 ){
					$('#soldout2').css({'display':'none'});
				}
			} else {
				// if block exists hide it
				if ( $('#soldout2') ) {
					$('#soldout2').css({'display':'none'});
				}

				butt.attr('alt', buttActiveAltTag).
						attr('title', buttActiveAltTag).
						css('cursor', 'pointer').
						attr('src', buttActive);
			}
		}

		// Logic for buttons notepad, giftdesk and comparelist
		if (articleVO.stockTypeCode == 3 || articleVO.stockTypeCode == 0 || articleVO.stockTypeCode == 4){
			$(this.parentContainerObj).find('#' + this.notepadLink).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.giftdeskLink).css({'display':'none'});
			$(this.parentContainerObj).find('#' + this.compareListLink).css({'display':'none'});
		} else {
			$(this.parentContainerObj).find('#' + this.notepadLink).css({'display':'list-item'});
			$(this.parentContainerObj).find('#' + this.giftdeskLink).css({'display':'list-item'});
			$(this.parentContainerObj).find('#' + this.compareListLink).css({'display':'list-item'});
		}
	};
};
dmc.WALZ.Product.prototype = dmc.Utils.create(dmc.Product.prototype);

















// *********************************************************************************
// Custom functions
// *********************************************************************************



// Cliplister Video
function videoPopup(url,popupParams) {
	openWindow(url,
			   'popup_video',
			   popupParams);
}

function cliplister(){ return false; }

function factfinder_clicktracking(n, query, product_name, product_number, channel, artSimi, sessionId, pageSize, pageNum) {
	/**
	 * note: substracting 0 forces javascript strings to integer type
	 *       e.g.: "21" - 0 => 21
	 */

	// find highest div for this entry (div with id attribute)
	while(n = n.parentNode) {
		if(/^plist\d+/i.test(n.id)) break;
	}
	n           = $(n); // jquery
	var num     = n.attr('id').replace(/\D+/g,'') - 0; // entry number within current page (e.g. 0-8)
	pageSize   -= 0; // convert page size to integer
	pageNum    -= 0; // convert page number to integer
	artSimi    -= 0; // convert similarity to integer
	var data = { // data for ajax request
			'query'         : query,
			'id'            : product_number,
			'pos'           : (pageNum * pageSize - pageSize) + num,
			'origPos'       : num,
			'page'          : pageNum,
			'simi'          : artSimi,
			'sid'           : sessionId,
			'title'         : product_name,
			'pageSize'      : $('.prodLine').find('[id^=plist]').length,
			'origPageSize'  : pageSize,
			'channel'       : channel,
			'event'         : 'click'
			};
		// console.log(data); // firebug console output
	// send data via ajax
	$.ajax({
			'type'          : 'POST',
			'url'           : 'http://www.walzkidzz.de/typo3conf/ext/dmc_mb3_search_factfinderremote/libs/factfindertracker.php',
			'data'          : data,
			'contentType'   : 'application/x-www-form-urlencoded; charset=UTF-8',
			'cache'         : false,
			'async'         : false
	});
}

/*	This function is called when the user has answered the stokke questions correctly.
	Called from the page "stokke_recipient", this method adds the product finally to the basket. */
function returnStokkeSuccess() {
	if (typeof product01 == 'object') {
		product01.addToBasketParams.isStokkeProduct = 0;
		$(product01.parentContainerObj).find('#' + product01.productForm).submit();
	}
}

(function() {
	window.ajaxLoadPagingLinks = function(data) {
		var url		= 'http://www.walzkidzz.de/index.php?eID=ajaxPagingLinks';

		$.ajax({
		   type		:'GET',
		   url		: url,
		   data		: data,
		   dataType	: 'json',
		   success	: function(result){
				   ajaxLoadPagingLinksResponse(result);
		   }
		});

	}; // end: function initAjaxAvailability

	function ajaxLoadPagingLinksResponse(result) {
		if( result != false ) {
			if ( result.pagingUrl.prev != false ) {
				$('.pdsPaging #pdsPagingPrev').attr("href", result.pagingUrl.prev);
			} else if ( result.pagingUrl.next ) {
				$('.pdsPaging #pdsPagingPrev').attr("href", 'javascript:void(0)');
				$('.pdsPaging #pdsPagingPrev').attr("class", 'inactive');
			} else {
				$('.pdsPaging #pdsPagingPrev').css({'display':'none'});
				$('.pdsPaging .spacer').html(' ');
				$('.pdsPaging .spacer').attr('class', 'inactive');
			}

			if( result.pagingUrl.next != false ) {
				$('.pdsPaging #pdsPagingNext').attr("href", result.pagingUrl.next);
			} else if ( result.pagingUrl.prev ) {
				$('.pdsPaging #pdsPagingNext').attr("href", 'javascript:void(0)');
				$('.pdsPaging #pdsPagingNext').attr("class", 'inactive');
			} else {
				$('.pdsPaging .spacer').html(' ');
				$('.pdsPaging .spacer').attr('class', 'inactive');
				$('.pdsPaging #pdsPagingNext').css({'display':'none'});
			}
		} // end: if
	};

})();

function deleteNpadOrderline( uid, name, orderlinePK ){
	var obj = document.getElementById('deleteNotepadOrderline');
	var tmp = uid.split('_');
	var parent_uid = tmp[0];
	var formObj = document.getElementById('dmc_mb3_notepad_pi1['+parent_uid+'][form]');
	obj.name = name;
	obj.value = orderlinePK;
	formObj.submit();
}

function deleteGiftdeskOrderlineWithConfirm( uid, deleteFieldName, orderlinePK, confirmationText ) {
	var check = confirm(confirmationText);
	if( check ) {
		// hidden field, which contains the information about what should be deleted
		var obj = document.getElementById('deleteGiftdeskOrderline');
		obj.name = deleteFieldName;
		obj.value = orderlinePK;
		var tmp = uid.split('_');
		var parent_uid = tmp[0];
		var formObj = document.getElementById('dmc_mb3_giftdesk_pi1['+parent_uid+'][form]');
		formObj.submit();
	} else {
		return false;
	}
}

function deleteBasketOrderline( uid, name, orderlinePK ){
	var obj = document.getElementById('deleteOrderline');
	var tmp = uid.split('_');
	var parent_uid = tmp[0];
	var formObj = document.getElementById('dmc_mb3_shoppingbasket_pi1['+parent_uid+'][form]');
	if (confirm (deleteOrderlineNotice) == true){
		obj.name = name;
		obj.value = orderlinePK;
		formObj.submit();
	}

}

function allIntoShoppingBasket( uid, name ) {
	var obj = document.getElementById('allIntoBasket');
	var formObj = document.getElementById('dmc_mb3_notepad_pi1['+uid+'][form]');
	obj.name = name;
	obj.value = 'moveAllOrderlines';
	formObj.submit();
}

function allIntoShoppingBasketFromGiftdesk( uid, name ) {
	var obj = document.getElementById('allIntoBasketFromGiftdesk');
	var formObj = document.getElementById('dmc_mb3_giftdesk_pi1['+uid+'][form]');
	obj.name = name;
	obj.value = 'moveAllOrderlinesFromGiftdesk';
	formObj.submit();
}

function changeOrderlineStatus( uid, changeFieldName, orderlinePK ) {
	// hidden field, which contains the information about which orderline should be changed
	var obj = document.getElementById('changeGiftdeskOrderline');
	obj.name = changeFieldName;
	obj.value = orderlinePK;
	var tmp = uid.split('_');
	var parent_uid = tmp[0];
	var formObj = document.getElementById('dmc_mb3_giftdesk_pi1['+parent_uid+'][form]');
	formObj.submit();
}

function truncateArtDescr() {
	$('.articleDescr').each(function (iIndex, oNode){
		// get the trimmed article text
		var sText = $('a', oNode).contents().first().text().replace(/^\s+/, '').replace(/\s+$/, '');
		var oChildren = $('a', oNode).children();
	    while ($(oNode).height() < $(oNode)[0].scrollHeight) {
	        if (sText.length <= 3) {
	            return true;
	        }
			var sTextBefore = sText;
			sText = sText.replace(/\s[^\s]*$/, '...');
	        $('a', oNode).text(sText).append(oChildren);
			if (sTextBefore == sText) {
				// Text is the same as before replacement, meaning
				// that there is nothing more to truncate (this is a single long word)
				// leave the text as is
				return true;
			}
	    }
	});
}

var shoppingbasketFormDoubleSubmit = false;

function shoppingbasketFormSubmit(ctype, uid, nextstepValue, formnum) {
	var formId = '';
	/* special configuration:
	*  with the additional parameter you can have more than one form on a page
	*  else-Part is done due to IE7 not recognizing the right hidden field (maybe parser Bug?)
	*/
	if (formnum){
		formId = '['+formnum+']';
	}else{
		var overidefieldnum = document.getElementById('overidefieldnum');

		if(overidefieldnum){
			newId = overidefieldnum.value
			formId = '['+newId+']';
		}
	}

	var form			= document.getElementById(ctype + '[' + uid + ']' + '[form]' + formId);
	var nextstep		= document.getElementById(ctype + '[' + uid + ']' + '[nextstep]' + formId);

	if (shoppingbasketFormDoubleSubmit == false) {
		if (form && nextstep && nextstepValue > 0) {
			shoppingbasketFormDoubleSubmit = true;
			nextstep.value 	= '' + nextstepValue;
			form.submit();
		}
	}
}

function shoppingbasketFormChangeAction(ctype, uid, oldAction, newAction) {

	var action			= document.getElementById(ctype + '[' + uid + ']' + '[action][' + oldAction + ']');

	if (action) {
		action.value = newAction;
	}
}

/**
 * copies the benefit code (which is either a voucher or promotion code)
 * into the correct input field and sets the action accordingly
 */
function filloutBenefit(bVoucherAllowed, bPromotionAllowed) {
	var sBenefitCode = $('#benefitInput').val().toUpperCase();
	if (typeof (sBenefitCode) == 'undefined' || sBenefitCode == '' || sBenefitCode == $('#benefitInput').attr('data-hint')) {
		// the benefitInput is not available at all -> it is not set
		return false;
	}

	// show the user we only accept uppercase codes
	$('#benefitInput').val(sBenefitCode);

	if (!/^([a-z0-9]{11}|\d{3}[a-z0-9]{3}|\d{7,10})$/i.test(sBenefitCode)) {
		$('#errorBenefitCombined').show();
		window.scrollTo(0,0);
		return false;
	}

	$('#errorBenefitCombined').hide();
	var sAction = 'promotionCheck';

	// clear all values
	$('#voucherCode').val('');
	$('#cryptCode').val('');
	$('#promotion2').val('');

	if (bPromotionAllowed && /^[a-z0-9]{11}$/i.test(sBenefitCode)) {
		$('#cryptCode').val(sBenefitCode);
	} else if (bPromotionAllowed && /^\d{3}[a-z0-9]{3}$/i.test(sBenefitCode)) {
		$('#promotion2').val(sBenefitCode);
	} else if (bVoucherAllowed && /^\d{7,10}$/.test(sBenefitCode)) {
		sAction = 'voucherpayoff';
		$('#voucherCode').val(sBenefitCode);
	}

	$('#benefitAction').val(sAction);

	return true;
} // end: function filloutBenefit

/**
 * checks if anything was entered into the benefit input
 * or not
 */
function benefitNotSet() {
	var sBenefitCode = $('#benefitInput').val();

	if (typeof (sBenefitCode) == 'undefined' || sBenefitCode == '' || sBenefitCode == $('#benefitInput').attr('data-hint')) {
		return true;
	} else {
		return false;
	}
}// end: function benefitNotSet

function removeVoucher(sVouchercode) {
	$('#removeBenefit').val('removeVoucher');
	$('#voucherCode').val(sVouchercode);
}// end: function removeVoucher

function removePromotion(sPromotioncode) {
	$('#removeBenefit').val('removePromotion');
	$('#promotion2').val(sPromotioncode);
}// end: function removePromotion

function shoppingbasketCheckPaymentType(ctype, uid, installment){
	var installmentCheckBox = document.getElementById(ctype + '[' + uid + ']' + '[installment][checkbox]');

	var mode	= installmentCheckBox.checked;
    if(installment == '1') {
		installmentCheckBox.disabled = false;
	} else {
		installmentCheckBox.checked	= false;
		installmentCheckBox.disabled = true;
	}
}

/**
* This is used for the extension specific functions
*
* @package		mb3p
* @subpackage	shoppingbasketcached
* @access		public
* @author	    Boris Azar
* @version		1.0.0
*/
var dmc_mb3_shoppingbasketcached = {

	// public method for url decoding
	decode : function (data) {
		var lsRegExp = /\+/g;
		// Return the decoded string
		return unescape(String(data).replace(lsRegExp, " "));
	}
}

/**
* Shoppingbasketcached function
*
* @package		mb3p
* @subpackage	shoppingbasketcached
* @access		public
* @author	    Boris Azar
* @version		1.0.0
*/

/**
* Sets a cookie
*
* @param string 	basketAmountContainerId			id of the basketAmountContainer
* @param string 	articlesAmountContainerId		id of the articlesAmountContainer
* @return void
*/
function fillShoppingBasketWithData(basketAmountContainerId, articlesAmountContainerId, tipText) {
	var articlesAmountContainer = document.getElementById(articlesAmountContainerId);
	var basketAmountContainer = document.getElementById(basketAmountContainerId);

	var cookieData = cookie_get('mb3pc');
	
	if (cookieData && typeof cookieData != 'undefined') {

		var data = JSON.parse(cookieData);
		
		if (data) {
			// get the articlesAmountContainer object and set data in it
			if (articlesAmountContainer
				&& typeof data.shoppingbasket.articlesAmount != 'undefined') {

				// do not forget to decode the data (+ signs are converted back to spaces)
				articlesAmountContainerValue = dmc_mb3_shoppingbasketcached.decode(data.shoppingbasket.articlesAmount);

				// get the articlesAmountContainer object and set data in it
				if (articlesAmountContainer) {
					// do not forget to decode the data (+ signs are converted back to spaces)
					articlesAmountContainerValue = htmlEntities(articlesAmountContainerValue);
					articlesAmountContainer.innerHTML = articlesAmountContainerValue;
				} // end: if

			} // end: if

			// get the basketAmountContainer object and set data in it
			if (basketAmountContainer
				&& typeof data.shoppingbasket.basketAmount != 'undefined') {

				// do not forget to decode the data (+ signs are converted back to spaces)
				basketAmountContainerValue = dmc_mb3_shoppingbasketcached.decode(data.shoppingbasket.basketAmount);

				// get the basketAmountContainer object and set data in it
				if (basketAmountContainer) {
					// do not forget to decode the data (+ signs are converted back to spaces)
					basketAmountContainerValue = htmlEntities(basketAmountContainerValue);
					basketAmountContainer.innerHTML = basketAmountContainerValue;
				} // end: if
			} // end: if

			if (typeof data.shoppingbasket.basketAmount != 'undefined'
				&& data.shoppingbasket.freeDelivery == 1) {
				var basketDisplayContentContainer = document.getElementById('basketDisplayContent');
				basketDisplayContentContainer.className = basketDisplayContentContainer.className + ' addText';
			}

			if(data.shoppingbasket.basketAddStatus == 1) {
				showToolTip(basketAmountContainerId,tipText);
			} // end: if

			resetCookie();
		} // end: if
	} // end: if
} // end: function

function resetCookie() {
	var cookieData = cookie_get('mb3pc');
	if (cookieData && typeof cookieData != 'undefined') {
		var data = JSON.parse(cookieData);

		if (data) {
			data.shoppingbasket.basketAddStatus = "0";
			cookieDataUpdated = JSON.stringify(data);
			cookie_set('mb3pc',cookieDataUpdated,'','/');
		}// end: if

	} // end: if
}// end: function

function isBasketEmpty(){
	var cookieData  = cookie_get('mb3pc');
	var retval 	    = true;

	if (cookieData && typeof cookieData != 'undefined') {

		var data = JSON.parse(cookieData);
		if (data) {
			if (typeof data.shoppingbasket != 'undefiend' && data.shoppingbasket.articlesAmount != 0) {
				retval = false;
			}
		}
	}
	return retval;
}

/**
* performs delivery address name change submit defined by ctype and uid
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function deliveryAddressChangeName(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]');
	if (form) {
		document.getElementById(ctype + '[' + uid + ']' + '[action]' + '[changeDeliveryCustomer]').value = "loadDeliveryAddress";
		form.submit();
	} // end: if
} // end: function


// delete Orderline
function deleteOrderline( uid, name, orderlinePK ){
	var obj = document.getElementById('deleteOrderline');
	var tmp = uid.split('_');
	var parent_uid = tmp[0];
	var formObj = document.getElementById('dmc_mb3_shoppingbasket_pi1['+parent_uid+'][form]');
	if (confirm (deleteOrderlineNotice) == true){
		obj.name = name;
		obj.value = orderlinePK;
		formObj.submit();
	}

}

function moveToNotepad(obj,orderlinePk) {
    var form = $(obj).closest("form");

    // Create a new hidden element for the orderline that need to be moved to notepad and
    // Append it to the form before submitting
    // The reason why we are doing this dynamically is that Bug_ID 1933
    var input = $("<input>").attr("type", "hidden").attr("name", $(obj).attr("name")).val(orderlinePk);
    $(form).append($(input));
    
    form.submit();
}

// this function triggers a move or copy action
function moveOrderline(uid, basicFieldName, actionType, orderlinePk, fromValue, toValue){

	// orderlinePk: assign a dummy hidden field with the correct name and value
	var obj 	= document.getElementById(fromValue+'ActionIdentifier');
	obj.name 	= basicFieldName+'[action]['+actionType+']['+orderlinePk+']';
	obj.value 	= orderlinePk;

	// to (OrderVO name): assign a dummy hidden field with the correct name and value
	var obj2 	= document.getElementById(fromValue+'OrderlineTo');
	obj2.name 	= basicFieldName+'[orderlineTo]';
	obj2.value 	= toValue;

	// from (OrderVO name): assign a dummy hidden field with the correct name (value is preset at the template!)
	var obj3 	= document.getElementById(fromValue+'OrderlineFrom');
	obj3.name 	= basicFieldName+'[orderlineFrom]';
	obj3.value 	= fromValue;

	var tmp 		= uid.split('_');
	var parentUid 	= tmp[0];

	// determine the extension name
	if( fromValue == 'shoppingcart' ) {
		var extensionName = 'dmc_mb3_shoppingbasket_pi1';
	} else if( fromValue == 'notepad' ) {
		var extensionName = 'dmc_mb3_notepad_pi1';
	} else if( fromValue == 'giftdesk' ) {
		var extensionName = 'dmc_mb3_giftdesk_pi1';
	}

	var formObj = document.getElementById(extensionName+'['+parentUid+'][form]');
	formObj.submit();
}

// Shows or hides payment, delivery and subdelivery radio buttons dependent
// on which options are allowed in the given context (for example 'prepayment'
// is not allowed in combination with '24h express' delivery.
function updatePaymentAndDeliveryTypeVisibility() {
	var $ = jQuery;

	// Find involved radio buttons and labels.
	var radioPrepayment = $('#payment_prepayment');
	var labelPrepayment = $('label[for=payment_prepayment]');
	var radio24hExpress = $('#input_deliverysubtype_24hexpress');
	var label24hExpress = $('label[for=input_deliverysubtype_24hexpress]');

	// Show or hide involveld radion buttons and labels dependent on the
	// current context.
	if (radioPrepayment.size()&& radio24hExpress.size()) {
	 	if (radioPrepayment.attr('checked')) {
			radio24hExpress.hide();
			label24hExpress.hide();
		} else {
			radio24hExpress.show();
			label24hExpress.show();
	 	} // end: if

	 	if (radio24hExpress.attr('checked')) {
			radioPrepayment.hide();
			labelPrepayment.hide();
		} else {
			radioPrepayment.show();
			labelPrepayment.show();
	 	} // end: if
	} // end: if
} // end: function updatePaymentAndDeliveryTypeVisibility

/**
 * toggles function fot the the delivery address/packstation address
 *
 * @access public
 * @parameters ctype				the ctype
 * @parameters uid					the uid
 * @parameters state				boolean
 * @parameters checkboxId			the checkboxid
 * @parameters containerId			the containerid , the div box
 * @parameters actionName			the actionname
 * @parameters actionSetValue		the actionsetvalue for the next step
 * @parameters actionUnsetValue		the actionunsetvalue for the next step
 * @parameters todos				pass the function
 * @return void
 */
(function() {
	function toggleBox(ctype, uid, state, checkboxId, containerId, actionName, actionSetValue, actionUnsetValue, todos) {
		var checkbox = $('#' +checkboxId);
		var container = $('#' +containerId);

		var visible = ((container.css('display') != 'none') && (container.css('visibility') != 'hidden'));

		if ((!state || !visible) && (state !== false || visible)) {

			if (typeof todos == 'function') {
				todos();
			}

			container.animate({height: 'toggle', opacity: 'toggle'}, 'normal');
			checkbox.attr('checked', !visible);

			if (visible) {
				shoppingbasketFormChangeAction(ctype, uid, actionSetValue, actionUnsetValue);

			} else {
				shoppingbasketFormChangeAction(ctype, uid, actionSetValue, actionSetValue);
			} // end: if
		} // end: if
	}  // end: function toggleDeliveryAddress

	window.toggleLoginCustomer = function(ctype, uid, state) {
		toggleBox(ctype, uid, state, 'loginCustomerCheckbox', 'loginCustomerForm',
			'loginCustomer', 'loginCustomer', 'unsetloginCustomer'
		);
	}  // end: function toggleLoginCustomer


	window.toggleDeliveryAddress = function(ctype, uid, state) {
		toggleBox(ctype, uid, state, 'deliveryAddressCheckBox', 'shippingAddress_deliverycustomer',
			'deliveryAddress', 'deliveryAddress', 'unsetDeliveryAddress',
			function() {
				var elem = document.getElementById(ctype + '[' + uid + '][shippingAddress]');
				togglePackstationAddress(ctype, uid, false)
				elem.value = (elem.value == 2) ? 1 : 2;
			}
		);
	}  // end: function toggleDeliveryAddress


	/**
	 * toggles the packstation address
	 *
	 * @access public
	 * @return void
	 **/
	window.togglePackstationAddress = function(ctype, uid, state) {
		toggleBox(ctype, uid, state, 'packstationAddressCheckBox', 'packstationAddressForm',
			'delivery', 'shippingAddress', 'unsetDelivery',
			function() {
				var elem = document.getElementById(ctype + '[' + uid + '][shippingAddress]');
				toggleDeliveryAddress(ctype, uid, false)
				elem.value = (elem.value == 3) ? 1 : 3;
			}
		);
	}  // end: function togglePackstationAddress

})();



var creditcard_info = new Array();
creditcard_info[''] = '';

function setCreditCardInfoText() {
	//set specific info text
	$('#creditcard_info').html(creditcard_info[$('#ccard').val()]);
	// set specific length
	if($('#ccard').val()){
		
		// set maxlength to 4 or 3
		$('#checknbr').attr('maxLength',4);
		if($('#ccard').val() != 'AMX'){
			$('#checknbr').attr('maxLength',3);
		} // end: if
		
		// set maxlength to 16 or 15
		$('#cardnbr').attr('maxLength',16);
		if($('#ccard').value == 'AMX'){
			$('#cardnbr').attr('maxLength',15);
		} // end: if
	} // end: if
} // end: function setCreditCardInfoText

$(function() {
	setCreditCardInfoText();
});

function step15FormBehavior(ctype,uid){
	//set default setting
	$('.basketRegister .formElementContainer').hide();
	$('.alreadyCustomer input.radio').attr('checked', true);

	//change active class and show/hide formElementContainer
	$('.cartBox div.formContainer input.radio').click(function () {
		$('.step15 input.radio').attr('checked', false);
		$('.formElementContainer').hide();
		$(this).attr('checked', true);
		$(this).next().next('.formElementContainer').fadeIn('slow');
	});
	
	//check for validation error
	$('.cartBox div.formContainer').each(function(){
		if ($(this).find('input').hasClass('error')){
			$(this).find('input.radio').attr('checked', true);
			$(this).find('.formElementContainer').show();
		}
	});
	
	//check user is already logged in
	if ($('.alreadyLoggedin').size() !== 0){
		$('.step15 input.radio').attr('checked', false);
		$('.basketRegister input.radio').attr('checked', true);
		$('.formElementContainer').hide();
	}
	
	//bind the submit call
	$('.cartBox button').bind('click.submit', function() {
		if ($('.basketRegister input.radio').is(':checked')) {
			shoppingbasketFormSubmit(ctype, uid, 20, 2);
		}
		if ($('.basketDontRegister input.radio').is(':checked')){
			shoppingbasketFormSubmit(ctype, uid, 20, 3);
		}
		if ($('.alreadyCustomer input.radio').is(':checked')) {
			$('.alreadyCustomer').find('form').submit();
		}
	});
} // end: function step15FormBehavior

/*
 * function.js
 *
 * The content of this file is (c) 2003 - 2007 dmc
 * digital media center GmbH
 * All rights reserved
 *
 * This software is the confidential and proprietary
 * information of dmc digital media center GmbH.
 *
 */


/**
 * tooltip methods for the newsletter extension
 *
 * $Id: functions.js 3266 2007-05-16 08:26:34Z toegerol $
 */

var mouseX 			= 0;
var mouseY 			= 0;
var tooltip 		= null;

/**
*
* @access public
* @param  e
* @return void
*/
function getMouseXY(e) {

	if (document.all) {
		mouseX = window.event.x + document.body.scrollLeft;
		mouseY = window.event.y + document.body.scrollTop;

	} else {
		var Element = e.target;

		var CalculatedTotalOffsetLeft 	= 0;
		var CalculatedTotalOffsetTop 	= 0;
		while (Element.offsetParent)
		{
			CalculatedTotalOffsetLeft = Element.offsetLeft;
			CalculatedTotalOffsetTop = Element.offsetTop;
			Element = Element.offsetParent;
		} ;

		mouseX = e.pageX - CalculatedTotalOffsetLeft;
		mouseY = e.pageY - CalculatedTotalOffsetTop;
	} // end: if
} // end: function

/**
*
* @access public
* @param  x
* @param  y
* @return void
*/
function updateTooltip(x, y) {

	if (tooltip != null) {
		tooltip.style.left	= (x + 10) + 'px';
		tooltip.style.top 	= (y + 10) + 'px';
	} // end: if
} // end: function

/**
*
* @access public
* @param  id
* @return void
*/
function showTooltip(id) {
	tooltip = document.getElementById(id);

	if (tooltip.innerHTML != '') {
		tooltip.style.display 		= 'block';
		tooltip.style.visibility	= 'visible';
	} // end: if
} // end: function

/**
*
* @access public
* @return void
*/
function hideTooltip() {
	tooltip.style.display 		= 'none';
	tooltip.style.visibility	= 'hidden';

	tooltip = null;
} // end: function


$(function() {

    // On the Click the Admin Panel Menu of Sql Logger
    $('td:has(input[name=\'TSFE_ADMIN_PANEL[display_sqlloginfo]\']) a').mousedown(function(){
        var cookieData  = cookie_get('mb3pc');
        var value = document.TSFE_ADMIN_PANEL_FORM['TSFE_ADMIN_PANEL[display_sqlloginfo]'].value;
        var status = 'closed';

        // The reason we have value == 0 then open is that mousedown event occurs
        // before the onclick event
        if(value == 0){

            status = 'open';
        } // end: if
        // set cookie value
        if (cookieData && typeof cookieData != 'undefined') {

            var data = JSON.parse(cookieData);
            if (data) {

                // update value
                data.sqlLogger = status;

                // update cookie
                cookieDataUpdated = JSON.stringify(data);
                cookie_set('mb3pc',cookieDataUpdated,'','/');
            } // end: if
        } // end: if
    });

    // On the click of the submit button
    $('.typo3-adminPanel-update').click(function(){

        var cookieData  = cookie_get('mb3pc');

        // set cookie value
        if (cookieData && typeof cookieData != 'undefined') {

            var data = JSON.parse(cookieData);
            if (data) {

                if($('input[name="TSFE_ADMIN_PANEL[save_check]"]:checked').val()) {

                    data.savefile_name  = $('input[name="TSFE_ADMIN_PANEL[savefile_name]"]').val();

                } else {

                    data.savefile_name  = '';
                } // end: if

                // update cookie
                cookieDataUpdated = JSON.stringify(data);
                cookie_set('mb3pc',cookieDataUpdated,'','/');
            } // end: if
        } // end: if
    });
});

/**
 *  Method to toggle the sql queries container
 *  Can be either typo3 or mb3 queries
 *  @param string 
 *
 */
function toggleView(objId) {

    if (objId) {
        var object              = document.getElementById(objId);
        var showQueryTextObj    = $('input:[name="TSFE_ADMIN_PANEL[show_query_'+ objId +']"]');

        if (object) {
            oldState = object.style.visibility;
            switch (oldState) {
                case 'visible':
                    object.style.visibility = 'hidden';
                    object.style.display = 'none';
                    showQueryTextObj.val(0);
                    break;

                default:
                    object.style.visibility = 'visible';
                    object.style.display = 'block';
                    showQueryTextObj.val(1);
                    break;
            } // end: switch

        } /* end: if */

    } /* end: if */
} // end: function  toggleView
var blockPriceList = new Array();
var artNumberOld 	= 0;

var exprSearchAll = /^\d{3,4}\.?\d{3}(\.?\w{3})?$/;
var exprSearchAuto = /^\d{3,4}\.\d{3}\.\w{3}|\w{10}$/;

function orderFormChangeAction(ctype, uid, actionName, actionValue, additionalParam, lineNumberIn) {
    var myBtn = $('#textimage_add_to_basket_1');
    // if function has no inputs, check if jData is set and take values:
    if(myBtn.data('vars') && myBtn.data('vars').waiting4Submit){
        ctype           = myBtn.data('vars').ctype;
        uid             = myBtn.data('vars').uid;
        actionName      = myBtn.data('vars').actionName;
        actionValue     = myBtn.data('vars').actionValue;
        additionalParam = myBtn.data('vars').additionalParam;
        lineNumberIn    = myBtn.data('vars').lineNumberIn;
        myBtn.data('vars').waiting4Submit = false;
    }
    // only submit if ajax is not busy
    if(!$('#ordernb1_0').data('busy')){
        var form			= document.getElementById(ctype + '[' + uid + ']' + '[form]');
        var action			= document.getElementById(ctype + '[' + uid + ']' + '[action]');

        if(additionalParam != null) {
            additionalParam	= '[' + additionalParam + ']';
        }else{
            additionalParam = '';
        }

        if(lineNumberIn != null) {
            lineNumber	= lineNumberIn;
        }

        if (action) {
            action.name		= ctype + '[' + uid + '][action][' + actionName + ']' + additionalParam;
            action.value	= actionValue;
        }

        if( checkOrderlineFields(lineNumber) == true){
            form.submit();
        }
    // if ajax is busy, write params in jData
    }else{
        myBtn.data('vars', {
           waiting4Submit: true,
           ctype: ctype,
           uid: uid,
           actionName : actionName,
           actionValue : actionValue,
           additionalParam : additionalParam,
           lineNumberIn : lineNumberIn
        });
    }
}

function setDivVisible(field) {
	if (document.getElementById('selectbox_' + field).length > 1) {
		document.getElementById('selectdiv_' +field).style.marginLeft = "0px";

		// the min height is not necessary if there are crosssell
		// products, because these make the box big enough anyway
		if (!document.getElementById('recommendations')) {
			document.getElementById('cartBoxDirectHeight').style.minHeight  = "320px";
		}
	}
}

function setDivInvisible(field){
  document.getElementById('selectdiv_' +field).style.marginLeft = "-1000px";
  document.getElementById('cartBoxDirectHeight').style.height = "auto";
}

function setupFields() {
    var tmpVal = '';
	for (var lineNumber=0; lineNumber < numberOfOrderlines; lineNumber++) {
		updateComponentView(lineNumber);
        // set art-nr from hidden in input field if available:
        tmpVal = $('#text_artnumber_'+lineNumber).attr('value');
        if(tmpVal){
            tmpVal = tmpVal.length > 9 ? tmpVal : '0' + tmpVal;
            tmpVal = tmpVal.substr(0,4)+'.'+tmpVal.substr(4,3)+'.'+tmpVal.substr(7,3);
            $('#ordernb1_'+lineNumber).attr('value',tmpVal);
        }
	}
}

function updateComponentView(lineNumber) {
	// find componentView text field and clear it
	var inputComponentView	= document.getElementById('text_componentView_' + lineNumber);
	var alreadyUpdated		= inputComponentView.alreadyUpdated;
	var oldComponentView	= '';
	var oldArticleSize		= null
	var oldComponentViewStillAvailable = false;

	if (!alreadyUpdated) {
		inputComponentView.alreadyUpdated = true;
	} else {
		inputComponentView.className = inputComponentView.className.replace('error', 'noError');
		oldComponentView = inputComponentView.value;
		inputComponentView.value = '';
	}

	// removes all options from the selectbox
	var selectboxComponentView = document.getElementById('selectbox_componentView_'+lineNumber);

	for (var i=selectboxComponentView.length; i > 0; i--) {
		selectboxComponentView.options[i-1] = null;
	}


	// adds available options from the array to the selectbox
	var artnumber = document.getElementById('text_artnumber_'+lineNumber).value;
	if (artnumber && articleData[artnumber]) {
		// find article that has the current componentSpec and fetch the articleSize
		for (var tmpArticleSize in articleData[artnumber]) {
			if (articleData[artnumber][tmpArticleSize].componentSpec == oldComponentView) {
				oldArticleSize = tmpArticleSize;
				break;
			} // end: if
		} // end: for

		for (var articleSize in articleData[artnumber]) {
			if (typeof(articleData[artnumber][articleSize]) == 'object') {
				if (oldArticleSize != null && articleSize == oldArticleSize) {
					oldComponentViewStillAvailable = true;
				} // end: if
				newoption = new Option(articleData[artnumber][articleSize].componentSpec, articleSize);
				selectboxComponentView.options[selectboxComponentView.length] = newoption;
			} // end: if
		} // end: for
	} // end: if

	if (oldComponentViewStillAvailable) {
		inputComponentView.value = oldComponentView;
	} else {
		//preset the first option if there is only one or invalid option
		if (selectboxComponentView.length == 1 ||
			(selectboxComponentView.length > 0 && (!inputComponentView.value))) {
			inputComponentView.value = selectboxComponentView.options[0].text;
		}
	}

	if(inputComponentView.value=='-'){
		document.getElementById('text_componentView_'+lineNumber).readOnly=true;
	}

	updateGravure(lineNumber);
}

function updateStaticFields(lineNumber) {

	// sets static fields depending on the selection of the fields
	// 'artnumber', 'variation', 'componentView' and 'amount'
	var artnumber		= document.getElementById('text_artnumber_'+lineNumber).value;
	var componentSpec	= document.getElementById('text_componentView_'+lineNumber).value;
	var articleSize		= null;
	var artSizeField	= document.getElementById('text_size_'+lineNumber);
	var amountField		= document.getElementById('text_amount_'+lineNumber);
	// default settings
	var amountNum         = '';
	var description       = '';
	var imageURL          = clearGif;
	var imageHeight       = 1;
	var productlink       = '#';
	var singlePrice       = '';
	var	totalPrice        = '';
	var	stocktype         = '';
	var	stocktypecode     = '';
	var	stockunit         = '';
	var stocktypeHTML     = '';
	var weeksToDelivery   = 0;
	var baseUnitPriceText = '';

	// field that depend on articlenumber only
	if (artnumber && articleData[artnumber]) {
		// find article that has the current componentSpec and fetch the articleSize
		for (var tmpArticleSize in articleData[artnumber]) {
			if (articleData[artnumber][tmpArticleSize].componentSpec == componentSpec) {
				articleSize = tmpArticleSize;
				break;
			} // end: if
		} // end: for

		// if set it could display the producttext even before component is chosen.
		//description = articleData[artnumber]['text'];
		imageURL	= articleData[artnumber]['imageURL'];
		imageHeight = 40;
		productlink = 'product/' + articleData[artnumber]['productPk'] + '/group/' + articleData[artnumber]['groupPk'] + productURL;
	}

	if (artnumber){
		// remap artnumber
		var artNum = artnumber;
		if(artnumber.length>10){
			artNum = artnumber.substring(1);
		}

		var artNb1 = $('#text_artnumber_'+lineNumber);
		artNb1.val(artNum);
	}

	// fields that depend on all attributes
	if (artnumber && articleData[artnumber]
		&& articleData[artnumber][articleSize]) {

		if (articleData[artnumber][articleSize]['variation'] > 0) {
			description = description+'<BR />'+articleData[artnumber][articleSize]['variation'];
		}
		singlePriceNum 	= (parseFloat(articleData[artnumber][articleSize]['price'])).toFixed(2);
		amountNum 		= parseInt(amountField.value);

		if (isNaN(amountNum) || amountNum <= 0) {
			amountNum = 1;
		} else if (amountNum > 100) {
			amountNum = 100;
		}

		amountField.className = amountField.className.replace('formError', 'noError');
		artSizeField.value = articleData[artnumber][articleSize]['size'];

		if (isNaN(singlePriceNum))  {
			singlePrice = '';
		} else {
			singlePrice = singlePriceNum+' '+currency;
		}
		if (isNaN(singlePriceNum))  {
			totalPrice = '';
		} else {
			totalPrice = (singlePriceNum * amountNum).toFixed(2)+' '+currency;
		}
		description = articleData[artnumber][articleSize]['text'];
		stocktype	= stockTypeCodes[articleData[artnumber][articleSize]['stocktype']];
		stocktypecode	= articleData[artnumber][articleSize]['stocktype'];
		stockunit   = articleData[artnumber][articleSize]['stockunit'];
		weeksToDelivery = articleData[artnumber][articleSize]['weeksToDelivery'];

		if (typeof(articleData[artnumber][articleSize]['baseUnitPrice']) != 'undefined') {

			baseUnitPriceText     = '<br />' + llBaseUnitPrice + ': ';
			var baseUnitPrice     = articleData[artnumber][articleSize]['baseUnitPrice'].toFixed(2).replace('.',',');
			var baseUnitParts     = articleData[artnumber][articleSize]['baseUnit'].split(' ');
			var baseUnitAmount    = baseUnitParts[0];
			var baseUnit          = baseUnitParts[1];
			if (typeof(unitMappings[baseUnit]) != 'undefined') {
				baseUnit = unitMappings[baseUnit];
			}

			baseUnitPriceText += baseUnitAmount + '&nbsp;' + baseUnit + ' = ' + baseUnitPrice + '&nbsp;' + currency;

		}
	}

	if(stocktypecode!='' && stocktype!=''){
		if (stocktypecode==2 && weeksToDeliveryInfo!='' && weeksToDelivery>0){
			stocktype = weeksToDeliveryInfo.replace('###weeksToDelivery###', weeksToDelivery);
		}
		stocktypeHTML = '<span class="stock_'+stocktypecode+'">'+stocktype+'</span>';
	}
	document.getElementById('text_amount_'+lineNumber).value = amountNum;
	document.getElementById('label_singleprice_'+lineNumber).innerHTML = singlePrice.replace('.',',');
	document.getElementById('label_totalprice_'+lineNumber).innerHTML = totalPrice.replace('.',',');
	document.getElementById('label_description_'+lineNumber).innerHTML = description;
	document.getElementById('label_stocktype_'+lineNumber).innerHTML = stocktypeHTML;
	document.getElementById('label_stockunit_'+lineNumber).innerHTML = stockunit;
	document.getElementById('label_image_'+lineNumber).src = imageURL;
	document.getElementById('label_image_'+lineNumber).width = imageHeight;
	document.getElementById('productlink_'+lineNumber).value = productlink;
	document.getElementById('baseUnitPrice_'+lineNumber).innerHTML = baseUnitPriceText;

	if (javaErrorcheck) {
		errorCheck(lineNumber);
	}

}


function errorCheck(lineNumber) {
	var error			= false;
	var errorLabel		= "";
	var artnumber		= document.getElementById('text_artnumber_'+lineNumber).value;
	var componentSpec 	= document.getElementById('text_componentView_'+lineNumber).value;
	var articleSize		= null;
	var classname		= "";

	if (artnumber.length > 0) {

		if(articleData[artnumber]) {
			// find article that has the current componentSpec and fetch the articleSize
			for (var tmpArticleSize in articleData[artnumber]) {
				if (articleData[artnumber][tmpArticleSize].componentSpec == componentSpec) {
					articleSize = tmpArticleSize;
					break;
				} // end: if
			} // end: for

			classname = document.getElementById('text_artnumber_' +lineNumber).className.replace("error", "noError");
			document.getElementById('text_artnumber_' +lineNumber).className = classname;
			document.getElementById('ordernb1_'+lineNumber).className = classname;
			if (articleSize.length > 0) {
				if (articleData[artnumber][articleSize]) {
					classname = document.getElementById('text_componentView_' +lineNumber).className.replace("error", "noError");
					document.getElementById('text_componentView_' +lineNumber).className = classname;

				} else {
					errorLabel = 'articleSize';
				}
			}
		} else {
			errorLabel = 'artnumber';
		}
	}

	if (errorLabel.length > 0) {

		var errorTextKey = errorLabel;

		if (errorLabel != 'soldout') {
			classname = document.getElementById('text_'+errorLabel+'_'+lineNumber).className.replace("noError", "error");
			document.getElementById('text_'+errorLabel+'_'+lineNumber).className = classname;
		}

		if(articleData['not_online']){
			errorTextKey = 'orderonline';
		}

		document.getElementById('error_'+lineNumber).innerHTML = errorTexts[errorTextKey];

		document.getElementById('errorbox_' +lineNumber).className = ' errorVisible';


		if(errorLabel == 'artnumber'){
			document.getElementById('ordernb1_'+lineNumber).className = classname;
		}
	} else {
		document.getElementById('errorbox_' +lineNumber).className = ' errorHidden';
	}
}

function fieldOnFocus(field, lineNumber) {

	var tmpValue = document.getElementById('text_'+field+'_'+lineNumber).value;
	if(tmpValue!='-'){
		document.getElementById('selectbox_'+field+'_'+lineNumber).selectedIndex = 0;
		setDivVisible(field+'_'+lineNumber);
		setTimeout( function() {document.getElementById('selectbox_'+field+'_'+lineNumber).focus();} , 100); // due to a bug in IE
	}
}

function fieldOnBlur(field, lineNumber) {

	setDivInvisible(field+'_'+lineNumber);
}

function fieldOnChange(field, self, lineNumber) {
	var index = self.selectedIndex;
	if(index >= 0) {
		document.getElementById('text_'+field+'_'+lineNumber).value = self.options[index].text;
	};
}

function fieldOnClick(field, lineNumber, nextFocus) {
	fieldOnBlur(field, lineNumber);
	var nextField = document.getElementById(nextFocus);
	if (nextField) {
		setTimeout( function() {nextField.focus();} , 100); // due to a bug in IE
	}
}

function addOrderline(lineNumber) {

	var numberOfOrderlines = parseInt(document.getElementById('numberOfOrderlines').value);
	/*/ if actual lineNumer is the last line of the orderform
	if ((numberOfOrderlines-1) == parseInt(lineNumber)) {
		template = document.getElementById('orderlineTemplate').innerHTML;
		template = template.replace(/JSMARKERNUM/g, numberOfOrderlines);
		template = template.replace(/JSMARKERPLUS/g, (numberOfOrderlines + 1));
		template = template.replace(/JSMARKERMOD2/g, (numberOfOrderlines % 2));
		document.getElementById('addOrderline_'+numberOfOrderlines).innerHTML = template;
		document.getElementById('numberOfOrderlines').value = numberOfOrderlines + 1;
	}*/
}

/**
 * This function changes class of the current input field
 * to SET an error
 * feel free to add all error styling in this class to handle
 * errors a bit more "globaly"
 *
 * @access public
 * @param integer lineNumber
 * @return void
 **/
function showError(lineNumber){
    $('#ordernb1_'+lineNumber).addClass('error');
    $('#errorbox_'+lineNumber).css('display','table-row')
    $('#error_'+lineNumber).html(errorTexts['artnumber']);
    $('#error_'+lineNumber).addClass('errorVisible');
}

/**
 * This function changes class of the current input field
 * to UNSET an error
 * feel free to add all error styling in this class to handle
 * errors a bit more "globaly"
 *
 * @access public
 * @param integer lineNumber
 * @return void
 **/
function hideError(lineNumber){
    $('#ordernb1_'+lineNumber).removeClass('error');
    $('#errorbox_'+lineNumber).css('display','none')
    $('#error_'+lineNumber).html('');
    $('#error_'+lineNumber).removeClass('errorVisible');
}

function retrieveArticleData(lineNumber) {

	artNumberOld 	= document.getElementById('text_artnumber_'+lineNumber).value;
	var artnumber 	= document.getElementById('text_artnumber_'+lineNumber).value;
	ajaxCall = false;

	if (artnumber.length > 0) {
		if (typeof(articleData[artnumber]) == 'object') {
			//article data already exists
		} else {
			ajaxCall = useAjax;
		}
	}

	if (ajaxCall) {

		var url		= 'http://www.walzkidzz.de/typo3conf/ext/dmc_mb3_orderform/ajaxGetArticleData.php';
		var data	= 'artnumber='+artnumber
					+'&clientPk='+clientPk
					+'&languagePk='+languagePk
					+'&lineNumber='+lineNumber
					+'&rnd='+Math.random();

        $.ajax({
            type	: 'POST',
            url		: url,
            data	: data,
            dataType: 'json',
            success	: function(result){
                response(result);
            },
            complete: function(){
                // set busy flag back to false
                $('#ordernb1_'+lineNumber).data('busy', false);
                // check if submit button is triggerd in orderFormChangeAction
                if($('#textimage_add_to_basket_1').data('vars') && $('#textimage_add_to_basket_1').data('vars').waiting4Submit){
                    orderFormChangeAction();
                }
            }
		 });

	} else {
        $('#ordernb1_'+lineNumber).data('busy', false);
		updateComponentView(lineNumber);
        setTimeout( function() { document.getElementById('text_componentView_'+lineNumber).focus();} , 100); // due to a bug in IE
	}
}

function response(result) {

	var artnumber = result['artnumber'];
	var lineNumber = result['lineNumber'];
	var adCode = '';

	articleData['not_online'] = false;
	if (result['status'] == 'found') {
		$('#ordernb1_' + lineNumber).val(getFormattedArtNo(result['artnumber']));
		articleData[artnumber] = result['properties'];
	} else if (result['status'] == 'not_online') {
		articleData['not_online'] = true;
	}
	document.getElementById('text_artnumber_'+lineNumber).value = artnumber;
	updateComponentView(lineNumber);
	document.getElementById('text_componentView_'+lineNumber).focus();
    setTimeout( function() { document.getElementById('text_componentView_'+lineNumber).focus();} , 100); // due to a bug in IE
	fieldOnFocus('componentView',lineNumber);
}


function blockPriceInfoResponse(blockPriceresult, element, artnumber) {
	if (blockPriceresult['status'] == 'found') {
		blockPriceList = blockPriceresult['blockPrice'];
	} // end: if

	if(typeof blockPriceList != 'undefined') {
		content = "<table><tr><td colspan=3 bgcolor=white>"+blockPriceTitle+"</td></tr><tr><td>"+hintMinQtyText+"</td><td>"+hintMaxQtyText+"</td><td>"+hintPriceText+"</td></tr>";
		for(var articlePk in blockPriceList[0]) {

			for(var i in blockPriceList[0][articlePk]) {
				minQty		= blockPriceList[0][articlePk][i]['minQuantity'];
				maxQty		= blockPriceList[0][articlePk][i]['maxQuantity'];
				blockPrice	= blockPriceList[0][articlePk][i]['price'];
				content = content+"<tr><td>"+minQty+"</td><td>"+maxQty+"</td><td>"+blockPrice+"</td></tr>";
			} // end: for

		} // end: for

		content = content+"</table>";
		if(content != '' && blockPriceList != '' && artnumber != '') {
			showToolTip(element, content, "", true);
		} // end: if
	} // end: if
}


function productInfoPopup(productlinkId,titleId) {

	var popupurl = document.getElementById(productlinkId).value;
	var title = document.getElementById(titleId);
	if (title) {
		title = title.textContent;
	} else {
		title = '';
	}
	openJQueryPopupWindow(popupurl,title,'width=705,height=510,scrollbars=yes,resizable=no,toolbar=no,status=no,directories=no,menubar=no,location=no')

}

function nextField(e, source, dest, fieldlen) {
 	if (!e) var e = window.event;

 	// Keine Controlchars
 	if (e.keyCode > 32)
 	{
 		if (source.value.length == fieldlen)
 		{
 			dest.value='';
 			setTimeout( function() { dest.focus();} , 100); // due to a bug in IE
 		}
 	}
} //function

function checkArtNumberField (e, artNumberFieldId, lineNumber) {
	var artNb1 = document.getElementById('text_artnumber_'+lineNumber);
	var artNb = artNb1.value;

	var artNumberField = document.getElementById(artNumberFieldId);

	if (!e) var e = window.event;
 	// Keine Controlchars
 	if (e.keyCode > 32)
 	{
	 	if (artNumberField && artNb.length == 10) {
	 		artNumberField.value = artNb;
	 		addOrderline(lineNumber)
	 		retrieveArticleData(lineNumber)
	 	}//if
	 }
}//function

function checkOrderlineFields(orderlineNum){

		if( !articleData || articleData['not_online'] ){
			return false;
		}

		var boolReturn = true;

		var amountFieldId = 'text_amount_'+orderlineNum;
		var yardWareFieldId = 'label_stockunit_'+orderlineNum;

		// Anzahl
		var amountObj = document.getElementById(amountFieldId);
		var yardWare  = document.getElementById(yardWareFieldId).innerHTML;

		onb1 = document.getElementById('ordernb1_'+orderlineNum);

		// prevent form from being sent if article number fields are not filled correctly
		if(onb1.value.length > 8){
			artnumber=onb1;
		}else{
			onb1.className = 'error';
			document.getElementById('error_'+orderlineNum).innerHTML = errorTexts['artnumber'];
			document.getElementById('errorbox_' +orderlineNum).className = ' errorVisible';

			return false;
		}


		var gravureFieldId 		= 'orderlineGravureForm_'+orderlineNum;
		var gravureFieldTextId	= 'orderlineGravureText_'+orderlineNum;
		var gravureFieldCount	= 0;
		var gravureFieldLength	= 0;

		if(	document.getElementById('orderlineGravureHeadline_'+orderlineNum).value > 0
				&& document.getElementById('orderlineGravureLength_'+orderlineNum).value > 0 ){

			gravureFieldCount	= parseInt(document.getElementById('orderlineGravureHeadline_'+orderlineNum).value);
			gravureFieldLength	= parseInt(document.getElementById('orderlineGravureLength_'+orderlineNum).value);
		}
		var gravureObj			= document.getElementById(gravureFieldId)

		var gravureText = '';
		var gravureTextPlain = '';
		var gravureTextArr = new Array();

		if (gravureObj && gravureFieldCount>0 && gravureFieldLength>0){

			for (var i=0; i<gravureFieldCount; i++){
				var iptValue = document.getElementById('orderlineGravureText_' + orderlineNum + '_'+i).value;
				gravureTextArr[i] = iptValue;
			}

			gravureTextPlain = gravureTextArr.join('');
			gravureText = gravureTextArr.join(textGravureSeparator);

			// Gültige Zeichen prüfen
			strPattern = /[^\x20-\xFF]/;

			if (gravureTextPlain.search(strPattern) != -1 || gravureTextPlain.search(textGravureSeparator)!=-1)
			{
				alert(noticeGravureError);
				boolReturn = false;
			}else{
				document.getElementById(gravureFieldId).value = gravureText;
			}

			// Wenn Feld leer dann Abfrage
			if (gravureTextPlain == "")
			{
				if (confirm(noticeGravureNo))
				{
					document.getElementById(gravureFieldId).value = textGravureSeparator;
				}
				else
				{
					boolReturn = false;
				}
			}

		} // end: gravure

		if (amountObj)
		{
			// Meterware ?
			if (yardWare && yardWare== "M")
			{
				var splitText= noticeYardWare.split('||');
				if (confirm (splitText[0] + (amountObj.value * 10) + splitText[1] + amountObj.value + splitText[2]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}
			else if (amountObj.value >= 10)
			{
				var splitText= noticeAmount.split('||');
				if (confirm (splitText[0] + amountObj.value + splitText[1]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}else{
				// do nothing
			}
		}
		return(boolReturn);
	}

function updateGravure(lineNumber) {
	var artnumber			= document.getElementById('text_artnumber_'+lineNumber).value;
	var componentSpec		= document.getElementById('text_componentView_'+lineNumber).value;
	var articleSize			= null;
	var gravureInput		= document.getElementById('orderlineGravureInput_' + lineNumber);
	var gravureMessage		= document.getElementById('orderlineGravureMessage_' + lineNumber);
	var gravureForm			= document.getElementById('orderlineGravureForm_' + lineNumber);
	var gravureInfo			= document.getElementById('orderlineGravureInfo_' + lineNumber);

	var gravureLength		= document.getElementById('orderlineGravureLength_' + lineNumber);
	var gravureHeadline		= document.getElementById('orderlineGravureHeadline_' + lineNumber);


	var gravureFieldCount = 0;
	var gravureFieldLength = 0;

	if (artnumber.length > 0 && articleData[artnumber]) {
		// find article that has the current componentSpec and fetch the articleSize
		for (var tmpArticleSize in articleData[artnumber]) {
			if (articleData[artnumber][tmpArticleSize].componentSpec == componentSpec) {
				articleSize = tmpArticleSize;
				break;
			} // end: if
		} // end: for
	} // end: if

	if (articleData[artnumber] && articleData[artnumber][articleSize]) {
		gravureFieldLength	= parseInt(articleData[artnumber][articleSize]['gravurelength']);
		gravureFieldCount	= parseInt(articleData[artnumber][articleSize]['gravureheadline']);
	}

	gravureLength.value		= gravureFieldLength;
	gravureHeadline.value	= gravureFieldCount;

	actualFieldCount = gravureInput.getElementsByTagName('input').length;

	if(gravureFieldCount != actualFieldCount || articleData['status'] != 'found'){

		gravureInput.innerHTML = '';
		gravureMessage.innerHTML = '';
		gravureInput.style.visibility	= 'hidden';
		gravureInput.style.display	= 'none';
		gravureInfo.style.visibility	= 'hidden';
		gravureInfo.style.display	= 'none';


		if (gravureMessage && gravureFieldLength>0 && gravureFieldCount>0){
			var mParts = gravureMessageBefore.split('||');
			var newText = mParts[0] + gravureFieldLength + mParts[1];
			gravureMessage.innerHTML = newText;
		}

		// create Input Fields according to article values
		if (gravureFieldCount>0 && gravureFieldLength>0) {
			for (var i=0; i<gravureFieldCount; i++){
				var br = document.createElement('br');
				var ipt = document.createElement('input');
				ipt.setAttribute('maxLength',gravureFieldLength);
				ipt.setAttribute('id', 'orderlineGravureText_' + lineNumber + '_'+i, true);
				ipt.value='';
				if (gravureForm.value){
					var metadata = gravureForm.value;
					var rows = metadata.split(textGravureSeparator);
					if(!rows[i]||rows[i]==undefined){
						ipt.value = '';
					}else{
						ipt.value = rows[i];
					}
				}
				ipt.name='orderlineGravureText_' + lineNumber + '['+i+']';
				ipt.style.width='307px';

				gravureInput.appendChild(ipt);
				gravureInput.appendChild(br);
			}
			gravureInput.style.visibility	= 'visible';
			gravureInput.style.display	= '';

			gravureInfo.style.visibility	= 'visible';
			gravureInfo.style.display	= '';
		}
	}

	updateStaticFields(lineNumber);
}

// ready event trigger for orderform:
$(document).ready(function() {
    // selects all input fields which begin with id=orderNr_*
    // after that, we trigger the keyup, and blur event.
    // blur and return are special cases, since the user finished his input (see flag).
    // 1. keyup
    $('#ordernb1_0').bind('keyup', function(e) {
        var el = $(this);
        // if value > 9 digits, call orderFormValidateSubmit (finishedInput = false)
            if(el.val().match(exprSearchAuto)){
            orderFormValidateSubmit(el, false);
        // if value is tab, or return, call orderFormValidateSubmit (finishedInput = true)
        }else if(e.keyCode == 13){
            orderFormValidateSubmit(el, true);
        }
    });
    // 2. blur
    $('#ordernb1_0').bind('blur', function(){
        var el = $(this);
        orderFormValidateSubmit(el, true);
        // delete everything if user deletes art Nr.
        if(el.attr('value') == ''){
            $('#text_artnumber_0').val('');
            $('#text_componentView_0').val('');
            $('#text_amount_0').val('');
            $('#label_description_0').html('');
            $('#label_stocktype_0').html('');
            $('#label_singleprice_0').html('');
        }
    });
});

/**
 * validate orders and submit, called by $('#orderNr').bind in READY if everything is ok.
 * the form check validates the following alternatives as a valid input:
 *       123456          [6 digts w/o wtr]
 *       1234567         [7 digts w/o wtr]
 *       123456789       [6 digts + 3 wtr]
 *       1234567890      [7 digts + 3 wtr]
 *       123.456         [6 digts w/o wtr] seperated by '.'
 *       1234.567        [7 digts w/o wtr] seperated by '.'
 *       123.456.789     [6 digts + 3 wtr] seperated by '.'
 *       1234.567.890    [7 digts + 3 wtr] seperated by '.'
 * the cases with less than 10 total characters can't be thrown automatically,
 * so they will just be triggered by hitting RETURN, TAB, or on BLUR
 *
 * @access public
 * @param element el DOM-elemtent
 * @param boolean flag finishedInput
 * @return void
 **/
var orderFormValidateSubmit = function(el,finishedInput){
    var val = el.attr('value');
    var lineNumber = el.attr('id').split('_')[1]; // this indicates the current row of our input fields (e.g. 1 for the second one)

    // check Expression on val and do submit
    if(val.match(exprSearchAll)){
        // no dots in value
        val = val.replace(/^0/g,'').replace(/\./g, '');
        // submit is ok, set artNr value for other "fancy" functions
        $('#text_artnumber_'+lineNumber).val(val);

        // set input to common format [0123.456.789]
        el.val(getFormattedArtNo(val));

        // now add the orderline
        addOrderline(lineNumber);
        // check/set busy flag and retrieve data via ajax
        if(!el.data('busy')){
            el.data('busy', true);
            retrieveArticleData(lineNumber, false, false);
        }
    }else if (finishedInput){
        // if val is empty, delete article from list
        if(val == ''){
            $('#text_artnumber_'+lineNumber).attr('value','');
            hideError(lineNumber);
        }
    }
};

function getFormattedArtNo(artNo) {
	var artNoLength = artNo.length;
	artNo = (artNoLength == 7 || artNoLength == 10 ? artNo : '0' + artNo);

	// set input to common format [0123.456.789]
	var returnValue = artNo.substr(0, 4) + '.' + artNo.substr(4, 3);
	if (artNoLength > 8) {
		returnValue = returnValue + '.' + artNo.substr(7, 3);
	}
	return returnValue;
}

/**
 * checks the user agent string for iOS devices
 *
 * @access public
 *
 * @return boolean
 **/
function isIOSDevice() {
	returnValue = false;

	var userAgent = navigator.userAgent.toLowerCase();
	var deviceUAs = [
		'iphone',
		'ipod',
		'ipad'
	];

	for (var i = 0; i < deviceUAs.length; i++) {
		if (userAgent.search(deviceUAs[i]) > -1) {
			returnValue = true;
			break;
		}
	}

	return returnValue;
}



	function addToNotepad(uid, id) {

		var form				= document.getElementById('notepadForm_' + uid);
		var notepadArticlePk	= document.getElementById('notepadArticlePk_' + uid);
		var notepadProductPk	= document.getElementById('notepadProductPk_' + uid);
		var notepadGravure		= document.getElementById('notepadGravure_' + uid);
		var notepadAmount		= document.getElementById('notepadAmount_' + uid);

		var amountForm		= document.getElementById('productAmountForm_' + uid);
		if (!product01) {
			var product01 = new dmc.WALZ.Product({'selfUID': uid});
			product01 = product01.getInstance();
		}

		var currentArticle = product01.getCurrentArticle();
		var currentArticleVO = product01.dataArticles[currentArticle.artNumber][currentArticle.artSize];

		// Set Gravure field
		var gravureFieldCount	= parseInt(currentArticleVO.gravureHeadline);
		var gravureFieldLength	= parseInt(currentArticleVO.gravureLength);
		var gravureTextArray = [];
		if (gravureFieldCount > 0 && gravureFieldLength > 0) {
			for (var i = 0; i < gravureFieldCount; i++) {
				gravureTextArray.push( $(product01.parentContainerObj).find('#' + product01.fieldGravureText + '_' + i).val() );
			}

			if (typeof textGravureSeparator == 'undefined') {
				var textGravureSeparator = '###';
			}
		}

		var amount			= 0;

		if (amountForm) {
			if(amountForm.nodeName == 'SELECT') {
				amount = amountForm.options[amountForm.selectedIndex].value;
			} else if (amountForm.nodeName == 'INPUT'
				&& (amountForm.type == 'text'
					|| amountForm.type == 'hidden')) {
				amount = amountForm.value;
			} // end: if
		} // end: if

		var artPk 	= product01.getCurrentArticlePk();

		if(amount == "") {
			if(blockPriceConf[uid][artPk][0]) {
				amount 	= blockPriceConf[uid][artPk][0]['minQuantity'];
			} else {
				amount 	= 1;
			}
		} // end: if

		if (form && notepadArticlePk && notepadProductPk && notepadGravure && amount > 0) {
			notepadArticlePk.value 	= artPk;
			notepadProductPk.value 	= id;
			notepadGravure.value	= gravureTextArray.join(textGravureSeparator);
			notepadAmount.value		= amount;
			form.submit();
		} else if(amount < 1 || isNaN(parseInt(amount))) {
			alert(errorAmountText);
		} // end: if
	}


	/**
	* This is used for the extension specific functions
	*
	* @package		mb3p
	* @subpackage	notepadcached
	* @access		public
	* @author	    Boris Azar
	* @version		1.0.0
	*/
	var dmc_mb3_notepadcached = {

		// public method for url decoding
		decode : function (data) {
			var lsRegExp = /\+/g;
			// Return the decoded string
			return unescape(String(data).replace(lsRegExp, " "));
		}
	}

	/**
	* Notepadcached function
	*
	* @package		mb3p
	* @subpackage	notepadcached
	* @access		public
	* @author	    Boris Azar
	* @version		1.0.0
	*/

	/**
	* Sets a cookie
	*
	* @param string 	notepadAmountContainerId			id of the notepadAmountContainer
	* @param string 	notepadArticleAmountContainerId		id of the notepadArticleAmountContainer
	* @return void
	*/
	function fillNotepadWithData(notepadAmountContainerId, notepadArticleAmountContainerId, tipText) {
		var notepadArticlesAmountContainer = document.getElementById(notepadArticleAmountContainerId);
		var notepadAmountContainer = document.getElementById(notepadAmountContainerId);

		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {

			var data = JSON.parse(cookieData);
			if (data && typeof data.notepad != 'undefined') {
				// get the notepadArticlesAmountContainer object and set data in it
				if (notepadArticlesAmountContainer
					&& typeof data.notepad.articlesAmount != 'undefined') {

					// do not forget to decode the data (+ signs are converted back to spaces)
					notepadArticlesAmountContainerValue = dmc_mb3_notepadcached.decode(data.notepad.articlesAmount);
					notepadArticlesAmountContainerValue = htmlEntities(notepadArticlesAmountContainerValue);
					
					// get the notepadArticlesAmountContainer object and set data in it
					if (notepadArticlesAmountContainer) {
						// do not forget to decode the data (+ signs are converted back to spaces)
						notepadArticlesAmountContainer.innerHTML = notepadArticlesAmountContainerValue;
					} // end: if

				} // end: if

				// get the notepadAmountContainer object and set data in it
				if (notepadAmountContainer
					&& typeof data.notepad.notepadAmount != 'undefined') {

					// do not forget to decode the data (+ signs are converted back to spaces)
					notepadAmountContainerValue = dmc_mb3_notepadcached.decode(data.notepad.notepadAmount);
					notepadAmountContainerValue = htmlEntities(notepadAmountContainerValue);
					
					// get the notepadAmountContainer object and set data in it
					if (notepadAmountContainer) {
						// do not forget to decode the data (+ signs are converted back to spaces)
						notepadAmountContainer.innerHTML = notepadAmountContainerValue;
					} // end: if
				} // end: if

				if(data.notepad.notepadAddStatus == 1) {
					showToolTip(notepadAmountContainerId,tipText);
				} // end: if

				resetNotepadCookie();
			} // end: if
		} // end: if
	} // end: function

	function resetNotepadCookie() {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data) {
				data.notepad.notepadAddStatus = "0";
				cookieDataUpdated = JSON.stringify(data);
				cookie_set('mb3pc',cookieDataUpdated,'','/');
			} // end: if

		} // end: if
	} // end: function

	function isNotepadEmpty(){
		var cookieData  = cookie_get('mb3pc');
		var retval 	    = true;

		if (cookieData && typeof cookieData != 'undefined') {

			var data = JSON.parse(cookieData);
			if (data) {
				if (typeof data.notepad != 'undefined' && data.notepad.articlesAmount != 0) {
					retval = false;
				}
			}
		}
		return retval;
	}



	function checkFieldsNotepad(uid, id, variation, size, color)
	{
		boolReturn = true;
		var amountFieldId = 'productAmountForm_'+uid+'_'+id;
		var yardWareFieldId = null;
		var gravureFieldId = 'notepadGravure_'+uid;
		var gravureFieldTextId = 'productGravureText_'+uid+'_'+id;
		var gravureFieldCount = parseInt(productConf[uid][id]['articles'][variation][size][color]['gravureText']);
		var gravureFieldLength = parseInt(productConf[uid][id]['articles'][variation][size][color]['gravureLength']);
		var gravureObj = document.getElementById('productGravureForm_'+uid+'_'+id);


		var gravureText = '';
		gravureTextPlain = '';
		var gravureTextArr = new Array();

		// only check if article has gravure
		if (gravureObj && gravureFieldCount>0 && gravureFieldLength>0) {

			for (var i=0; i<gravureFieldCount; i++) {
				var iptValue = document.getElementById('productGravureText_' + uid + '_' + id + '_'+i).value;
				gravureTextArr[i] = iptValue;
			}

			gravureTextPlain = gravureTextArr.join('');
			gravureText = gravureTextArr.join(textGravureSeparator);

			// check valid characters

			strPattern = '/[^\x20-\xFF]/';

			if (gravureTextPlain.search(strPattern) != -1 || gravureTextPlain.search(textGravureSeparator)!=-1) {
				alert(noticeGravureError);
				boolReturn = false;
			} else {
				document.getElementById(gravureFieldId).value = gravureText;
			}

			// Wenn Feld leer dann Abfrage
			if (gravureTextPlain == "") {
				if (confirm(noticeGravureNo)) {
					document.getElementById(gravureFieldId).value = textGravureSeparator;
					// set separator if empty, otherwise we do not know if orderline has gravure
				} else {
					boolReturn = false;
				}
			}
		} // end: gravure

		// Anzahl
		var amountObj = document.getElementById(amountFieldId);
		var yardWare = productConf[uid][id]['articles'][variation][size][color]['stockUnit'];

		if (amountObj)
		{
			// Meterware ?
			if (yardWare && yardWare== "M")
			{
				var splitText= noticeYardWare.split('||');
				if (confirm (splitText[0] + (amountObj.value * 10) + splitText[1] + amountObj.value + splitText[2]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}
			else if (amountObj.value >= 10)
			{
				var splitText= noticeAmount.split('||');
				if (confirm (splitText[0] + amountObj.value + splitText[1]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}else{
				// do nothing
			}
		}

		return boolReturn;
	}

	function addToNotepadSubmit(uid, id, target, popup, url, popupParams) {
		// Create a new instance of product01 if required to run its 
		// checkFields method
		if (typeof product01 == "undefined" && typeof selfUID != "undefined") {
			var product01 = new dmc.WALZ.Product({"selfUID": selfUID});
		}
		product01 = product01.getInstance();
	
		var currentArticle = product01.getCurrentArticle();
		var currentArticleVO = product01.dataArticles[currentArticle.artNumber][currentArticle.artSize];
		var callbackYes = function() {
			product01.addToBasketParams.confirmed = true;
			addToNotepadSubmit(uid, id, target, popup, url, popupParams);
		};
		
		if ((typeof product01.addToBasketParams.confirmed != 'undefined' &&
						product01.addToBasketParams.confirmed == true) ||
				product01.checkFields(currentArticleVO, function() {}, callbackYes)) {
			if (popup) {
				var form			= document.getElementById('notepadForm_' + uid);
				form.action 		= url;

				// do NOT load page from 'url' variable here! race condition w/ 2 Apache threads!
				var POPUP = window.open('/cache/www.walzkidzz.de/img/clear.gif', target, popupParams);
				POPUP.focus();

			}
			addToNotepad(uid, id);
		}
	}

/*
 * function.js
 *
 * The content of this file is (c) 2003 - 2007 dmc
 * digital media center GmbH
 * All rights reserved
 *
 * This software is the confidential and proprietary
 * information of dmc digital media center GmbH.
 *
 */

/**
 * function
 *
 * $Id: functions.js 3267 2007-05-16 08:33:45Z toegerol $
 */

/**
* this function works in combination with product extension
* it uses the productConf array created by the product extension
* so it may not work anywhere else than productdetail pages...
*
* @access public
* @param  uid
* @param  id
* @param  url
* @param  popupWidth
* @param  popupHeight
* @return void
*/
function articleFeedbackLink(uid, id, url, popupWidth, popupHeight) {

	if (!popupWidth) {
		popupWidth = 560;
	}

	if (!popupHeight) {
		popupHeight = 750;
	}

	// find currently selected article number
	var currentArticle	= product01.getCurrentArticle();
	var artNumber		= currentArticle.artNumber

	//change/render document.location
	//document.location.href = url.replace('%s', artNumber);
	popupurl = url.replace('%s', artNumber);

	var popup_productFeedback = window.open(popupurl, 'popup_productFeedback', 'width=' + popupWidth + ',height=' + popupHeight + ',scrollbars=yes,resizable=yes,toolbar=no,status=no,directories=no,menubar=no,location=no');
	popup_productFeedback.focus();
}

function backToFormView(ctype, uid) {
	var preview			= document.getElementById('preview');
	var form			= document.getElementById(ctype + '[' + uid + ']' + '[form]');

	if (preview) {
		preview.value = -1;
	}
	if(form){
	form.submit();
	}
}


/**
* Show popup window for the cheaper product feedback form
*
* @access public
* @param  uid
* @param  id
* @param  url
* @param  popupWidth
* @param  popupHeight
* @return void
*/
function cheaperProductFeedbackLink(uid, id, url, popupParams) {

	if (typeof popupParams != 'string' || popupParams == '') {
		popupParams = 'scrollbars=yes,resizable=yes,toolbar=no,status=no,directories=no,menubar=no,location=no';
	} // end: if

	// find currently selected article number
	var currentArticle	= product01.getCurrentArticle();
	var artNumber		= currentArticle.artNumber

	//change/render document.location
	//document.location.href = url.replace('%s', artNumber);
	popupurl = url.replace('%s', artNumber);

	var popup_cheaperProductFeedback = window.open(popupurl, 'popup_cheaperProductFeedback', popupParams);
	popup_cheaperProductFeedback.focus();
}
// this function works in combination with product extension
// it uses the productConf array created by the product extension
// so it may not work anywhere else than productdetail pages...
function articleRecommendLink(uid, id, url, popupParams) {
	if (!product01) {
		var product01 = new dmc.WALZ.Product({'selfUID': uid});
		product01 = product01.getInstance();
	}

	var currentArticle = product01.getCurrentArticle();

	//change/render document.location
	var popupurl = url.replace('%s', currentArticle.artNumber);
	var popup_productRecommend = window.open(popupurl, 'popup_productRecommend', popupParams);
	popup_productRecommend.focus();
}

function backToFormView(ctype, uid) {
	var preview			= document.getElementById('preview');
	var form			= document.getElementById(ctype + '[' + uid + ']' + '[form]');

	if (preview) {
		preview.value = -1;
	}
	if(form){
	form.submit();
	}
}

function addRecipient() {
	var recipientamount = $("#recipientamount").val();
	recipientamount++;
	$("#recipient"+recipientamount).css("display", "block");
	$("#recipientamount").val(recipientamount);
	if (recipientamount == 15) {
		$("#morerecipients").css("display", "none");
	}
}

/*
 * function.js
 *
 * The content of this file is (c) 2003 - 2007 dmc
 * digital media center GmbH
 * All rights reserved
 *
 * This software is the confidential and proprietary
 * information of dmc digital media center GmbH.
 *
 */


/**
 * functions to set pco actions
 *
 * $Id: functions.js 3272 2007-05-16 08:52:41Z toegerol $
 */


	/**
	* set a pco action to a defined action form field
	*
	* @access public
	* @param  ctype       the name of the extension
	* @param  uid         the uid of the pageelement
	* @param  newAction   the name of the pco action
	* @return void
	*/
	function pcoFormSetAction(ctype, uid, newAction) {

		var action			= document.getElementById(ctype + '[' + uid + ']' + '[pcoAction]');

		if (action) {
			action.value = newAction;
		} // end: if
	} // end: function



/**
* flag to prevent double submits by doubleclicks on buttons
*/
var loginFormSubmitFlag = false;
var logoutFormSubmitFlag = false;
var changePasswordSubmitFlag = false;
var autoLoginSubmitFlag = false;
var billingAddressSubmitFlag = false;
var deliveryAddressSubmitFlag = false;
var paymentTypeSubmitFlag = false;
var userProfileSubmitFlag = false;
var userNameSubmitFlag = false;
var deliveryTypeSubmitFlag = false;
var accountDeleteSubmitFlag = false;

/**
* performs login form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function loginFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[login]');
	if (loginFormSubmitFlag == false) {
		if (form) {
			loginFormSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function


/**
* performs change password form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function changePasswordFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[changePassword]');
	if (changePasswordSubmitFlag == false) {
		if (form) {
			changePasswordSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs request password form submit defined by ctype and uid
*
* @access public
* @param  ctype the name of the extension
* @param  uid the uid of the pageelement
* @return void
*/
function forgotPasswordFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[passwordforgotten]');
	if (autoLoginSubmitFlag == false) {
		if (form) {
			autoLoginSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs auto login form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function autoLoginFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[changeAutoLogin]');
	if (autoLoginSubmitFlag == false) {
		if (form) {
			autoLoginSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs billing address form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function billingAddressFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[billingcustomer]');
	if (billingAddressSubmitFlag == false) {
		if (form) {
			billingAddressSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs delivery address form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function deliveryAddressFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[deliverycustomer]');
	if (deliveryAddressSubmitFlag == false) {
		if (form) {
			deliveryAddressSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function


/**
* delete the existing delivery address defined by ctype and uid
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function deliveryAddressDelete(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[deliverycustomer]');
	if (form) {
		document.getElementById(ctype + '[' + uid + ']' + '[action]' + '[changeDeliveryCustomer]').value = "deleteDeliveryCustomer";
		form.submit();
	} // end: if
} // end: function


/**
* performs delivery address name change submit defined by ctype and uid
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function deliveryAddressChangeName(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[deliverycustomer]');
	if (form) {
		document.getElementById(ctype + '[' + uid + ']' + '[action]' + '[changeDeliveryCustomer]').value = "loadDeliveryAddress";
		form.submit();
	} // end: if
} // end: function


/**
* performs paymenttype form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function paymentTypeFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[paymenttype]');
	if (paymentTypeSubmitFlag == false) {
		if (form) {
			paymentTypeSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs paymenttype form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function deliveryTypeFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[deliverytype]');
	if (deliveryTypeSubmitFlag == false) {
		if (form) {
			deliveryTypeSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function


/**
* performs userprofile form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function userProfileFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[profile]');
	if (userProfileSubmitFlag == false) {
		if (form) {
			userProfileSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs logout form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function logoutFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[logout]');
	if (logoutFormSubmitFlag == false) {
		if (form) {
			logoutFormSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs username change form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function changeUserNameSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[changeUsername]');
	if (userNameSubmitFlag == false) {
		if (form) {
			userNameSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

/**
* performs account delete form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function accountDeleteFormSubmit(ctype, uid) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[accountDelete]');
	if (accountDeleteSubmitFlag == false) {
		if (form) {
			accountDeleteSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

function getBike(formname,fieldname,boxnum,clientpk,isocode2) {
	var pickerBox = document.getElementById('pickerBox'+boxnum);
	var pickerBox1 = document.getElementById('pickerBox1');
	var pickerBox2 = document.getElementById('pickerBox2');
	if(pickerBox1 && pickerBox2 && pickerBox) {
		if(pickerBox1.style.display == 'none' && pickerBox1.id == pickerBox.id) {
			pickerBox1.innerHTML = poloPickerGenerateHTML(boxnum,formname,fieldname);
			pickerBox1.style.display = 'block';
			pickerBox2.style.display = 'none';
		}
		else if(pickerBox2.style.display == 'none' && pickerBox2.id == pickerBox.id) {
			pickerBox2.innerHTML = poloPickerGenerateHTML(boxnum,formname,fieldname);
			pickerBox2.style.display = 'block';
			pickerBox1.style.display = 'none';
		}
		else {
			pickerBox.style.display='none';
		} // end: if
	} // end: if
	else if((pickerBox1&&pickerBox)) {
		if(pickerBox1.style.display == 'none' && pickerBox1.id == pickerBox.id) {
			pickerBox1.innerHTML = poloPickerGenerateHTML(boxnum,formname,fieldname);
			pickerBox1.style.display = 'block';
		}
		else {
			pickerBox.style.display='none';
		} // end: if
	} // end: if
}// end: function

/**
* toggles order detail, close all other container concernig the boxPrefix and
* toggles the innHTML of the link concerning the linkPrefix
*
* @access	public
* @param	integer		num 		number identifing the row
* @param	string		offContent 	innerHTML of the link in off state
* @param	string		onContent 	innerHTML of the link in on state
* @param	string		boxPrefix 	prefix of the toggle container
* @param	string		linkPrefix 	prefix of the link that toggles
* @see		$('')
* @return	void
*/
function toggleDetail(num, offContent, onContent) {

	var boxPrefix 	= (arguments[3]) ? arguments[3] : 'detail-';
	var linkPrefix 	= (arguments[4]) ? arguments[4] : 'detaillink-';

	var pattern  = boxPrefix +'(.*)';

	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {

		var regex = '/'+ pattern +'/.exec(divs[i].id)';
		var match = eval(regex);

		if (match) {

			if (divs[i].id == boxPrefix + num) {

				divs[i].style.display = ( divs[i].style.display == 'none' ) ? "block" : "none";
				document.getElementById(linkPrefix + num).innerHTML = (document.getElementById(linkPrefix + num).innerHTML == offContent ) ? onContent : offContent;

			} else {

				divs[i].style.display = 'none';
				document.getElementById(linkPrefix + match[1]).innerHTML = offContent;
			}
		}
	}
}// end: function


/**
* This is used for the extension specific functions
*
* @package		mb3p
* @subpackage	shoppingbasketcached
* @access		public
* @author	    Boris Azar
* @version		1.0.0
*/
var dmc_mb3_usermanagementcached = {




	// public method for url decoding
	decode : function (data) {
		var lsRegExp = /\+/g;
		// Return the decoded string
		return unescape(String(data).replace(lsRegExp, " "));
	}
}

/**
* Sets a cookie
*
* @param string 	basketAmountContainerId			id of the basketAmountContainer
* @param string 	articlesAmountContainerId		id of the articlesAmountContainer
* @return void
*/
function setUserDataFromCookie() {

	var cookieData = cookie_get('mb3pc');

	if (cookieData && typeof cookieData != 'undefined') {

		var data = JSON.parse(cookieData);
		if (data) {

			var usermanagementSalutionContainer = document.getElementById('usermanagement_salution');
			var notepadInfoContainer 			= document.getElementById('notepad_info');
			var giftdeskInfoContainer 			= document.getElementById('giftdesk_info');

			// get the usermanagementSalutionContainer and set data in it
			if (usermanagementSalutionContainer
				&& typeof data.usermanagement != 'undefined'
				&& typeof data.usermanagement.customersalutation != 'undefined'
				&& typeof data.usermanagement.customername != 'undefined') {

				if(data.usermanagement.customersalutation){
					// do not forget to decode the data (+ signs are converted back to spaces)
					usermanagementSalutionValue = salutation['intro'] + ' '
					+ salutation[data.usermanagement.customersalutation] + ' '
					+ dmc_mb3_usermanagementcached.decode(data.usermanagement.customername);
				}else{
					// do not forget to decode the data (+ signs are converted back to spaces)
					usermanagementSalutionValue = salutation['intro'] + ' '
					+ dmc_mb3_usermanagementcached.decode(data.usermanagement.customername);
				}

				usrmgmtSalutationValue = htmlEntities(usermanagementSalutionValue);
				usermanagementSalutionContainer.innerHTML = usrmgmtSalutationValue;

			} // end: if

			if (notepadInfoContainer
				&& typeof data.notepad != 'undefined'
				&& typeof data.notepad.articlesAmount != 'undefined') {

				if (data.notepad.articlesAmount > 0) {
                    notepadInfoContainer.className = "mwNavHeadline";
                    notepadInfoContainer.innerHTML = notepadinfo.replace('###amount###', data.notepad.articlesAmount);
				}

			} // end: if

			if (giftdeskInfoContainer
				&& typeof data.giftdesk != 'undefined'
				&& typeof data.giftdesk.articlesAmount != 'undefined') {

				if (data.giftdesk.articlesAmount > 0) {
                    giftdeskInfoContainer.className = "mwNavHeadline";
					giftdeskInfoContainer.innerHTML = giftdeskinfo.replace('###amount###', data.giftdesk.articlesAmount);
				}

			} // end: if

		} // end: if
	} // end: if
} // end: function


/**
* These three function are used for the login pages of addto_notepad or addto_giftdesk.
* These pages could be popups.
* All requests work in the following way: If we are in a popup and the user falied to login
* or wants to read more abaout the services close the popup and redirect the parent window.
* If we are in the main window itself, not in a popup the main window should be redirected, and nothing should be closed.
*
* This opens an url in the parentwindow if we are in a popup, or else in the current window.
*/
function openURL(url){
	var errorURL=url;
	if (window.opener && window.opener.open && !window.opener.closed){
		opener.location.href=errorURL;
		close();
	}
	else{
		self.location.href=errorURL;
	}
}

/**
* These three function are used for the login pages of addto_notepad or addto_giftdesk.
* These pages could be popups.
* All requests work in the following way: If we are in a popup and the user falied to login
* or wants to read more abaout the services close the popup and redirect the parent window.
* If we are in the main window itself, not in a popup the main window should be redirected, and nothing should be closed.
*
* This opens an url in the parentwindow if we are in a popup, or else in the current window.
*/
function updateDoubletInput(originId, doubletId){

	originElement 	= document.getElementById(originId);
	doubletElement	= document.getElementById(doubletId);

	if (originElement && doubletElement) {
		doubletElement.value = originElement.value;
	}

}



	function addToGiftdesk(uid, id) {
		var form				= document.getElementById('giftdeskForm_' + uid);
		var giftdeskArticlePk	= document.getElementById('giftdeskArticlePk_' + uid);
		var giftdeskProductPk	= document.getElementById('giftdeskProductPk_' + uid);
		var giftdeskGravure		= document.getElementById('giftdeskGravure_' + uid);
		var giftdeskAmount		= document.getElementById('giftdeskAmount_' + uid);

		var amountForm		= document.getElementById('productAmountForm_' + uid);
		if (!product01) {
			var product01 = new dmc.WALZ.Product({'selfUID': uid});
			product01 = product01.getInstance();
		}

		var currentArticle = product01.getCurrentArticle();
		var currentArticleVO = product01.dataArticles[currentArticle.artNumber][currentArticle.artSize];

		// Set Gravure field
		var gravureFieldCount	= parseInt(currentArticleVO.gravureHeadline);
		var gravureFieldLength	= parseInt(currentArticleVO.gravureLength);
		var gravureTextArray = [];
		if (gravureFieldCount > 0 && gravureFieldLength > 0) {
			for (var i = 0; i < gravureFieldCount; i++) {
				gravureTextArray.push( $(product01.parentContainerObj).find('#' + product01.fieldGravureText + '_' + i).val() );
			}

			if (typeof textGravureSeparator == 'undefined') {
				var textGravureSeparator = '###';
			}
		}

		var amount			= 0;

		if (amountForm) {
			amount = amountForm.value;
		}

		if (form && giftdeskArticlePk && giftdeskProductPk && giftdeskGravure && amount > 0) {
			giftdeskArticlePk.value 	= product01.getCurrentArticlePk();
			giftdeskProductPk.value 	= id;
			giftdeskGravure.value		= gravureTextArray.join(textGravureSeparator);
			giftdeskAmount.value		= amount;
			form.submit();
		}
	}


	/**
	* This is used for the extension specific functions
	*
	* @package		mb3p
	* @subpackage	giftdeskcached
	* @access		public
	* @author	    Boris Azar
	* @version		1.0.0
	*/
	var dmc_mb3_giftdeskcached = {

		// public method for url decoding
		decode : function (data) {
			var lsRegExp = /\+/g;
			// Return the decoded string
			return this.decodeUtf8(unescape(String(data).replace(lsRegExp, " ")));
		},

		/**
		* decodes a string in utf8
		*
		* @param string 	utftext							string to be decoded
		* @return void
		*/
		decodeUtf8: function (utftext) {
			var plaintext = "";
			var i=0;
			var c=0;
			var c1=0;
			var c2=0;

			// while-Schleife, weil einige Zeichen uebersprungen werden
			while(i<utftext.length) {
				c = utftext.charCodeAt(i);
				if (c<128) {
					plaintext += String.fromCharCode(c);
					i++;
				} else if((c>191) && (c<224)) {
					c2 = utftext.charCodeAt(i+1);
					plaintext += String.fromCharCode(((c&31)<<6) | (c2&63));
					i+=2;
				} else {
					c2 = utftext.charCodeAt(i+1); c3 = utftext.charCodeAt(i+2);
					plaintext += String.fromCharCode(((c&15)<<12) | ((c2&63)<<6) | (c3&63));
					i+=3;
				}
			}

			return plaintext;
		 } // end: function

	}

	/**
	* Giftdeskcached function
	*
	* @package		mb3p
	* @subpackage	giftdeskcached
	* @access		public
	* @author	    Boris Azar
	* @version		1.0.0
	*/

	/**
	* Sets a cookie
	*
	* @param string 	giftdeskAmountContainerId			id of the giftdeskAmountContainer
	* @param string 	giftdeskArticleAmountContainerId		id of the giftdeskArticleAmountContainer
	* @return void
	*/
	function fillGiftdeskWithData(giftdeskAmountContainerId, giftdeskArticleAmountContainerId, tipText) {
		var giftdeskArticlesAmountContainer = document.getElementById(giftdeskArticleAmountContainerId);
		var giftdeskAmountContainer = document.getElementById(giftdeskAmountContainerId);

		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {

			var data = JSON.parse(cookieData);
			if (data && typeof data.giftdesk != 'undefined') {
				// get the giftdeskArticlesAmountContainer object and set data in it
				if (giftdeskArticlesAmountContainer
					&& typeof data.giftdesk.articlesAmount != 'undefined') {

					// do not forget to decode the data (+ signs are converted back to spaces)
					giftdeskArticlesAmountContainerValue = dmc_mb3_giftdeskcached.decode(data.giftdesk.articlesAmount);
					giftdeskArticlesAmountContainerValue = htmlEntities(giftdeskArticlesAmountContainerValue);
					// get the giftdeskArticlesAmountContainer object and set data in it
					if (giftdeskArticlesAmountContainer) {
						// do not forget to decode the data (+ signs are converted back to spaces)
						giftdeskArticlesAmountContainer.innerHTML = giftdeskArticlesAmountContainerValue;
					} // end: if

				} // end: if

				// get the giftdeskAmountContainer object and set data in it
				if (giftdeskAmountContainer
					&& typeof data.giftdesk.giftdeskAmount != 'undefined') {

					// do not forget to decode the data (+ signs are converted back to spaces)
					giftdeskAmountContainerValue = dmc_mb3_giftdeskcached.decode(data.giftdesk.giftdeskAmount);
					giftdeskAmountContainerValue = htmlEntities(giftdeskAmountContainerValue);
					// get the giftdeskAmountContainer object and set data in it
					if (giftdeskAmountContainer) {
						// do not forget to decode the data (+ signs are converted back to spaces)
						giftdeskAmountContainer.innerHTML = giftdeskAmountContainerValue;
					} // end: if
				} // end: if

				if(data.giftdesk.giftdeskAddStatus == 1) {
					showToolTip(giftdeskAmountContainerId,tipText);
				} // end: if

				resetGiftdeskCookie();
			} // end: if
		} // end: if
	} // end: function

	function resetGiftdeskCookie() {
		var cookieData = cookie_get('mb3pc');
		if (cookieData && typeof cookieData != 'undefined') {
			var data = JSON.parse(cookieData);

			if (data) {
				data.giftdesk.giftdeskAddStatus = "0";
				cookieDataUpdated = JSON.stringify(data);
				cookie_set('mb3pc',cookieDataUpdated,'','/');
			} // end: if

		} // end: if
	} // end: function

	function isGiftdeskEmpty(){
		var cookieData  = cookie_get('mb3pc');
		var retval 	    = true;

		if (cookieData && typeof cookieData != 'undefined') {

			var data = JSON.parse(cookieData);
			if (data) {
				if (typeof data.giftdesk != 'undefined' && data.giftdesk.articlesAmount != 0) {
					retval = false;
				}
			}
		}
		return retval;
	}



	function checkFieldsGiftdesk(uid, id, variation, size, color)
	{
		boolReturn = true;
		var amountFieldId = 'productAmountForm_'+uid+'_'+id;
		var yardWareFieldId = null;
		var gravureFieldId = 'giftdeskGravure_'+uid;
		var gravureFieldTextId = 'productGravureText_'+uid+'_'+id;
		var gravureFieldCount = parseInt(productConf[uid][id]['articles'][variation][size][color]['gravureText']);
		var gravureFieldLength = parseInt(productConf[uid][id]['articles'][variation][size][color]['gravureLength']);
		var gravureObj = document.getElementById('productGravureForm_'+uid+'_'+id);


		var gravureText = '';
		gravureTextPlain = '';
		var gravureTextArr = new Array();
		if (gravureObj && gravureFieldCount>0 && gravureFieldLength>0){

			for (var i=0; i<gravureFieldCount; i++)	{
				var iptValue = document.getElementById('productGravureText_' + uid + '_' + id + '_'+i).value;
				gravureTextArr[i] = iptValue;
			}

			gravureTextPlain = gravureTextArr.join('');
			gravureText = gravureTextArr.join(textGravureSeparator);

			// check valid characters

			strPattern = '/[^\x20-\xFF]/';

			if (gravureTextPlain.search(strPattern) != -1 || gravureTextPlain.search(textGravureSeparator)!=-1) {
				alert(noticeGravureError);
				boolReturn = false;
			} else {
				document.getElementById(gravureFieldId).value = gravureText;
			}

			// Wenn Feld leer dann Abfrage
			if (gravureTextPlain == "") {
				if (confirm(noticeGravureNo)) {
					document.getElementById(gravureFieldId).value = textGravureSeparator;
					// set separator if empty, otherwise we do not know if orderline has gravure;
				} else {
					boolReturn = false;
				}
			}
		} // end: gravure

		// Anzahl
		var amountObj = document.getElementById(amountFieldId);
		var yardWare = productConf[uid][id]['articles'][variation][size][color]['stockUnit'];

		if (amountObj)
		{
			// Meterware ?
			if (yardWare && yardWare== "M")
			{
				var splitText= noticeYardWare.split('||');
				if (confirm (splitText[0] + (amountObj.value * 10) + splitText[1] + amountObj.value + splitText[2]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}
			else if (amountObj.value >= 10)
			{
				var splitText= noticeAmount.split('||');
				if (confirm (splitText[0] + amountObj.value + splitText[1]) == false)
				{
					amountObj.value = 1;
					amountObj.focus();
					boolReturn = false;
				}
			}else{
				// do nothing
			}
		}

		return boolReturn;
	}

	function addToGiftdeskSubmit(uid, id, target, popup, url, popupParams) {
		// Create a new instance of product01 if required to run its 
		// checkFields method
		if (typeof product01 == "undefined" && typeof selfUID != "undefined") {
			var product01 = new dmc.WALZ.Product({"selfUID": selfUID});
		}
		product01 = product01.getInstance();
	
		var currentArticle = product01.getCurrentArticle();
		var currentArticleVO = product01.dataArticles[currentArticle.artNumber][currentArticle.artSize];
		var callbackYes = function() {
			product01.addToBasketParams.confirmed = true;
			addToGiftdeskSubmit(uid, id, target, popup, url, popupParams);
		};
		
		if ((typeof product01.addToBasketParams.confirmed != 'undefined' &&
						product01.addToBasketParams.confirmed == true) ||
				product01.checkFields(currentArticleVO, function() {}, callbackYes)) {
			var form			= document.getElementById('giftdeskForm_' + uid);
			form.action 		= url;

			// do NOT load page from 'url' variable here! race condition w/ 2 Apache threads!
			var POPUP = window.open('/cache/www.walzkidzz.de/img/clear.gif', target, popupParams);
			POPUP.focus();

			addToGiftdesk(uid, id);
		}
	}


	/**
	* This is used for the send2friend form to add new recipient rows on demand.
	* The variable 'myRowCounter' is located at the template 'TEMPLATE_08'.
	*
	* @package		mb3p
	* @subpackage	giftdesk
	* @access		public
	* @author	    Goran Zukolo <goran.zukolo@dmc.de>
	* @version		1.0.0
	*/
	function addRecipientRow() {

		// add article row
		if(myRowCounter > 0 && myRowCounter < 15) {

			// we need the old counter to identify the placeholder div
			var oldCounter = myRowCounter-1;
			// get the template code
			var tpl = $('#recipientRowTemplate').html();

			if( tpl != null ) {

				var rowHTML = '';

				// add 5 new rows
				for(var i=0; i<5; i++) {
					// replace the placeholder with the current counter
					tpl_tmp = tpl.replace(/PLACEHOLDER/g, myRowCounter);
					tpl_tmp = tpl_tmp.replace(/ROWCOUNTER/g, myRowCounter+1);

					rowHTML += tpl_tmp;
					// alter the counter by 1
					myRowCounter++;
				} // end: for

				// print the new article row
				$('#newRecipientRow_'+oldCounter).replaceWith(rowHTML);

			} // end: if
		} else {
			// we need the old counter to identify the placeholder div
			var oldCounter = myRowCounter-1;
			$('#newRecipientRow_'+oldCounter).replaceWith(noticeMaxRowsReached);
		}
	} // end: function addRecipientRow

// this function works in combination with product extension
// it uses the productConf array created by the product extension
// so it may not work anywhere else than productdetail pages...
function articleRankingLink(uid, id, url) {
	var artNumber 		= '';
	var variation		= '';
	var size			= '';
	var color			= '';

	// find currently selected article number
	variation	= currentVariation(uid, id);
	size		= currentSize(uid, id, variation);
	color		= currentColor(uid, id, variation, size);

	artNumber	= productConf[uid][id]['articles'][variation][size][color]['artNumber'];

	// change document.location
	document.location.href = url.replace('%s', artNumber);
}

// Callback function creation function.
// The callback function will be a handler for the 'onArticleChange" event
// on product details page.
// On article change the product ranking information will be adjusted dynamically
// and links regarding product ranking will be set properly.
// This is for 'template04'.
function createOnArticleChangedHandlerForRanking(uid, urlRatingsDummy, urlRankingDummy, popupParams) {
	var defaultRankingImage = '';
	if (typeof window['artRankingDetailsUrlDefaultImage_' + uid] != 'undefined' &&
			window['artRankingDetailsUrlDefaultImage_' + uid] != '') {
		defaultRankingImage = window['artRankingDetailsUrlDefaultImage_' + uid];
	} else {
		defaultRankingImage = $('#rankdetail_' + uid + '_image').attr('src');
	}

	return	function(_, productObj, currentArticleVO) {
		var $ = jQuery;

		if (window.artRankingDetails) {
			var artNumber = currentArticleVO.artNumber;

			var detail = artRankingDetails[artNumber];
			var image = $('#rankdetail_' + uid + '_image');
			var countSpan = $('#rankdetail_' + uid + '_count');
			var readRatingsLink = $('#rankdetail_' + uid + '_readRatings');
			var rankingLink = $('#rankdetail_' + uid + '_ranking');
			var imageLink =  $('#rankdetail_' + uid + '_imageLink');
			var urlRatings = urlRatingsDummy.replace('__ARTNUMBER__', artNumber);
			var urlRanking = urlRankingDummy.replace('__ARTNUMBER__', artNumber);

			// Set links.
			rankingLink.attr('href',
				"javascript:void(window.open('" + urlRanking + "', 'ratingPopup', '" + popupParams + "'))"
			);

			// Clear image link (may be set below).
			imageLink.attr('href', 'javascript:void(0)');

			// Update ranking division.
			if (detail && detail.commentCount > 0) {
				// special case for vital - we need 2 different images sizes (detail and comments)
				// take a look at productranking-template-file Line 350 /Brandswitch vital
				if(detail.urlImage.match(/vital/gi) && image.attr('class') == 'avgRankImage'){
					detail.urlImage = detail.urlImage.replace("_medium.gif", ".gif");
				}
				image.attr('src', detail.urlImage);
				countSpan.html('(' + detail.commentCount + ')');
				readRatingsLink.show();
				imageLink.css('cursor', 'pointer');
				imageLink.attr('href', '#productRankingComments');
			} else {
				imageLink.attr('href', 'javascript:void(0)');
				imageLink.css('cursor', 'default');
				image.attr('src', defaultRankingImage);
				countSpan.html('(0)');
				readRatingsLink.hide();
			}


			// end: if
		} // end: if
	}; // end: function
} // end: function createOnArticleChangedHandlerForRanking




// Callback function creation function.
// The callback function will be a handler for the 'onArticleChange" event
// on product details page.
// On article change the product ranking information will be adjusted dynamically
// and comment information and comment links will be set properly.
// This is for 'template03'.
function createOnArticleChangedHandlerForRankingComments(uid, urlRatingsDummy, urlRankingDummy, popupParams) {
	var $ = jQuery;

	// Some general parameters for the presentation of the comments.
	var numberOfInitialComments = 3;
	var maxCommentsPerPage = 10;

	// The general part of template03 should have the same behaviour as
	// template04 (see there).
	var rankingHandler = createOnArticleChangedHandlerForRanking(uid, urlRatingsDummy, urlRankingDummy, popupParams);

	return function(_, productObj, currentArticleVO) {
		var artNumber = currentArticleVO.artNumber;

		rankingHandler(uid, productObj, currentArticleVO);
		var showAllCommentsLink = $('#showAllComments_' + uid);
		var allComments = $('.productranking_comment_' + uid);
		var pagination = $('#commentsPagination_' + uid).html('');

		// Show active comments.
		var comments = $('.productranking_comment_' + uid+ '_' + artNumber);
		var commentsCount = comments.size();

		var updateComments = function(pageIdx) {
			allComments.hide();
			var startIdx = 0;
			var endIdx = 0;

			if (isNaN(pageIdx)) {
				endIdx = Math.min(numberOfInitialComments, commentsCount);
			} else {
				startIdx = pageIdx * maxCommentsPerPage;
				endIdx = Math.min(startIdx + maxCommentsPerPage, commentsCount);
			} // end: if

			for (var i = startIdx; i < endIdx; ++i) {
				(function() {
					var comment = $(comments.get(i));
					comment.show();
				})();
			} // end: for
		} // end: function update

		// Initialize comments elements.
		updateComments();

		// Show link 'showAllComments' only if necessary.
		showAllCommentsLink.hide()

		if (commentsCount > numberOfInitialComments) {
			showAllCommentsLink.unbind('click');

			showAllCommentsLink.click(function() {
				// Hide 'showAllCommentsLink' and show pagination if multiple
				// pages of comments are available.
				showAllCommentsLink.hide();
				updateComments(0);
				var pageCount = Math.ceil(commentsCount / maxCommentsPerPage);

				// Render pagination.
				if (pagination.size() > 0 && pageCount > 1) {
					pagination.html('');

					for (var i = 0; i < pageCount; ++i) {
						if (i > 0) {
							pagination.append(document.createTextNode(' | '));
						} // end: if

						var page = $(document.createElement('a'));
						page.attr('href', '#');
						page.addClass('shopColor');
						page.html(i + 1);

						if (i == 0) {
							page.addClass('PageHeadAktiv');
						} // end: if

						// Add behaviour to pagination items.
						page.click(function() {
							var pages = pagination.find('a');
							pages.removeClass('PageHeadAktiv');
							var pageIdx = $(this).html() - 1;
							var page = $(pages.get(pageIdx));
							page.addClass('PageHeadAktiv');
							updateComments(pageIdx);
							return false;
						});

						pagination.append(page);
					} // end: for
				} // end :if

				return false;
			});

			showAllCommentsLink.show();
		} // end: if
	} // end: function
} // end: function createOnArticleChangedHandlerForRankingComments

/**
* toggles order detail, close all other container concernig the boxPrefix and
* toggles the innHTML of the link concerning the linkPrefix
*
* @access	public
* @param	integer		num 		number identifing the row
* @param	string		offContent 	innerHTML of the link in off state
* @param	string		onContent 	innerHTML of the link in on state
* @param	string		boxPrefix 	prefix of the toggle container
* @param	string		linkPrefix 	prefix of the link that toggles
* @see		$('')
* @return	void
*/
function toggleOrderDetail(num, offContent, onContent) {

	var boxPrefix 	= (arguments[3]) ? arguments[3] : 'orderdetail-';
	var linkPrefix 	= (arguments[4]) ? arguments[4] : 'orderdetaillink-';

	var pattern  = boxPrefix +'(.*)';

	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {

		var regex = '/'+ pattern +'/.exec(divs[i].id)';
		var match = eval(regex);

		if (match) {

			if (divs[i].id == boxPrefix + num) {

				divs[i].style.display = ( divs[i].style.display == 'none' ) ? "block" : "none";
				document.getElementById(linkPrefix + num).innerHTML = (document.getElementById(linkPrefix + num).innerHTML == offContent ) ? onContent : offContent;

			} else {

				divs[i].style.display = 'none';
				document.getElementById(linkPrefix + match[1]).innerHTML = offContent;
			}
		}
	}
}// end: function

/**
* flag to prevent double submits by doubleclicks on buttons
*/
var reorderFormSubmitFlag = false;

/**
* performs reorder form submit defined by ctype and uid
* and prevents a double click form submit
*
* @access public
* @param ctype the name of the extension
* @param uid the uid of the pageelement
* @return void
*/
function reOrderFormSubmit(ctype, uid, orderpk) {
	var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' + '[reOrder]');
	document.getElementById(ctype + '[' + uid + ']' + '[orderPk]').value = orderpk;

	if (reorderFormSubmitFlag == false) {
		if (form) {
			reorderFormSubmitFlag = true;
			form.submit();
		} // end: if
	} // end: if
} // end: function

// the complete implementation below depends on the dmc object
// being defined. If this is not the case, there is no need to process anything
if (typeof dmc == 'object' &&
	typeof dmc.WALZ == 'object' &&
	typeof dmc.WALZ.Search == 'object') {

	dmc.WALZ.Search._this = null;
	dmc.WALZ.Search.Busy = false;

	dmc.WALZ.Search.Init = function() {
		this.BindSiblingsGroupNaviToggle();

		Accordion.Init($('#refineNav'));
		Accordion.AddEventListener('click', $('#refineNav'));

		$('.refineGroupItems input').each(function(_, element) {
			Checklist.Init(element);
		});

		this.SetFilterStateEvents();

		if(dmc.WALZ.Search.Instance == null) {
			this.SetFilterStateDefaults();
			dmc.WALZ.Search.Instance = this;
		}
	}

	dmc.WALZ.Search.SetFilterStateDefaults = function() {
		_this = this;
		$('.refineGroup').each(function(_, element) {
			var item = {'id' : $(element).attr('id').toLowerCase(),
						'state' : true};
			dmc.WALZ.Search.SelectedFilters.push(item);
		});
	}

	dmc.WALZ.Search.SetFilterStateEvents = function() {
		$('.refineGroup h2, .refineGroup .toggleButton').click(function() {
			var id = $(this).parent().attr('id').toLowerCase();
			for(var i = 0; i < dmc.WALZ.Search.SelectedFilters.length; i++) {
				if(dmc.WALZ.Search.SelectedFilters[i].id == id) {
					dmc.WALZ.Search.SelectedFilters[i].state = !dmc.WALZ.Search.SelectedFilters[i].state;
				}
			}
		});
	}

	dmc.WALZ.Search.CheckFilterStates = function() {
		_this = this;
		for(var i = 0; i < dmc.WALZ.Search.SelectedFilters.length; i++) {
			if(dmc.WALZ.Search.SelectedFilters[i].state) {
				var openItem = $('.refineGroup').eq(i);
				openItem.removeClass('closed').addClass('opened');
				openItem.find('.refineGroupItemsContainer').css('display', 'block');
			}
		}
	}

	/*
	 * Search filter AJAX reload mechanism
	 */
	dmc.WALZ.Search.LoadFilter = function(filterUrl, searchstring) {
		if(typeof(lazyloadConfig) !== 'undefined'){
			filterUrl += ((filterUrl.indexOf("?") >= 0) ? "&" : "?") + 'show=' + lazyloadConfig.show;
		}
		dmc.WALZ.Search.FilterUrl = filterUrl;

		if(!this.Busy){
			_this = this;
			$.ajax({
				type: 'GET',
				url: filterUrl,
				success: function(html) {

					//remove loading animation
					//$('div.contentContainer' + ' #loadingImg').remove();
					$('div.contentContainer').css('opacity', 1);
					//replace content container with ajax html
					$('div.contentContainer').replaceWith(html);

					$('body').css('cursor', 'auto');

					dmc.WALZ.Search.Instance.Busy = false;

					dmc.WALZ.Search.Instance.Init();
					dmc.WALZ.Search.Instance.CheckFilterStates();


					// save url for backlink on PDS if we came from search
					if ($.cookie('searchbacklink') != null) {
						$.cookie('searchbacklink', ($.cookie('searchbacklink').split("|"))[0]+'|'+(filterUrl.replace(/.11.html/, '.0.html'))+'|'+searchstring, { path: '/' });
						if (window.history && window.history.pushState){
							history.replaceState({"view": "FILTER"}, '', document.location);
							var seourl = document.location.pathname + filterUrl.substring(filterUrl.indexOf("?"),filterUrl.length);
							history.pushState({"view": "FILTER"}, '', seourl);
						}
					}
					// trigger unveil since lazyloading won�t be resolved
					if(Lazyload.MaxCalls === 0){
						$("img").trigger("unveil");
					}
				}
			});
			//display loading animation loadingAnimation.gif
			//loadingDIV = '<div id="loadingImg" style="text-align:center;"><img src="/cache/www.walzkidzz.de/img/fileadmin_templates_BABY_baby_global_img_misc_ajax_loader.gif" /></div>';
			//$('div.contentContainer').append(loadingDIV);
			$('div.contentContainer').css('opacity', 0.5);
			$('body').css('cursor', 'wait');
		}
		this.Busy = true;
	}

	dmc.WALZ.Search.BindSiblingsGroupNaviToggle = function() {
		$('#jsParentGroup').css('cursor', 'pointer');
		$('#jsParentGroup, div#siblingsGroupNavi').hover(
			function() {
				$('div#siblingsGroupNavi').css('left', 'auto');
			},
			function() {
				$('div#siblingsGroupNavi').css('left', '-99999px');
			}
		);
	}
	
	$(window).bind("popstate", function(evt) {
		// state
		var state = evt.originalEvent.state;
		// return to last state
		if(state) {
			if (state.view == "FILTER") {
				location.reload();
			}
		}
	});
	

	// init
	$(document).ready(function() {
		dmc.WALZ.Search.Init();
		dmc.WALZ.Search.CheckFilterStates();
	});

	function searchFilterJump(url, searchstring) {
		dmc.WALZ.Search.LoadFilter(url, searchstring);
		dmc.WALZ.ProductList.ReInitialize();
	}

}// end: if

/**
 * Search suggest call script for FACT-Finder
 * largely based on ffsuggest.jquery.json.js (15.03.2011)
 *
 * @package 	mb3p
 * @subpackage	dmc_m3_integratedsearch_core
 * @access 		public
 * @author		Dieter Rothacker <dieter.rothacker@dmc.de>
 * @version		$Id: ffsuggest.jquery.json.mb3p.js 14679 2015-10-12 06:07:50Z toegerol $
*/
function FFSuggest() {

	var pDebug					= false;
	var pInstanceName			= '';
	var pSearchURL				= '';
	var pQueryParamName			= '';
	var pFormname 				= '';
	var pLayerName				= '';
	var pQueryInput;
	var pSuggest				= new Array();
	var pSuggestDeeplinkUrl		= new Array();

	var pLastQuery;
	var submitted				= false;
	var pShowImages				= false;
	var	pSearchDelay			= 400; // timer for request-delay between keypresses in milliseconds
	var	pSearchChars			= 2; // searchword must be at least this length before suggest is triggered
	var pTimer					= false;
	var	pSearchTriggered		= false;

	var pSuggestImageClass 		= 'suggestImage';
	var pSuggestTypeClass 		= 'suggestTextType';
	var pSuggestAmountClass     = 'suggestTextAmount';
	var pSuggestQueryTypedClass = 'suggestTextQueryTyped';
	var pSuggestFooterClass     = 'suggestFooter';
	var pSuggestHeaderClass     = 'suggestHeader';
	var pSuggestRowClass	    = 'suggestRow';
	var pSuggestHighlightClass  = 'suggestHighlight';
	var pSuggestQueryStyle 		= "font-weight: bold; padding: 2px 15px 2px 10px;";
	var pCurrency				= "&euro;";

	var ptranslation;

	this.init = function(searchURL, formname, queryParamName, divLayername, instanceName, debugMode, showImages, suggestdelay, suggestchars, translation, layout, currencySymbol) {
		pSearchURL			= searchURL;
		pFormname			= formname;
		pQueryParamName		= queryParamName;
		pLayerName			= divLayername;
		pInstanceName		= instanceName;
 		pDebug				= debugMode;
 		pShowImages			= showImages;
 		pCurrency			= currencySymbol;

		if (pSearchURL == '') {
			if (pDebug) alert('no searchurl defined');
			return null;
		} else if (pInstanceName == '') {
			if (pDebug) alert('no instancename defined');
			return null;
		} else if (pFormname == '') {
			if (pDebug) alert('no formname defined');
			return null;
		} else if (pQueryParamName == '') {
			if (pDebug) alert('no queryparamname defined');
			return null;
		} else if (pLayerName == '') {
			if (pDebug) alert('need a layer for output');
		}
		if (suggestdelay != '') {
			pSearchDelay = suggestdelay;
		}
		if (suggestchars != '') {
			pSearchChars = suggestchars;
		}

		pQueryInput = document[pFormname][pQueryParamName];
		defaultInput();
		pQueryInput.onkeyup	= handleKeyPress;
		pQueryInput.onfocus = function() { if((pQueryInput.value!='')&&($('div #suggestLayer > *').length>0)) {showLayer(); }clearInput(); };
		pQueryInput.onblur	= function() { hideLayer(); defaultInput(); };
		document[pFormname].onsubmit = handleSubmit;

		ptranslation = translation;

	}

	function clearInput() {
		if ( pQueryInput.value == translation['noinput'] ) {
			pQueryInput.value = '';
		} // end: if
	}
	function defaultInput() {
		if ( pQueryInput.value == '' || pQueryInput.value == '*' ) {
			pQueryInput.value = translation['noinput'];
		} // end: if
	}

	function handleSubmit() {
		if (pQueryInput.value == '' || pQueryInput.value == translation['noinput']) {
			defaultInput();
			return false;
		}
		if ( typeof layout == 'undefined' ) {
			return false;
		}

		if(layout == 1) {
			var id = $('tr.'+pSuggestHighlightClass).attr("id");
		}else{
			var id = $('div.'+pSuggestHighlightClass).attr("id");
		}

		if (id != undefined) {
			if(layout == 1) {
				var id = $('tr.'+pSuggestHighlightClass).attr("id");
			}else{
				var id = $('div.'+pSuggestHighlightClass).attr("id");
			}
			var query;
			for (var i=0; i<pSuggest.length; i++) {
				if (pSuggest[i].search(id)==0) {
					query = pSuggest[i].substring(id.length);
					break;
				}
			}

			addInputToForm('userInput', document[pFormname][pQueryParamName].value);
			document[pFormname][pQueryParamName].value = query;
			addInputToForm('queryFromSuggest', 'true');
		}
		$.cookie('searchbacklink', null, { path: '/' });
	}

	this.handleSuggestRedirect = function() {
		if(layout == 1) {
			var id = $('tr.'+pSuggestHighlightClass).attr("id");
		}else{
			var id = $('div.'+pSuggestHighlightClass).attr("id");
		}
		$.cookie('searchbacklink', null, { path: '/' });
		window.location.href = pSuggestDeeplinkUrl[id];
	}

	this.handleClick = function() {
		document[pFormname].onsubmit();
		document[pFormname].submit();
	}

	this.handleMouseOver = function(id) {
		unmarkAll();
		if(layout == 1) {
			$('#'+pLayerName+' tr[id="'+id+'"]').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
		} else {
			$('#'+pLayerName+' div[id="'+id+'"]').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
		}
	}

	this.handleMouseOut = function(id) {
		if(layout == 1) {
			$('#'+pLayerName+' tr[id="'+id+'"]').removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
		} else {
		$('#'+pLayerName+' div[id="'+id+'"]').removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
		}
	}

	function handleKeyPress(evt) {
		evt = (evt) ? evt : ((event) ? event : null);
		var keyCode = evt.keyCode;
		if (keyCode == 38) {
			moveUp();
		} else if (keyCode == 27) {
			hideLayer();
		} else if (keyCode == 40) {
			moveDown();
		} else {
			if (pTimer) {
				clearTimeout(pTimer);
				pSearchTriggered = false;
			}
			if (pQueryInput.value == '') {
				hideLayer();
				if (typeof pLayer != 'undefined' && pLayer != null){ pLayer.innerHTML = ''; }
				pLastQuery = '';
				return null;
			}
			// start delay timer
			if (!pSearchTriggered && pLastQuery != pQueryInput.value && pQueryInput.value.length >= pSearchChars){
				pSearchTriggered = true;
				pTimer = setTimeout(getSuggestions, pSearchDelay);
			}
			pLastQuery = pQueryInput.value;
		}
	}


	function moveUp(){
		if(layout == 1) {
			if($('tr.'+pSuggestHighlightClass).length == 0){
				$('tr.'+pSuggestRowClass+':last').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
			}else{
				if($('tr.'+pSuggestHighlightClass).prev('tr.'+pSuggestRowClass).length == 0){
					$('tr.'+pSuggestHighlightClass).removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
					$('tr.'+pSuggestRowClass+':last').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
				 }
				 else{
					$('tr.'+pSuggestHighlightClass)
					.removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass)
					.prev('tr.'+pSuggestRowClass).removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
				}
			}

		} else {
			if($('div.'+pSuggestHighlightClass).length == 0){
				$('div.'+pSuggestRowClass+':last').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
			}else{
				var id = $('div.'+pSuggestHighlightClass).attr('id');
				var newID = parseInt(id) - 1;
				$('div#'+id).removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
				$('div#'+newID).removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
			}
		}
	}

	function moveDown(){
		if(layout == 1) {
			if($('tr.'+pSuggestHighlightClass).length == 0){
			 	$('tr.'+pSuggestRowClass+':first')
			 	.removeClass(pSuggestRowClass)
			 	.addClass(pSuggestHighlightClass);
		 	}
		 	else{
			 	if($('tr.'+pSuggestHighlightClass).next('tr.'+pSuggestRowClass).length == 0){
				 	$('tr.'+pSuggestHighlightClass).addClass(pSuggestRowClass).removeClass(pSuggestHighlightClass);
				 	$('tr.'+pSuggestRowClass+':first').removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
			 	}
			 	else{
				 	$('tr.'+pSuggestHighlightClass).addClass(pSuggestRowClass).removeClass(pSuggestHighlightClass)
			 		.next('tr.'+pSuggestRowClass).removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
			 	}
		 	}

		} else {
			if($('div.'+pSuggestHighlightClass).length == 0){
			 	$('div.'+pSuggestRowClass+':first')
			 	.removeClass(pSuggestRowClass)
			 	.addClass(pSuggestHighlightClass);
		 	}
		 	else{
					var id = $('div.'+pSuggestHighlightClass).attr('id');
					var newID = parseInt(id) + 1;
					$('div#'+id).removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
					$('div#'+newID).removeClass(pSuggestRowClass).addClass(pSuggestHighlightClass);
		 	}
		}
	}

	function getSuggestions(){
		var query = $('input[name='+pQueryParamName+']').attr('value');
		//check if the same query was asked before
/*		if(pLastQuery == query){
			return;
		}
		else {
			pLastQuery = query;
		}*/
			//var requestURL = pSearchURL +'?'+ pQueryParamName +'='+ encodeURIComponent(query) +'&'+ pChannelParamName +'='+ pChannel+'&format=json';
		var requestURL = pSearchURL + '&query=' + encodeURIComponent(query);
		$.ajax({
			type: "GET",
			url: requestURL,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:
				function (json, textStatus) {
					var jsonObj = eval(json);
					if(typeof jsonObj != 'undefined' ) {
						if (jsonObj.length > 0) {
							//create output text

							if(layout == 1) {
								var outputText = '<table cellpadding="0" cellspacing="0" class="' + pLayerName + '" border="0">';
								outputText += '<tr class="suggestHeader" ><th class="suggestHeader" nowrap="nowrap" colspan="3">' + ptranslation['header']  + '</th></tr>'
							}else {
								var outputText = '<div class="' + pLayerName + '" >';
								outputText += '<div class="suggestRowContainer">';
							}

							pSuggest = new Array();
							var ifCategory = true;
							var ifProduct = true;
							var ifBrand = true;
							for (var i=0; i<jsonObj.length; i++) {
								var suggestQuery = jsonObj[i].name;
								var suggestCount = jsonObj[i].hitCount;
								if (suggestCount==0) {
									suggestCount = '';
								}else if (suggestCount==1) {
									suggestCount = ptranslation['singleProduct'];
								}else {
									suggestCount = suggestCount + ' '+ptranslation['product'];
								}
								var suggestType = ptranslation[jsonObj[i].type];
								if (!suggestType) {
									suggestType = "";
								}
								var suggestImageUrl = jsonObj[i].imageURL;
								var suggestTypeText = jsonObj[i].type;
								var productPrice 	= jsonObj[i].attributes.PRODUCT_PRICE;
								var deeplinkUrl		= jsonObj[i].attributes.deeplink;
								var parentCategory  = jsonObj[i].attributes.parentCategory;

								var productPriceInt = parseFloat(productPrice);
								if (!productPrice || typeof productPrice == undefined) {
									productPrice = "";
									productPriceInt = 0;
								}else {
									productPrice = productPrice.replace('.',',')+'&nbsp;'+pCurrency;
								}

								var productSavings = parseInt(jsonObj[i].attributes.PRODUCT_PRICE_SAVINGS);
								var productOldPrice = "";
								if(productSavings != 0 && !isNaN(productSavings)){
									var productOldPrice = (productPriceInt + (productSavings/100)).toFixed(2);
									productOldPrice = productOldPrice.replace('.',',')+'&nbsp;'+pCurrency;
								}

								var id = i;

								pSuggestDeeplinkUrl[id] = deeplinkUrl;

								if(layout == 1) {
									outputText += '<tr id="' + id + '" class="'+pSuggestRowClass+'" onMouseOver="' + pInstanceName + '.handleMouseOver(' + id + ');" onMouseOut="' + pInstanceName + '.handleMouseOut(' + id + ');" onMouseDown="' + pInstanceName + '.'
									+(suggestTypeText == 'productName' ? 'handleSuggestRedirect()' : 'handleClick()')+';">'
									+(pShowImages ? '<td nowrap="nowrap" class="'+ pSuggestImageClass +'"><img src="' + suggestImageUrl + '" alt=""/></td>' : '')
									+'<td nowrap="nowrap" style="'+ pSuggestQueryStyle +';"><div class="suggestRes">' + suggestQuery.replace(new RegExp("("+query+")","ig"),'<span class="suggestContent">$1</span>') + '</div></td>'+'<td class="'+ pSuggestTypeClass +'">' + suggestType +'</td>'
									+'<td nowrap="nowrap" class="'+ pSuggestAmountClass +'"><div style="white-space:  nowrap;">' + suggestCount +' </div></td>'
									+'</tr>';

								} else {
									/* re-structure the suggestions according to type */
									switch (suggestTypeText) {
										case 'category':
											if (ifCategory == true) {
												outputText += '<div class="suggestColumn0"><div class="suggestRowCategory" onMouseDown="' + pInstanceName + '.handleSuggestRedirect();"><div class="'+pSuggestHeaderClass+'" ><p>' + ptranslation['category'] + '</p></div>';
											}
											ifCategory = false;
											break;

										case 'productName':
											if (ifProduct == true) {
												if(ifBrand == true && ifCategory == false){
													outputText += '</div></div><div class="suggestColumn2">';
												}else if(ifBrand == true && ifCategory == true){
													outputText += '<div class="suggestColumn1">';
												}else{
													outputText += '</div>';
												}
												outputText += '<div class="suggestRowProduct" onMouseDown="' + pInstanceName + '.handleSuggestRedirect();"><div class="'+pSuggestHeaderClass+'" ><p>' + ptranslation['productName'] + '</p></div>';
											}
											ifProduct = false;
											break;

										case 'brand':
											if (ifBrand == true) {
												if(ifProduct == true && ifCategory == false){
													outputText += '</div></div><div class="suggestColumn2">';
												}else if(ifProduct == true && ifCategory == true){
													outputText += '<div class="suggestColumn1">';
												}else{
													outputText += '</div>';
												}
												outputText += '<div class="suggestRowBrand" onMouseDown="' + pInstanceName + '.handleClick();"><div class="'+pSuggestHeaderClass+'" ><p>' + ptranslation['brand'] + '</p></div>';
											}
											ifBrand = false;
											break;

										default:
											break;
									}

									outputText += '<div id="' + id + '" class="'+pSuggestRowClass+'" onMouseOver="' + pInstanceName + '.handleMouseOver(' + id + ');" onMouseOut="' + pInstanceName + '.handleMouseOut(' + id + ');">'
									+'<span class="'+ (suggestTypeText == 'category' ? 'suggestTextCategoryName' : 'suggestTextQuery') +'">' + suggestQuery.replace(new RegExp("("+query+")","ig"),'<span class="'+pSuggestQueryTypedClass+'">$1</span>')
									+(suggestTypeText == 'category' ? ' <span class="suggestTextCategoryPath">'+ parentCategory + '</span>' : '')
									+( (productSavings != 0 && suggestTypeText == 'productName') ? ' <span class="suggestTextPriceStrike">'+productOldPrice+'</span>' : '')+(suggestTypeText == 'productName' ? (productSavings != 0 ? ' <span class="suggestTextPriceSale">'+productPrice+'</span>' : ' <span class="suggestTextPrice">'+productPrice+'</span>') : '')+'</span>'
									+'<span class="'+ pSuggestAmountClass +'">(' + suggestCount + ')</span>'
									+'</div>';
								}
								pSuggest[i] = id + suggestQuery;

							}
							if (layout == 1) {
								outputText += '</table>';
							} else {
								outputText += '</div></div></div><div class="'+pSuggestFooterClass+'" colspan="'+(3+pShowImages)+'">&nbsp;</div>';
							}

							//show layer
							$('div#'+pLayerName).html(outputText).show();
							$('div#'+pLayerName).css("visibility", "visible");

							if (ifCategory) {
								$('#suggestLayer .suggestLayer').removeClass( "suggestLayer" ).addClass( "suggestLayerHalfInner" );
								$('.suggestLayer, .suggestLayerHalfWide').removeClass('suggestLayer suggestLayerHalfWide').addClass( "suggestLayerHalf" );
							} else if (!ifCategory && ifProduct && ifBrand) {
								$('#suggestLayer .suggestLayer').removeClass( "suggestLayer" ).addClass( "suggestLayerHalfInner" );
								$('.suggestLayer, .suggestLayerHalf').removeClass('suggestLayer suggestLayerHalf').addClass('suggestLayerHalfWide');
							} else {
								$('#suggestLayer .suggestLayerHalfInner').removeClass('suggestLayerHalfInner').addClass('suggestLayer');
								$('.suggestLayerHalf, .suggestLayerHalfWide').removeClass('suggestLayerHalf suggestLayerHalfWide').addClass( "suggestLayer" );
							}
						}
						else {
							//hide layer
							$('div#'+pLayerName).hide();
							$('div#'+pLayerName).css("visibility", "hidden");;
						}
					}
				},
			error:
				function (e, xhr, settings, exception) {
					if (pDebug) {
						alert('Error:\nHTTP result code: ' + e.status+'\nrequested URL: '+requestURL);
					}
				}
		});
		pSearchTriggered = false;
	}

	function hideLayer() {
		unmarkAll();
		$('div#'+pLayerName).css("visibility", "hidden");
		$('div#'+pLayerName).hide();
		fireSuggestLayerHidden();
	}

	this.hideLayerOutsideCall = function() {
		hideLayer();

	}

	function showLayer() {
		$('div#'+pLayerName).show();
		$('div#'+pLayerName).css("visibility", "visible");
	}

	// calls the callback for "outside" listeners if the callback is implemented
	function fireSuggestCompleted(suggestLayerIsVisible) {
		if (typeof(onSuggestCompleted) == 'function') {
			onSuggestCompleted(suggestLayerIsVisible);
		}
	}

	// calls the callback for "outside" listeners if the callback is implemented
	function fireSuggestLayerHidden() {
		if (typeof(onSuggestLayerHidden) == 'function') {
			onSuggestLayerHidden();
		}
	}

	function unmarkAll() {
		if ( typeof layout == 'undefined' ) {
			return false;
		}

		if(layout == 1) {
			$('tr.'+pSuggestHighlightClass).each(function(i) {
				$(this).removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
			});
		}else{
			$('div.'+pSuggestHighlightClass).each(function(i) {
				$(this).removeClass(pSuggestHighlightClass).addClass(pSuggestRowClass);
			});
		}

	}

	function addInputToForm(name, value) {
		var element = document.createElement('input');
		element.name = name;
		element.type = 'hidden';
		element.value = value;
		document[pFormname].appendChild(element);
	}
}

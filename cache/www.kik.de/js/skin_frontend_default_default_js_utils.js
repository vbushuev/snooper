function isIE8() {
	// ie8
	return window.navigator.userAgent.indexOf('MSIE 8.0') > -1;
}

if(isIE8()) {
	// add "ie8" to <html>-tag
	document.querySelector("html").className += ' ie8';
}

// URL Valdiation
try {
	Object.defineProperty(String.prototype, "validURL", {
		get: function () {
			var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.,~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
			return pattern.test(this);
		}
	});
} catch(e) {
	// Hack: IE8
	String.prototype.validURL = function() {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.,~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return pattern.test(this);
	};
}

// pad function
String.prototype.pad = function(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
};

// ZoomoViewer
var KikZoomoViewer = Class.create();
KikZoomoViewer.prototype = {
	initialize: function(imageStr, target, lang, type) {
		//        if(type==null)
		//            type = 'flash';

		//        if(type == 'html5')
		this.initHtml5Snippet(imageStr, target, lang);
		//        else
		//            this.initFlashSnippet(imageStr, target, lang);

	},
	initFlashSnippet: function(imageStr, target, lang) {
		var images = imageStr.split(';');
		var zv = new ZoomoViewer();
		zv.serverName = "http://kikzoom.zoomoviewer.com";
		zv.clientID = 972303;
		zv.width = 600;
		zv.height = 500;
		zv.wmode = 'window';
		if (lang)
			zv.addParam('lang', lang);
		zv.addParam('rotationTime', 2.5);
		zv.addPlugIn("gui_default");
		zv.addPlugIn("gallery_default");

		for (var i = 0; i < images.length; ++i) {
			if (images[i] != '')
				zv.addImage(images[i].replace(/\s+/g, ''));
		}
		zv.start('#' + target);
	},
	initHtml5Snippet: function(imageStr, target, lang) {
		var imagesArr = imageStr.split(';');
		var zv = new ZoomoViewer({
			serverName: 'http://kikzoom.zoomoviewer.com',
			clientID: 972303,
			width: 600,
			height: 500,
			images: imagesArr,
			params: [ { rotationTime: 2.5 } ],
			plugins: ["gui_default", "gallery_default"],
			start: "#" + target
		});

	}
};

function checkForRMAAddresses() {
	// remove previous validations
	$jq('body.awrma #awrma-items-form-fields .validation-advice').remove();
	$jq('body.awrma #awrma-items-form-fields .validation-failed').removeClass('validation-failed');

	// shipping
	var show = false;
	$jq('body.awrma #awrma-items-form-fields input.item_shipping_type[value="spedition"]').each(function () {
		var row = $jq(this).closest('tr'),
			amount = row.find('input.orderitem-count').val(),
			selectedAmount = row.find('select.awrma-items-count').val();

		// item must not be removed && amount is > 0
		if (!row.hasClass('removed') && amount > 0 && selectedAmount > 0) {
			$jq('body.awrma #awrma-items-form-fields .address-container').show().find(':input').attr('disabled', false);
			show = true;
			return false;
		}
	});
	if (!show) {
		$jq('body.awrma #awrma-items-form-fields .address-container').hide().find(':input').attr('disabled', true);
	}

	// payment
	show = false;
	$jq('body.awrma #awrma-items-form-fields input.item_payment_type[value="paymentoperator_directpay"], body.awrma #awrma-items-form-fields input.item_payment_type[value="bankpayment"]')
		.each(function () {
			var row = $jq(this).closest('tr'),
				amount = row.find('input.orderitem-count').val(),
				selectedAmount = row.find('select.awrma-items-count').val();

			// item must not be removed && amount is > 0
			if (!$jq(this).closest('tr').hasClass('removed') && amount > 0 && selectedAmount > 0) {
				$jq('body.awrma #awrma-items-form-fields .payment-container').show().find(':input').attr('disabled', false);
				$jq('body.awrma #awrma-items-form-fields p.required').show();
				show = true;
				return false;
			}
		}
	);
	if (!show) {
		$jq('body.awrma #awrma-items-form-fields .payment-container').hide().find(':input').attr('disabled', true);
		$jq('body.awrma #awrma-items-form-fields p.required').hide();
	}

	// check all quatities
	var allQty = 0;
	$jq('#awrma-items-form-fields select.awrma-items-count').each(function () {
		var val = $jq(this).val(),
			row = $jq(this).closest('tr');

		if (val == 0) {
			row.find('select.awrma-reason').attr('disabled', 'disabled');
		} else {
			row.find('select.awrma-reason').attr('disabled', false);
		}

		allQty += val;
	});
	if (allQty == 0) {
		$jq('#awrma-new-submit').attr('disabled', 'disabled').addClass('disabled');
	} else {
		$jq('#awrma-new-submit').attr('disabled', false).removeClass('disabled');
	}
}

function changePagerWords(wordToReplace, replaceWordSingular, replaceWordPlural) {
	// pager, first word translation
	var pagerTextAmount = $jq('div.pager p.amount');
	pagerTextAmount.text(pagerTextAmount.text().split(wordToReplace).join($jq('div.pager .pages').length != 0 ? replaceWordSingular : replaceWordPlural));
	if ($jq('.pager .limiter').contents()[2])
		$jq('.pager .limiter').contents()[2].textContent = ' ' + $jq.trim($jq('.pager .limiter').contents()[2].textContent).split(wordToReplace).join(replaceWordPlural);
}

// deprecated
function adeptColSidebarHeight() { }

(function($) {
	$.fn.extend({
		// phoneFormat validation
		phoneFormat: function(errorTxt) {
			var element = $(this);
			var vaild = false;
			var inValid = /[A-Za-z]/g;
			var regex_normal = /^(\+[0-9]{1,6}(\s|\-|\/)[0-9]{1,6}(\s|\-|\/)[0-9]{3,20}|[0-9]{1,6}(\s|\-|\/)[0-9]{3,20})$/;
			var regex_ext = /^(\+[0-9]{1,6}(\s|\-|\/)[0-9]{1,6}(\s|\-|\/)[0-9]{3,20}\-[0-9]{1,8}|[0-9]{1,6}(\s|\-|\/)[0-9]{3,20}\-[0-9]{1,8})$/;
			var regex_mobile = /^(\+[0-9]{1,6}|[0-9]{1,6})(\s|\-|\/)[0-9]{3,20}$/;
			var regex_service = /^[0-9]{4}\-[0-9]{4,20}$/;

			//var txt = 'Falsches Format! Beispiel: <b>040 123456-0</b>';
			var checked = false;

			//$jq('p.input-required').remove();
			errorNodeVal = document.createElement('p');
			errorNodeVal.className = 'input-required';
			errorNodeVal.innerHTML = errorTxt;

			var phone_number = $jq.trim(element.val());
			if (element.val() != '') {
				if (regex_ext.exec(phone_number) || regex_normal.exec(phone_number)) {
					//if(typeof $jq(element).next().html() == 'string') {
					element.parent().children('p').remove();
					element.parent().children('input').css({
						'border-color': '#C8C8C8'
					});
					element.parent().children('input').removeClass(errorNodeVal.className);
					checked = true;
					//}
				} else {
					element.parent().children('p').remove();
					element.parent().children('input').css({
						'border-color': '#CC0000'
					});
					element.parent().children('input').addClass(errorNodeVal.className);
					element.parent().append(errorNodeVal).fadeIn('slow');
					checked = false;
				}
			} else {
				element.parent().children('p').remove();
				element.parent().children('input').css({
					'border-color': '#C8C8C8'
				});
				element.parent().children('input').removeClass(errorNodeVal.className);
				checked = true;
			}
			return checked;
		},

		tabs: function(contentObj) {
			contentObj = $(contentObj);

			$(this).each(function() {
				var tab = $(this),
					lis = $('li', tab);
				lis.each(function(i) {
					var li = $(this),
						a = li.children('a'),
						content = $(contentObj.get(i));

					if(i == 0) {
						li.addClass('active');
						content.addClass('active');
					}

					a.on('click', { curLi: li, curContent: content }, function(e) {
						var curContent 	= e.data.curContent,
							curLi 		= e.data.curLi;

						contentObj.removeClass('active');
						lis.removeClass('active');

						curContent.addClass('active');
						curLi.addClass('active');

						return false;
					});
				});
			});
		}
	});

	// misc (old) stuff
	$(document).ready(function() {
		// left navi dropdown
		$('li.sublinks span.sublink_area').click(function () {
			if (!$(this).parent().hasClass('active'))
				$(this).next().stop().slideToggle().parent().addClass('active');
			else
				$(this).next().stop().slideToggle().parent().removeClass('active');
		});

		// left navi dropdown -> element clicked
		$('.leftarea_subnavi a').click(function () {
			str = $(this).attr("href").split('#');
			if (str.length >= 2) {
				str = '#' + str[1];
				$('html, body').animate({scrollTop: $(str).offset().top + 'px'}, {duration: 1000, easing: 'swing'});
				return false;
			}
		});

		// link to top
		$('.linktotop').click(function () {
			$('html, body').animate({scrollTop: '0px'}, {duration: 1000, easing: 'swing'});
		});

		// service-overview & accout-overview -> icon and headline link
		if ($('body').hasClass('cms-service') || $('body').hasClass('customer-account-index')) {
			$.each($('.col2-set .box'), function (key, val) {
				var href = $(val).find('.box-content').find('a:last').attr('href');
				if (typeof(href) != 'undefined') {
					$(val).find('.icon').html('<a href="' + href + '" class="icon_link"></a>');
					var text = $(val).find('h3').text();
					$(val).find('h3').html('<a href="' + href + '" class="icon_link">' + text + '</a>');
				}
			});
		}

		// artikeloverview paging "articles per page" Caching Bugfix
		var limit = 0;
		$.each($('.toolbar1 .pager li'), function (key, val) {
			if (limit == 0) {
				var limiter = $('.limiter select option:selected');
				if(limiter.length)
					limit = limiter.val().split('limit=')[1].split('&')[0];
			}
			if ($(val).find('a').length != 0) {
				var href = $(val).find('a').attr('href');
				if (href.split('limit').length == 1)
					$(val).find('a').attr('href', href + '&limit=' + limit);
			}
		});

		// menu -> hide link of last element "Aktion" and "Trikots"
		if ($('#navi-top-list > li:last > a').text().split('\n').join('') === 'Aktion' || $('#navi-top-list > li:last > a').text().split('\n').join('') === 'Aktion ') { // Fallback IE
			$('#navi-top-list > li:last > a').attr('href', '#').addClass('nolinked').click(function () {
				return false;
			});
		}
		var prelast = $('#navi-top-list > li').length - 1;
		if ($('#navi-top-list > li:nth-child(' + prelast + ') > a').text().split('\n').join('') === 'Trikots' || $('#navi-top-list > li:nth-child(' + prelast + ') > a').text().split('\n').join('') === 'Trikots ') { // Fallback IE
			$('#navi-top-list > li:nth-child(' + prelast + ') > a').attr('href', '#').addClass('nolinked').click(function () {
				return false;
			});
		}

		setTimeout(function () {
			initZIPValidation($('input#zip'), $('input#city'));
			initZIPValidation($('input#billing\\:postcode'), $('input#billing\\:city'));
			initZIPValidation($('input#shipping\\:postcode'), $('input#shipping\\:city'));
		}, 1000);

		// popups
		$('.createpopup').click(function () {
			var w = window.open(
				$(this).attr('href'), '',
				'width=' + $(this).attr('popupWidth') + ',height=' + $(this).attr('popupHeight') + ',status=yes,scrollbars=yes,resizable=yes'
			);

			w.focus();
			return false;
		});
	});

	// check zip-code // http://www.geonames.org/
	function initZIPValidation(zip, city, locale) {
		if (zip === undefined)
			zip = $('input#zip');
		if (city === undefined)
			city = $('input#city');
		if (locale === undefined)
			locale = 'de_DE';

		if (zip.length !== 0 && city.length !== 0) {
			var maxLength;
			switch (locale) {
				case 'de_DE':
					maxLength = 5;
					break;
				case 'de_AT':
					maxLength = 4;
					break;
				default:
					maxLength = 5;
			}

			var jqZIPXHR;

			zip.attr({
				maxlength: maxLength,
				autocomplete: 'off'
			})
				.after('<div id="zip_loader" class="loader"></div>')
				.parent().css('position', 'relative');

			function clearValidation() {
				$([city, zip]).each(function () {
					$(this).removeClass('validation-failed validate-invalid-zip')
						.parent().find('.validation-advice').remove();
				});
			}

			var onValidateZip = function (e) {
				if (e.which >= 48 && e.which <= 105) { // a-zA-Z0-9
					var val_zip = zip.val();

					if (val_zip !== '' && val_zip.length == maxLength) {

						// clear validation
						clearValidation();

						// reset city
						city.val('');

						// show loader
						$('#zip_loader').css('display', 'inline-block');

						jqZIPXHR = $.getJSON(App.config.baseUrl + 'http://www.kik.de/tools/service/zip.php', {zip: val_zip}, function (data) {
							$('#zip_loader').hide();

							// check zip
							if (data.status === 'success') {
								// success
								city.val(data.placeName);
							} else {
								if (data.status === 'warning') {
									// do nothing
									if (console)
										console.warn(data.message);
								} else {
									// error
									zip.addClass('validation-failed validate-invalid-zip')
										.after('<div id="advice-required-entry-zip" class="validation-advice" style="">' + Translator.translate('Please enter a valid zip code.') + '</div>');
								}

								city.val('');
							}
						});
					}
				}
			};

			zip.keyup(onValidateZip);
		}
	}
})($jq);
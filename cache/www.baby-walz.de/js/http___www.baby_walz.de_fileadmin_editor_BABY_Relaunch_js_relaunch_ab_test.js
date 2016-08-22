var mapping_win_loc_href				= window.location.href;
var mapping_win_loc_protocol			= window.location.protocol;
var mapping_win_loc_host				= window.location.host;
var mapping_win_loc_pathname			= window.location.pathname;
var mapping_loc_url						= '';
var mapping_new_shop_url				= 'https://beta.baby-walz.de/';
var javascript_path						= ( mapping_win_loc_host == 'www.baby-walz.de' ) ? '/fileadmin/editor/BABY_Relaunch/js/' : '/fileadmin/editor/BABY_Relaunch/js/';
var isMappingAvailable					= 0;
var mapping_is_mobile					= mapping_detect_mobile();
var mapping_is_tablet					= mapping_detect_tablet();
var mapping_width						= window.innerWidth;
var mapping_height						= window.innerHeight;
var mapping_parameter					= '';

function mapping_gup( mapping_name, mapping_url )
{
	if (!mapping_url)
		mapping_url 		= mapping_win_loc_href;
	mapping_name 			= mapping_name.replace( /[\[]/, "\\\[" ).replace( /[\]]/, "\\\]" );
	var mapping_regexS 		= "[\\?&]" + mapping_name + "=([^&#]*)";
	var mapping_regex 		= new RegExp( mapping_regexS );
	var mapping_results 	= mapping_regex.exec( mapping_url );
	return mapping_results == undefined ? undefined : mapping_results[1];
}

function mapping_rewrite(mapping_url, mapping_available)
{
	// Prüfe ob utm_content Parameter vorhanden
	if(parseInt(mapping_gup('id',mapping_win_loc_href)) == 39502)
	{
		window.location	= 'https://beta.baby-walz.de/produkttestermos';
	}
	else if((mapping_gup('utm_source', mapping_win_loc_href)))
	{
		if(mapping_url == '')
			mapping_url	= mapping_new_shop_url;
		
		var queryFinal = [];
		var queries = ['utm_term', 'utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'gclid'];
		
		for (var i = 0; i < queries.length; i++)
		{
			(mapping_gup(queries[i], mapping_win_loc_href) != null) ? queryFinal.push(queries[i] + '=' + mapping_gup(queries[i], mapping_win_loc_href)) : '';
		}
		
		mapping_url = (mapping_url.indexOf('?') < 0) ? mapping_url + '?' + queryFinal.join('&') : mapping_url + '&' + queryFinal.join('&');
		
		// Weiterleiten auf neuen Shop
		window.location	= mapping_url;
	}
	// Prüfe ob document.referrer regex: www\.google\.de$ und kein utm dann organic
	else
	{
		if(mapping_url == '')
			mapping_url	= mapping_new_shop_url;
		
		// Weiterleiten auf neuen Shop
		window.location	= mapping_url;
	}
}
function mapping_search( mapping_number, mapping_type )
{
	isMappingAvailable	= 0;
	var mapping_data	= '';
	if( mapping_type == 'search' )
	{
		mapping_loc_url			= mapping_new_shop_url + 'SearchDisplay?searchTerm=' + mapping_number + '&storeId=100011&catalogId=100000&langId=-3';
		isMappingAvailable		= 1;
		mapping_rewrite(mapping_loc_url, isMappingAvailable);
	}
	else if( mapping_type == 'product' )
	{
		$.ajax({
			url: javascript_path + "mapping_product.js",
			dataType: "script",
			cache: true,
			async: false,
			timeout: 2000
		}).done(function() {
			mapping_data 	= JSON.parse( mapping_object_products );
			if( mapping_data.length > 0 )
			{
				var mapping_index 	= mapping_data.map( function( d ) { return d[ 'a' ]; } ).indexOf( mapping_number );
				if( mapping_index > -1 )
				{
					mapping_loc_url		= mapping_new_shop_url + 'ProductDisplay?catalogId=100000&langId=-3&storeId=100011&productId=' + mapping_data[ mapping_index ][ 'n' ];
					isMappingAvailable	= 1;
				}
			}
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		}).fail(function() {
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		});
	}
	else if( mapping_type == 'product_product' )
	{
		$.ajax({
			url: javascript_path + "mapping_product_product.js",
			dataType: "script",
			cache: true,
			async: false,
			timeout: 2000
		}).done(function() {
			mapping_data 	= JSON.parse( mapping_object_products_product );
			if( mapping_data.length > 0 )
			{
				var mapping_index 	= mapping_data.map( function( d ) { return d[ 'a' ]; } ).indexOf( mapping_number );
				if( mapping_index > -1 )
				{
					mapping_loc_url		= mapping_new_shop_url + 'ProductDisplay?catalogId=100000&langId=-3&storeId=100011&productId=' + mapping_data[ mapping_index ][ 'n' ];
					isMappingAvailable	= 1;
				}
			}
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		}).fail(function() {
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		});
	}
	else if( mapping_type == 'category' )
	{
		$.ajax({
			url: javascript_path + "mapping_category.js",
			dataType: "script",
			cache: true,
			async: false,
			timeout: 2000
		}).done(function() {
			mapping_data 	= JSON.parse( mapping_object_categories );
			if( mapping_data.length > 0 )
			{
				var mapping_index 	= mapping_data.map( function( d ) { return d[ 'a' ]; } ).indexOf( mapping_number );
				if( mapping_index > -1 )
				{
					mapping_loc_url		= mapping_new_shop_url + 'CategoryDisplay?storeId=100011&langId=-3&catalogId=100000&categoryId=' + mapping_data[ mapping_index ][ 'n' ];
					isMappingAvailable	= 1;
				}
			}
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		}).fail(function() {
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		});
	}
	else if( mapping_type == 'category_group' )
	{
		$.ajax({
			url: javascript_path + "mapping_category_group.js",
			dataType: "script",
			cache: true,
			async: false,
			timeout: 2000
		}).done(function() {
			mapping_data 	= JSON.parse( mapping_object_categories_group );
			if( mapping_data.length > 0 )
			{
				var mapping_index 	= mapping_data.map( function( d ) { return d[ 'a' ]; } ).indexOf( mapping_number );
				if( mapping_index > -1 )
				{
					mapping_loc_url		= mapping_new_shop_url + 'CategoryDisplay?storeId=100011&langId=-3&catalogId=100000&categoryId=' + mapping_data[ mapping_index ][ 'n' ];
					isMappingAvailable	= 1;
				}
			}
			mapping_rewrite(mapping_win_loc_pathname, isMappingAvailable);
		}).fail(function() {
			mapping_rewrite(mapping_loc_url, isMappingAvailable);
		});
	}
	else if( mapping_type == 'content' )
	{
		var mapping_object_filialen	= '[{"a":"//baby-walz.de.gauzy.bs2/L/0/Filialen.filialen.0.html","n":"StoreLocator"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/560/Ort/Aachen/Filialdetails.19140.0.html","n":"aachen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/1/Ort/Bad-Waldsee/Filialdetails.19140.0.html","n":"bad-waldsee"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/736/Ort/Basel/Filialdetails.19140.0.html","n":"basel"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/8/Ort/Bayreuth/Filialdetails.19140.0.html","n":"bayreuth"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/9/Ort/Berlin-Charlottenburg/Filialdetails.19140.0.html","n":"berlin"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/11/Ort/Berlin-Prenzlauer-Berg/Filialdetails.19140.0.html","n":"berlin-2"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/12/Ort/Boeblingen/Filialdetails.19140.0.html","n":"boeblingen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/15/Ort/Bremen/Filialdetails.19140.0.html","n":"bremen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/739/Ort/Cham/Filialdetails.19140.0.html","n":"cham"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/146/Ort/Dresden-Neustadt/Filialdetails.19140.0.html","n":"dresden"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/148/Ort/Duesseldorf/Filialdetails.19140.0.html","n":"duesseldorf"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/150/Ort/Frankfurt-am-Main/Filialdetails.19140.0.html","n":"frankfurt"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/152/Ort/Freilassing/Filialdetails.19140.0.html","n":"freilassing"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/153/Ort/Goeppingen/Filialdetails.19140.0.html","n":"goeppingen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/44/Ort/Graz/Filialdetails.19140.0.html","n":"graz"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/156/Ort/Halle/Filialdetails.19140.0.html","n":"halle"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/157/Ort/Hamburg/Filialdetails.19140.0.html","n":"hamburg"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/158/Ort/Hannover/Filialdetails.19140.0.html","n":"hannover"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/160/Ort/Jena/Filialdetails.19140.0.html","n":"jena"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/161/Ort/Karlsruhe/Filialdetails.19140.0.html","n":"karlsruhe"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/730/Ort/Kassel-Franzgraben/Filialdetails.19140.0.html","n":"kassel"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/164/Ort/Konstanz/Filialdetails.19140.0.html","n":"konstanz"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/6/Ort/Landau/Filialdetails.19140.0.html","n":"landau"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/165/Ort/Leipzig/Filialdetails.19140.0.html","n":"leipzig"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/563/Ort/Leuna-Guenthersdorf/Filialdetails.19140.0.html","n":"leuna"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/168/Ort/Ludwigshafen/Filialdetails.19140.0.html","n":"ludwigshafen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/177/Ort/Magdeburg/Filialdetails.19140.0.html","n":"magdeburg"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/176/Ort/Mannheim/Filialdetails.19140.0.html","n":"mannheim"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/155/Ort/Muenchen-Haar/Filialdetails.19140.0.html","n":"muenchen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/155/Ort/Haar/Filialdetails.19140.0.html","n":"muenchen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/172/Ort/Nuernberg/Filialdetails.19140.0.html","n":"nuernberg"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/737/Ort/Oftringen/Filialdetails.19140.0.html","n":"oftringen"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/169/Ort/Pforzheim/Filialdetails.19140.0.html","n":"pforzheim"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/557/Ort/Saarbruecken/Filialdetails.19140.0.html","n":"saarbruecken"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/738/Ort/Schoenbuehl/Filialdetails.19140.0.html","n":"schoenbuehl"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/72/Ort/Stuttgart/Filialdetails.19140.0.html","n":"stuttgart"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/140/Ort/Weil-am-Rhein/Filialdetails.19140.0.html","n":"weil-am-rhein"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/42/Ort/Wien/Filialdetails.19140.0.html","n":"wien"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/43/Ort/Wiener-Neustadt/Filialdetails.19140.0.html","n":"wiener-neustadt"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/648/Ort/Wiesbaden/Filialdetails.19140.0.html","n":"wiesbaden"},{"a":"//baby-walz.de.gauzy.bs2/L/0/sid/135/Ort/Wolfsburg/Filialdetails.19140.0.html","n":"wolfsburg"}]';
		mapping_data 	= JSON.parse( mapping_object_filialen );
		var mapping_index 	= mapping_data.map( function( d ) { return d[ 'a' ]; } ).indexOf( mapping_number );
		if( mapping_index > -1 )
		{
			// Filialen
			mapping_loc_url		= mapping_new_shop_url + mapping_data[ mapping_index ][ 'n' ];
			isMappingAvailable	= 1;
				
		}
		else if( mapping_number == '/' || mapping_number == '//baby-walz.de.gauzy.bs2/index.php' )
		{
			// Startseite
			mapping_loc_url		= mapping_new_shop_url;
			isMappingAvailable	= 1;
			
		}
		else if( mapping_number == '//baby-walz.de.gauzy.bs2/L/0/AGB.a780.0.html' )
		{
			// AGB
			mapping_loc_url		= mapping_new_shop_url + 'webapp/wcs/stores/servlet/babyde/de/GenericStaticContentPageLayoutView?storeId=100011&pageId=2251&urlLangId=-3&urlRequestType=Base&langId=-3&catalogId=100000';
			isMappingAvailable	= 1;
		}
		else if( mapping_number == '//baby-walz.de.gauzy.bs2/L/0/Datenschutz.a777.0.html' )
		{
			// Datenschutz
			mapping_loc_url		= mapping_new_shop_url + 'webapp/wcs/stores/servlet/babyde/de/GenericStaticContentPageLayoutView?storeId=100011&pageId=2252&urlLangId=-3&urlRequestType=Base&langId=-3&catalogId=100000';
			isMappingAvailable	= 1;
		}
		else if( mapping_number == '//baby-walz.de.gauzy.bs2/L/0/Impressum.impressum.0.html' )
		{
			// Impressum
			mapping_loc_url		= mapping_new_shop_url + 'webapp/wcs/stores/servlet/babyde/de/GenericStaticContentPageLayoutView?storeId=100011&pageId=2253&urlLangId=-3&urlRequestType=Base&langId=-3&catalogId=100000';
			isMappingAvailable	= 1;
		}
		else if( mapping_number == '//baby-walz.de.gauzy.bs2/L/0/Kontakt.a776.0.html' )
		{
			// Impressum
			mapping_loc_url		= mapping_new_shop_url + 'webapp/wcs/stores/servlet/ContactFormView?catalogId=100000&langId=-3&name=ServiceFooter&storeId=100011&catalogId=100000&storeId=100011';
			isMappingAvailable	= 1;
		}
		
		mapping_rewrite(mapping_loc_url, isMappingAvailable);
	}
}
function mapping_detect_mobile()
{ 
	var check = 0;
	(function(a)
	{
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
			check = 1
	})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}
function mapping_detect_tablet()
{
	if(typeof navigator.userAgent != 'undefined')
	{
		if (navigator.userAgent.match(/Tablet|iPad/i))
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	else if(typeof navigator.vendor != 'undefined')
	{
		if (navigator.vendor.match(/Tablet|iPad/i))
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	else if(typeof window.opera != 'undefined')
	{
		if (window.opera.match(/Tablet|iPad/i))
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	return 0;
}
function mapping_start( )
{   
	if(mapping_is_mobile == 1 && mapping_is_tablet == 0)
	{
		$('body').append(''
		+'<div class="mapping_layer" style="background:#fff;width:' + mapping_width + 'px;height:' + mapping_height + 'px;position:fixed;top:0px;left:0px;z-index:100000;">'
		+'<div style="position:relative;width:100%;height:' + mapping_height + 'px;text-align:center;">'
		+'<div style="position:absolute;top:25%;left:50%;margin-left:-125px;">'
		+'<p><img width="250" height="46" border="0" alt="Babyausstattung und Babyartikel kaufen bei Baby Walz" src="https://beta.baby-walz.de/wcsstore/WALZStorefrontAssetStore/images/brands/baby-walz/logo-babywalz.png" /></p>'
		+'<p><img width="32" height="32" border="0" alt="Loading..." src="/cache/www.baby-walz.de/img/fileadmin_editor_BABY_Relaunch_js_ajax_loader.gif"/></p>'
		+'<p style="font-family:sans-serif;">Ich bin gleich fÃ¼r Dich da ...</p>'
		+'</div>'
		+'</div>'
		+'</div>');
		var mapping_this_type			= '';
		var mapping_this_url			= '';
		if( mapping_win_loc_href.indexOf( 'search=' ) > -1 )
		{
			mapping_this_url	= mapping_gup('search', mapping_win_loc_href);
			mapping_this_type	= 'search';
		}
		else if( mapping_win_loc_href.indexOf( '\/L\/0\/' ) > -1 || (mapping_win_loc_pathname == '//baby-walz.de.gauzy.bs2/index.php' && mapping_win_loc_href.indexOf( 'index.php?' ) == -1) || mapping_win_loc_pathname == '/'	)
		{
			mapping_this_url	= mapping_win_loc_pathname;
			mapping_this_type	= 'content';
		}
		else if( mapping_win_loc_href.indexOf( '.html' ) > -1 )
		{
			if( mapping_win_loc_pathname.match(/[0-9]/) != null )
			{
				var mapping_new_split	= mapping_win_loc_href.split( '.html' );
				var mapping_new_url		= mapping_new_split[ 0 ].split( '-' );
				mapping_this_url		= mapping_new_url[ mapping_new_url.length - 1 ];
				mapping_this_type		= 'product';
			}
			else
			{
				mapping_this_type		= 'category';
				mapping_this_url		= mapping_win_loc_pathname;
			}
		}
		else if( mapping_win_loc_href.indexOf( '.php' ) > -1 && mapping_win_loc_href.indexOf( 'orderNumber=' ) > -1 )
		{
			mapping_this_url			= mapping_gup('orderNumber', mapping_win_loc_href);
			mapping_this_type			= 'product';
		}
		else if( mapping_win_loc_href.indexOf( '.php' ) > -1 && mapping_win_loc_href.indexOf( 'group=' ) > -1 && mapping_win_loc_href.indexOf( 'product=' ) > -1 )
		{
			mapping_this_url			= mapping_gup('product', mapping_win_loc_href);
			mapping_this_type			= 'product_product';
		}
		else if( mapping_win_loc_href.indexOf( '.php' ) > -1 && mapping_win_loc_href.indexOf( 'group=' ) > -1 && mapping_win_loc_href.indexOf( 'product=' ) == -1 )
		{
			mapping_this_url			= mapping_gup('group', mapping_win_loc_href);
			mapping_this_type			= 'category_group';
		}
		if(mapping_this_url.indexOf('/L/0/abmelden') == -1)
			mapping_search( mapping_this_url, mapping_this_type );
	}
}

function read_cookie( my_cookie )
{
	var my_cookie_eq 	= my_cookie + "=";
	var ca 				= document.cookie.split( ';' );
	for( var i=0; i < ca.length; i++ )
	{
		var c 			= ca[i];
		while ( c.charAt( 0 )	== ' ' )
		{
			c 			= c.substring(1,c.length);
		}
		if ( c.indexOf( my_cookie_eq ) == 0 )
		{
			return c.substring( my_cookie_eq.length, c.length );
		}
	}
	return null;
}

mapping_start();
setTimeout(function() {
	$('.mapping_layer').remove();
},1500);
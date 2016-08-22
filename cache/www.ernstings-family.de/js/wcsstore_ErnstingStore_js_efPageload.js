;(function($) {

  /*
   * =======================================================
   * ACHTUNG: Diese Datei ist Landesspezifisch!
   * -------------------------------------------------------
   * Sollen neue Funktionen auch in AT unterstuetzt werden,
   * dann muss die Aenderung doppelt gepflegt werden!
   * =======================================================
   */
  var baseUrl			= "ernstings-family.de";
  var baseUrl_staging 	= "h2-staging-ernstings.spot-media.de";


  if(window.location.host.match(/wcsefdev/)) {
    baseUrl = baseUrl_staging;
  }

  var spassBaseUrl		= "http://spass." + baseUrl;
  var serviceBaseUrl		= "http://service." + baseUrl;
  var newsletterBaseUrl  = "http://newsletter.ernstings-family.com/public/redesign";
  var newsletterRealBaseUrl  = "http://newsletter.ernstings-family.com";
  var staticBaseUrl		= "http://static." + baseUrl;
  var staticBaseUrlNoCache	= "http://static." + baseUrl + ":8080";

  //
  // some different close buttons for further usage in modal layer
  //

  var closeButtonWhite = '<a href="#" class="modalClose" id="modalClose" '
    + 'style="color:#ffffff; background:transparent url(http://static.ernstings-family.de/layer/btn_close_white.gif) '
    + 'no-repeat scroll right 2px" title="Fenster schließen">Fenster schließen</a>';

  var closeButtonBlack = '<a href="#" class="modalClose" id="modalClose" '
    + 'style="color:#000000; background:transparent url(http://static.ernstings-family.de/layer/btn_close_black.gif) '
    + 'no-repeat scroll right 2px" title="Fenster schließen">Fenster schließen</a>';

  var closeButtonGreen = '<a href="#" class="modalClose" id="modalClose" '
    + 'style="color:#000000; background:transparent url(http://static.ernstings-family.de/layer/btn_close_green.gif) '
    + 'no-repeat scroll right 2px" title="Fenster schließen">Fenster schließen</a>';

  var closeButtonBlueXmas = '<a href="#" class="modalClose" id="modalClose" '
  + 'style="color:#7797a9; background:transparent url(http://static.ernstings-family.de/layer/merryChristmas/images/btn_close_blue.gif) '
  + 'no-repeat scroll right 2px; top: 5px; right: 12px;" title="Fenster schließen">Fenster schließen</a>';

  /**
   * configurations for layers that might be shown on page-load.
   * For each layer an URL-Pattern and a set of parameters is defined.
   * The parameters are read from the GET-Variables and are placed
   * into the corresponding placeholder of the URL-Pattern.
   *
   * Members:
   * - urlPattern: the URL containing a placeholder ("{...}") for
   *     each parameter it contains
   * - params: a list of parameters being replaced in the urlPattern.
   *     The actual value of the parameter is taken from the window's
   *     location.
   * - isVolatileUrl: nyroModal moves the created iframe around in the
   *     dom, which causes the firefox to reload the URL with every
   *     modification. Most URLs won't be affected from being loaded
   *     multiple times but some will. These URLs are called 'volatile'.
   *     If set to true, countermeasures will be initiated to avoid
   *     loading the volatile URL multiple times.
   * - width, height: you may have a wild guess on these...
   * - startDate, endDate: If you set startDate and endDate the layer will open automaticly in the given period.
   *     The follwing notation is given: 'yyyy-mm-dd hh:mm:ss'
   * - setCookie: If set to true a cookie will be set with an expire date +1 day of endDate.
   *     It also checks for exiting cookie. Layer only will open if no valid cookie can be found.
   */
  var layerConfig = {
//		freeshippingcharge: {
//		    urlPattern: staticBaseUrl + "http://www.ernstings-family.de/layer/freeshippingcharge/layer.iframe.freeshippingcharge.html",
//		    params: [],
//		    isVolatileUrl: true,
//		    closeButton: '<a href="#" class="modalClose" id="modalClose" '
//		    	+ 'style="color:#ffffff; background:transparent url(http://static.ernstings-family.de/layer/freeshippingcharge/images/btn_close_weiss.gif) no-repeat scroll right 2px" '
//        		+ 'title="Fenster schließen">Fenster schließen</a>',
//			width: 587, height: 552
//		},

    ecards: {
      urlPattern: spassBaseUrl + "/ecard/show/{ecardId}",
      params: ['ecardId'],
      isVolatileUrl: true,
      width: 585, height: 575
    },

    // NEU
    storesearch: {
      urlPattern: serviceBaseUrl + '/filialsuche',
      params: [],
      isVolatileUrl: true,
      width: 687, height: 605
    },

    bannerLandingPage: {
      urlPattern: "http://www.ernstings-family.de/layer/lilalaune.layer.html",
      params: [],
      forceType: false,
      endShowContent : function() {
        cmCreatePageviewTag('Li-La-Laune Newsletter Layer', 'PAGELOAD_LAYER');

        $('#layer_lilalaune form').submit(function() {
          var submitUrl = newsletterBaseUrl + "/remotebox.jsp"
              + "?uemail={uemail}";
          var uemailValue = $('#newsletter_uemail').val();
          $.nyroModalManual({
            url: submitUrl.replace('{uemail}', uemailValue),
            width: 685, height: 481
          });
          return false;
        });
      }
    },

    newsletterSubscribe: {
      urlPattern: newsletterBaseUrl + "/remotebox.jsp" // -> welcome.jsp
        + "?uemail={uemail}&source={source}",
      params : ['uemail', 'source'],
      isVolatileUrl: true,
      closeButton: closeButtonBlack,
      width: 716, height: 531
    },
    fbNewsletterSubscribe: {
      urlPattern: newsletterBaseUrl + "/remotebox.jsp"
        + "?locale={locale}&uemail={uemail}&user_FirstName={user_FirstName}&user_LastName={user_LastName}&user_Title={user_Title}&source={source}",
      params : ['locale', 'uemail', 'user_FirstName', 'user_LastName', 'user_Title', 'source'],
      isVolatileUrl: true,
      width: 716, height: 531
    },
    newsletterConfirm: {
      urlPattern: newsletterBaseUrl + "/subscribe.jsp"
          + "?tsp={tsp}&uid={uid}&tan={tan}&sig={sig}&action={action}&email={email}&dt_ttype={dt_ttype}&locale={locale}&errorPage=/public/subscribe_err.jsp",
      params : ['tsp', 'uid', 'tan', 'sig', 'action', 'email', 'dt_ttype', 'locale'],
      isVolatileUrl: true,
      closeButton: closeButtonBlack,
      width: 716, height: 531
    },
    newsletterUnsubscribe: {
      urlPattern: newsletterBaseUrl + "/unsubscribe_i.jsp" // -> unsubscribe_submit.jsp
        + "?tsp={tsp}&custid={custid}&uid={uid}&mid={mid}&sig={sig}&for_mid={for_mid}&gid={gid}",
      params: ['tsp', 'custid', 'uid', 'mid', 'sig', 'for_mid', 'gid'],
      isVolatileUrl: true,
      closeButton: closeButtonBlack,
      width: 716, height: 531
    },
    newsletterUnsubscribeJK: {
      urlPattern: newsletterBaseUrl + "/unsubscribe_jk.jsp"
        + "?uid={uid}&mid={mid}&sig={sig}&jid={jid}&gid={gid}&email={email}&cm_mmc={cm_mmc}",
      params: ['uid', 'mid', 'sig', 'jid', 'gid', 'email'],
      isVolatileUrl: true,
      width: 718, height: 532
    },
    newsletterProfileEdit: {
      urlPattern: newsletterBaseUrl + "/profile_edit.jsp"
        + "?tsp={tsp}&custid={custid}&uid={uid}&sig={sig}&for_mid={for_mid}&mid={mid}&gid={gid}",
      params : ['tsp', 'custid', 'uid', 'sig', 'for_mid', 'mid', 'gid'],
      isVolatileUrl: true,
      closeButton: closeButtonBlack,
      width: 716, height: 531
    },
    newsletterChangeEmail: {
      urlPattern: newsletterBaseUrl + "/change_email_confirm.jsp" // -> profile_confirm.jsp
        + "?tsp={tsp}&uid={uid}&tan={tan}&sig={sig}&action={action}&errorPage={errorPage}",
      params : ['tsp', 'uid', 'tan', 'sig', 'action', 'errorPage'],
      isVolatileUrl: true,
      width: 716, height: 531
    },

    passSent: {
      urlPattern: staticBaseUrl + "http://www.ernstings-family.de/layer/ShopUserPassSent/layer.iframe.shopUserPassSent.html",
      params : [],
      isVolatileUrl: true,
      minHeight: 100,
      width: 536, height: 158
    },
    voucherHilfe: {
      urlPattern: "http://www.ernstings-family.de/hilfe/faq_gutschein.layer.html",
      params : [],
      forceType: false
    },

      nl_at_move_yes: {
          urlPattern: newsletterRealBaseUrl + "/public/confirm_yes.jsp",
          params : [],
          forceType: false,
          width: 718, height: 532
      },

      nl_at_move_no: {
          urlPattern: newsletterRealBaseUrl + "/public/confirm_no.jsp",
          params : [],
          forceType: false,
          width: 718, height: 532
      },

    // Hüttengaudi Ankündigung
    // Start: 26.07.2012 08:00 Uhr
    // Ende:  02.08.2012 00:00 Uhr
    huettengaudi_preview: {
      urlPattern: staticBaseUrl+ "http://www.ernstings-family.de/layer/huettengaudi_preview/layer.iframe.huettengaudi_preview_de.html?cm_sp=shop-_-cookieLayer-_-huettengaudi_previewDE",
      params : [],
      isVolatileUrl: false,
      closeButton: closeButtonBlack,
      width: 587, height: 445,
      startDate: '2012-07-26 08:00:00',
      endDate: '2012-08-02 00:00:00',
      setCookie: true
    },


    // Hüttengaudi
    // Start: 02.08.2012 00:01 Uhr
    // Ende:  16.08.2012 23:59 Uhr
    huettengaudi: {
      urlPattern: staticBaseUrl+ "http://www.ernstings-family.de/layer/huettengaudi/layer.iframe.huettengaudi_de.html?cm_sp=shop-_-cookieLayer-_-huettengaudiDE",
      params : [],
      isVolatileUrl: false,
      closeButton: closeButtonBlack,
      width: 587, height: 445,
      startDate: '2012-08-02 00:00:01',
      endDate: '2012-08-16 23:59:59',
      setCookie: true
    }
  };

  /**
   * EDGELAY CONFIGURATION
   * Configuration for layer that will be placed on the left edge of frontpage.
   * Only the one edglay at the time can be shown. For more than one active configs
   * the one with the higher startdate will be choosen.
   * - height, width, handleWidth: Values in pixel
   * - wrapperClass: CSS class which will be added to wrapper (default #edgelay_#name#)
   * - backgroundImageUrl: will be added as CSS-Style to wrapper (div.edgelay)
   * - positionBottom: set bottom position (pixel) of wrapper (div.edgelay, Default 100 )
   * - content: Enter html Syntax. It will be inserted inside of div.edgelayContent
   * - contentUrl: If set the content of the ajax Result of given url will be inserted inside of div.edgelayContent.
   *     This overwrites the content given in 'content'-config
   * - initOpen: if set to true edglay will be opened on pageload (Default true)
   * - startDate, endDate: the edgaly will be shown in the given period. Only one edglay at a time 
   *     will be visible. If more than one edglays are active the one with the highest startDate will be on. 
   *     Use the follwing notation 'yyyy-mm-dd hh:mm:ss'
   * - setCookie: If set to true a cookie will be set on closing event with an expire date +1 day of endDate.
   *     It also checks for exiting cookie. Edglay only will initaly open if no valid cookie can be found (and initOpen option is true).
   *     Default is true
   */
  var documentHeight = (typeof document.innerHeight == 'undefined') ? document.documentElement.clientHeight : document.innerHeight;
  var edgelays = {
    lieferungBisXmas2012: {
      width:           355,
      height:          378,
      handleWidth:     40,
      backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_edgelays_ef_seitenlayer_lieferungBisXmas_de.png',			
      startDate:       '2012-11-30 08:00:00',
      endDate:         '2012-12-24 23:59:59',			
	  positionBottom:  200
    },
    mobileShopLaunch: {
      width:           294,
      height:          474,
      content:         '<style type="text/css">.edgelay .edgelayClose { left: 0 !important; } .edgelay .edgelayHandle { top: 70px; }</style><div style="width:294px;height:474px;" bgcolor="red"><a href="http://aktionen.ernstings-family.de/mobile-shop" onclick="cmCreateManualPageviewTag(\'EDGELAY : MOBILE-SHOP : OUTBOUND-LP\', null, null);" style="width: 125px; top: 230px; position: absolute; left: 82px; float: left; height: 50px;">&nbsp;</a></div>',
      handleWidth:     85,
      backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_mobile_launch_ef_mobile_postit.png',
      startDate:       '2013-02-11 00:00:00',
      endDate:         '2013-02-24 23:59:59',
      positionKey:     'top',
      positionValue:   250
    },
    lieferungBisOstern2013: {
      width:           235,
      height:          322,
      content:         '<style type="text/css">.edgelay .edgelayClose { left: 0 !important;top: 33px !important;width: 40px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:235px;height:322px;"><!-- --></div>',
      handleWidth:     110,
      handleHeight:    322,
      backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_edgelays_seitenlayer_lieferungBisOstern_de.png',
      startDate:       '2013-03-11 00:00:00',
      endDate:         '2013-03-29 00:00:00',
      positionBottom:  Math.round((documentHeight - 322)/2)
    },
    summergame2013: {
      width:           502,
      height:          527,
      content:         '<style type="text/css">.edgelay .edgelayClose { left: 299px !important;top: 157px !important;width: 40px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:460px;height:633px;"><a href="http://aktionen.ernstings-family.de/sommergewinnspiel" onClick="cmef.createPageviewTag(\'Aktionen : Sommergewinnspiel : Post_It_Teaser_Button\', \'SPASS\');" style="position:absolute; top: 380px; left: 27px; width: 116px; height: 97px; text-indent: -9999px">Ich möchte mitspielen</a></div>',
      handleWidth:     250,
      handleHeight:    527,
      backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_edgelays_seitenlayer_summergame_postit_de_at_neu.png',
      startDate:       '2013-05-30 00:00:00',
      endDate:         '2013-06-12 23:59:59',
      positionBottom:  Math.round((documentHeight - 527)/2)
    },
    OS_10Jahre_0812v1: {
        width:           386,
        height:          506,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 229px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:386px;height:506px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0812v1\', null, null);" style="position:absolute; top: 435px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     190,
        handleHeight:    506,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_Iris_marion.png',
        startDate:       '2013-08-12 00:00:00',
        endDate:         '2013-08-12 12:00:59',
        positionBottom:  Math.round((documentHeight - 506)/2)
    },
    OS_10Jahre_0812v2: {
        width:           396,
        height:          536,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 239px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:396px;height:536px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0812v2\', null, null);" style="position:absolute; top: 463px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     185,
        handleHeight:    536,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_marion_Iris.png',
        startDate:       '2013-08-12 12:01:00',
        endDate:         '2013-08-12 23:59:59',
        positionBottom:  Math.round((documentHeight - 536)/2)
    },
    OS_10Jahre_0813v1: {
        width:           380,
        height:          644,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 332px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:380px;height:644px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0813v1\', null, null);" style="position:absolute; top: 573px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     173,
        handleHeight:    644,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_jaci_FB.png',
        startDate:       '2013-08-13 00:00:00',
        endDate:         '2013-08-13 12:00:59',
        positionBottom:  Math.round((documentHeight - 644)/2)
    },
    OS_10Jahre_0813v2: {
        width:           332,
        height:          650,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 338px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:332px;height:650px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0813v2\', null, null);" style="position:absolute; top: 578px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     120,
        handleHeight:    650,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_jaci.png',
        startDate:       '2013-08-13 12:01:00',
        endDate:         '2013-08-13 23:59:59',
        positionBottom:  Math.round((documentHeight - 650)/2)
    },
    OS_10Jahre_0814v1: {
        width:           374,
        height:          704,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 348px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:374px;height:644px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0814v1\', null, null);" style="position:absolute; top: 632px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     160,
        handleHeight:    704,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_anna.png',
        startDate:       '2013-08-14 00:00:00',
        endDate:         '2013-08-14 12:00:59',
        positionBottom:  Math.round((documentHeight - 704)/2)
    },
    OS_10Jahre_0814v2: {
        width:           406,
        height:          652,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 354px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:406px;height:652px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0814v2\', null, null);" style="position:absolute; top: 582px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     200,
        handleHeight:    652,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_anne.png',
        startDate:       '2013-08-14 12:01:00',
        endDate:         '2013-08-14 23:59:59',
        positionBottom:  Math.round((documentHeight - 652)/2)
    },
    OS_10Jahre_0815v1: {
        width:           384,
        height:          578,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 250px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:384px;height:578px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0815v1\', null, null);" style="position:absolute; top: 504px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     170,
        handleHeight:    578,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_carsten.png',
        startDate:       '2013-08-15 00:00:00',
        endDate:         '2013-08-15 23:59:59',
        positionBottom:  Math.round((documentHeight - 578)/2)
    },
    OS_10Jahre_0816v1: {
        width:           404,
        height:          652,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 358px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:404px;height:652px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0816v1\', null, null);" style="position:absolute; top: 580px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     195,
        handleHeight:    652,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_steffi_w.png',
        startDate:       '2013-08-16 00:00:00',
        endDate:         '2013-08-16 23:59:59',
        positionBottom:  Math.round((documentHeight - 652)/2)
    },
    OS_10Jahre_0817v1: {
        width:           400,
        height:          650,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 358px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:400px;height:650px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0817v1\', null, null);" style="position:absolute; top: 577px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     197,
        handleHeight:    650,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_herbert.png',
        startDate:       '2013-08-17 00:00:00',
        endDate:         '2013-08-17 23:59:59',
        positionBottom:  Math.round((documentHeight - 650)/2)
    },
    OS_10Jahre_0818v1: {
        width:           424,
        height:          570,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 275px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:424px;height:570px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0818v1\', null, null);" style="position:absolute; top: 497px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     220,
        handleHeight:    570,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_sara.png',
        startDate:       '2013-08-18 00:00:00',
        endDate:         '2013-08-18 23:59:59',
        positionBottom:  Math.round((documentHeight - 570)/2)
    },
    OS_10Jahre_0819v1: {
        width:           397,
        height:          498,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 201px !important;top: 210px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:397px;height:498px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0819v1\', null, null);" style="position:absolute; top: 428px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     186,
        handleHeight:    498,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_flojankajessi.png',
        startDate:       '2013-08-19 00:00:00',
        endDate:         '2013-08-19 23:59:59',
        positionBottom:  Math.round((documentHeight - 498)/2)
    },
    OS_10Jahre_0820v1: {
        width:           402,
        height:          712,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 365px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:402px;height:712px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0820v1\', null, null);" style="position:absolute; top: 637px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     190,
        handleHeight:    712,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_andre.png',
        startDate:       '2013-08-20 00:00:00',
        endDate:         '2013-08-20 23:59:59',
        positionBottom:  Math.round((documentHeight - 712)/2)
    },
    OS_10Jahre_0821v1: {
        width:           364,
        height:          677,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 352px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:364px;height:677px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0821v1\', null, null);" style="position:absolute; top: 605px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     145,
        handleHeight:    677,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_steffi_wess.png',
        startDate:       '2013-08-21 00:00:00',
        endDate:         '2013-08-21 23:59:59',
        positionBottom:  Math.round((documentHeight - 677)/2)
    },
    OS_10Jahre_0822v1: {
        width:           412,
        height:          602,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 337px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:412px;height:602px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0822v1\', null, null);" style="position:absolute; top: 534px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     215,
        handleHeight:    602,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_carina.png',
        startDate:       '2013-08-22 00:00:00',
        endDate:         '2013-08-22 23:59:59',
        positionBottom:  Math.round((documentHeight - 602)/2)
    },
    OS_10Jahre_0822v2: {
        width:           374,
        height:          698,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 363px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:374px;height:698px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0822v2\', null, null);" style="position:absolute; top: 623px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     160,
        handleHeight:    698,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_schlossmacher.png',
        startDate:       '2013-08-22 12:01:00',
        endDate:         '2013-08-22 23:59:59',
        positionBottom:  Math.round((documentHeight - 698)/2)
    },
    OS_10Jahre_0823v1: {
        width:           362,
        height:          685,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 373px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:362px;height:685px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0823v1\', null, null);" style="position:absolute; top: 613px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zum Famyläum</a></div>',
        handleWidth:     155,
        handleHeight:    685,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_steffi_wieschhoerster.png',
        startDate:       '2013-08-23 00:00:00',
        endDate:         '2013-08-23 12:00:59',
        positionBottom:  Math.round((documentHeight - 685)/2)
    },
    OS_10Jahre_0823v2: {
        width:           386,
        height:          686,
        content:         '<style type="text/css">.edgelay .edgelayClose { left: 186px !important;top: 373px !important;width: 25px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:386px;height:686px;"><a href="http://aktionen.ernstings-family.de/10-Jahre" onClick="cmCreateManualPageviewTag(\'AKTIONEN : 10Jahre : INBOUND-POST-IT-TEASER-BUTTON-HOME-0823v2\', null, null);" style="position:absolute; top: 613px; left: 71px; width: 127px; height: 17px; text-indent: -9999px">Zur Aktion</a></div>',
        handleWidth:     185,
        handleHeight:    686,
        backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_aktionen_zehnjahreshop_hpFamys_ef_postit_julius.png',
        startDate:       '2013-08-23 12:01:00',
        endDate:         '2013-08-23 23:59:59',
        positionBottom:  Math.round((documentHeight - 686)/2)
    },
    lieferungBisXmas2013: {
       	width:           319,
       	height:          237,
       	content:         '<style type="text/css">.edgelay .edgelayClose { left: 9px !important;top: -8px !important;width: 27px !important; } .edgelay .edgelayHandle { top: 0; }</style><div style="width:319px;height:237px;"><!-- --></div>',
       	handleWidth:     30,
       	handleHeight:    237,
       	backgroundImageUrl: staticBaseUrl + '/cache/www.ernstings-family.de/img/images_edgelays_ef_seitenlayer_lieferungBisXmas2013_de.png',			
       	startDate:       '2013-12-09 10:00:00',
       	endDate:         '2013-12-20 23:59:59',			
	   	positionBottom:  Math.round((documentHeight - 237)/2)
    }
};


  function doOpenLayer(settings) {
    var modalSettingsDefault = {
      forceType: 'iframe',
      titleFromIframe: false,
      endFillContent: function() { $('.modalWrap').css({ position: 'absolute' }); }
    };

    var modalSettings = $.extend({}, modalSettingsDefault, settings);

    if(settings.isVolatileUrl) {
      modalSettings.url = 'about:blank';
      modalSettings.realUrl = settings.url;
      modalSettings.endFillContent = function(modal, currentSettings) {
        // don't know what the problem was, but this fixes the not-loading of layer contents in FF3.6
        window.setTimeout(function() {
          var cw = $('iframe', modal.contentWrapper)[0].contentWindow;
          cw.location.href = currentSettings.realUrl;
        }, 0);

        $('.modalWrap').css({ position: 'absolute' });
      };
    }

    $.nyroModalManual(modalSettings);
  };

  
  function startup() {

    // process layer configruation
    var urlParams = parseUrl();
    var layerName = urlParams.openLayer;
    var now = new Date();


    // no layer given via url parameter (openLayer)
    if(layerName === undefined) {

      // look for layer config with start and end date
      $.each(layerConfig, function(key, settings) {

        if(settings.startDate === undefined || settings.endDate === undefined ) {
          return; // continue
        }

        // reject layer with conifg out of date
        if(false === isActive(settings)) {
          return; // continue
        }

        // set layer name
        layerName = key;

        // set cookie if needed
        if(settings.setCookie === true) {
          var cookieName = "layer" + layerName.toUpperCase() + "shown"
          var cookieRegex = new RegExp(cookieName, "g");
          var endDate = parseDate(settings.endDate);
          var cookieExpireDate = endDate;
          cookieExpireDate.setTime(endDate.getTime() + 86400000); // + 1 day

          if (document.cookie.match(cookieRegex)) {
            layerName = undefined; // reset layername so it does not open
            return false;  // break foreach
          }
          document.cookie = cookieName + "=1; expires=" + cookieExpireDate.toGMTString();
        }

        // break foreach
        return false;

      });
    }


    // no layer for opening - stop here
    if(!layerConfig[layerName]) {
    	
      // init edgelay
      $('body').edgelay(edgelays);
    	
      return;
    }


    var cfg = layerConfig[layerName];
    cfg.url = cfg.urlPattern;
    for(var i=0; i<cfg.params.length; i++) {
      if( urlParams[cfg.params[i]] == null ) {
        urlParams[cfg.params[i]] = '';
      }

      // quickfix: change parameter name 'uemail' to 'kunde' in url
      if (cfg.params[i] == "uemail") {
        cfg.url = cfg.url.replace("uemail=", "kunde=");
      }

      cfg.url = cfg.url.replace( "{"+cfg.params[i]+"}", urlParams[cfg.params[i]] );
    }

    doOpenLayer(cfg);

  };

  $(startup);

   
    $(document).ready(function() {
        // FlipTeaser Function
        function flipTeaser(className) {
            var findActive = className.split(' ')[1];
            if(findActive == "active"){
                $('.flipTeaser.active .highTeaser').stop().fadeIn(200);
            }else{
                $('.flipTeaser .highTeaser').fadeOut(200);
            }
            return;
        };

        $(".flipTeaser").mouseenter(function() {
            $(this).css('position', 'relative');
            $(this).addClass("active");
            var classes = $(this).attr('class');
            flipTeaser(classes);
        }).mouseleave(function() {
            $(this).removeClass("active");
            var classes = $(this).attr('class');
            flipTeaser(classes);
        });
    });

})(jQuery);
/*
 * Coremetrics EF custom code
 */

var cmef = new Object();
 
// Set settings
cmef.setZoneSettings = function(settings) {
  cmef.settings = settings;
  // Set initial zone population counter and completion function
  cmef.zpCounter = settings.zpCount;
  cmef.zpOnComplete = settings.zpOnComplete;
};

// Decrease zone population counter and call completion function
cmef.decZoneCounter = function() {
  if (cmef.zpCounter) {
    --cmef.zpCounter;
    if (cmef.zpCounter == 0) {
      // Execute possible configured function, after all zones are populated
      if (cmef.zpOnComplete) {
        cmef.zpOnComplete();
      }
    }
  }
}

function parseUrl() {
  var queryStr = "";
  try {
    queryStr = window.location.search.substr(1);

    if(queryStr == "") { return {}; }

    var params = {};
    var parts = queryStr.split('&');
    for(var i=0; i<parts.length; i++) {
      var m = /([^=]+)=(.*)/.exec(parts[i]);
      if(!m) { params[parts[i]] = true; }
      else { params[m[1]] = m[2]; }
    }
    return params;
  } catch(e) { return {}; }
}

// Saves the current MMC-Parameter (MT1217, MT1789)
cmef.saveMmcParameter = function() {
  var urlParams = parseUrl();
  var mmc = urlParams['cm_mmc'];
  if (mmc != null) {
    var pos = mmc.indexOf('-');
    var parterId = (pos != -1 ? mmc.substring(0, pos) : mmc);
    jQuery.cookie("efCmMmcParter", parterId, { path: '/', expires: 30 });
    jQuery.cookie("efSEO", null, { path: '/'});
  } else {
    if (cmef.referrerSearchEngine() | cmef.referrerOwnDomain()) {
      jQuery.cookie("efCmMmcParter", null, { path: '/'});
    }
  }
}

// Returns true, if the referrer is one of the specified search engines
cmef.referrerSearchEngine = function() {
  return document.referrer.toLowerCase().match(/google|bing|yahoo|fireball/);
}

// Returns true, if the referrer is one of the domains owned by EF
cmef.referrerOwnDomain = function() {
  for (var i = 0; i < cmef.ownDomains.length; i++) {
    if (document.referrer.indexOf(cmef.ownDomains[i]) != -1) {
      return true;
    }
  }
  return false;
}

//  Wrap all Coremetrics functions with exception handling to ensure shop functionality in all cases
cmef.setClientID = function(o1, o2, o3, o4, o5) {
  try {cmSetClientID(o1, o2, o3, o4, o5);} catch(e) {};
};
cmef.createPageviewTag = function(o1, o2, o3, o4){
  try {cmCreatePageviewTag(o1, o2, o3, o4);} catch(e) {};
};
cmef.createManualPageviewTag = function(o1, o2, o3, o4){
  try {cmCreateManualPageviewTag(o1, o2, o3, o4);} catch(e) {};
};
cmef.createShopAction5Tag = function(o1, o2, o3, o4, o5){
  try {cmCreateShopAction5Tag(o1, o2, o3, o4, o5);} catch(e) {};
};
cmef.createShopAction9Tag = function(o1, o2, o3, o4, o5, o6, o7, o8){
  try {cmCreateShopAction9Tag(o1, o2, o3, o4, o5, o6, o7, o8);} catch(e) {};
};
cmef.createRegistrationTag = function(o1, o2, o3, o4, o5, o6, o7){
  try {cmCreateRegistrationTag(o1, o2, o3, o4, o5, o6, o7);} catch(e) {};
};
cmef.createOrderTag = function(o1, o2, o3, o4, o5, o6, o7){
  try {cmCreateOrderTag(o1, o2, o3, o4, o5, o6, o7);} catch(e) {};
};
cmef.displayShop5s = function(){
  try {cmDisplayShop5s();} catch(e) {};
};
cmef.displayShop9s = function(){
  try {cmDisplayShop9s();} catch(e) {};
};
cmef.createProductviewTag = function(o1, o2, o3){
  try {cmCreateProductviewTag(o1, o2, o3);} catch(e) {};
};
cmef.recRequest = function(o1, o2, o3){
  try {cmRecRequest(o1, o2, o3);} catch(e) {};
};
cmef.displayRecs = function(o1, o2, o3){
  try {cmDisplayRecs(o1, o2, o3);} catch(e) {};
};
cmef.createElementTag = function(o1, o2, o3){
  try {cmCreateElementTag(o1, o2, o3); } catch(e){};
};
cmef.createConversionEventTag = function(o1, o2, o3, o4, o5, o6){
  try {cmCreateConversionEventTag(o1, o2, o3, o4, o5, o6); } catch(e){};
};

cmef.ownDomains = [
  'beatwear.at',
  'beatwear.be',
  'beatwear.ch',
  'beatwear.de',
  'beatwear.dk',
  'beatwear.es',
  'beatwear.eu',
  'beatwear.fr',
  'beatwear.info',
  'beatwear.it',
  'beatwear.li',
  'beatwear.lu',
  'beatwear.nl',
  'beatwear.org',
  'beatwear.pl',
  'ernstings-familie.at',
  'ernstings-familie.be',
  'ernstings-familie.biz',
  'ernstings-familie.ch',
  'ernstings-familie.co.uk',
  'ernstings-familie.com',
  'ernstings-familie.de',
  'ernstings-familie.dk',
  'ernstings-familie.es',
  'ernstings-familie.eu',
  'ernstings-familie.fr',
  'ernstings-familie.info',
  'ernstings-familie.it',
  'ernstings-familie.li',
  'ernstings-familie.lu',
  'ernstings-familie.net',
  'ernstings-familie.nl',
  'ernstings-familie.org',
  'ernstings-familie.pl',
  'ernstings-familiy.de',
  'ernstings-family-family.de',
  'ernstings-family.asia',
  'ernstings-family.be',
  'ernstings-family.biz',
  'ernstings-family.ch',
  'ernstings-family.co.uk',
  'ernstings-family.dk',
  'ernstings-family.es',
  'ernstings-family.eu',
  'ernstings-family.fr',
  'ernstings-family.hk',
  'ernstings-family.in',
  'ernstings-family.info',
  'ernstings-family.it',
  'ernstings-family.li',
  'ernstings-family.lu',
  'ernstings-family.net',
  'ernstings-family.nl',
  'ernstings-family.org',
  'ernstings-family.pl',
  'ernstings-family.tv',
  'ernstings-family.tw',
  'ernstings.at',
  'ernstings.be',
  'ernstings.biz',
  'ernstings.ch',
  'ernstings.co.uk',
  'ernstings.dk',
  'ernstings.es',
  'ernstings.eu',
  'ernstings.fr',
  'ernstings.info',
  'ernstings.it',
  'ernstings.li',
  'ernstings.lu',
  'ernstings.net',
  'ernstings.org',
  'ernstings.pl',
  'ernstingsfamilie.at',
  'ernstingsfamilie.be',
  'ernstingsfamilie.biz',
  'ernstingsfamilie.ch',
  'ernstingsfamilie.co.uk',
  'ernstingsfamilie.com',
  'ernstingsfamilie.de',
  'ernstingsfamilie.dk',
  'ernstingsfamilie.es',
  'ernstingsfamilie.eu',
  'ernstingsfamilie.fr',
  'ernstingsfamilie.info',
  'ernstingsfamilie.it',
  'ernstingsfamilie.li',
  'ernstingsfamilie.lu',
  'ernstingsfamilie.net',
  'ernstingsfamilie.nl',
  'ernstingsfamilie.org',
  'ernstingsfamilie.pl',
  'ernstingsfamily.at',
  'ernstingsfamily.be',
  'ernstingsfamily.biz',
  'ernstingsfamily.ch',
  'ernstingsfamily.co.uk',
  'ernstingsfamily.dk',
  'ernstingsfamily.es',
  'ernstingsfamily.eu',
  'ernstingsfamily.fr',
  'ernstingsfamily.info',
  'ernstingsfamily.it',
  'ernstingsfamily.li',
  'ernstingsfamily.lu',
  'ernstingsfamily.net',
  'ernstingsfamily.nl',
  'ernstingsfamily.org',
  'ernstingsfamily.pl',
  'ernstingsfamily.tv',
  'gina-benotti.at',
  'gina-benotti.be',
  'gina-benotti.biz',
  'gina-benotti.ch',
  'gina-benotti.co.uk',
  'gina-benotti.dk',
  'gina-benotti.es',
  'gina-benotti.eu',
  'gina-benotti.fr',
  'gina-benotti.info',
  'gina-benotti.it',
  'gina-benotti.li',
  'gina-benotti.lu',
  'gina-benotti.net',
  'gina-benotti.nl',
  'gina-benotti.org',
  'gina-benotti.pl',
  'gina.lu',
  'ginabenotti.at',
  'ginabenotti.be',
  'ginabenotti.biz',
  'ginabenotti.ch',
  'ginabenotti.co.uk',
  'ginabenotti.dk',
  'ginabenotti.es',
  'ginabenotti.eu',
  'ginabenotti.fr',
  'ginabenotti.info',
  'ginabenotti.it',
  'ginabenotti.li',
  'ginabenotti.lu',
  'ginabenotti.net',
  'ginabenotti.nl',
  'ginabenotti.org',
  'ginabenotti.pl',
  'my-home.it',
  'my-home.lu',
  'sommer-tschuess-verkauf.at',
  'sommer-tschuess-verkauf.biz',
  'sommer-tschuess-verkauf.ch',
  'sommer-tschuess-verkauf.com',
  'sommer-tschuess-verkauf.de',
  'sommer-tschuess-verkauf.eu',
  'sommer-tschuess-verkauf.info',
  'sommer-tschuess-verkauf.net',
  'sommer-tschuess-verkauf.nl',
  'sommer-tschuess-verkauf.org',
  'sommertschuessverkauf.at',
  'sommertschuessverkauf.biz',
  'sommertschuessverkauf.ch',
  'sommertschuessverkauf.com',
  'sommertschuessverkauf.de',
  'sommertschuessverkauf.eu',
  'sommertschuessverkauf.info',
  'sommertschuessverkauf.net',
  'sommertschuessverkauf.org',
  'sommertschuessverkauf.pl',
  'topolino.li',
  'topolino.lu',
  'van-vaan.at',
  'van-vaan.be',
  'van-vaan.biz',
  'van-vaan.ch',
  'van-vaan.co.uk',
  'van-vaan.dk',
  'van-vaan.es',
  'van-vaan.eu',
  'van-vaan.fr',
  'van-vaan.info',
  'van-vaan.it',
  'van-vaan.li',
  'van-vaan.lu',
  'van-vaan.nl',
  'van-vaan.org',
  'van-vaan.pl',
  'vanvaan.at',
  'vanvaan.be',
  'vanvaan.biz',
  'vanvaan.ch',
  'vanvaan.co.uk',
  'vanvaan.dk',
  'vanvaan.es',
  'vanvaan.eu',
  'vanvaan.fr',
  'vanvaan.info',
  'vanvaan.it',
  'vanvaan.li',
  'vanvaan.lu',
  'vanvaan.net',
  'vanvaan.nl',
  'vanvaan.org',
  'vanvaan.pl',
  'von-froehlichen-familien-empfohlen.at',
  'von-froehlichen-familien-empfohlen.be',
  'von-froehlichen-familien-empfohlen.biz',
  'von-froehlichen-familien-empfohlen.ch',
  'von-froehlichen-familien-empfohlen.co.uk',
  'von-froehlichen-familien-empfohlen.com',
  'von-froehlichen-familien-empfohlen.de',
  'von-froehlichen-familien-empfohlen.dk',
  'von-froehlichen-familien-empfohlen.es',
  'von-froehlichen-familien-empfohlen.eu',
  'von-froehlichen-familien-empfohlen.fr',
  'von-froehlichen-familien-empfohlen.info',
  'von-froehlichen-familien-empfohlen.it',
  'von-froehlichen-familien-empfohlen.li',
  'von-froehlichen-familien-empfohlen.lu',
  'von-froehlichen-familien-empfohlen.net',
  'von-froehlichen-familien-empfohlen.nl',
  'von-froehlichen-familien-empfohlen.org',
  'von-froehlichen-familien-empfohlen.pl',
  'von-froehlichen-familien-empfohlen.tv',
  'www-ernstings-family.de',
  'www-ernstings.de',
  'wwwernstings-family.de',
  'wwwernstings.de',
  'sommer-tsch�ss-verkauf.at',
  'sommer-tsch�ss-verkauf.biz',
  'sommer-tsch�ss-verkauf.ch',
  'sommer-tsch�ss-verkauf.com',
  'sommer-tsch�ss-verkauf.de',
  'sommer-tsch�ss-verkauf.eu',
  'sommer-tsch�ss-verkauf.info',
  'sommer-tsch�ss-verkauf.net',
  'sommer-tsch�ss-verkauf.org',
  'sommertsch�ssverkauf.at',
  'sommertsch�ssverkauf.biz',
  'sommertsch�ssverkauf.ch',
  'sommertsch�ssverkauf.com',
  'sommertsch�ssverkauf.de',
  'sommertsch�ssverkauf.eu',
  'sommertsch�ssverkauf.info',
  'sommertsch�ssverkauf.net',
  'sommertsch�ssverkauf.org',
  'von-fr�hlichen-familien-empfohlen.at',
  'von-fr�hlichen-familien-empfohlen.biz',
  'von-fr�hlichen-familien-empfohlen.ch',
  'von-fr�hlichen-familien-empfohlen.com',
  'von-fr�hlichen-familien-empfohlen.de',
  'von-fr�hlichen-familien-empfohlen.eu',
  'von-fr�hlichen-familien-empfohlen.info',
  'von-fr�hlichen-familien-empfohlen.net',
  'von-fr�hlichen-familien-empfohlen.org',
  'von-fr�hlichen-familien-empfohlen.tv',
  'yigga.at',
  'yigga.be',
  'yigga.biz',
  'yigga.ch',
  'yigga.co.uk',
  'yigga.dk',
  'yigga.es',
  'yigga.eu',
  'yigga.fr',
  'yigga.info',
  'yigga.it',
  'yigga.li',
  'yigga.lu',
  'yigga.net',
  'yigga.nl',
  'yigga.org',
  'yigga.pl'
];

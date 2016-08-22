/*
 * Zone population functions for Coremetrics Intelligent Offer
*/

// product detail page
function prd_dtl1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', 'product_recommendations',
    function() {
      // sets prd_teaser to height 100%
      // Returns all inner prod. teasers within #content_main
      var prodTsIn = $j("#content_main .prd_ts_inner");

      prodTsIn.each(function(i){
        // get height from parent
        parItemHeight = $j(this).parent().height();
        // td height minus the border of inner div
        newItemHeight = parItemHeight - 1;
        // set new inner height
        $j(this).css("height", newItemHeight+"px");
      });
    });
};

//product detail page mobile devices
function prd_dtl2_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// bundle detail page (forward to prd_dtl1_zp)
function bnd_dtl1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  prd_dtl1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt);
};

// category chooser page 2 columns left area
function cat_ch21_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// category chooser page 2 columns right area
function cat_ch22_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// category chooser page 3 columns left area
function cat_ch31_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// category chooser page 3 columns middle area
function cat_ch32_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// category chooser page 3 columns right area
function cat_ch33_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', zone);
};

// order item delete layer
function ordidlt1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  zonePopulation(zone, symbolic, a_product_ids, rec_attributes, 'efProduktEmpfehlungen', 'content_right');
};

// order basket page (forward to prd_dtl1_zp)
function ord_bkt1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt) {
  prd_dtl1_zp(a_product_ids, zone, symbolic, target_id, category, rec_attributes, target_attributes, target_header_txt);
};

// Returnes the virtual category ID from the given zone ID
function getVirtualCategory(zone) {
  return ('cm_io_' + zone).toUpperCase();
}

// Inner zone population function with common logic
function zonePopulation(zone, symbolic, a_product_ids, rec_attributes, rec_view, rec_id, oncomplete) {
  // A symbolic of _NR_ indicates no recommendations have been returned
  if (symbolic != '_NR_') {
    var requestUrl = rec_view + '?storeId=10001&catalogId='+cmef.settings.catalogId+'&langId='+cmef.settings.langId+'&zoneId='+zone;
    for (i = 0; i < a_product_ids.length; i++) {
      requestUrl = requestUrl + '&partNumber=' + a_product_ids[i];
      if (rec_attributes[i][0]) {
        requestUrl = requestUrl + '&productId=' + rec_attributes[i][0];
      }
    }
    $j.ajax({
      url: requestUrl
      }).done(function(response){
        if (rec_id) {
          $j('#' + rec_id).html(response);
        }
        postZonePopulation(oncomplete);
      });
//    efobj.ajaxRequest(requestUrl, rec_id, 'true', function() {
//      postZonePopulation(oncomplete);
//    });
  } else {
    postZonePopulation(oncomplete);
  }
}

// Called after zone was populated
function postZonePopulation(onComplete) {
  cmef.decZoneCounter();
  if (onComplete) {
    onComplete();
  }
}

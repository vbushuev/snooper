$j(document).ready(function(){

    // DETECT IE
    //jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    //var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
   // var zoomFadeOut = jQuery.browser.msie == true || isIE11 == true ? "" : "400";

    // Initialisiere Image Zoom
    $j("#prodPicture").elevateZoom({
        gallery:'prd_thumbs',
        cursor: 'pointer',
        galleryActiveClass: 'active',
        imageCrossfade: true,
        loadingIcon: 'http://static.ernstings-family.de/images/ajax-loader-productDetail.gif',
        borderSize:	1,
        borderColour: '#000',
        lensOpacity: 0.8,
        zoomWindowWidth: 367,
        zoomWindowHeight: 518,
        zoomWindowOffetx: 91,
        showLens: true
    });

    // Blende Infos neben Bild aus
    /*$j(".zoomContainer").live("mouseenter", function() {
     var containerHeight = $j('#content_right').height();
     $j('#content_right').css('height',containerHeight);
     $j('.product_help_container').hide();
     $j('#sidebar').hide();
     }).live("mouseleave", function() {
     $j('#content_right').css('height','');
     $j('.product_help_container').show();
     $j('#sidebar').show();
     });*/

    // Öffne Galerie bei Klick auf das Bild
    $j("#prodPicture").bind("click", function(e) {

        // Hole Informationen aus prd_thumbs
        var ez =   $j('#prodPicture').data('elevateZoom');
        var ar = ez.getGalleryList();
        ez.closeAll();

        // Füge Bilder der Galerie hinzu
        var galImages = new Array();

        for (i=0;i<ar.length;i++) {
            galImages[i]= ar[i].href;
        }

        // Offne Fancybox Gallery
        $j.fancybox(galImages ,{
            type: 'image',
            tpl: {
                next: '<a class="fancybox-nav fancybox-next"><span></span></a>',
                prev: '<a class="fancybox-nav fancybox-prev"><span></span></a>',
                closeBtn: '<a class="fancybox-item fancybox-close" href="javascript:;"></a>',
                error:'<p class="fancybox-error">Das angeforderte Bild konnte nicht geladen werden.<br/>Bitte versuchen Sie es später noch einmal.</p>'
            }
        });

        return false;
    });
});

var $ = jQuery.noConflict();
$(document).ready(function() {
    window.G  = new G24();
    // baby-walz.de

    $("#usp_bar, .meta, .headBasket, .footerBox, #headSearch").hide();
    $("#header > ul, #header > div.input-box.input-box--pushed.desktop-only.input-box--silent").hide();
    console.debug(document.location.hostname.split(/\./)[0].replace(/[\-]/,""));
    collectData.init();
    $(document).ajaxComplete(function(e, jqXHR, options) {
        collectData.init();
    });
    $(".wrapper").css("padding-top","56px").css("position","relative");
    $(".header").css("position","absolute");
});

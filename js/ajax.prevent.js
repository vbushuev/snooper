/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
         num = this.toFixed(Math.max(0, ~~n));

     return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
// Automatically cancel unfinished ajax requests
// when the user navigates elsewhere.
(function($) {
    var xhrPool = [];
    window.g_pattern = /(http|https)?(\:)?(\/\/)?(www\.)?(baby\-walz\.de|kik\.de)?\//i;
    var replacement = "//"+document.location.hostname+"?__garan_query__=";
    var add2Basket = function(){
        var $t = arguments[0];
        var $p = $("#productDetail");
        var price = parseFloat($p.find("#productCurrentPrice1_span").text().replace(/\,/g,"."))*G.currencyRate;
        var amount = parseInt($p.find("#productAmountForm_"+selfUID).val());
        var variations = [];
        if($p.find(".productComponent_"+selfUID).length){
            var v = $p.find(".productComponent_"+selfUID).val();
            var k = $p.find(".productComponent_"+selfUID).parent().find("label").text();
            variations[k]=v;
        }
        console.debug("Amount="+amount+" Price= "+price+" UID="+selfUID);
        var product = {
            product_id: -1,
            quantity: amount,
            regular_price: price,
            title: $p.find(".prodName").text(),
            description: $p.find(".prodName").text(),//encodeURIComponent($p.find(".productCopytext").html()),
            product_url: document.location.href,
            product_img: $p.find(".prodImage .imageOptions img.thumbs:first").attr("src"),//"https://youronlinestore.com/#id.png",
            weight:"200",
            dimensions:{
                "height":"100",
                "width":"10",
                "depth":"40"
            },
            variations:variations
        }
        var $i = $p.find(".prodImage");
        $i.clone().css({'position' : 'fixed', 'z-index' : '999'}).appendTo($i)
            .animate({
                opacity: 0.5,
                top: $("#garan24-cart-quantity").offset().top, /* Важно помнить, что названия СSS-свойств пишущихся через дефис заменяются на аналогичные в стиле "camelCase" */
                left:$("#garan24-cart-quantity").offset().left,
                width: 50,
                height: 50},800,function() {$(this).remove();}
            );
        G.add2cart(product);
    }

    window.replaceDonor = function(s){
        if(typeof s == "undefined") return s;
        var h =  s;
        //h = h.replace(g_pattern,replacement);
        var a = h.split("?__garan_query__=");
        //h = a[0]+((a.length>1)?("?q="+encodeURIComponent(a[1])):"");
        //h = a[0]+((a.length>1)?("?q="+a[1]):"");
        //h = a[0]+((a.length>1)?("?__garan_query__="+a[1]):"");
        return h;
    }
    window.relink=function(){
        $("a[data-replaced!=1]").each(function(){
            var $t=$(this);
            var old =(typeof $t.attr("href")!="undefined")?$t.attr("href"):$t.attr("data-original");
            var h = replaceDonor(old);
            //console.debug("replaced "+old+" => "+h);
            $t.attr("href",h);
            $t.attr("data-replaced","1");
        });
        $(".buBasket").click(function(e){
            add2Basket($(this));//,events = $t.data('events');
            /*if(typeof events !="undefined" && typeof events.click != "undefined"){
                for(ec in events.click){
                    var ecl = events.click[ec];
                    $t.unbind(ecl.type,ecl.hendler);
                    console.debug("unbinded "+ecl.type+" handler="+ecl.handler);
                }
            }*/
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        $(".prodListItem").each(function(){
            console.debug("Product found");
        });

    };
    $(document).ajaxSend(function(e, jqXHR, options) {
        var h =  options.url;
        if(h.match(/garan24/ig)||h.match(/checkout\.php/ig))return;
        h = h.replace(g_pattern,replacement);
        var a = h.split("?q=");
        h = a[0]+((a.length>1)?("?q="+encodeURIComponent(a[1])):"");
        //options.url = h;
        //console.debug("jqXHR relink[" + JSON.stringify(options)+"].");
        xhrPool.push(jqXHR);
    });
    $(document).ajaxComplete(function(e, jqXHR, options) {
        xhrPool = $.grep(xhrPool, function(x) {return x != jqXHR});
        //console.debug(jqXHR);
        //console.debug("jqXHR[" + JSON.stringify(jqXHR) +"] is finished and removed from pool.");
    });
    $(document).ajaxStop(function(e, jqXHR, options) {
        //relink();
    });
    window.abort = function() {
        console.debug("!!! ABORT ALL jqXHR !!!");
        $.each(xhrPool, function(idx, jqXHR) {
            jqXHR.abort();
        });
    };
    var oldbeforeunload = window.onbeforeunload;

    window.onbeforeunload = function(e) {
        var r = oldbeforeunload ? oldbeforeunload() : undefined;
        if (r == undefined) {
            // only cancel requests if there is no prompt to stay on the page
            // if there is a prompt, it will likely give the requests enough time to finish
            abort();
        }
        console.debug(e);
        console.debug(document.location.hostname);
        //if(e.target.activeElement.href)
        //return false;
        return r;
    }
    $.fancybox = function(){
        console.debug("fancybox called.");
    };
})(jQuery);

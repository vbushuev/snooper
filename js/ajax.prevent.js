// Automatically cancel unfinished ajax requests
// when the user navigates elsewhere.
(function($) {
    var xhrPool = [];
    var pattern = /(http|https)?(\:)?(\/\/)?(www\.)?(baby\-walz\.de)?\//i;
    var replacement = "//"+document.location.hostname+"?q=";

    window.replaceDonor = function(s){
        if(typeof s == "undefined") return s;
        var h =  s;
        h = h.replace(pattern,replacement);
        var a = h.split("?q=");
        h = a[0]+((a.length>1)?("?q="+encodeURIComponent(a[1])):"");
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
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var $t = $(this);
            $t.unbind("click");
            var $p = $("#productDetail");
            var price = parseFloat($p.find("#productCurrentPrice1_span").text().replace(/\,/g,"."))*G.currencyRate;
            var amount = $p.find("#productAmountForm_"+selfUID).length;
            console.debug("Amount="+amount+" Price= "+price+" UID="+selfUID);
            var product = {
                quantity:amount,
                price:price,
                name:$p.find(".prodName").text()
            }
            $t.clone().css({'position' : 'absolute', 'z-index' : '999'}).appendTo($t)
                .animate({
                    opacity: 0.5,
                    marginLeft: 700, /* Важно помнить, что названия СSS-свойств пишущихся через дефис заменяются на аналогичные в стиле "camelCase" */
                    width: 50,
                    height: 50},700,function() {$(this).remove();}
                );
            G.add2cart(product);
            return false;
        });
        $(".prodListItem").each(function(){
            console.debug("Product found");
        });

    };
    $(document).ajaxSend(function(e, jqXHR, options) {
        var h =  options.url;
        h = h.replace(pattern,replacement);
        var a = h.split("?q=");
        h = a[0]+((a.length>1)?("?q="+encodeURIComponent(a[1])):"");
        options.url = h;
        //console.debug("jqXHR relink[" + JSON.stringify(options)+"].");
        xhrPool.push(jqXHR);
    });
    $(document).ajaxComplete(function(e, jqXHR, options) {
        xhrPool = $.grep(xhrPool, function(x) {return x != jqXHR});
        //console.debug("jqXHR[" + options.url +"] is finished and removed from pool.");

    });
    $(document).ajaxStop(function(e, jqXHR, options) {
        relink();
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
        console.debug(e.target.activeElement);
        //return false;
        return r;
    }
})(jQuery);

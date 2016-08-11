
$(document).ready(function() {
    var pattern = /^(http|https)?(\:)?(\/\/)?(www\.)?(baby\-walz\.de)?\/?/i;
    var replacement = "//snooper.bs2?q=";
    console.debug("snooper loaded!");
    $("#usp_bar, .meta, .headBasket, .footerBox").remove();
    relink();
    /*
    $("a").each(function(){
        var $t=$(this);
        var h = $t.attr("href");
        h = h.replace(pattern,replacement);
        var a = h.split("?q=");
        h = a[0]+((a.length>1)?("?q="+encodeURIComponent(a[1])):"");
        console.debug("replaced "+$t.attr("href")+" => "+h);
        $t.attr("href",h);
        if($t.hasClass("dynamicLink")){
            $t.on("click",function(e){
                //e.preventDefault();

            })
        }
        //e.stopImmediatePropagation();
        //console.debug($t.attr("href"));
    });*/
});

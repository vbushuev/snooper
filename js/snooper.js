function G24(){
    var t = this;
    //this.carthost = "//service.garan24.ru/cart";
    this.carthost = (document.location.hostname.match(/\.bs2/i))?"http://service.garan24.bs2/cart":"https://service.garan24.ru/cart";
    this.id = $.cookie("cart_id");
    this.currencyRate = 72*1.1; //10%
    this.cartQuantity = 0;
    this.cartAmount = 0;
    this.x_secret = "cs_ddde7647b888f21548ca27c6b80a973b20cc6091";
    this.x_key = "ck_d80d9961dfe1d5d9dcee803a6d8d674e265c9220";
    this.version = "1.0";
    this.response_url= this.carthost+"/clean?id="+this.id;
    this.order = {
        order_id:this.id,
        order_url:document.location.href,
        order_total:0,
        order_currency:"RUB",
        items:[]
    };
    this.add2cart = function(){
        console.debug("Garan24::add2cart(..)");
        if(!arguments.length){console.debug("nodata to add");return false;}
        var good = arguments[0];
        console.debug(good);
        this.cartQuantity+=good.quantity;
        this.cartAmount+=good.regular_price*good.quantity;
        this.order.order_total = this.cartAmount;
        this.order.items.push(good);
        this.setCartDigits();
        this.set();
    };
    this.remove = function(){
        console.debug("Garan24::remove from cart(..)");
        if(!arguments.length){console.debug("nodata to add");return false;}
        var i = arguments[0],good = this.order.items[i];
        console.debug(good);
        this.cartQuantity-=good.quantity;
        this.cartAmount-=good.regular_price*good.quantity;
        this.order.order_total = this.cartAmount;
        this.order.items.splice(i,1);
        this.setCartDigits();
        this.set();
    };
    this.setCartDigits = function(){
        if(!$("#garan24-cart-quantity").length){
            $("#garan-cart").html('<i class="fa fa-shopping-cart" area-hidden="true"></i><sup id="garan24-cart-quantity">0</sup><span id="garan24-cart-amount">0 руб.</span><div id="garan-cart-full"></div>');
        }
        if(!isNaN(t.cartQuantity))$("#garan24-cart-quantity").html(t.cartQuantity);
        if(!isNaN(t.order.order_total))$("#garan24-cart-amount").html(t.order.order_total.format(0,3,' ','.')+" руб.");
    };
    this.create = function(){
        $.ajax({
            url:this.carthost+"/create",
            type:"get",
            dataType: "json",
            crossDomain: true,
            success:function(data){
                //var d=JSON.parse(data);
                var d=data;
                console.debug("Created cart.");
                console.debug(d);
                G.id=d.id;
                $.cookie("cart_id",d.id,{expires:1});
            }
        });
    };
    this.set  =function(){
        var rq = {
            x_secret: "cs_ddde7647b888f21548ca27c6b80a973b20cc6091",
            x_key: "ck_d80d9961dfe1d5d9dcee803a6d8d674e265c9220",
            version: "1.0",
            response_url: "//"+document.location.hostname+"/response.php?id="+this.id,
            order:this.order
        };
        console.debug(this.order);
        //return ;
        $.ajax({
            url:this.carthost+"/update",
            type:"get",
            dataType: "json",
            crossDomain: true,
            data:{id:this.id,value:JSON.stringify(rq)},
            success:function(){console.debug("cart updated");}
        });
    };
    this.get = function(){
        var t = this;
        $.ajax({
            url:this.carthost,
            data:{id:this.id},
            type:"get",
            dataType: "json",
            crossDomain: true,
            //jsonp:false,
            beforeSend:function(x){
                console.debug("Getting data");
                //console.debug(x);
            },
            success:function(data){
                var d=JSON.parse(data);
                //var d=data;
                console.debug(d.order);
                if(typeof d.order != "undefined"){
                    t.order=$.extend(G.order,d.order);
                    for(var i in t.order.items){
                        var item = t.order.items[i];
                        //console.debug(item);
                        t.cartQuantity+=((typeof item.quantity != "undefined")&&!isNaN(item.quantity))?item.quantity:0;
                    }
                }
                t.cartAmount = t.order.order_total;
                t.setCartDigits();
            }
        });
    };
    this.checkout = function(){
        var rq = {
            x_secret: "cs_ddde7647b888f21548ca27c6b80a973b20cc6091",
            x_key: "ck_d80d9961dfe1d5d9dcee803a6d8d674e265c9220",
            version: "1.0",
            response_url: this.carthost+"/clean?id="+this.id,
            order:this.order
        },$m = $("#garan24-overlay");
        console.debug(this.order);
        //return ;
        $.ajax({
            type:"POST",
            //url:"//service.garan24.ru/checkout/",
            //url:"http://service.garan24.bs2/checkout/",
            url:"//service.garan24.ru/checkout",
            dataType: "json",
            crossDomain: true,
            data:JSON.stringify(rq),
            beforeSend:function(){
                $m.find(".garan24-overlay-message-text").html("Обрабатываются товары из Вашей корзины...");
                $m.fadeIn();
            },
            complete:function(){
                $m.fadeOut();
            },
            success:function(data){
                //var d=JSON.parse(data);
                var d=data;
                console.debug("checkout response ");
                console.debug(d);
                if(!d.error){
                    $m.find(".garan24-overlay-message-text").html("Переход на страницу оформления заказа...");
                    document.location.href = d.redirect_url;
                }
            }
        });
    };
    this.showcart = function(){
        var $c = $("#garan-cart-full"),g="";
        if($c.hasClass("garan24-visible")){
            $c.removeClass("garan24-visible").slideUp();
            return;
        }
        g+="<table>";
        for(var i in this.order.items){
            g+="<tr>";
            var itm = this.order.items[i];
            var vars = "";
            for(var v in itm.variations){
                vars+=v+" "+itm.variations[v];
            }
            g+="<td width='20%'><img alt='"+itm.title+"' src='"+itm.product_img+"'/></td>";
            g+="<td width='5%' style='text-align:left;'><span class='small'>х"+itm.quantity+"</span></td>";
            g+="<td width='5%'><a href='javascript:G.remove("+i+")'><i class='fa fa-trash-o'></i></a></td>";
            g+="<td width='50%' style='text-align:left;'>"+itm.title+" <span class='small'>"+vars+"</span></td>";
            g+="<td width='20%' style='text-align:right;'><span class='currency-amount'>"+itm.regular_price.format(0,3,' ','.')+" руб.</span></td>";
            g+="</tr>";
        }
        g+="<tr class='total'><td>Итого:</td><td colspan='4'>"+this.order.order_total.format(0,3,' ','.')+" руб.</td></tr>";
        g+="</table>";

        $c.addClass("garan24-visible").html(g).slideDown();
    };
    // init
    console.debug("Init cart - "+this.id);
    if(typeof this.id!="undefined" && this.id.length ){
        this.get();
        console.debug("Getting snooper data cart");
    }
    else {
        this.create();
        console.debug("Creating snooper cart");
    }
    this.setCartDigits();
    console.debug("snooper loaded!");
}
var $ = jQuery.noConflict();
$(document).ready(function() {
    window.G  = new G24();
    $("#usp_bar, .meta, .headBasket, .footerBox, #headSearch").remove();
    //relink();
    $("#garan-checkout").click(function(){
        G.checkout();
    });
    $("#garan-cart").click(function(){
        G.showcart();
    });
});

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
function G24(){
    var t = this;
    this.carthost = "//service.garan24.ru/cart";
    this.id = $.cookie("cart_id");
    this.currencyRate = 72*1.1; //10%
    this.cartQuantity = 0;
    this.cartAmount = 0;
    this.x_secret = "cs_ddde7647b888f21548ca27c6b80a973b20cc6091";
    this.x_key = "ck_d80d9961dfe1d5d9dcee803a6d8d674e265c9220";
    this.version = "1.0";
    this.response_url = "//"+document.location.hostname+"/response.php?id="+this.id;
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
    this.setCartDigits = function(){
        $("#garan24-cart-quantity").html(this.cartQuantity);
        $("#garan24-cart-amount").html(this.order.order_total.format(0,3,' ','.')+" руб.");
    };
    this.create = function(){
        $.ajax({
            url:this.carthost+"/create",
            type:"get",
            dataType: "json",
            crossDomain: true,
            jsonp:false,
            success:function(data){
                var d=JSON.parse(data);
                console.debug(d);
                G.id=d.id;
                $.cookie("cart_id",d.id);
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
            url:this.carthost+"?id="+this.id,
            type:"get",
            dataType: "json",
            crossDomain: true,
            //jsonp:false,
            beforeSend:function(x){
                console.debug("Getting data");
                console.debug(x);
            },
            success:function(data){
                var d=JSON.parse(data);
                console.debug(d);
                t.order=$.extend(G.order,d.order);
                for(var i in t.order.items){
                    var item = t.order.items[i];
                    console.debug(item);
                    t.cartQuantity+=item.quantity;
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
            response_url: "//"+document.location.hostname+"/response.php?id="+this.id,
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
                $m.find(".garan24-overlay-message-text").html("Ваш заказ обрабатывается...");
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
                    document.location.href = d.redirect_url;
                }
            }
        });
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
}
$(document).ready(function() {
    window.G  = new G24();
    var pattern = /^(http|https)?(\:)?(\/\/)?(www\.)?(baby\-walz\.de)?\/?/i;
    var replacement = "//snooper.bs2?q=";
    console.debug("snooper loaded!");
    $("#usp_bar, .meta, .headBasket, .footerBox").remove();
    relink();

    $("#garan-checkout").click(function(){
        G.checkout();
    });
});

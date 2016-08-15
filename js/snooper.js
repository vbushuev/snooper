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
var G = {
    id:0,
    currencyRate:76.5,
    cartQuantity:0,
    cartAmount:0,
    products:[],
    add2cart:function(){
        console.debug("Garan24::add2cart(..)");
        if(!arguments.length)return false;
        var good = arguments[0];
        console.debug(JSON.stringify(good));
        G.cartQuantity+=good.quantity;
        G.cartAmount+=good.price*good.quantity;
        G.products.push(good);
        G.setCartDigits();
    },
    setCartDigits:function(){
        $("#garan24-cart-quantity").html(G.cartQuantity);
        $("#garan24-cart-amount").html(G.cartAmount.format(0,3,' ','.')+" руб.");
    },
    create:function(){
        $.ajax({
            url:"//service.garan24.bs2/cart/create",
            type:"get",
            success:function(d){
                //console.debug(d);
                G.id=d.id;
            }
        });
    },
    set:function(){
        $.ajax({
            url:"//service.garan24.bs2/cart/update",
            type:"get",
            data:{id:G.id,value:JSON.stringify(G.products)},
            success:function(){console.debug("cart updated");}
        });
    },
    get:function(){
        $.ajax({
            url:"//service.garan24.bs2/cart",
            type:"get",
            data:{id:G.id},
            success:function(d){
                console.debug(d);
                //G.products=d.value;
            }
        });
    }

};
$(document).ready(function() {
    G.id = $.cookie("cart_id");
    if(typeof G.id!="undefined"){
        G.get();
    }
    else {
        G.create();
        $.cookie("cart_id",G.id);
    }
    var pattern = /^(http|https)?(\:)?(\/\/)?(www\.)?(baby\-walz\.de)?\/?/i;
    var replacement = "//snooper.bs2?q=";
    console.debug("snooper loaded!");
    $("#usp_bar, .meta, .headBasket, .footerBox").remove();
    relink();
    console.debug("SNOOPER:: set checkout bar(G.cartQuantity["+G.cartQuantity+"]). "+ $("#garan24-cart-quantity").length);
    G.setCartDigits();

});

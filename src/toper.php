<style>
    @import url("//fonts.googleapis.com/css?family=Lato");
    @import url("//fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic");
    @import url("//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
    #garan24-toper{
        position: fixed;
        top: 0;
        left:0;
        width:100%;
        height:48px;
        background-color: rgba(85,125,161,1);
        color: rgba(255,255,255,1);
        z-index: 999;
    }
    @media (min-width: 768px){
        #garan24-toper-content {
            width: 750px;
        }
    }
    @media (min-width: 992px){
        #garan24-toper-content {
            width: 970px;
        }
    }
    @media (min-width: 1200px){
        #garan24-toper-content{
            width: 1170px;
        }
    }
    #garan24-toper .garan24-logo{
        font-size: 16px;
        font-weight: 700;
    }
    #garan24-toper .garan24-logo code{
        border:solid 2px rgba(255,255,255,1);
        color:rgba(255,255,255,1);
        font-weight: 400;
        display: inline-block;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        height:24px;
        line-height: 24px;
        font-family: 'Lato';
        padding:0 4px;
        font-size: 14px;
    }
    #garan24-toper .garan24-button{
        height: 36px;
        line-height: 36px;
        display: inline-block;
        padding: 0 8px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255,1);
        color:rgba(85,125,161,.8);
        text-align: center;
        text-decoration: none;
        font-weight: 700;
        cursor: pointer;
        text-transform: uppercase;
        border:solid 2px rgba(85,125,161,1);
    }
    #garan24-toper .garan24-button:hover{
        background-color: rgba(255, 255, 255, 1);
        color:rgba(85,125,161,1);
        border-color: rgba(255, 255, 255, 1);
    }
    #garan24-toper .garan24-button.garan24-button-success{
        background-color: rgba(92,184,92,1);
        color:rgba(255,255,255,1);
    }
    #garan24-toper .garan24-button.garan24-button-success:hover{
        border-color: rgba(92,184,92,1);
        color:rgba(255,255,255,1);
    }
    #garan24-toper-content {
        padding: 0 16px;
        margin-left:auto;
        margin-right: auto;
    }
    #garan24-toper-content .garan24-toper-menu{
        list-style: none;
        display: inline-block;
        font-size: 12pt;
        font-family: 'Lato','Open Sans';
        font-weight: 300;
        height:48px;
        line-height: 48px;
    }
    #garan24-toper-content .garan24-toper-menu li{
        display: inline-block;
        vertical-align: middle;
        height:48px;
        line-height: 48px;
    }
    #garan24-toper-content .garan24-toper-menu-right{
        float:right;
        padding-top: 4px;
    }
    #garan24-toper-content .garan24-toper-menu li .garan24-cart{
        height: 36px;
        line-height: 36px;
        display: inline-block;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255,1);
        color:rgba(0,0,0,.6); /*rgba(92,184,92,1)*/
        text-align: center;
        padding: 0 5px;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        border:solid 2px rgba(85,125,161,1);
    }
    #garan24-toper-content .garan24-toper-menu li .garan24-cart:hover{
        border-color: rgba(255,255,255,1);
    }
    #garan24-toper-content .garan24-toper-menu li .garan24-cart #garan24-cart-quantity{
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        width:12px;
        height:12px;
        background-color: rgba(255, 0, 0, 0.5);
        color: rgba(255,255,255,1);
        padding:0 5px;
        font-size: 10px;
    }
    #garan24-toper-content .garan24-toper-menu li .garan24-cart #garan24-cart-amount{
        display: inline-block;
        margin-left: 12px;
        font-weight: 400;
    }
    body{padding-top: 56px;}

</style>
<div id="garan24-toper">
    <div id="garan24-toper-content">
        <ul class="garan24-toper-menu garan24-toper-menu-left">
            <li class="garan24-logo">G&nbsp;<code>24</code></li>
        </ul>
        <ul class="garan24-toper-menu garan24-toper-menu-right">
            <li>
                <a class="garan24-cart" href="#">
                    <i class="fa fa-shopping-cart" area-hidden="true"></i>
                    <sup id="garan24-cart-quantity"></sup>
                    <span id="garan24-cart-amount"></span>
                </a>
            </li>
            <li><a class="garan24-button garan24-button-success" href="#">Оформить заказ</a></li>
        </ul>
    </div>
</div>
<script src="js/snooper.js" crossorigin="anonymous"></script>

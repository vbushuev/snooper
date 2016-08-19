<?php

include("config.php");
//$url=(isset($_REQUEST["__garan_query__"])?"/".urldecode($_REQUEST["__garan_query__"]):"");
$url = preg_replace("/(\?)?__garan_query__=/i","",$_SERVER["REQUEST_URI"]);
$env["url"] = $url;
$sn = new Snooper($env);
echo $sn->get();
?>

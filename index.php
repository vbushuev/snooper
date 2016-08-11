<?php
date_default_timezone_set('Europe/Moscow');
function __autoload($className){
	$vendorDir = "../vendor";
	$classmap = [
	    "Snooper" => "src/Snooper.php",
	    "Snoopy" => "src/Snoopy/Snoopy.class.php",
	];
	if(isset($classmap[$className])){
		require_once $classmap[$className];
		return true;
	}
	$file = str_replace('\\','/',$className);
	require_once 'src/'.$file.'.php';
	return true;
}

$url="http://baby-walz.de".(isset($_REQUEST["q"])?"/".urldecode($_REQUEST["q"]):"");

$sn = new Snooper([
    "url"=>$url,
    "debug"=>false,
    "cache"=>["use"=>false]
]);
echo $sn->get();
?>

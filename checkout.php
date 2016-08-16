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
$rq = json_decode(file_get_contents('php://input'),true);
file_put_contents("logs/checkout-".date("Y-m-d").".log",$rq,FILE_APPEND);
$curlOptions = [
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => $rq,
	CURLOPT_VERBOSE => 1,
	CURLOPT_SSL_VERIFYPEER => false,
	//CURLOPT_FOLLOWLOCATION => true
];
$curl = curl_init("https://service.garan24.bs2/checkout/");
curl_setopt_array($curl, $curlOptions);
$response = curl_exec($curl);
file_put_contents("logs/checkout-".date("Y-m-d").".log",$response,FILE_APPEND);
curl_close($curl);
echo $response;
?>

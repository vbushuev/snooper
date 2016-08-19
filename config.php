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
$env = [
    "localhost" => "gauzy.bs2",
    //"localhost" => "xray.garan24.ru",
    "url"=>"",
    "debug"=>false,
    "cache"=>["use"=>false],
	"enabledSites" => [
		"baby-walz" => "www.baby-walz.de","baby-walz.de" => "www.baby-walz.de","baby-walzde" => "www.baby-walz.de",
		"asos" => "www.asos.com",
		"walzkidzz" => "www.walzkidzz.de",
		"kik" => "www.kik.de",
		"asos" => "www.asos.com",
		"walzkidzz" => "www.walzkidzz.com",
		"yoox" => "www.yoox.com",
		"ctshirts" => "www.ctshirts.com",
		"zara" => "www.zara.com",
		"gap" => "www.gap.com",
		"childrensplace" => "www.childrensplace.com",
		"oldnavy" => "www.oldnavy.com",
		"forever21" => "www.forever21.com",
		"carters" => "www.carters.com",
		"gymboree" => "www.gymboree.com",
		"crazy8" => "www.crazy8.com",
		"ralphlauren" => "www.ralphlauren.com",
		"6pm" => "www.6pm.com",
		"disneystore" => "www.disneystore.com",
		"vertbaudet" => "www.vertbaudet.com",
		"t-a-o" => "www.t-a-o.com",
		"zulily" => "www.zulily.com",

	],
	"cookies" => [
		"www.walzkidzz.de" => [
			"fe_typo_user" => "733494cf676a8c1006362f64a77e7e58",
			"mb3pc" => "%7B%22shoppingbasket%22%3A%7B%22basketAmount%22%3A%220%2C00+%5Cu20ac%22%2C%22articlesAmount%22%3A0%2C%22freeDelivery%22%3A0%7D%7D"
		],"baby-walz.de" => ["mb3PartnerHurra" => "",
            "fe_typo_user" => "39a8151cbbd2085f4225ae8dc3d59f97",
            "pgpkl" => "fcc3348979d8686d2287b16f3b80c5ee",
            "mb3pc" => "%7B%22shoppingbasket%22%3A",
            "searchbacklink"=>"catalog%7Chttp%3A%2F%2Fwww.",
            "listview"=>"tiles",
            "_hjIncludedInSample" => "1",
            "axd" => "1001610581032400000",
            "T43_Geschenkefinder" => "generated",
            "X-Requested-With" => "XMLHttpRequest"
        ],
        "www.baby-walz.de" => ["mb3PartnerHurra" => "",
            "fe_typo_user" => "39a8151cbbd2085f4225ae8dc3d59f97",
            "pgpkl" => "fcc3348979d8686d2287b16f3b80c5ee",
            "mb3pc" => "%7B%22shoppingbasket%22%3A",
            "searchbacklink"=>"catalog%7Chttp%3A%2F%2Fwww.",
            "listview"=>"tiles",
            "_hjIncludedInSample" => "1",
            "axd" => "1001610581032400000",
            "T43_Geschenkefinder" => "generated",
            "X-Requested-With" => "XMLHttpRequest"
        ],
        "www.kik.de" => [
            "SERVERID" => "s11",
            "wt_fweid" => "1d2c49d74941cdb2671fde7e",
            "wt_feid" => "c67cb56484752e5434adc06474cee722",
            "wt_geid" =>"814713550460088465884658",
            "frontend" => "f4f04d89a0a0610756741bc3ce9d9d3b",
            "EXTERNAL_NO_CACHE" => "1"
        ],
        "www.walzkidzz.de/" => [],
        "www.asos.com" => [
            "currency" => "19"
            /*
			"V_C0137F6A52DEAFCC0A490D4C%40AdobeOrg" => "283337926%7CMCAID%7C2BD4C711053138DF-6000010440011256%7CMCMID%7C91698848699039863581072902468328053532%7CMCAAMLH-1472205322%7C6%7CMCAAMB-1472205325%7CNRX38WO0n5BH8Th-nqAG_A%7CMCCIDH%7C1691975870",
			"AsosCustomerAlert" => "",
            //"AsosExecutionEngine" => "ExemptionTimeout=08/19/2016 10:16",
			"EnableId2-com" => "false",
			"EnableM5-com" => "false",
			"RT" => "sl=6&ss=1471600515433&tt=10799&obo=0&bcn=%2F%2F36e4f0e7.mpstat.us%2F&sh=1471600571395%3D6%3A0%3A10799%2C1471600555618%3D5%3A0%3A9403%2C1471600547665%3D4%3A0%3A8496%2C1471600528715%3D3%3A0%3A7587%2C1471600526200%3D2%3A0%3A7445&dm=asos.com&si=4549218b-b93f-4604-a80e-8575042d4b7d&ld=1471600571395&nu=http%3A%2F%2Fwww.asos.com%2F%3Fhrd%3D1&cl=1471600577120&r=http%3A%2F%2Fwww.asos.com%2Fmen%2F%3Fvia%3Dtop&ul=1471600577152",
			"_br_uid_2" => "uid%3D3272190071172%3Av%3D11.8%3Ats%3D1471600525362%3Ahc%3D4",
			"_s_fpv" => "true",
			"_s_pl" => "1356",
			"_vwo_uuid_v2" => "8FDDB041F5711DF95F70F02F76F7C6C2|ac840f49038ab428f84976e6c6bd1d9a",
			"_ym_isad" => "2",
			"_ym_uid" => "147072973543703659",
			"asos" => "topcatid=1001&currencyid=19&currencylabel=EUR&userCountryIso=RU&PreferredSite=www.asos.com&customerguid=b3fec58df1cc48b1806324a301907061",
			"asosStore" => "PreferredFloor=1001",
			"asosbasket" => "basketitemcount=0&basketitemtotalretailprice=0",
			,
			"floor" => "1001",
			"mbox" => "PC%23aa962ac5f559450b88ad77f3454d509a.26_2%231534845373%7Csession%2376b6353d2cee4fd2a1b173caa8d157a8%231471602433",
			"s_cc" => "true",
			"s_fid" => "18196EFEC42344D3-0EA448E4EDD5FDDE",
			"s_pers" => "%20s_vnum%3D1472677200255%2526vn%253D1%7C1472677200255%3B%20s_nr%3D1471600577131-New%7C1503136577131%3B%20s_invisit%3Dtrue%7C1471602377134%3B%20gpv_p10%3Ddesktop%2520com%257Cfloor%2520page%257Cmen%7C1471602377137%3B%20gpv_p11%3Dmen%257Chome%7C1471602377140%3B",
			"s_sess" => "%20s_ppvl%3Ddesktop%252520com%25257Cfloor%252520page%25257Cmen%252C25%252C25%252C811%252C961%252C811%252C1440%252C900%252C0.9%252CP%3B%20s_ppv%3Ddesktop%252520com%25257Cfloor%252520page%25257Cmen%252C25%252C25%252C811%252C961%252C811%252C1440%252C900%252C0.9%252CP%3B",
			"s_sq" => "asoscomprod%3D%2526c.%2526a.%2526clickmap.%2526page%253Ddesktop%252520com%25257Cfloor%252520page%25257Cmen%2526link%253DBack%252520to%252520the%252520Home%252520Page%2526region%253DBodyTag%2526pageIDType%253D1%2526.clickmap%2526.a%2526.c",
			"s_vi" => "[CS]v1|2BD4C711053138DF-6000010440011256[CE]",
			"store" => "www.asos.com",
            "uk-website#lang" => "en-G"
            */
        ]
	]
];
?>

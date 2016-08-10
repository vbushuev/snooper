<?php
class Http{
    public $results;
    public function __construct(){}
    public function fetch($url){
        $curl = curl_init();
        $host = parse_url($url);
        $headers = [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*;q=0.8',
            'Accept-Language: de,en-us;q=0.7,en;q=0.3',
            'Accept-Charset: utf-8;q=0.7,*;q=0.7'
        ];
        $curlOptions = [
            CURLOPT_URL => $url,
            CURLOPT_USERAGENT => "Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.0.17) Gecko/2009122116 Firefox/3.0.17",
            CURLOPT_HTTPHEADER=>$headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_REFERER => $host["host"],
            CURLOPT_HEADER => 0,
            CURLOPT_VERBOSE => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => true,
            CURLOPT_ENCODING => "", // обрабатывает все кодировки
            CURLOPT_MAXREDIRS =>10, // останавливаться после 10-ого редиректа
            CURLOPT_COOKIEFILE => $GLOBALS['cookie_file'],
            CURLOPT_COOKIEJAR =>  $GLOBALS['cookie_file'],
            CURLOPT_AUTOREFERER => 1,
            CURLOPT_FOLLOWLOCATION => true
        ];
        curl_setopt_array($curl, $curlOptions);
        $this->results = curl_exec($curl);
        curl_close($curl);
    }
};
?>

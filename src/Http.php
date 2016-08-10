<?php
class Http{
    public $results;
    public $response;
    public function __construct(){}
    public function fetch($url){
        $curl = curl_init();
        $host = parse_url($url);
        $cookie_file = '.cookies';
        $cookies =$this->cookies($url);
        $headers = [
            'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language:en-US,en;q=0.8,ru;q=0.6',
            'Accept-Charset: utf-8;q=0.7,*;q=0.7',
            'Accept-Encoding:gzip, deflate, sdch',
            'Cache-Control:max-age=0',
            'Connection:keep-alive',
            'Cookie:__sonar=12721472584031051060; _hjIncludedInSample=1; mb3PartnerHurra=; emos_best_products=637556:112173:112173:112173; ppos=%7B%22lazyloadState%22%3Anull%7D; _lo_u=1; searchbacklink=catalog%7Chttp%3A%2F%2Fwww.baby-walz.de%2FMode-fuer-Mama-Kind.html; listview=tiles; ia_c4dc_5343535383136323131303=1; _gat=1; emos_jckamp=source=direct&ccbt=1470848660; emos_jcvid=AVZpOsmIRjhZMxHXeR5ZfbBZveJU7XRG:1:AVZpOsmIRjhZMxHXeR5ZfbBZveJU7XRG:1470644275591:0:false:10; mmapi.store.p.0=%7B%22mmparams.d%22%3A%7B%7D%2C%22mmparams.p%22%3A%7B%22mmid%22%3A%221502384660804%7C%5C%221615044286%7CYAAAAAq0THAJsw0AAA%3D%3D%5C%22%22%2C%22pd%22%3A%221502384660811%7C%5C%221870802510%7ClQAAAAoBQrRMcAmzDWgk%2FVQJAOfs9V5AwdNIDwAAAOZJ%2FH9kv9NIAAAAAP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAtzbm9vcGVyLmJzMgOzDQkAAAAAAAAAAAAAg6wAAHRwAACHYgEABQDaYAAAAE34M6qzDQD%2F%2F%2F%2F%2FAbMNtQ3%2F%2FysAAAEAAAAAAXcZAQB4agEAANA6AAAAGavCTLMNAP%2F%2F%2F%2F8Bsw21Df%2F%2FJgAAAQAAAAABSb4AAJ%2F0AAAAH34AAADtmueNsw0A%2F%2F%2F%2F%2FwGzDbUN%2F%2F8jAAABAAAAAAGZXgEAfsQBAAKHYgEAJQAAAIViAQACAAAA81UAAAA3HUFasw0A%2F%2F%2F%2F%2FwGzDbMN%2F%2F8CAAABAAAAAAE7AQEAkEoBAAFPAQEAAgAAAOseAAAAmH0mdbMNAP%2F%2F%2F%2F8Bsw2zDf%2F%2FAQAAAQAAAAABfHIAAMCXAAAAAAAAAUU%3D%5C%22%22%2C%22srv%22%3A%221502384660819%7C%5C%22ldnvwcgeu11%5C%22%22%7D%7D; _ga=GA1.2.20715194.1470644276; axd=1001610581032400000',
            'DNT:1',
            'Upgrade-Insecure-Requests:1'
        ];
        $curlOptions = [
            CURLOPT_URL => $url,
            CURLOPT_USERAGENT => "User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
            CURLOPT_HTTPHEADER=>$headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_REFERER => $host["host"],
            CURLOPT_HEADER => 0,
            CURLOPT_VERBOSE => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => true,
            CURLOPT_ENCODING => "", // обрабатывает все кодировки
            CURLOPT_MAXREDIRS =>10, // останавливаться после 10-ого редиректа
            CURLOPT_COOKIEFILE => $cookies,
            CURLOPT_COOKIEJAR =>  $cookies,
            CURLOPT_AUTOREFERER => 1,
            CURLOPT_FOLLOWLOCATION => true
        ];
        curl_setopt_array($curl, $curlOptions);
        $this->results = curl_exec($curl);
        $this->response = curl_getinfo($curl);
        curl_close($curl);
    }
    public function cookies($url){
        $c='';
        $curl = curl_init();
        curl_setopt_array($curl,[
            CURLOPT_URL => $url,
            CURLOPT_HEADER => 1
        ]);
        $r = curl_exec($curl);
        if(preg_match_all('|Set-Cookie: (.*);|U', $content, $results)){
            $c = implode(';', $results[1]);
        }
        curl_close($curl);
        echo $c;
        return $c;
    }
};
?>

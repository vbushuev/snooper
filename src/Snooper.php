<?php
use Http as HttpFetcher;
class Snooper extends HttpFetcher{
    protected $snoopy;
    protected $full_url;
    protected $donor;
    protected $donor_pattern;
    protected $content;
    protected $cache_folder;
    protected $cache_use;
    protected $debug;
    protected $path_pattern;
    protected $localhost;
    public function __construct($a){
        $local = $a["localhost"];
        $this->localhost = $_SERVER["HTTP_HOST"];
        $url = preg_replace("/\.".preg_quote($local)."/i","",$this->localhost);
        $url = $a["enabledSites"][$url];
        $this->full_url = "http://".$url.((is_array($a)&&isset($a["url"]))?$a["url"]:$a);
        $this->_print("Current url ['".$url."']");
        $donor = parse_url($this->full_url);
        $dhost = $donor["host"];
        $this->donor_pattern = "(".$donor["scheme"]."\:)?\/\/(www\.)?".preg_quote($donor["host"]);
        $donor = $donor["scheme"]."://".$donor["host"];
        $this->donor = $donor;


        $this->cache_folder = isset($a["cache"]["folder"])?$a["cache"]["folder"]:"/cache/";
        $this->cache_use = isset($a["cache"]["use"])?$a["cache"]["use"]:true;
        $this->debug = isset($a["debug"])?$a["debug"]:false;
        $this->cache_folder = preg_replace("/^\/?(.+?)\/?$/","$1",$this->cache_folder);
        if(!file_exists($this->cache_folder)){mkdir($this->cache_folder);}
        if(!file_exists($this->cache_folder."/".$dhost)){
            mkdir($this->cache_folder."/".$dhost);
            mkdir($this->cache_folder."/".$dhost."/js");
            mkdir($this->cache_folder."/".$dhost."/css");
            mkdir($this->cache_folder."/".$dhost."/img");
        }
        $this->_print("Current host ['".$dhost."']");
        parent::__construct($a["cookies"][$dhost]);
    }
    public function get(){
        $file = $this->cache_folder."/".$this->_makeFileName($this->full_url);//.date("Ymd");
        $fi = pathinfo($file);
        $this->_print("Cache file:".$file);
        if($this->cache_use&&file_exists($file)){
            $this->_print("Load from cache".$this->cache_use);
            return file_get_contents($file);
        }
        $this->_print("Getting from ".$this->full_url." ..");
        $this->fetch($this->full_url);
        $this->content = $this->results;
        $this->_print($this->response);
        $this->_print("Getting media .. ");
        $this->content = $this->getmedia($this->content);
        $this->_print("Relinking .. ");
        $this->replace();
        $this->_print("Traslating ..[".$fi["extension"]."] file=".$file);
        if(!in_array($fi["extension"],["js","css","png","gif","jpg","svg"])) $this->content = $this->translate($this->content);
        $this->addToper();

        $this->_print("Caching .. ");
        file_put_contents($file,$this->content);
        return $this->content;
    }
    public function __toString(){
        return $this->get();
    }
    protected function replace(){
        $out = $this->content;
        $t = $this;
        $out = preg_replace_callback("/".$t->donor_pattern."/im",function($m)use($t){
            $ret = "//".$this->localhost;
            //$t->_print("Replace [".$m[0]." => ".$ret."]");
            return $ret;
        },$out);
        $out = preg_replace("/\<\!\-\-([\s\S]*?)\-\-\>/im","",$out);
        //$out = preg_replace("/".$t->donor_pattern."/im",$this->localhost,$out);


        //$this->content = preg_replace($t->path_pattern,"$6".$this->donor."/$3.$4$5$6",$this->content);
        /*
        $class = 'table01';

        // Любой символ, с которого не начинается тег <table>
        $any = "(?: [^<] | <(?!/?table\b) )";

        // Открытый и закрытий теги <table>, между которыми любое количество символов $any,
        // либо подставить рекурсивно подшаблон #2 (шаблон #1 - это кавычка, см. далее)
        $inner = "(<table[^>]*> (?> $any | (?2) )+? </table>)";

        // Тоже самое, что и $inner, но с дополнительным атрибутом у тега <table>
        // Модификатор 's' в данном случае не нужен, т.к. мы не используем мета-символ '.'
        // А модификатор 'U' не нужен, поскольку мы оперируем только ascii символами
        $pattern = "~<table\b[^>]*\bclass=(\"|')?$class\\1[^>]*> (?> $any | $inner )+ </table>~xi";

        preg_match($pattern, $text, $m);
        */
        //$out = preg_replace("/\<base(.*?)href\=\"(.+?)\".*\/\>/","",$out);
        $this->content = $out;
    }
    protected function getmedia($in){
        $out = $in;
        $t = $this;
        //$t->_print(__CLASS__.__METHOD__." enter [".$in."]");
        //echo "<br/>".$t->donor_pattern;
        $patterns = [
            "/['\"\(]\/(?<path>[a-z0-9\/\-\_\.]+?)\.(?<extension>png|jpg|gif|svg|css|js|ico|cur|php|html|htm)(?<frag>\?[a-z-0-9\=\%\&\_\;\#]*)?(?<quote>['\"\)])/im",
            "/['\"]".$t->donor_pattern."\/(?<path>[a-z0-9\/\-\_\.]+?)\.(?<extension>png|jpg|gif|svg|css|js|ico|cur|php|html|htm)(?<frag>\?[a-z-0-9\=\%\&\_\;\#]*)?(?<quote>['\"])/im"
        ];
        //['\"](http\:)?\/\/(www\.)?kik\.de([a-z0-9\/\-\_\.]+?)\.(png|jpg|gif|svg|css|js|ico|cur|php|html|htm)(\?[a-z-0-9\=\%\&\_\;\#]*)?(['\"])
        $replacements = function($m) use ($t){
            $ret = $m[0];
            // remove two dots
            $file = preg_replace("/\.{2}\//im","",$m["path"]).".".$m["extension"];
            $src = $t->donor."/".$file.$m["frag"];
            $file_full = $t->cache_folder."/".$this->_makeFileName($file);
            if(preg_match("/^['\"]?\/\//i",$ret)) return $ret;
            if(in_array($m["extension"],["php","html","htm"])) return $m["quote"].$src.$m["quote"];
            $t->loadFile($file_full,$src,$m["extension"]);
            $ret = $m["quote"]."/".$file_full.$m["frag"].$m["quote"];
            //$t->_print($m[0]."=>".$ret);
            return $ret;
        };
        $out = preg_replace_callback($patterns,$replacements,$out);
        return $out;
    }
    protected function loadFile($file_full,$src,$ext){
        if(!file_exists($file_full)){
            try{
                $file_data=file_get_contents($src);
                //$this->fetch($src);$file_data=$this->result;
                if(in_array($ext,["js","css"])) $file_data=$this->getmedia($file_data);
                file_put_contents($file_full,$file_data);
            }
            catch(Exception $e){
                $this->_print($e->getMessage());
            }
        }
    }
    protected function addToper(){
        $jsStart = "";$jsEnd ="";
        //$jsStart.= "<base href='".$this->localhost."?__garan_query__='/>";
        $jsStart.= "<script src=\"https://code.jquery.com/jquery-2.2.4.min.js\" integrity=\"sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=\" crossorigin=\"anonymous\"></script>";
        $jsStart.= "<script src=\"/js/ajax.prevent.js\"></script>\n";
        

        $this->content = preg_replace("/\<head(.*?)>/i","<head$1>\n".$jsStart,$this->content);
        $this->content = preg_replace("/\<\/head>/i",$jsEnd."\n</head>\n",$this->content);
        $this->content = preg_replace("/\<\/body>/i",file_get_contents("src/toper.php")."</body>",$this->content);
    }
    protected function translate($args){
        $keys = [
            "trnsl.1.1.20160817T222617Z.84e7efab369c4e2b.4c0c011c07fdc44a159659a77765c6b7410707b3",
            "trnsl.1.1.20160808T114104Z.4fca987aa626b8c2.91ed21fc6a7d733075f78f8cca41fcecf4146acd",
            "trnsl.1.1.20160817T222757Z.c9df5b86a8e4b808.80a4a66b0d5993e9611c47432b9fc2c225929f55",
        ];
        $key=$keys[2];
        $host="https://translate.yandex.net/api/v1.5/tr.json/translate";
        $data = is_string($args)?$args:(isset($args["data"])?$args["data"]:null);
        if(is_null($data))return "";
        $curlOptions = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                "text" => $data,
                "format" => "html",
            ]),
            CURLOPT_VERBOSE => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            //CURLOPT_FOLLOWLOCATION => true
        ];
        $url = $host."?lang=ru&key=".$key;
        $curl = curl_init($url);
        curl_setopt_array($curl, $curlOptions);
        $response = curl_exec($curl);
        $this->_print("Yandex translate response: ".$response);
        $response = json_decode($response);
        return ($response->code=="200")?$response->text[0]:$data;
    }
    protected function _makeFileName($p){
        $pi = pathinfo($p);
        $hi = parse_url($this->donor);
        $dir = $hi["host"]."/";
        if($pi["extension"]=="js"){$dir.="js/";}
        elseif($pi["extension"]=="css"){$dir.="css/";}
        elseif(in_array($pi["extension"],["jpg","gif","png","ico","svg","jpeg"])){$dir.="img/";}
        $ret = $dir.preg_replace("/[\:\/\-\\\]/m","_",$p);
        return $ret;
    }
    protected function _print($s){
        $o="";
        if(is_array($s)){
            $o=json_encode($s);
        }
        elseif(is_string($s))$o = $s;
        file_put_contents("logs/snooper-".date("Y-m-d").".log",date("H:i:s")."\t".__CLASS__."\t".$o."\n",FILE_APPEND);
    }
};
?>

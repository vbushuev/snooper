<?php
use Http as HttpFetcher;
class Snooper extends HttpFetcher{
    protected $snoopy;
    protected $donor;
    protected $content;
    protected $cache_folder;
    protected $cache_use;
    protected $debug;
    protected $path_pattern;
    //$_SERVER['REQUEST_URI']
    public function __construct($a){
        parent::__construct();
        $this->donor = (is_array($a)&&isset($a["url"]))?$a["url"]:$a;
        $this->cache_folder = isset($a["cache"]["folder"])?$a["cache"]["folder"]:"/cache/";
        $this->cache_use = isset($a["cache"]["use"])?$a["cache"]["use"]:true;
        $this->debug = isset($a["debug"])?$a["debug"]:false;
        $this->cache_folder = preg_replace("/^\/?(.+?)\/?$/","$1",$this->cache_folder);
        if(!file_exists($this->cache_folder))mkdir($this->cache_folder);
    }
    public function get(){
        $file = $this->cache_folder."/".$this->_makeFileName($this->donor).date("Ymd");
        $this->_print("Cache file:".$file);
        if($this->cache_use&&file_exists($file)){
            $this->_print("Load from cache".$this->cache_use);
            return file_get_contents($file);
        }
        $this->_print("Getting from ".$this->donor." ..");
        $this->fetch($this->donor);
        $this->content = $this->results;
        $this->_print($this->response);
        $this->_print("Traslating .. ");
        $this->translate();
        $this->_print("Relinking .. ");
        $this->content = $this->getmedia($this->content);
        $this->replace();
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
        $donor_href = parse_url($this->donor);
        $patterns = [
            "/\<(?<tag>a)(.*?)(href|src)=['\"](?<href>.+?)['\"]/im"
            //"/\<(a|img|script|link)(.*?)(href|src)=['\"](.+?)['\"]/im"
        ];
        $replacements = function($m) use ($t){
            $href = $m["href"];
            $href_n = $m["href"];
            $url = parse_url($href);
            //print_r($url);
            $donor_host =parse_url($t->donor);
            $donor_host =$donor_host["host"];

            $rule = "none";
            if(isset($url["host"]) && $url["host"] == $donor_host){
                if (in_array($m["tag"],["a"])){
                    $href_n = $t->localhost."?q=".(isset($url["path"])?$url["path"]:"");
                    $rule = "relink_href";
                }
            }
            //if($rule=="none")
            $this->_print("Replaced [".$rule."]:".$href_n." <= ".$href);
            $ret = "<".$m["tag"].(isset($m[2])?$m[2]:"").$m[3]."=\"".$href_n."\"";
            //Log::debug("Replaced (".$rule.") [".$href."] => [".$href_n."]");
            return $ret;
        };
        //$out = preg_replace_callback($patterns,$replacements,$out);
        //$out = preg_replace("/(\/\/)?(www\.)?".preg_quote($donor_href["host"])."/i",$_SERVER["HTTP_HOST"],$out);
        $out = preg_replace("/\<\/head>/i","<script src=\"/js/ajax.prevent.js\"></script></head>",$out);
        $out = preg_replace("/\<\/body>/i",file_get_contents("../src/toper.php")."<script src=\"/js/snooper.js?arg=1122\"></script></body>",$out);
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
        $this->content = $out;
    }
    protected function getmedia($in){
        $out = $in;
        $t = $this;
        $patterns = [
            "/['\"\(]\/?(?<path>[a-z0-9\/\-\_\.]+?)\.(?<extension>png|jpg|gif|svg|css|js|ico|cur|php|html|htm)(?<frag>\?[a-z-0-9\=\%\&\_\;\#]*)?(?<quote>['\"\)])/im",
            //"/['\"]\/(?<path>[a-z0-9\/\-\_\.]+?)\.(?<extension>png|jpg|gif|svg|css|js|cur|php)(?<frag>\?[a-z-0-9\=\%\&\_\;\#]*)?(?<quote>['\"])/im"
        ];
        $replacements = function($m) use ($t,$pattern){
            $ret = $m[0];
            // remove two dots
            $file = preg_replace("/\.{2}\//im","",$m["path"]).".".$m["extension"];
            $src = $t->donor."/".$file.$m["frag"];
            $file_full = $t->cache_folder."/".$this->_makeFileName($file);
            if(preg_match("/^['\"]?\/\//i",$ret)) return $ret;
            if(in_array($m["extension"],["php","html","htm"])) return $m["quote"].$src.$m["quote"];
            if(!file_exists($file_full)){
                try{
                    $file_data=file_get_contents($src);
                    //$sn = new Snoopy;
                    //$sn->fetch($src);
                    //$file_data=$sn->result;
                    $file_data=$t->getmedia($file_data);
                    file_put_contents($file_full,$file_data);
                }
                catch(Exception $e){
                    $this->_print($e->getMessage());
                }
            }
            $ret = $m["quote"]."/".$file_full.$m["frag"].$m["quote"];
            $t->_print($m[0]."=>".$ret);
            return $ret;
        };
        $out = preg_replace_callback($patterns,$replacements,$out);
        return $out;
    }
    protected function addToper(){
        $this->content = preg_replace("/\<\/body>/i",file_get_contents("../src/toper.php")."</body>",$this->content);
    }
    protected function translate(){

    }
    protected function _makeFileName($p){
        return preg_replace("/[\:\/\-\\\]/m","_",$p);
    }
    protected function _print($s){
        $o="";
        if(is_array($s)){
            $o="[";
            foreach ($s as $key => $value) {
                $o.= $key." => ".$value.", ";
            }
            $o.="]";
        }
        elseif(is_string($s))$o = $s;
        file_put_contents("../logs/snooper-".date("Y-m-d").".log",$o."\n",FILE_APPEND);
    }
};
?>

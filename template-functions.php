<?php

if ( !function_exists('print_lang_value') ) {
    function print_lang_value($value, $lang_code){
        $lang_code = substr($lang_code,0,2);
        if ( is_array($value) ){
            foreach($value as $current_value){
                $print_values[] = get_lang_value($current_value, $lang_code);
            }
            echo implode(', ', $print_values);
        }else{
            echo get_lang_value($value, $lang_code);
        }
        return;
    }
}

if ( !function_exists('get_lang_value') ) {
    function get_lang_value($string, $lang_code, $default_lang_code = 'en'){
        $lang_value = array();
        $occs = preg_split('/\|/', $string);

        foreach ($occs as $occ){
            $re_sep = (strpos($occ, '~') !== false ? '/\~/' : '/\^/');
            $lv = preg_split($re_sep, $occ);
            $lang = substr($lv[0],0,2);
            $value = $lv[1];
            $lang_value[$lang] = $value;
        }
        if ( isset($lang_value[$lang_code]) ){
            $translated = $lang_value[$lang_code];
        }else{
            $translated = $lang_value[$default_lang_code];
        }

        return $translated;
    }
}

if ( !function_exists('format_date') ) {
    function format_date($string){
        $date_formated = '';
        if (strpos($string,'-') !== false) {
            $date_formated = substr($string,8,2)  . '/' . substr($string,5,2) . '/' . substr($string,0,4);
        }else{
            $date_formated =  substr($string,6,2)  . '/' . substr($string,4,2) . '/' . substr($string,0,4);
        }

        return $date_formated;
    }
}

if ( !function_exists('format_act_date') ) {
    function format_act_date($string, $lang){
        $months = array();
        $months['pt'] = array('Janeiro','Feveiro', 'Março', 'Abril', 'Maio', 'Junho',
                              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

        $months['es'] = array('Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');


        $date_formated = '';
        if (strpos($string,'-') !== false) {
            if ($lang != 'en'){
                $month_val = intval(substr($string,5,2));
                $month_name = $months[$lang][$month_val-1];
            } else {
                $month_name = strftime("%B", strtotime($string));
            }
            $date_formated = substr($string,8,2) . ' ' . __('of','e-blueinfo') . ' ' . $month_name . ' ' . __('of', 'e-blueinfo') . ' ' . substr($string,0,4);
        }else{
            $date_formated =  substr($string,6,2)  . '/' . substr($string,4,2) . '/' . substr($string,0,4);
        }

        return $date_formated;
    }
}

if ( !function_exists('isUTF8') ) {
    function isUTF8($string){
        return (utf8_encode(utf8_decode($string)) == $string);
    }
}

if ( !function_exists('translate_label') ) {
    function translate_label($texts, $label, $group=NULL) {
        // labels on texts.ini must be array key without spaces
        $label_norm = preg_replace('/[&,\'\s]+/', '_', $label);

        if($group == NULL) {
            if(isset($texts[$label_norm]) and $texts[$label_norm] != "") {
                return $texts[$label_norm];
            }
        } else {
            if(isset($texts[$group][$label_norm]) and $texts[$group][$label_norm] != "") {
                return $texts[$group][$label_norm];
            }
        }

        // case translation not found return original label ucfirst
        return ucfirst($label);
    }
}

if ( !function_exists('get_site_meta_tags') ) {
    function get_site_meta_tags($url){
        $site_title = array();
        $fp = @file_get_contents($url);

        if ($fp) {
            $res = preg_match("/<title>(.*)<\/title>/siU", $fp, $title_matches);
            if ($res) {
                $site_title = preg_replace('/\s+/', ' ', $title_matches[1]);
                $site_title = trim($site_title);
            }

            $site_meta_tags = get_meta_tags($url);
            $site_meta_tags['title'] = $site_title;

            foreach ($site_meta_tags as $key => $value) {
                if (!isUTF8($value)){
                    $site_meta_tags[$key] = utf8_encode($value);
                }
            }
        }

        return $site_meta_tags;
    }
}

if ( !function_exists('real_site_url') ) {
    function real_site_url($path = ''){
        $site_url = get_site_url();

        // check for multi-language-framework plugin
        if ( function_exists('mlf_parseURL') ) {
            global $mlf_config;
            $current_language = substr( strtolower(get_bloginfo('language')),0,2 );

            if ( $mlf_config['default_language'] != $current_language ){
                $site_url .= '/' . $current_language;
            }
        }
        // check for polylang plugin
        elseif ( defined( 'POLYLANG_VERSION' ) ) {
            $default_language = pll_default_language();
            $current_language = pll_current_language();

            if ( $default_language != $current_language ){
                $site_url .= '/' . $current_language;
            }
        }

        if ($path != ''){
            $site_url .= '/' . $path;
        }

        $site_url .= '/';

        return $site_url;
    }
}

if ( !function_exists('short_string') ) {
    function short_string($string, $len=400){
        if ( strlen($string) > $len ) {
            $string = substr(utf8_decode($string), 0, $len) . "...";
        }

        return utf8_encode($string);
    }
}

if ( !function_exists('get_highlight') ) {
    function get_highlight($snippets){
        $pattern = '/\.(?=\.{3})|\G(?!^)\./'; // remove dots from snippets

        if ( count($snippets) > 1 ) {
            $replace = preg_replace($pattern, '', end($snippets));
            $text = '...' . trim($replace) . '...';
        } else {
            $replace = preg_replace($pattern, '', $snippets[0]);
            $text = '...' . trim($replace) . '...';
        }

        return $text;
    }
}

if ( !function_exists('get_country_name') ) {
    function get_country_name($names, $lang){
        $country_name = '';

        if ( $names ) {
            foreach ($names as $name) {
                if (strpos($name, $lang) === 0) {
                    $arr = explode('^', $name);
                    $country_name = $arr[1];
                }
            }
        }

        return $country_name;
    }
}

if ( !function_exists('normalize_country_object') ) {
    function normalize_country_object($object, $lang){
        $obj = array();
        $_unset = array();

        if ( $object ) {
            $ids = wp_list_pluck( $object, 'id' );
            $names = wp_list_pluck( $object, 'name' );
            $obj = array_combine($ids, $names);

            foreach ($obj as $key => $value) {
                $labels = '';

                foreach ($value as $k => $v) {
                    if (strpos($v, $lang) === 0) {
                        $arr = explode('^', $v);
                        $labels = $arr[1];
                    }
                }

                $obj[$key] = $labels;
            }
        }

        if ( $_unset ) {
            foreach ($_unset as $key => $value) {
                unset($obj[$value]);
            }
        }

        asort($obj);

        return $obj;
    }
}

if ( !function_exists('remove_prefix') ) {
    function remove_prefix($name){
        $name = explode(' ', $name);
        $prefix = array_shift($name);
        $name = implode(' ', $name);

        return $name;
    }
}

if ( !function_exists('cmp') ) {
    function cmp($a, $b) {
        return strcmp($a->name, $b->name);
    }
}

if ( !function_exists('prepare_query') ) {
    function prepare_query($q){
        $query = '(mh:(QUERY)^50 OR ti:(QUERY)^30 OR ab:(QUERY)^10 OR _text_:(QUERY))';
        $query = str_replace('QUERY', $q, $query);

        return $query;
    }
}

if ( !function_exists('is_webview') ) {
    function is_webview() {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        $wv = strpos($userAgent, 'wv');
        $safari = strpos($userAgent, 'safari');
        $ios = preg_match('/iphone|ipod|ipad|macintosh/', $userAgent);

        if ( $ios ) {
            if ( $safari !== false ) {
                return false;
            } else {
                return true;
            }
        } else {
            if ( $wv !== false ) {
                return true;
            } else {
                return false;
            }
        }
    }
}

if ( !function_exists('simple_sliding_menu') ) {
    function simple_sliding_menu($lang='en') {
        $menu = array();
        $menu['pt'] = array(
            array(
                'label' => "Sobre",
                'url'   => "#",
                'class' => "parent about"
            ),
            array(
                'label' => "Por que e-BlueInfo?",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/about-pt/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Apoiadores Institucionais",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/supporters-pt/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Ajuda",
                'url'   => "#",
                'class' => "parent help"
            ),
            array(
                'label' => "Como melhorar a leitura dos arquivos PDF",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pdf-pt/",
                'class' => "submenu help"
            ),
            array(
                'label' => "Enviar comentário",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&site=app&lang=pt",
                'class' => "submenu help"
            ),
            array(
                'label' => "Comunicar erro",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&error=1&site=app&lang=pt",
                'class' => "submenu help"
            ),
            array(
                'label' => "Idioma",
                'url'   => "#",
                'class' => "parent lang"
            ),
            array(
                'label' => "Português",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pt/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Español",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/es/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "English",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Alterar País",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pt/app/country",
                'class' => ""
            )
        );
        $menu['es'] = array(
            array(
                'label' => "Sobre",
                'url'   => "#",
                'class' => "parent about"
            ),
            array(
                'label' => "¿Por qué e-BlueInfo?",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/about-es/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Apoyadores Institucionales",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/supporters-es/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Ayuda",
                'url'   => "#",
                'class' => "parent help"
            ),
            array(
                'label' => "Cómo mejorar la lectura de los archivos PDF",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pdf-es/",
                'class' => "submenu help"
            ),
            array(
                'label' => "Enviar comentario",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&site=app&lang=es",
                'class' => "submenu help"
            ),
            array(
                'label' => "Informar error",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&error=1&site=app&lang=es",
                'class' => "submenu help"
            ),
            array(
                'label' => "Idioma",
                'url'   => "#",
                'class' => "parent lang"
            ),
            array(
                'label' => "Português",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pt/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Español",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/es/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "English",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Cambias País",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/es/app/country",
                'class' => ""
            )
        );
        $menu['en'] = array(
            array(
                'label' => "About",
                'url'   => "#",
                'class' => "parent about"
            ),
            array(
                'label' => "Why e-BlueInfo?",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/about-en/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Institutional Supporters",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/supporters-en/",
                'class' => "submenu about"
            ),
            array(
                'label' => "Help",
                'url'   => "#",
                'class' => "parent help"
            ),
            array(
                'label' => "How to improve the readability of PDF files",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pdf-en/",
                'class' => "submenu help"
            ),
            array(
                'label' => "Leave comment",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&site=app&lang=en",
                'class' => "submenu help"
            ),
            array(
                'label' => "Report error",
                'url'   => "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&error=1&site=app&lang=en",
                'class' => "submenu help"
            ),
            array(
                'label' => "Language",
                'url'   => "#",
                'class' => "parent lang"
            ),
            array(
                'label' => "Português",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/pt/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Español",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/es/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "English",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/",
                'class' => "submenu lang"
            ),
            array(
                'label' => "Change Country",
                'url'   => "http://sites.bvsalud.org/e-blueinfo/app/country",
                'class' => ""
            )
        );
        ?>
        <div class="simple-sliding-menu">
            <div class="menu-overlay"></div>
            <i class="material-icons menu-open simpleSlidingMenu md-36">menu</i>
            <div class="side-menu-wrapper">
                <a href="#" class="menu-close">×</a>
                <ul>
                    <?php foreach ($menu[$lang] as $k => $v) : ?>
                        <li><a class="<?php echo $v['class']; ?>" href="<?php echo $v['url']; ?>" rel="nofollow"><?php echo $v['label']; ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
        <?php
    }
}

?>

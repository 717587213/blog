<?php
/**
 * 关于ckplayer播放器插件
 *
 * @version        $Id: ckplayer_about.php 11:22 2015年4月29日 by tufei $
 * @package        ckplayer for dedecms
 * @copyright      Copyright (c) 2013 - 2015, dedejs.com
 * @link           http://www.dedejs.com
 */
require_once(dirname(__FILE__)."/config.php");
require_once(DEDEADMIN.'/inc/inc_archives_functions.php');

define('PLUS_CKPLAYER_VER','1.8.0');
function plus_ver_send($url, $limit=0, $post='', $cookie='', $timeout=15)
{
    $return = '';
    $matches = parse_url($url);
    $scheme = $matches['scheme'];
    $host = $matches['host'];
    $path = $matches['path'] ? $matches['path'].(@$matches['query'] ? '?'.$matches['query'] : '') : '/';
    $port = !empty($matches['port']) ? $matches['port'] : 80;

    if (function_exists('curl_init') && function_exists('curl_exec')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $scheme.'://'.$host.':'.$port.$path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        if ($post) {
            curl_setopt($ch, CURLOPT_POST, 1);
            $content = is_array($port) ? http_build_query($post) : $post;
            curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        }
        if ($cookie) {
            curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        }
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        $data = curl_exec($ch);
        $status = curl_getinfo($ch);
        $errno = curl_errno($ch);
        curl_close($ch);
        if ($errno || $status['http_code'] != 200) {
            return;
        } else {
            return !$limit ? $data : substr($data, 0, $limit);
        }
    }

    if ($post) {
        $content = is_array($port) ? http_build_query($post) : $post;
        $out = "POST $path HTTP/1.0\r\n";
        $header = "Accept: */*\r\n";
        $header .= "Accept-Language: zh-cn\r\n";
        $header .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $header .= "User-Agent: ".@$_SERVER['HTTP_USER_AGENT']."\r\n";
        $header .= "Host: $host:$port\r\n";
        $header .= 'Content-Length: '.strlen($content)."\r\n";
        $header .= "Connection: Close\r\n";
        $header .= "Cache-Control: no-cache\r\n";
        $header .= "Cookie: $cookie\r\n\r\n";
        $out .= $header.$content;
    } else {
        $out = "GET $path HTTP/1.0\r\n";
        $header = "Accept: */*\r\n";
        $header .= "Accept-Language: zh-cn\r\n";
        $header .= "User-Agent: ".@$_SERVER['HTTP_USER_AGENT']."\r\n";
        $header .= "Host: $host:$port\r\n";
        $header .= "Connection: Close\r\n";
        $header .= "Cookie: $cookie\r\n\r\n";
        $out .= $header;
    }

    $fpflag = 0;
    $fp = false;
    if (function_exists('fsocketopen')) {
        $fp = fsocketopen($host, $port, $errno, $errstr, $timeout);
    }
    if (!$fp) {
        $context = stream_context_create(array(
            'http' => array(
                'method' => $post ? 'POST' : 'GET',
                'header' => $header,
                'content' => $content,
                'timeout' => $timeout,
            ),
        ));
        $fp = @fopen($scheme.'://'.$host.':'.$port.$path, 'b', false, $context);
        $fpflag = 1;
    }

    if (!$fp) {
        return '';
    } else {
        stream_set_blocking($fp, true);
        stream_set_timeout($fp, $timeout);
        @fwrite($fp, $out);
        $status = stream_get_meta_data($fp);
        if (!$status['timed_out']) {
            while (!feof($fp) && !$fpflag) {
                if (($header = @fgets($fp)) && ($header == "\r\n" ||  $header == "\n")) {
                    break;
                }
            }
            if ($limit) {
                $return = stream_get_contents($fp, $limit);
            } else {
                $return = stream_get_contents($fp);
            }
        }
        @fclose($fp);
        return $return;
    }
}

if($action==""){
	$get_latest_ver = plus_ver_send('http://www.dedejs.com/apps/checkver.php?plus=ckplayer&action=plusver');
    if(version_compare($get_latest_ver, PLUS_CKPLAYER_VER,'>'))
    {
        $check_ver = "<font color=\"#FF0000\">本插件有新版本发布，最新版本v" . $get_latest_ver . "</font> <script type=\"text/javascript\" src=\"http://www.dedejs.com/apps/checkver.php?plus=ckplayer&action=plusurl\"></script>";
    } else {
        $check_ver = "当前为最新版本，无须下载更新！";
        
    }
	require_once(DEDEADMIN."/templets/ckplayer_about.htm");
}
?>
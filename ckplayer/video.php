<?php
/*
* 织梦ckplayer视频播放器插件视频地址调用文件 v20161027
* by 土匪
* www.dedejs.com
*/

require_once(dirname(__FILE__)."/../include/common.inc.php");
require_once(DEDEINC.'/arc.archives.class.php');

if(isset($_GET['url'])){
	$videolist=$_GET['url'];
	$wap=$_GET['wap'];
	$html5url=$_GET['html5url'];
	if(!$wap){
		if(strpos($videolist,'.mp4') || strpos($videolist,'.flv') || strpos($videolist,'.f4v') || strpos($videolist,'.m3u8')){
			if(strpos($videolist,'||')){
				$url=htmlentities($videolist,ENT_COMPAT,"utf-8");
				$list = explode('||',$url);
				$playlist = array();
				$playlist2 = array("flashvars"=>"","video"=>"");
				$playlist2['flashvars'] = "";
				for($i = 0;$i < count($list);$i++){
					$playlist[$i] = array("file"=>"","size"=>"","seconds"=>"");
					$playlist[$i]['file'] = $list[$i];
					$playlist[$i]['size'] = "";
					$playlist[$i]['seconds'] = "";
					$playlist2['video'][$i] = $playlist[$i];
				}
				header('Content-type:text/json');
				echo json_encode($playlist2);
				exit;
			}else{
				$playlist = array();
				$playlist['file'] = $videolist;
				$playlist['size'] = "";
				$playlist['seconds'] = "";
				$playlist2 = array("flashvars"=>"","video"=>"");
				$playlist2['flashvars'] = "";
				$playlist2['video'][0] = $playlist;
    			header('Content-type:text/json');
				echo json_encode($playlist2);
				exit;
			}
		}else{
			$str=G($_SERVER['HTTP_HOST'].'/ckplayer/video.php?v='.$videolist);
			header('Content-type:text/json');
			echo $str;
			exit;
		}
	}else{
		
		if(!$html5url){
			echo $videolist;
			exit;
		}else{
			echo $html5url;
			exit;
		}
		
	}
}
function G($url){
	$user_agent=$_SERVER['HTTP_USER_AGENT'];
	$ch=curl_init(); 
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_REFERER,$url);
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,30);
	curl_setopt($ch,CURLOPT_USERAGENT,$user_agent);
	curl_setopt($ch,CURLOPT_HEADER,0);
	@ $file=curl_exec($ch);
	curl_close($ch);
	return $file;
}
?>
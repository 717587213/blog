<?php
/**
 * ckplayer配置方案添加
 *
 * @version        $Id: ckplayercommon_add.php 13:16 2015年4月29日 by tufei $
 * @package        ckplayer for dedecms
 * @copyright      Copyright (c) 2013 - 2015, dedejs.com
 * @link           http://www.dedejs.com
 */
require(dirname(__FILE__)."/config.php");
CheckPurview('plus_ckplayer基本参数');
if(empty($dopost)) $dopost="";

if($dopost=="add")
{
    $savetime = time();
	if(empty($volume)) $volume="80";
	if(empty($logotime)) $logotime="3000";
	if(empty($cthidtime)) $cthidtime="3000";
	if(empty($advolume)) $advolume="80";
    $query = "INSERT INTO `#@__ckcommon`(
	stylename,skin,autoplay,dwidth,dheight,mwidth,mheight,wunit,hunit,volume,showlogo,logotime,showmark,
	endmotion,cthidden,cthidtime,simplebar,adpre,adpreurl,adpretime,advolume,adpreorder,
	adprejp,jpmember,unshow,adpremute,adpreload,adpau,adpauurl,adpaucls,admarstatus,admarcontent,admarurl,
	admarcolor,admarbgc,admarbgt,admarlight,lightcolor,lightc,savetime) VALUES(
	'$stylename','$skin','$autoplay','$dwidth','$dheight','$mwidth','$mheight','$wunit','$hunit','$volume',
	'$showlogo','$logotime','$showmark','$endmotion','$cthidden','$cthidtime','$simplebar',
	'$adpre','$adpreurl','$adpretime','$advolume','$adpreorder','$adprejp','$jpmember','$unshow','$adpremute','$adpreload',
	'$adpau','$adpauurl','$adpaucls',
	'$admarstatus','$admarcontent','$admarurl','$admarcolor','$admarbgc','$admarbgt','$admarlight','$lightcolor','$lightc','$savetime'); ";
    $rs = $dsql->ExecuteNoneQuery($query);
    $burl = empty($_COOKIE['ENV_GOBACK_URL']) ? "ckplayercommon_main.php" : $_COOKIE['ENV_GOBACK_URL'];
    if($rs)
    {
        ShowMsg("成功增加一个ckplayer配置方案!",$burl,0,500);
        exit();
    }
    else
    {
        ShowMsg("增加配置方案失败，请加QQ群217479292反馈错误，原因：".$dsql->GetError(),"javascript:;");
        exit();
    }
}
include DedeInclude('templets/ckplayercommon_add.htm');
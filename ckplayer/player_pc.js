//缩略图路径转换
var litpic = '';
if(videoinfo['litpic'].indexOf("http://")!=-1){
	litpic = videoinfo['litpic'];
}else{
	litpic = videoinfo['basehost']+videoinfo['litpic'];
}
//视频参数
var flashvars={
	f:videoinfo['path']+'/ckplayer/video.php?url='+videoinfo['vurl'],
	a:'',
	s:'5',
	c:'0',x:'',
	l:ckdata['adpre'],
	r:ckdata['adpreurl'],
	t:ckdata['adpretime'],
	d:ckdata['adpau'],
	u:ckdata['adpauurl'],
	e:ckdata['endmotion'],
	p:ckdata['autoplay'],
	v:ckdata['volume'],
	k:videoinfo['keytime'],
	n:videoinfo['keyword'],
	lv:'0',
	my_title:videoinfo['title'],
	my_pic:litpic,
	my_url:videoinfo['arcurl']
};
var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always'};
var video=[videoinfo['path']+'/ckplayer/video.php?wap=1&url='+videoinfo['vurl']+'&html5url='+videoinfo['html5url']+'->ajax/get/utf-8'];
CKobject.embed(videoinfo['path']+'/ckplayer/ckplayer.swf','a1','ckplayer_a1',ckdata['dwidth'],ckdata['dheight'],false,flashvars,video,params);
function ckadjump(){
	alert(ckdata['alertmsg']);
}
//开关灯
var box = new LightBox();
function closelights(){//关灯
	box.Show();
	CKobject._K_('a1').style.width=ckdata['dwidth']+'px';
	CKobject._K_('a1').style.height=ckdata['dheight']+'px';
	CKobject.getObjectById('ckplayer_a1').width=ckdata['dwidth'];
	CKobject.getObjectById('ckplayer_a1').height=ckdata['dheight'];
}
function openlights(){//开灯
	box.Close();
	CKobject._K_('a1').style.width=ckdata['dwidth']+'px';
	CKobject._K_('a1').style.height=ckdata['dheight']+'px';
	CKobject.getObjectById('ckplayer_a1').width=ckdata['dwidth'];
	CKobject.getObjectById('ckplayer_a1').height=ckdata['dheight'];
}
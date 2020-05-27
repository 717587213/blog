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
var support=['all'];
var video=[videoinfo['path']+'/ckplayer/video.php?wap=1&url='+videoinfo['vurl']+'&html5url='+videoinfo['html5url']+'->ajax/get/utf-8'];
CKobject.embedHTML5('a1','ckplayer_a1',ckdata["mwidth"],ckdata["mheight"],video,flashvars,support);

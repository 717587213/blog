;(function(window,document,$){
	'use strict'
	//插件名以及默认配置
	var	plugName = 'Carousel',
		config = {
			'event' : 'click',          //仅限制于tab圆点,可传hover或者event,默认active
			'class' : 'active',		    //执行完给对应图片层以及对应tab圆点加的类名,默认active
			'container' : 'container',  //图片父级类名,默认container
			'tab' : 'tab',				//对应Tab按键父级类名或id 默认class=tab
			'prev' : 'prev',			//同上(prev)
			'next' : 'next',			//同上(next)
			'auto' : true,				//是否自动轮播,默认true
			'time' : 4000,				//间隔时间
			'delay' : 500               //动画执行时间
		};

	var musicData = [
	{
		name : 'Tonight, I Feel Close To You',
		singer : '倉木麻衣',
		src : 'http://www.web-jackiee.com/templets/myMode/music/Tonight,%20I%20Feel%20Close%20To%20You.mp3'
	},
	{
		name : 'You are My Favorite Song',
		singer : 'Skyler',
		src : 'http://yinyueshiting.baidu.com/data2/music/102081586/102075658122400128.mp3?xcode=e8cdd66de329e398b123be2e4a685e68'
	},
	{
		name : '会呼吸的痛',
		singer : '梁静茹',
		src : 'http://ok.96x.cn/2015/7yue_2651.cn/%E4%BC%9A%E5%91%BC%E5%90%B8%E7%9A%84%E7%97%9B%20-%20%E6%A2%81%E9%9D%99%E8%8C%B9.mp3'
	},
	{
		name : '残酷な天使のテーゼ[Eva]',
		singer : '奥井雅美',
		src : 'http://yinyueshiting.baidu.com/data2/music/55592243/55592120201600128.mp3?xcode=e1d7e86f6cf998f384b505fb6b038464'
	}];

	//Carousel构造函数
	function Carousel(ele,option,attr){
		this._ele = $(ele);
		this._index = 0;
		this._lastIndex = 0;
		if(attr) this._attr = attr;
		this._config(option);
	};

	//Carousel原型
	Carousel.prototype = {
		//配置设置
		_config : function(option){
			this._option = $.extend(config,option);
			this._container = $('.'+this._option.container,this._ele);
			this._img = this._container.children();
			this._tab = $('.'+this._option.tab,this._ele).children();
			this._prev = $('.'+this._option.prev,this._ele);
			this._next = $('.'+this._option.next,this._ele);
			this._switch = true;
			this._init(this._option.class);
			this._select(this._option.event,this._option.class,eval(this._option.delay));
			eval(this._option.auto) && this._auto(eval(this._option.time),this._option.class,eval(this._option.delay));
		},
		//选择事件
		_select : function(event,name,delay){
			var This = this;
			this._tab.unbind().bind(event,function(){
				if(This._switch){
					This._index = $(this).index();
					if(This._index == This._lastIndex) return;
					if(This._imgIndex) This._imgIndex = $(this).index()+1;
					This._exe(name,delay);
				};
			});
			this._prev.unbind().bind('click',function(){
				if(This._switch){
					This._index = This._index?This._index-1:This._tab.length-1;
					This._imgIndex && This._imgIndex--;
					This._exe(name,delay);
				};
			});
			this._next.unbind().bind('click',function(){
				if(This._switch){
					This._index ++;
					This._index %= This._tab.length;
					This._imgIndex && This._imgIndex++;
					This._exe(name,delay);
				};
			});
		},
		//执行
		_exe : function(name,delay){
			this._tab.eq(this._index).addClass(name);
			this._tab.eq(this._lastIndex).removeClass(name);
			this._move(name,delay);
			this._lastIndex = this._index;
		},
		//自动
		_auto : function(time,name,delay){
			var This = this;
			this.timer = this._pause(time,name,delay);
			this._ele.hover(function(){
				clearInterval(This.timer);
			},function(){
				This.timer = This._pause(time,name,delay);
			});
		},
		//定时器内容
		_pause : function(time,name,delay){
			var This = this;
			return  setInterval(function(){
				This._index ++;
				This._index %= This._tab.length;
				This._imgIndex && This._imgIndex++;
				This._exe(name,delay);
			},time);
		}
	};

	//淡入淡出构造函数
	function CarouselFade(ele,option){
		Carousel.call(this,ele,option);
	};

	//淡入淡出函数原型
	CarouselFade.prototype = $.extend('deep',Carousel.prototype,{
		//初始化状态
		_init : function(name){
				var This = this;
				this._ele.css({'overflow':'hidden','position':'relative'});
				this._container.css({'position':'relative','left':0,'top':0});
				this._tab.eq(0).addClass(name);
				this._img.css({'position':'absolute','left':0,'top':0}).eq(0).css('display','block').siblings().css({'display':'none','opacity':0});
				setTimeout(function(){This._img.eq(0).addClass(name)},500);
		},
		//运动
		_move : function(name,delay){
			var This = this;
			this._switch = false;
			this._img.eq(this._lastIndex).removeClass(name).stop().animate({'opacity':0},delay,function(){
				$(this).css('display','none');
				This._switch = true;
			})
			this._img.eq(this._index).css('display','block').stop().animate({'opacity':1},delay,function(){
				$(this).addClass(name);
			});		
		}
	});

	//滚动构造函数
	function CarouselScroll(ele,option,attr){
		Carousel.call(this,ele,option,attr);
	};

	//滚动函数原型
	CarouselScroll.prototype = $.extend('deep',Carousel.prototype,{
		//初始化状态
		_init : function(name){
			var This = this,
				img = this._img.eq(0),
				cloneFirst = this._img.eq(this._img.length-1).clone(),
				cloneLast = this._img.eq(0).clone(),
				width = img.width(),
				height = img.height(),
				bool = this._attr == 'left';
			this._scrollSize = bool?width:height;
			this._imgIndex = 1;
			this._tab.eq(0).addClass(name);
			this._container.prepend(cloneFirst).append(cloneLast).css({'overflow':'hidden','position':'relative','left':(bool?-width:0),'top':(bool?0:-height)});
			this._ele.css({'overflow':'hidden','position':'relative'});
			this._img = this._container.children();
			this._img.css({'position':'relative','display':'block','opacity':'1','flex':'1'});
			if(bool) this._img.css('float','left');
			this._container.css({'position':'absolute','width':width*(bool?this._img.length:1),'height':bool?100+'%':height*this._img.length,'display':'flex'});
			window.resize(function(){
				This._scrollSize = bool?img.width():img.height();
			});
		},
		//移动状态
		_move : function(name,delay){
			var This = this;
			this._switch = false;
			this._container.stop().animate({[this._attr] : -This._scrollSize*This._imgIndex},delay,'swing',function(){
				if(This._imgIndex == This._tab.length+1){
					This._container.css({[This._attr]:-This._scrollSize});
					This._imgIndex = 1;
				}else if(This._imgIndex == 0){
					This._container.css({[This._attr]:-(This._scrollSize*This._tab.length+1)});
					This._imgIndex = This._tab.length;
				}
				This._switch = true;
			});
		}
	});

	//左右滚的音乐盒子构造函数
	function CarouselMusicX(ele,option,attr){
		CarouselScroll.call(this,ele,option,attr);
		this._goInit(this._option.class,this._option.delay);
	}
	//左右滚的音乐盒子原型函数
	CarouselMusicX.prototype = $.extend('deep',CarouselScroll.prototype,{
		//初始化状态
		_goInit : function(name,delay){
			var This = this;
			this._singer = this._tab.parent().prev().find('span');
			this._singer.text(musicData[0].singer);
			//this._tab.prev().text(2);
			this._controls = $('#controls').children();
			$.each(this._tab,function(i){
				$(this).text(musicData[i].name);
			});
			this._audio = $('#Audio')[0];
			this._audio.src = musicData[0].src;
			this._controls.eq(2).on('click',function(){
				$(this).css('display','none').prev().css('display','block');
				This._audio.pause();
				This._tab.parent().parent().prev().removeClass(name);
			});
			this._controls.eq(1).on('click',function(){
				$(this).css('display','none').next().css('display','block');
				This._audio.play();
				This._tab.parent().parent().prev().addClass(name);
			});
			this._audio.addEventListener('ended', function (){  
			   This._index++;
			   This._index %= This._img.length;
			   This._audio.src = musicData[This._index].src;
			   This._exe(name,delay);
			}, false);
		},
		//点击事件
		_exe : function(name,delay){
			var This = this,
				name = this._tab.eq(this._index).attr('class');
			this._tab.eq(this._index).removeClass().addClass('active');
			this._tab.eq(this._lastIndex).removeClass().addClass(name);
			this._move(name,delay);
			this._singer.text(musicData[this._index].singer);
			this._lastIndex = this._index;
			this._audio.src = musicData[this._index].src;
			this._tab.parent().parent().prev().css('background-image' , 'url(image/music/'+(this._index+1)+'.png)');	
		},
	});

	//执行插件
	$.fn[plugName] = function(ele,option){
		$.each($(this),function(){
			if(!$.data(this,'plugin_' + plugName)){
				switch(option.effect.toLowerCase()){
					case 'fade':
					$.data(this,'plugin_' + plugName,new CarouselFade(this,option));
					break;
					case 'scrollx':
					$.data(this,'plugin_' + plugName,new CarouselScroll(this,option,'left'));
					break;
					case 'scrolly':
					$.data(this,'plugin_' + plugName,new CarouselScroll(this,option,'top'));
					break;
					case 'musicx' : 
					$.data(this,'plugin_'+ plugName,new CarouselMusicX(this,option,'left'));
					break;
				};
			};
		});
	};
})($(window),$(document),jQuery);
;(function(window,document,$){
	'use strict'
	//插件名以及默认配置
	var	plugName = 'Carousel',
		config = {
			'event' : 'click',          //仅限制于tab圆点,可传hover或者event,默认active
			'class' : 'active',		    //执行完给对应图片层以及对应tab圆点加的类名,默认active
			'container' : '.container', //图片父级类名,默认container
			'tab' : '.tab',				//对应Tab按键父级类名或id 默认class=tab
			'prev' : '.prev',			//同上(prev)
			'next' : '.next',			//同上(next)
			'auto' : true,				//是否自动轮播,默认true
			'time' : 4000,				//间隔时间
			'delay' : 500               //动画执行时间
		};
	//Carousel构造函数
	function Carousel(ele,option){
		this._ele = $(ele);
		this._index = 0;
		this._lastIndex = 0;
		this._config(option);
	};

	//Carousel原型
	Carousel.prototype = {
		//配置设置
		_config : function(option){
			this._option = $.extend('deep',config,option);
			this._container = $(this._option.container,this._ele);
			this._img = this._container.children();
			this._tab = $(this._option.tab,this._ele).children();
			this._prev = $(this._option.prev,this._ele);
			this._next = $(this._option.next,this._ele);
			this._switch = true;
			this._init(this._option.class);
			this._select(this._option.event,this._option.class,eval(this._option.delay));
			eval(this._option.auto) && this._auto(eval(this._option.time),this._option.class,eval(this._option.delay));
		},
		//选择事件
		_select : function(event,name,delay){
			var This = this;
			this._tab.unbind().bind(event,function(){
				if(!This._switch||This._index==$(this).index()) return
				This._index = $(this).index();
				This._exe(name,delay);
			});
			this._prev.unbind().bind('click',function(){
				if(!This._switch) return
				This._index = This._index?This._index-1:This._img.length-1;
				This._exe(name,delay);
			});
			this._next.unbind().bind('click',function(){
				if(!This._switch) return
				This._index ++;
				This._index %= This._img.length;
				This._exe(name,delay);
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
				This._index %= This._img.length;
				This._exe(name,delay);
			},time);
		}
	};

	//3屏2帧滚动构造函数
	function CarouselHot(ele,option){
		Carousel.call(this,ele,option);
	};

	//3屏2帧滚动构造函数
	CarouselHot.prototype = $.extend('deep',Carousel.prototype,{
		//初始化
		_init : function(name){
			var This = this;
			this._index = 1;
			this._tabShow = $('.tab-show',this.ele);
			this._pic = this._container.find('img');
			this._tab.eq(1).addClass(name);
			this.scrollW = this._img.width();
			this._mask();
			window.resize(function(){
				This.scrollW = This._img.width();
			})
		},
		//滚动
		_move : function(name,delay){
			var This = this;
			this._tabShow.css('transform','rotate('+(180-180*this._index)+'deg)')
			$.each(this._container,function(i){
				var index = i==1? (This._index+1)%2:This._index
				$(this).stop().animate({'left':-100*index+'%'},delay,'swing',function(){
					This._switch = true;
				});
			});
		},
		//事件补充
		_mask : function(){
			var This = this;
			this._pic.hover(function(){
				This._pic.css('opacity',.5);
				$(this).css('opacity',1);
			},function(){
				This._pic.css('opacity',1);
			});
		}
	});

	//WorkNav构造函数
	function CarouselWork(ele,option){
		Carousel.call(this,ele,option);
	};
	CarouselWork.prototype = $.extend('deep',Carousel.prototype,{
		//初始化寻找节点
		_init : function(){
			var This = this;
			this._viewPort = $('.perview-viewport',this.ele);
			this._viewContainer = this._viewPort.parent();
			this._cal();
			this._handler();
			$(window).on('resize',function(){
				This._cal();
				This._viewPort.css({'left':0,'top':0});
				This._prop = ($globalWidth>1025?1760:1400)/This._viewContainer.width();
			});
		},
		//数值计算
		_cal : function(){
			this._scale = this._viewPort.width();
			this._maxH = this._viewContainer.height()-this._scale-20;
			this._prop = ($globalWidth>1025?1760:1400)/this._viewContainer.width();
		},
		//放大镜事件处理
		_handler : function(){
			var This = this;
			/*$(window).on('touchmove',function(){
				console.log(2);
			})*/
			this._viewPort.bind('mouseenter',function(){
				var offset = This._viewContainer.offset();
				This._viewLeft = offset.left + This._scale/2;
				This._viewTop = offset.top + This._scale/2;
			});
			this._viewPort.bind('mousemove touchmove',function(ev){
				if($globalWidth<=1025){
					var touch = ev.originalEvent.targetTouches[0];
					$(this)[0].style.backgroundSize = 1400 + 'px';
					if(ev.target.type == 'range') return;
    				ev.preventDefault();
    			}
    			var px = ev.clientX||touch.pageX,
					py = ev.pageY||touch.pageY,
					x = Math.max(px-This._viewLeft,This._scale/5),
					y = Math.min(Math.max(py-This._viewTop,-This._scale/5),This._maxH);

				$(this).css({'left':x,'top':y});
				$(this)[0].style.backgroundPosition = (-50-x*This._prop) +'px' +' '+ (-y*This._prop-40) + 'px';
			});
			$('#workNav').on('mouseenter',function(){
				This._ele.removeClass('st');
			})
		},
		//图片移动借助css3动画
		_move : function(name,delay){
			var This = this;
			this._viewPort.css('background-image','url(/images/viewport_'+(this._index+1)+'.jpg)');
			this._img.eq(this._lastIndex).removeClass(name);
			this._img.eq(this._index).addClass(name);
		}
	})

	//淡入淡出构造函数
	function CarouselFade(ele,option){
		Carousel.call(this,ele,option);
	};
	//淡入淡出函数原型
	CarouselFade.prototype = $.extend('deep',Carousel.prototype,{
		//初始化状态
		_init : function(name){
				var This = this;
				this._container.css('position','relative');
				this._tab.eq(0).addClass(name);
				this._img.css('position','absolute').eq(0).css('display','block').siblings().css({'display':'none','opacity':0});
				setTimeout(function(){This._img.eq(0).addClass(name)},500);
		},
		//运动
		_move : function(name,delay){
			var This = this;
			this._img.eq(this._lastIndex).removeClass(name).stop().animate({'opacity':0},delay,function(){
				$(this).css('display','none');
			})
			this._img.eq(this._index).css('display','block').stop().css('z-index',100).animate({'opacity':1},delay,function(){
				$(this).addClass(name);
			});		
		}
	});

	//左右滚动构造函数
	function CarouselScrollX(ele,option){
		Carousel.call(this,ele,option);
	};
	//左右滚动函数原型
	CarouselScrollX.prototype = $.extend('deep',Carousel.prototype,{
		//初始化状态
		_init : function(name){
			var This = this;
			this._tab.eq(0).addClass(name);
			this._container.css('position','absolute').parent().css({'overflow':'hidden'});
			this._img.css('float','left');
			this.scrollW = this._img.width();
			window.resize(function(){
				This.scrollW = This._img.width();
			})
		},
		//移动状态
		_move : function(name,delay){
			var This = this;
			this._switch = false;
			this._container.stop().animate({'left':-This.scrollW*This._index},delay,'swing',function(){
				This._switch = true;
			})
		}
	});

	//左右滚的音乐盒子构造函数
	function CarouselMusicX(ele,option){
		CarouselScrollX.call(this,ele,option);
		this._goInit(this._option.class,this._option.delay);
	}
	//左右滚的音乐盒子原型函数
	CarouselMusicX.prototype = $.extend('deep',CarouselScrollX.prototype,{
		//初始化状态
		_goInit : function(name,delay){
			var This = this;
			this._singer = this._tab.parent().prev().find('span')
			this._singer.text(musicData[0].singer);
			this._tab.prev().text(2);
			this._controls = $('#controls').children();
			$.each(this._tab,function(i){
				$(this).text(musicData[i].name);
			})
			this._audio = $('#Audio')[0];
			this._audio.src = musicData[0].src;
			this._controls.eq(2).on('click',function(){
				$(this).css('display','none').prev().css('display','block');
				This._audio.pause();
				This._tab.parent().parent().prev().removeClass(name);
			})
			this._controls.eq(1).on('click',function(){
				$(this).css('display','none').next().css('display','block');
				This._audio.play();
				This._tab.parent().parent().prev().addClass(name);
			})
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
			this._tab.parent().parent().prev().css('background-image' , 'url(images/'+(this._index+1)+'.png)');	
		},
	});

	//执行插件
	$.fn[plugName] = function(ele,option){
		$.each($(this),function(){
			if(!$.data(this,'plugin_' + plugName)){
				switch(option.effect){
					case 'fade':
					$.data(this,'plugin_' + plugName,new CarouselFade(this,option));
					break;
					case 'scrollX':
					$.data(this,'plugin_' + plugName,new CarouselScrollX(this,option));
					break;
					case 'musicX' : 
					$.data(this,'plugin_'+plugName,new CarouselMusicX(this,option));
					break;
					case 'hotX' : 
					$.data(this,'plugin_'+plugName,new CarouselHot(this,option));
					break;
					case 'workY' : 
					$.data(this,'plugin_'+plugName,new CarouselWork(this,option));
					break;
				};
			};
		});
	};
})($(window),$(document),jQuery);
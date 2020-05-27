;(function(window,document,$){
	'use strict';

	var pluginName = 'Popup',
		config = {
			'trigger' : '',
			'event' : 'mouseenter',
			'delay' : 0,
			'time' : 400,
			'effect' : '',
			'class' : 'active'
		}

	function Popup(obj,option){
		this._ele = $(obj);
		this._config(option);
	}
	Popup.prototype = {
		//处理配置
		_config : function(option){
			this._index = null;
			this._option = $.extend(config,option);
			this._init(this._option.trigger);
			this._handle(this._option.event,this._option.delay,this._option.time,this._option.effect,this._option.class);
		},
		//初始化状态
		_init : function(trigger){
			this._trigger = (trigger?$('#'+trigger):$(this._ele).children()).css('display','none');
		},
		//事件处理
		_handle : function(event,delay,time,effect,name){
			var This = this;
			if(effect){
				var eE = effect=='fadeIn'?'fadeOut':'slideUp';
			}else{
				var eE = 'fadeOut';
				time = 0;
				effect = 'fadeIn';
			}
			this._ele.on(event,function(){
				if (!This._index){
					if(event == 'click'){
						This._index++;
						$(this).off('mouseleave');
					}
					This._trigger[effect](eval(time));
					This._ele.addClass(name);
				}else{
					This._index--;				
					This._trigger[eE](eval(time));
					This._ele.removeClass(name);
				}}).on('mouseleave',function(){
					This._trigger.css('display','none');
					This._ele.removeClass(name);
			});
			this._ele.siblings().on('click',function(){
				This._index = null;
				This._trigger[eE](eval(time));
				This._ele.removeClass(name);
			})
		}
	}
	$.fn[pluginName] = function(option){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this,'plugin_'+pluginName,new Popup(this,option));
			}
		})
	};
})($(window),$(document),jQuery);
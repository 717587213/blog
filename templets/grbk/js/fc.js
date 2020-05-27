;(function(window,document,$){
  'use strict'
  //头部show
  var $show = {
    //主体
    $preview : $('.blog-perview'),
    //物体
    $obj : $('.perform-objGroup').find('img'),
    //中心
    _center : function(){
      return { 
        left : this.$preview.width()/2,
        top : this.$preview.height()/4
      };
    },
    //初始化
    _init : function(){
      this.previewCenter = this._center();
      this._pos();
      this._handler();
    },
    //位置
    _pos : function(){
      $.each(this.$obj,function(){
        $(this).data('pos',{
          'left' : parseInt($(this).css('left')),
          'top' : parseInt($(this).css('top')),
          'prop' : {
            x : $(this).data('propx'),
            y : $(this).data('propy')
          }
        });
      });
    },
    //处理事件
    _handler : function(){
      var This = this;
      this.$preview.on('mousemove',function(ev){
        var mx = ev.pageX - This.previewCenter.left,
            my = ev.pageY - This.previewCenter.top;
        This._move(mx,my);
      });
      $(window).on('resize',function(){
        $.each(This.$obj,function(){
          $(this).removeAttr("style");
          This.previewCenter = This._center();
          This._pos();
        });
      })
    },
     //物体位置
    _move : function(mx,my){
      $.each(this.$obj,function(){
        var pos = $(this).data('pos');
        $(this).css({'left':(pos.left + (pos.prop.x*mx)),'top':(pos.top + (pos.prop.y*my))})
      });
    },
  };
  //grow部分
  var $grow = {
    _obj : {
      $newModle : $('.blog-new'),
      $growModle : $('.blog-grow')
    },
    _viewWidth : {
      last : null,
      now : null
    },
    _judgeView : function(){
      var This = this;
      if($(window).width()<=415){
        return 'sm';
      }else{
        return 'lg';
      }
    },
    _init : function(){
      this._viewWidth.last = this._judgeView();
      if(this._viewWidth.last == 'sm') this._change(this._obj.$growModle,this._obj.$newModle);
      this._handler();
    },
    _handler : function(){
      var This = this;
      $(window).on('resize',function(){
        var w = This._judgeView();
        This._viewWidth.now = w;
        if(This._viewWidth.now != This._viewWidth.last){
          if(This._viewWidth.now == 'sm'){
            This._change(This._obj.$growModle,This._obj.$newModle);
          }else{
            This._change(This._obj.$newModle,This._obj.$growModle);
          }
        };
        This._viewWidth.last = w;
      })
    },
    _change : function(a,b){
        a.insertBefore(b);
    },
  }

  $show._init();
  $grow._init();
  
  var $grow = $('.blog-grow'),
      $cir = $('.blog-grow .grow-circularGroup'),
      st = $grow.offset().top - $(window).height(),
      et = $grow.offset().top + $grow.height();
  $(window).on('scroll',function(){
      var top = $(this).scrollTop();
      if(top<st || top>et) return;
      var prop = 1-(top/et/2);
      $cir.css('transform','scale('+prop+')');
  });

  //手机登录扩展
  $.fn.extend({
    mbLogin : function(obj){
        var $btn = $('.mb-dropDown',obj),     
            $mbDrop = $('.mb-down',obj).css({'width':$globalWidth,'right':-1*$globalWidth});
        $btn.on('click',function(){
        if($(this).data('state') == 'none'){
          $mbDrop.css('display','block').stop().animate({'right':0,'opacity':1},600);
          $(this).data('state','block');
        }else{
          $mbDrop.stop().animate({'right':-1*$globalWidth,'opacity':0},600,function(){
            $(this).css('display','none')
          });
          $(this).data('state','none');
        }
        $(window).on('resize',function(){
          $mbDrop.css('width',$globalWidth);
        });
      });
    },
  });

})($(window),$(document),jQuery);
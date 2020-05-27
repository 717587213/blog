//全局变量
var $globalWidth = $(window).width(),
    $globalObj = {
      Login : $('.login-mb'),
      hotModle : $('.hot-container'),
      columnModle : $('#column'),
      columnChild : $('.container',$('#column')).children(),
      canvas : $('#detail-canvas'),
      workNav : $('.workNav-container')
    },
    $globalFn = {
      //设备端口
      viewport : {
        //手机端
        mb : {
          bool : true,
          fn : function(){
            this.bool = false;
            $globalObj.Login.mbLogin($globalObj.Login);
          }
        },
        //ipad端
        ipad : {
          bool : true,
          fn : function(){
            this.bool = false;
            var column = $globalObj.columnModle,
                columnData = column.data('carousel'),
                columnOption = $globalFn.fn.getOption(columnData);
            column.Carousel(column,columnOption);
          }
        },
        //pc端口
        pc : {
          bool : true,
          fn : function(){
            this.bool = false;
            var canvas = $globalObj.canvas;
            canvas.blogCanvas(canvas,{
                cx : 270,
                cy : 400,
                cr : 140,
                point : 6,
                img : ['quest','blog','weixin','wolf','qq'],
              });
          }
        },
        //所有端口
        all : function(){
            var hot = $globalObj.hotModle,
                hotData = hot.data('carousel'),
                hotOption = $globalFn.fn.getOption(hotData);
            hot.Carousel(hot,hotOption);
            var workNav = $globalObj.workNav,
                workNavData = workNav.data('carousel'),
                workNavOption = $globalFn.fn.getOption(workNavData);
            workNav.Carousel(workNav,workNavOption);
        },
      },
      //公用方法
      fn : {
        getOption : function(data){
          var option = {},
              op = data.replace('hover','mouseenter').split(';');
          $.each(op,function(){
            if(this!=''){
              var attr = this.split(':');
              option[attr[0]] = attr[1];
            };
          });
          return option;
        }
      },
      //初始化
      init : function(){
        if($globalWidth < 415){
          this.viewport.mb.fn();
        }else if($globalWidth > 768){
          this.viewport.ipad.fn();
          if($globalWidth > 1025){
            this.viewport.pc.fn();
          }
        }
        this.viewport.all();
        this.resize();
      },
      //浏览器窗口事件
      resize : function(){
        var This = this;
        $(window).on('resize',function(){
          $globalWidth = $(window).width();
          if($globalWidth >= 768){
            if(This.viewport.ipad.bool == true) This.viewport.ipad.fn();
            if($globalWidth > 1025 && This.viewport.pc.bool == true){
              This.viewport.pc.fn();
            }
          }else{
            $.each($globalObj.columnChild,function(){
              $(this).removeAttr('style').css({'display':'flex','opcity':1});
            });
            if($globalWidth < 415 && This.viewport.mb.bool == true){
              This.viewport.mb.fn();
            }
          };
        });
      },
    };
$globalFn.init();
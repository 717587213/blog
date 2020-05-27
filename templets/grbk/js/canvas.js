;(function(){	
    var Canvas = function(obj,config){
      this._canvas = obj[0];
      this._context = this._canvas.getContext('2d');
      this._config = config;
      this._imgData = config.img;
      this._init();
    };
    Canvas.prototype = {
      //圆点index
      _hrefIndex : null,
      //最后经过
      _lastPoint : [0,0],
      //角度
      _sixDig : function(){
        return 360/this._config.point;
      },
      //初始化
      _init : function(){
        var This = this,
            config = this._config;
        this._sharp.sixSide.call(this,this._sixDig(),config.cx,config.cy,config.cr,0,0);
        this._sharp.logo.call(this);
        this._sharp.clock.call(this);
        this._sharp.initImg.call(this);
        this._sharp.btn.call(this,982,523,20,20,8,80,16);
        this._canvas.onmousemove = function(ev){
          var x = ev.clientX-this.offsetLeft-config.cx,
              y = ev.pageY-this.offsetTop-config.cy;
          This._lastPoint[0] = x>0?Math.min(x,220):Math.max(x,-160);
          This._lastPoint[1] = y>0?Math.min(y,180):Math.max(y,-180);
            This._sharp.sixSide.call(This,This._sixDig(),config.cx,config.cy,config.cr,This._lastPoint[0],This._lastPoint[1]);
        };
        this._canvas.onmouseout = function(){
          this.timer && clearInterval(this.timer);
          var st = new Date();
          this.timer = setInterval(function(){
            var nt = new Date(),
                prop = 1-(nt-st)/500,
                x = prop*This._lastPoint[0],
                y = prop*This._lastPoint[1];
            This._sharp.sixSide.call(This,This._sixDig(),config.cx,config.cy,config.cr,x,y);
            if(prop<=0) clearInterval(This._canvas.timer);
          },20)
        };
      },
      //形状
      _sharp : {
        //六边形
        sixSide : function(dig,cx,cy,cr,x,y){
            var lx = [],
                ly = [],
                This = this,
                bool;
            this._context.fillStyle='#fff';
            this._context.clearRect(0,100,600,600);
            this._context.beginPath();
            this._context.strokeStyle = '#b9b9b9';
            this._context.lineWidth = 0.7;
            //绘制线条
            for(var i=0; i<6 ;i++){
              var dian = Math.PI*dig*i/180,
                  nextD = Math.PI*dig*(i+1)/180,
                  dx = cx + Math.sin(dian)*cr,
                  dy = cy + Math.cos(dian)*cr,
                  nx = cx + Math.sin(nextD)*cr,
                  ny = cy + Math.cos(nextD)*cr;
              lx.push(dx-x/10);
              ly.push(dy-y/10);
              this._context.lineTo(cx+x,cy+y);
              this._context.lineTo(dx-x/10,dy-y/10);
              this._context.lineTo(nx-x/10,ny-y/10);
            };
            this._context.closePath();
            this._context.stroke();
            this._context.lineWidth = 2; 
            this._context.fillStyle = '#000';
            this._context.strokeStyle = '#c6c6c6';
            //绘制圆点
            for(var i=0;i<6;i++){
              this._context.beginPath();
              if(cx+x>=lx[i]-6 && cx+x<=lx[i]+6 && cy+y>=ly[i]-6 && cy+y<=ly[i]+6 && i!=0 && i!=5 && i!=this._hrefIndex){
                this._hrefIndex = i;
                this._context.clearRect(810,276,200,200)
                var img=new Image();
                img.src = '/templets/grbk/images/100.jpg';
                img.onload = function(){
                  This._context.drawImage(img,810,276);
                }
                bool = true;
              }
              var color = (i == this._hrefIndex)?'#50ADFF':'#9f9f9f';
              this._context.fillStyle = color;
              this._context.arc(lx[i],ly[i],6,0,Math.PI * 2,true);
              this._context.closePath();
              this._context.fill();
              this._context.stroke();
            };
            this._sharp.font.call(this,x,y);
            bool && this._sharp.btn.call(this,982,523,20,20,10,80,16);
        },
        //字
        font : function(x,y){
            this._context.font = "15px Microsoft YaHei";
            this._context.fillStyle = "#888";
            this._context.fillText("技术群",222-x/10,220-y/10);
            this._context.fillText("坤坤微信",412-x/10,310-y/10);
            this._context.fillText("联系坤坤",60-x/10,310-y/10);
            this._context.save();
        },
        //H5Logo
        logo : function(){
          this._context.beginPath();
          this._context.fillStyle='#e44a00';
          this._context.moveTo(493,2);
          this._context.lineTo(567,2);
          this._context.lineTo(559,72);
          this._context.lineTo(530,82);
          this._context.lineTo(501,72);
          this._context.closePath();
          this._context.fill();
          this._context.beginPath();
          this._context.fillStyle='#ef600d';
          this._context.moveTo(530,12);
          this._context.lineTo(557,12);
          this._context.lineTo(552,64);
          this._context.lineTo(530,72);
          this._context.closePath();
          this._context.fill();
          this._context.beginPath();
          this._context.fillStyle='rgba(255,255,255,.95)';
          this._context.moveTo(508,17);
          this._context.lineTo(552,17);
          this._context.lineTo(551,25);
          this._context.lineTo(517,25);
          this._context.lineTo(518,36);
          this._context.lineTo(549,36);
          this._context.lineTo(546,62);
          this._context.lineTo(530,68);
          this._context.lineTo(514,62);
          this._context.lineTo(512,49);
          this._context.lineTo(520,49);
          this._context.lineTo(521,56);
          this._context.lineTo(530,60);
          this._context.lineTo(539,56);
          this._context.lineTo(540,44);
          this._context.lineTo(511,44);
          this._context.closePath();
          this._context.fill();
          this._context.font = "28px Arial";
          this._context.fillStyle = "#666";
          this._context.fillText('Contact',585,32);
          this._context.font = "14px Microsoft YaHei";
          this._context.fillStyle = "#999";
          this._context.fillText('技术交流平台',597,66);
          this._context.restore();
        },
        //clock
        clock : function (){
          this._context.lineWidth = 0.7;
          for(var i = 22;i < 60;i++){
              var dig = (Math.PI/180*i*6).toFixed(2),
                  sd = Math.sin(dig),
                  cd = Math.cos(dig),
                  n = i%2==0?176:173,
                  x1 = 911 + sd*180,
                  y1 = 380 + cd*180,
                  x2 = 911 + sd*n,
                  y2 = 380 + cd*n;
              this._context.beginPath();
              this._context.strokeStyle = '#666';
              this._context.moveTo(x1,y1);
              this._context.lineTo(x2,y2);
              this._context.closePath();
              this._context.fill();
              this._context.stroke();
          	}
      	},
        //进场图
        initImg : function(){
          var img = new Image(),
              This = this;
          img.src = '/templets/grbk/images/100.jpg';
          img.onload = function(){
            This._context.drawImage(img,810,276);
          }
        },
        //按钮
        btn : function(sx,sy,mx,my,r,w,h){
          this._context.save();
          this._context.restore();
          this._context.clearRect(sx,sy,w,h);
          this._context.fillStyle = '#272636';
          this._context.beginPath();
          this._context.moveTo(sx,sy);
          this._context.arcTo(sx,sy-my,sx+mx,sy-my,r);
          this._context.lineTo(sx+mx+w,sy-my);
          this._context.arcTo(sx+(2*mx)+w,sy-my,sx+(2*mx)+w,sy,r);
          this._context.lineTo(sx+(2*mx)+w,sy+h);
          this._context.arcTo(sx+(2*mx)+w,sy+h+my,sx+mx+w,sy+h+my,r);
          this._context.lineTo(sx+mx,sy+h+my);
          this._context.arcTo(sx,sy+h+my,sx,sy+h,r);
          this._context.closePath();
          this._context.fill();
          this._context.font = "20px Microsoft YaHei";
          this._context.fillStyle = "#fff";
          this._context.fillText("GitHub",sx+mx+w/2-27,sy+my+h/2-11);
        }
    },
 };
  $.fn.blogCanvas = function(obj,option){
      new Canvas(obj,option);
  }
})();
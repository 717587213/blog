!function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){var i=function(){return!0},o=e(1),c=function(t,n){var e=document.getElementsByTagName("head")[0]||document.head||document.documentElement,i=document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("charset","UTF-8"),i.setAttribute("src",t),i.setAttribute("async","async"),"function"==typeof n&&(window.attachEvent?i.onreadystatechange=function(){var t=i.readyState;"loaded"!==t&&"complete"!==t||(i.onreadystatechange=null,n())}:(i.onload=n,i.onerror=n)),e.appendChild(i)},a=function(t,n){var e="",i=n.callback||"callback",o="changyan"+Math.floor(1e3*Math.random()*1e3*1e3);n&&n.data&&(e=this.getParams(n.data)),e+=e?"&"+i+"="+o:i+"="+o,t+=t.indexOf("?")>0?"&"+e:"?"+e,window[o]=function(t){"object"!=typeof t&&(t=JSON.parse(t)),n.success&&n.success(t)},c(t,function(){try{delete window[o]}catch(t){window[o]=void 0}})},r="v20170926113";"#"!=r.charAt(0)&&(window.changyan.jsVersion=r);var s=function(){var t=new o;window.changyan.feConfig=t.fetchConfig()},u=function(t){var n="https://changyan.sohu.com/api/2/config/get/"+window.changyan.feConfig.appid;a(n,{success:function(n){window.changyan.beConfig=n.data,t&&t(n.data.main)},error:function(){}})},d=function(t){var n=new RegExp("(?:(?:^|.*;\\s*)"+t+"\\s*\\=\\s*([^;]*).*$)|^.*$"),e=document.cookie.replace(n,"$1");return!(""==e||!i())&&(c(e),!0)},g=function(t,n){if("v4"===n.code_version){var e;i()?(e=document.createElement("link"),e.setAttribute("href","https://changyan.sohu.com/v4/"+window.changyan.jsVersion+"/cy-pc.css"),e.setAttribute("type","text/css"),e.setAttribute("rel","stylesheet"),document.getElementsByTagName("head")[0].appendChild(e)):(e=document.createElement("link"),e.setAttribute("href","http://10.0.125.157:8080/cy-pc.css"),e.setAttribute("type","text/css"),e.setAttribute("rel","stylesheet"),document.getElementsByTagName("head")[0].appendChild(e)),c("https://changyan.sohu.com/v4/"+window.changyan.jsVersion+"/changyan_pc.js")}else if("v3"===n.code_version){var o=+new Date+window.Math.random().toFixed(16);c("https://changyan.itc.cn/upload/version-v3.js?"+o)}else c("https://changyan.sohu.com/upload/version.js")},f=function(t,n){var e=n.mobile_code_version||"v2",o=["cyrIqbsmb","cyruNjvn2"],a=n.isNewVersion===!0&&o.indexOf(config.appid)>=0,r={},s=function(){t.config=n;var e=t.config.mobile_isv_type,i=t.config.mobile_css_type;t.uri={res:config.protocol+"changyan.itc.cn/upload/mobile/v2/",api:config.protocol+"changyan.sohu.com/"},"stable"!==e&&"string"!=typeof i&&(t.config.mobile_css_type="11"),r=t,window.cyan.getAdapterVersionModule=function(){return{get:function(){return r}}}};if("v2"===e){s();var u=function(){var t="##CY_JS_VERSION##";return t.indexOf("##CY")>=0&&(t="v3-debug-v3"),t};return r.version=u(),r.uri.res=config.protocol+"changyan.itc.cn/upload/mobile/v2/",void c(r.uri.res+"wap-js/src/init-build.js?"+r.version)}if("v1"===e)return s(),a?r.uri.res=config.protocol+"changyan.itc.cn/upload/mobile/v2/":r.uri.res=config.protocol+"changyan.itc.cn/upload/mobile/v1/",void c(r.uri.res+"wap-js/src/init-build.js?"+r.version);if("v0"===e)return s(),a?r.uri.res=config.protocol+"changyan.itc.cn/upload/mobile/v2/":r.uri.res=config.protocol+"changyan.itc.cn/upload/mobile/",void c(r.uri.res+"wap-js/src/init-build.js?"+r.version);if("v3"===e){var d=+new Date+window.Math.random().toFixed(16);c("https://changyan.itc.cn/upload/version-v3.js?"+d)}if("v4"===e){var g;i()?(g=document.createElement("link"),g.setAttribute("href","https://changyan.sohu.com/v4/"+window.changyan.jsVersion+"/cy-wap.css"),g.setAttribute("type","text/css"),g.setAttribute("rel","stylesheet"),document.getElementsByTagName("head")[0].appendChild(g)):(g=document.createElement("link"),g.setAttribute("href","http://127.0.0.1:8080/cy-wap.css"),g.setAttribute("type","text/css"),g.setAttribute("rel","stylesheet"),document.getElementsByTagName("head")[0].appendChild(g)),c("https://changyan.sohu.com/v4/"+window.changyan.jsVersion+"/changyan_wap.js")}},h=function(){if(!d("cy_debug_v4_version")){s();var t=window.changyan.feConfig;u(function(n){t.isMobile?f(t,n):g(t,n)})}};h()},function(t,n,e){var i=e(2),o=function(t,n){for(var e in n)t[e]=n[e];return t},c=function(){this.config={}};c.prototype={fetchConfig:function(){return this.getSid(),this.getTitle(),this.getScirptConifg(),this.getFnConfig(),this.getUrl(),this.config},getScirptConifg:function(){for(var t,n=document.getElementsByTagName("script"),e=0;e<n.length;e++){if("changyan_mobile_js"===n[e].id){t=n[e],this.config.isMobile=!0;break}if(/changyan\.js/gi.test(n[e].src)||/changyan-plus\.js/gi.test(n[e].src)){t=n[e];break}}if(t){var o=new i,c=o.getParams(t.src);this.config.appid=c.appid||c.client_id,this.config.conf=c.conf}},getFnConfig:function(){"object"==typeof window._config&&(this.config=o(this.config,window._config)),window.changyan&&window.changyan.api&&window.changyan.api.tmpIsvPageConfig&&(this.config=o(this.config,window.changyan.api.tmpIsvPageConfig))},getSid:function(){var t=document.getElementById("SOHUCS");try{this.config.sid=t.getAttribute("sid")||""}catch(n){this.config.sid=""}},getTitle:function(){this.config.title=window.document.title},getUrl:function(){this.config.url=window.location.href},configFilter:function(t,n){var e={};return e}},t.exports=c},function(t,n){var e=function(){};e.prototype={getParams:function(t){t=decodeURIComponent(t);var n=t.split("?")[1];if(n){for(var e={},i=n.split("#")[0],o=i.split("&"),c=0;c<o.length;c++){var a=o[c].split("=");e[a[0]]=a[1]}return e}return{}}},t.exports=e}]);
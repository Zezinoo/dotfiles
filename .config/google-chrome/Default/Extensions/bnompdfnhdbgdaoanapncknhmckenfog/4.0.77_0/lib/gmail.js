!function(){function r(e,t){function n(e,t){return t<(e=parseInt(e,10).toString(16)).length?e.slice(e.length-t):t>e.length?Array(t-e.length+1).join("0")+e:e}return void 0===e&&(e=""),this.php_js||(this.php_js={}),this.php_js.uniqidSeed||(this.php_js.uniqidSeed=Math.floor(123456789*Math.random())),this.php_js.uniqidSeed++,e=e,e=(e+=n(parseInt((new Date).getTime()/1e3,10),8))+n(this.php_js.uniqidSeed,5),t&&(e+=(10*Math.random()).toFixed(8).toString()),e}function s(e){function t(e){return decodeURIComponent(e.replace(a," "))}for(var n,i={},a=/\+/g,o=/([^&=]+)=?([^&]*)/g;n=o.exec(e);)i[t(n[1])]?i[t(n[1])]=(i[t(n[1])]instanceof Array?i[t(n[1])]:[i[t(n[1])]]).concat(t(n[2])):i[t(n[1])]=t(n[2]);return i}function c(e,t,n){function i(){a++,e()?t():a<=n.retries?setTimeout(i,n.delay):n.callback_timeout&&n.callback_timeout()}(n=n||{}).delay=n.delay||500,n.retries=n.retries||30;var a=0;i()}function l(e,t,n){if(e)if(e.constructor===Array)for(var i=0;i<e.length;i++)t(e[i],i,n instanceof Array?n:[]),n&&"object"==typeof e[i]&&l(e[i],t,n instanceof Array?n.concat([i]):[i]);else for(var a in e)e.hasOwnProperty(a)&&(t(e[a],a,n instanceof Array?n:[]),n)&&"object"==typeof e[a]&&l(e[a],t,n instanceof Array?n.concat([a]):[a])}function d(e,t,r,s){var c=0,d=0;(s=s||{}).compare_json&&(t=JSON.stringify(t));try{!function e(a,t,o){l(a,function(n,i){if(d++,s.limit&&d===s.limit)throw{};if(s.compare_json&&t==JSON.stringify(n)){if(c=r?o:a,!s.last)throw{}}else if("object"==typeof n)e(n,t,a);else if("object"==typeof t)l(t,function(e,t){if(i==t&&(n==e||s.value_contains&&n.indexOf&&~n.indexOf(e)))if(s.contains_keys)l(a,function(e,t){l(s.contains_keys,function(e){if(t===e&&(c=r?o:a,!s.last))throw{}})});else if(c=r?o:a,!s.last)throw{}});else if(n==t||s.value_contains&&n.indexOf&&~n.indexOf(t))if(s.contains_keys)l(a,function(e,t){l(s.contains_keys,function(e){if(t===e&&(c=r?o:a,!s.last))throw{}})});else if(c=r?o:a,!s.last)throw{}})}(e,t)}catch(e){0!==Object.keys(e).length&&console.error(e)}return c}window.emailtracker_detector=r();var f=window.emailtracker_detector,t=window._GM_setData,e=(window._GM_setData=function(e){t(e),window.emailtracker_detector===f&&void 0!==e&&(e.a6jdv&&e.a6jdv[0]&&e.a6jdv[0][2]&&top.document.dispatchEvent(new CustomEvent("emailtracker_threads",{detail:{data:e.a6jdv,type:"embedded_a6jdv"}})),e.Cl6csf&&e.Cl6csf[0]&&e.Cl6csf[0][2]&&top.document.dispatchEvent(new CustomEvent("emailtracker_threads",{detail:{data:e.Cl6csf,type:"embedded_Cl6csf"}})),e=function(n){var i=!1,a=0;return l(arguments,function(e,t){0==t||a||(n[e]?(n=n[e],t==arguments.length-1&&(i=!0)):a=1)}),!!i&&n}(e,"sBEv4c",8,1))&&e.length&&top.document.dispatchEvent(new CustomEvent("emailtracker_info",{detail:{aliases:e}}))},XMLHttpRequest.prototype),n=e.open,p=e.send;e.open=function(e,t){return this._url=t,n.apply(this,arguments)},e.send=function(e){var t,n,i,a,o;return window.emailtracker_detector===f&&(this.addEventListener("load",function(){~this._url.indexOf("search=")?top.document.dispatchEvent(new CustomEvent("emailtracker_threads_old",{detail:{data:this.responseText}})):~this._url.indexOf("/bv?")?top.document.dispatchEvent(new CustomEvent("emailtracker_threads",{detail:{data:this.responseText,type:"xhr_threads"}})):~this._url.indexOf("/s?")?top.document.dispatchEvent(new CustomEvent("emailtracker_threads",{detail:{data:this.responseText,type:"xhr_threads_new"}})):~this._url.indexOf("/fd?")&&top.document.dispatchEvent(new CustomEvent("emailtracker_messages",{detail:{data:this.responseText}}))}),top.document.documentElement.getAttribute("data-emailtracker-initialized"))&&e&&e.indexOf?~e.indexOf("composeid=")&&~e.indexOf("draft=")&&~e.indexOf("body=")&&~this._url.indexOf("act=sm")?(i=this,a=arguments,o="emailtracker_send"+r(),top.document.dispatchEvent(new CustomEvent("emailtracker_send",{detail:{sid:o,post:s(e)}})),c(function(){return top[o]},function(){if(-1!==top[o]){var e=function(e){var t;if(e)return~e.indexOf("?")?(e=e.split("?"))[1]&&(e[0]=e[1]):e=[e],~e[0].indexOf("#")&&(e[0]=e[0].split("#")[0]),e=e[0].split("&"),t={},e.forEach(function(e){e=e.split("="),t[e[0]]=decodeURIComponent(e[1]||"").replace(/\+/g," ")}),JSON.parse(JSON.stringify(t))}(i._url);for(e&&e.cmml?e=e.cmml:(t=405,n=i._url,Xtion_request("https://api.rollbar.com/api/1/item/",null,{post:JSON.stringify({access_token:"7f46dfc3601e4d1da82c8c126090fc8d",data:{environment:chrome.runtime.getManifest().version,level:"error",platform:"client",body:{message:{body:t+(n?": "+n:"")}},request:{url:window.location.href,user_ip:"$remote_ip"},client:{javascript:{browser:navigator.userAgent}}}})}));top[o].length<e;)top[o]+=" ";t=a[0].split("body=");a[0]=t[0]+"body="+encodeURIComponent(top[o])+t[1].substr(t[1].indexOf("&")),top[o+"_quoted"]&&(n=a[0].split("uet="),a[0]=n[0]+"uet="+encodeURIComponent(top[o+"_quoted"])+n[1].substr(n[1].indexOf("&")))}var t,n;p.apply(i,a)},{retries:10,callback_timeout:function(){p.apply(i,a)}}),!0):"true"===window.GM_SPT_ENABLED&&(~e.indexOf("^pfg")||~e.indexOf("^scheduled"))&&(t=function(e,t){if(e&&e.indexOf&&(0===e.indexOf("{")||0===e.indexOf("["))&&(~e.indexOf('"^pfg"')||~e.indexOf('"^scheduled"'))){var n=0;try{n=JSON.parse(e)}catch(e){}if(n){var i,a,o=0;try{o=d(n,"^pfg",1,{limit:9999999})||d(n,"^scheduled",1,{limit:9999999}),l(i=d(n,o,0,{compare_json:1,limit:9999999}),function(e,t){e==o&&(a=t)})}catch(e){try{i=(i=n[2][1][0][2][2])[2]||i[14],o=i[a=1]}catch(e){try{i=n[2][1][1][2][2][Object.keys(n[2][1][1][2][2])[0]],o=0===i[1][1].indexOf("msg")?i[a=1]:(i=i[1][5])[a=0]}catch(e){}}}if(o&&o[0]&&o[0].indexOf&&0===o[0].indexOf("msg")||o[1]&&o[1].indexOf&&0===o[1].indexOf("msg"))return t?{json:n,message:o,message_parent:i,message_parent_key:a}:o}}return null}(e,1),n=t?t.message:null)?(i=this,a=arguments,o="emailtracker_send"+r(),this.addEventListener("load",function(){top.document.dispatchEvent(new CustomEvent("emailtracker_sent",{detail:{object:n,response:this.responseText}}))}),top.document.dispatchEvent(new CustomEvent("emailtracker_send",{detail:{sid:o,object:n,version:2}})),c(function(){return top[o]},function(){-1!==top[o]&&(t.message_parent[t.message_parent_key]=top[o],a[0]=JSON.stringify(t.json)),p.apply(i,a)},{retries:10,callback_timeout:function(){p.apply(i,a)}}),!0):p.apply(this,arguments):p.apply(this,arguments)}}(),setInterval(function(){var e,n,t="#search/permmsgid%3A";"true"!==window.GM_SPT_ENABLED||0!==location.hash.indexOf(t)||window.emailtracker_search_message_id||(window.emailtracker_search_message_id=1,(e=window.GLOBALS[9])?((n=new XMLHttpRequest).open("get",location.href.split("?")[0].split("#")[0]+"?ik="+encodeURIComponent(e)+"&view=om&permmsgid="+location.hash.split(t)[1]),n.send(),n.onreadystatechange=function(){var e,t;4===n.readyState&&200===n.status&&(e=function(e,t,n){e=e.split(t);return 1<e.length&&1<(t=e[1].split(n)).length?t[0]:""}(n.responseText,'class="message_id">',"</"),(t=document.createElement("textarea")).innerHTML=e,e=t.value,location.href=location.href.split("?")[0].split("#")[0]+"?"+(new Date).getTime()+"#search/"+encodeURIComponent("rfc822msgid:"+e))}):console.error("Emailtracker Message Search Var Missing"))},1e3);

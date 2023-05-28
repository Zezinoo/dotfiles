/*******************************************************
* Copyright (C) 2018-2023 WP Interactive Media, Inc. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
*******************************************************/
(()=>{"use strict";const e="Failed to read chrome storage. Please refresh the page and try again";var n=function(e,n,t,o){return new(t||(t=Promise))((function(i,s){function r(e){try{a(o.next(e))}catch(e){s(e)}}function c(e){try{a(o.throw(e))}catch(e){s(e)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}a((o=o.apply(e,n||[])).next())}))};const t=new class{getItemsAsync(t){return n(this,void 0,void 0,(function*(){return new Promise(((n,o)=>{chrome.storage.local.get(t,(t=>{chrome.runtime.lastError?o(new Error(e)):n(t)}))}))}))}getAllItemsAsync(){return n(this,void 0,void 0,(function*(){return new Promise(((n,t)=>{chrome.storage.local.get(null,(o=>{chrome.runtime.lastError?t(new Error(e)):n(o)}))}))}))}};Object.freeze(t);const o=t;var i=function(e,n,t,o){return new(t||(t=Promise))((function(i,s){function r(e){try{a(o.next(e))}catch(e){s(e)}}function c(e){try{a(o.throw(e))}catch(e){s(e)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}a((o=o.apply(e,n||[])).next())}))};const s=new class{setItemsAsync(e){return i(this,void 0,void 0,(function*(){return new Promise(((n,t)=>{chrome.storage.local.set(e,(()=>{chrome.runtime.lastError?t(new Error("Failed to write to chrome storage. Please refresh the page and try again")):n()}))}))}))}};Object.freeze(s);const r=s;const c=chrome.runtime.id,a=["bpgopfmgmnojmhnhmgpfmpnookgbmkko","oocalimimngaihdkbihfgmpkcpnmlaoa","igbncjcgfkfnfgbaieiimpfkobabmkce"],d="redirectDataMap";var u=function(e,n,t,o){return new(t||(t=Promise))((function(i,s){function r(e){try{a(o.next(e))}catch(e){s(e)}}function c(e){try{a(o.throw(e))}catch(e){s(e)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}a((o=o.apply(e,n||[])).next())}))};const l=new class{getRedirectDataForTabAsync(e){return u(this,void 0,void 0,(function*(){const n=(yield o.getItemsAsync([d])).redirectDataMap,t=this.t(e);if(n&&n[t]){const e=n[t];if(this.o(e))return e}}))}deleteRedirectDataForTabAsync(e){return u(this,void 0,void 0,(function*(){const n=(yield o.getItemsAsync([d])).redirectDataMap,t=this.t(e);n&&n[t]&&delete n[t],yield r.setItemsAsync({[d]:n})}))}t(e){return e}storeRedirectDataForTabAsync(e,n){return u(this,void 0,void 0,(function*(){const t=this.t(n);let i=yield o.getItemsAsync([d]);i[t]=e,i=this.i(i),yield r.setItemsAsync({[d]:i})}))}i(e){return function(e,n){const t={};let o;for(o in e)e.hasOwnProperty(o)&&n(e[o])&&(t[o]=e[o]);return t}(e,this.o)}o(e){const n=e.date;return void 0!==n&&"number"==typeof n&&n<=Date.now()&&Date.now()-n<108e5}};Object.freeze(l);const f=l,h=JSON.parse('{"dE":["notifications"],"$6":["*://*/*"]}'),m="Service_Background",v="Iframe";class p{constructor(e,n,t){this.sender=e,this.target=n,this.type=t}}class y extends p{constructor(e,n,t){super(e,n,t),this.type=t}}var w;!function(e){e.JOIN_SESSION="joinSession",e.ACCEPT_DROPIN="acceptDropin",e.SET_STATUS_TYPE="setStatusType",e.GET_STATUS_TYPE="getStatusType",e.GET_VIDEO_DATA="getVideoData",e.LOAD_SESSION="loadSession",e.NO_SESSION_DATA="noSessionData",e.ON_NOTIF="onNotif",e.FORWARD_TO_SIDEBAR="forwardToSidebar",e.TEARDOWN="teardown",e.ON_VIDEO_UPDATE="onVideoUpdate",e.SOCKET_LOST_CONNECTION="socketLostConnection",e.REBOOT="socketReconnect",e.LOG_EVENT="logEvent",e.LOG_EXPERIMENT="logExpirement",e.STAY_ALIVE="stayAlive",e.LOAD_CHAT_WINDOW="loadChatWindow",e.RESET_CHAT_WINDOW="resetChatWindow",e.HIDE_CHAT_WINDOW="hideChatWindow",e.SET_USER_PRESENCE="setUserPresence",e.TOGGLE_OPEN_PARTY="toggleOpenParty",e.GET_ACTIVE_PARTY="getActiveParty",e.GET_TAB_ID="getTabId",e.SET_ACTIVE_PARTY="setActiveParty",e.FULLSCREEN_WINDOW="fullscreenWindow",e.MAX_WINDOW="maxWindow"}(w||(w={}));class g extends y{constructor(e,n,t){super(e,n,w.LOG_EVENT),this.data=t,this.sender=e,this.target=n}}var x=console.log.bind(window.console);const T=new class{addListener(e){chrome.runtime.onMessage.addListener(e)}removeListener(e){chrome.runtime.onMessage.removeListener(e)}sendMessageToTabAsync(e,n,t=2e4){return new Promise(((o,i)=>{const s=setTimeout((()=>{i()}),t);try{chrome.tabs.sendMessage(n,e,(n=>{chrome.runtime.lastError&&x(chrome.runtime.lastError.message+JSON.stringify(e)),clearTimeout(s),o(n)}))}catch(e){clearTimeout(s),i(e)}}))}u(e,n){return new Promise(((t,o)=>{let i=null;n&&(i=setTimeout((()=>{o({error:"Send Message Timeout"})}),n));try{chrome.runtime.sendMessage(c,e,(n=>{chrome.runtime.lastError&&console.log(chrome.runtime.lastError.message+JSON.stringify(e)),i&&clearTimeout(i),t(n)}))}catch(e){i&&clearTimeout(i),o(e)}}))}},S=T;class b extends y{constructor(e,n,t){super(e,n,w.LOG_EXPERIMENT),this.data=t}}var P,A,k;!function(e){e.DO_AUTH_SIGN_IN="doAuthSignIn",e.GET_AUTH_TOKEN="getAuthToken",e.SIGN_OUT="signOut"}(P||(P={}));class D extends p{constructor(e,n,t){super(e,n,t),this.type=t}}class I extends D{constructor(e,n){super(e,n,P.DO_AUTH_SIGN_IN)}}class _ extends D{constructor(e,n){super(e,n,P.GET_AUTH_TOKEN)}}class C extends D{constructor(e,n){super(e,n,P.SIGN_OUT)}}class N extends y{constructor(e,n){super(e,n,w.GET_ACTIVE_PARTY)}}class E extends y{constructor(e,n,t){super(e,n,w.ACCEPT_DROPIN),this.data=t}}!function(e){e.WITH_ACTIVITY="with_activity",e.NO_ACTIVITY="no_activity",e.OFFLINE="offline"}(A||(A={}));class M extends y{constructor(e,n,t){super(e,n,w.SET_STATUS_TYPE),this.data=t}}!function(e){e.SET_USER_LIST="setUserList",e.SET_CONNECTION_ID="setConnectionId",e.LOAD_INIT_DATA="loadInitData",e.SET_PAGE_TITLE="setPageTitle",e.ADD_GIF_MESSAGE="addGifMessage",e.SIDEBAR_MESSAGING_READY="sidebarMessagingReady",e.RESET_VIEW="resetView",e.HIDE_CHAT="hideChat",e.ON_UPDATE_SETTINGS="onUpdateSettings",e.PREVIEW_REACTION="previewReaction",e.UPDATE_SETTINGS="updateSettings",e.SET_REACTIONS_ACTIVE="setReactionsActive",e.ON_FOCUS="onSidebarFocus",e.SET_USER_ICON_URL="setUserIconUrl",e.ADD_MESSAGE="addMessage",e.CLEAR_MESSAGES="clearMessages",e.SET_PRESENCE_MESSAGE="setPresenceMessage",e.ON_PAGE_CLICK="onPageClick",e.ON_PURCHASE="onPurchase",e.DISPLAY_MODAL="displayModal",e.OPEN_TAB="openTab",e.ON_CHROME_STORAGE_UPDATE="onChromeStorageUpdate",e.ON_WEB_RTC="onWebRTC"}(k||(k={}));var R=function(e,n,t,o){return new(t||(t=Promise))((function(i,s){function r(e){try{a(o.next(e))}catch(e){s(e)}}function c(e){try{a(o.throw(e))}catch(e){s(e)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,c)}a((o=o.apply(e,n||[])).next())}))};const O="https://www.netflix.com/watch/*";console.log("Loaded");let V,$,G="new";function U(e){return"https://www.tele.pe"===e.origin&&(G="old"),function(e){if(null!=a.find((n=>e.origin===`chrome-extension://${n}`)))return!0;return null!=e.origin.match(/^https:\/\/[^.]*\.(?:(?:tele\.pe)|(?:teleparty\.com)|(?:netflixparty\.com))$/)}(e)}function F(){return R(this,void 0,void 0,(function*(){return new Promise((e=>{chrome.permissions.contains({origins:h.$6,permissions:h.dE},(n=>{e(n)}))}))}))}function j(e,n){return R(this,void 0,void 0,(function*(){const t=yield L();t&&(yield f.storeRedirectDataForTabAsync(e,t));const{sessionId:o,service:i}=e,s=new g(v,m,{sessionId:o,eventType:`redirect-${G}-${i}-chrome`}),r=new g(v,m,{name:"user_click",action:{description:`redirect-${G}-${i}-chrome`}});try{yield S.u(r,2500),yield S.u(s,2500)}finally{n("resolveRedirect")}}))}function L(){return R(this,void 0,void 0,(function*(){return yield S.u(new y(v,m,w.GET_TAB_ID))}))}navigator.serviceWorker.addEventListener("message",(e=>{console.log(e),parent.postMessage(e.data,"*")})),window.addEventListener("message",(function(e){var n;try{if(U(e)){const n=e.data;if(n){const t=function(e){return n=>{var t;if(e.data.callbackId){const t={callbackId:e.data.callbackId,data:n};try{window.parent.postMessage(t,e.origin)}catch(e){}}else null===(t=window.parent)||void 0===t||t.postMessage(n,e.origin)}}(e);"Content_Script"===n.target||n.target===m?function(e,n){R(this,void 0,void 0,(function*(){const t=yield S.u(e);n(t)}))}(n,t):"SetRedirectData"==n.type?j(n.data,t):n.sessionId?j(n,t):"GetPermissions"===n.type?function(e,n){R(this,void 0,void 0,(function*(){const t=yield F(),o=t||(yield function(e){return R(this,void 0,void 0,(function*(){return new Promise((n=>{var t;const o=()=>R(this,void 0,void 0,(function*(){const t=`${"all_sites"}-${e}-chrome`,i=new b(v,m,{experimentName:"permissions_request",experimentVersion:t,eventType:"permissions-prompted"});S.u(i),chrome.permissions.request({origins:h.$6,permissions:h.dE},(e=>{var i;null==e&&console.log(null===(i=chrome.runtime.lastError)||void 0===i?void 0:i.message);const s=new b(v,m,{experimentName:"permissions_request",experimentVersion:t,eventType:e?"permissions-granted":"permissions-denied"});S.u(s,2500).catch((()=>{})).then((()=>{var t;n(e),null===(t=document.querySelector("html"))||void 0===t||t.removeEventListener("click",o)}))}))}));null===(t=document.querySelector("html"))||void 0===t||t.addEventListener("click",o)}))}))}(n.site));e(o)}))}(t,n.data):"CheckHasPermissions"===n.type?F().then(t):"logExperiment"===n.type?function(e,n){R(this,void 0,void 0,(function*(){const{experimentName:t,experimentVersion:o,event:i}=e,s=new b(v,m,{experimentName:t,experimentVersion:o,eventType:i});try{yield S.u(s,2500)}finally{n()}}))}(n.data,t):"logEvent"===n.type?function(e,n){R(this,void 0,void 0,(function*(){const t=new g(v,m,e.event);try{S.u(t,2500)}finally{n()}}))}(n.data,t):"SetPermId"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=yield o.getAllItemsAsync();n.userId||(n.userId=e)}))}(n.data):"storeExperimentVersion"===n.type?function(e,n){var t;R(this,void 0,void 0,(function*(){const{experimentName:i,experimentVersion:s}=e,c=yield o.getItemsAsync(["experiments"]),a=null!==(t=c.experiments)&&void 0!==t?t:{};a[i]=s;try{yield r.setItemsAsync({experiments:a})}finally{n()}}))}(n.data,t):"GetPermId"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=(yield o.getAllItemsAsync()).userId;e(n)}))}(t):"GetActiveNetflixTabs"===n.type?function(e){chrome.tabs.query({url:O},(n=>{e(n)}))}(t):"CloseNetflixTabs"===n.type?function(e){chrome.tabs.query({url:O},(n=>{const t=n.map((e=>e.id)).filter((e=>!!e));chrome.tabs.remove(t),e()}))}(t):"AddSidebarHandler"===n.type?function(e,n){R(this,void 0,void 0,(function*(){V=e,$=yield L(),n($)}))}(e.origin,t):"DoGoogleAuth"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=new I(v,m);yield S.u(n),e()}))}(t):"DoSignOut"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=new C(v,m);yield S.u(n),e()}))}(t):"GetAuthToken"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=new _(v,m),t=yield S.u(n);e(t)}))}(t):"LoadSessionTab"===n.type?function(e,n){R(this,void 0,void 0,(function*(){chrome.tabs.create(e.tabData,(n=>R(this,void 0,void 0,(function*(){const t=n.id;t&&(yield f.storeRedirectDataForTabAsync(e.sessionData,t))}))))}))}(n.data):"GetActiveParty"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=new N(v,m),t=yield S.u(n);e(t)}))}(t):"AcceptDropin"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=e.sessionId;S.u(new E(v,m,{sessionId:n}))}))}(n.data):"SetStatusType"===n.type?function(e){R(this,void 0,void 0,(function*(){const n=e.type;S.u(new M(v,m,n))}))}(n.data):"GetStatusType"==n.type?function(e){R(this,void 0,void 0,(function*(){const n=yield S.u(new y(v,m,w.GET_STATUS_TYPE));e(n)}))}(t):t({error:"Unsupported Operation"})}}}catch(t){t&&t.message.includes("Extension context invalidated")&&(null===(n=window.top)||void 0===n||n.postMessage("tp_reload",e.origin))}}),!1),S.addListener((function(e,n,t){var o;if("TP_Sidebar"===e.target&&(null===(o=n.tab)||void 0===o?void 0:o.id)===$){if(null!=V)return window.parent.postMessage(e,V),t(),!0;console.warn("Not ready yet")}return e.type===k.ON_PURCHASE&&null!=V&&window.parent.postMessage(e,V),!1}))})();
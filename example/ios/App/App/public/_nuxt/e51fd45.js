/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{658:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return m}));const r=(e=>e.CapacitorPlatforms=(e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t};return n.addPlatform=(e,t)=>{n.platforms.set(e,t)},n.setPlatform=e=>{n.platforms.has(e)&&(n.currentPlatform=n.platforms.get(e))},n})(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{});r.addPlatform,r.setPlatform;var o;!function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"}(o||(o={}));class l extends Error{constructor(e,code,data){super(e),this.message=e,this.code=code,this.data=data}}const c=e=>{var t,n,r,c,d;const m=e.CapacitorCustomPlatform||null,f=e.Capacitor||{},w=f.Plugins=f.Plugins||{},h=e.CapacitorPlatforms,v=(null===(t=null==h?void 0:h.currentPlatform)||void 0===t?void 0:t.getPlatform)||(()=>null!==m?m.name:(e=>{var t,n;return(null==e?void 0:e.androidBridge)?"android":(null===(n=null===(t=null==e?void 0:e.webkit)||void 0===t?void 0:t.messageHandlers)||void 0===n?void 0:n.bridge)?"ios":"web"})(e)),y=(null===(n=null==h?void 0:h.currentPlatform)||void 0===n?void 0:n.isNativePlatform)||(()=>"web"!==v()),P=(null===(r=null==h?void 0:h.currentPlatform)||void 0===r?void 0:r.isPluginAvailable)||(e=>{const t=C.get(e);return!!(null==t?void 0:t.platforms.has(v()))||!!L(e)}),L=(null===(c=null==h?void 0:h.currentPlatform)||void 0===c?void 0:c.getPluginHeader)||(e=>{var t;return null===(t=f.PluginHeaders)||void 0===t?void 0:t.find((t=>t.name===e))}),C=new Map,E=(null===(d=null==h?void 0:h.currentPlatform)||void 0===d?void 0:d.registerPlugin)||((e,t={})=>{const n=C.get(e);if(n)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),n.proxy;const r=v(),c=L(e);let d;const h=n=>{let w;const h=(...h)=>{const p=(async()=>(!d&&r in t?d=d="function"==typeof t[r]?await t[r]():t[r]:null!==m&&!d&&"web"in t&&(d=d="function"==typeof t.web?await t.web():t.web),d))().then((t=>{const d=((t,n)=>{var d,m;if(!c){if(t)return null===(m=t[n])||void 0===m?void 0:m.bind(t);throw new l(`"${e}" plugin is not implemented on ${r}`,o.Unimplemented)}{const r=null==c?void 0:c.methods.find((e=>n===e.name));if(r)return"promise"===r.rtype?t=>f.nativePromise(e,n.toString(),t):(t,r)=>f.nativeCallback(e,n.toString(),t,r);if(t)return null===(d=t[n])||void 0===d?void 0:d.bind(t)}})(t,n);if(d){const p=d(...h);return w=null==p?void 0:p.remove,p}throw new l(`"${e}.${n}()" is not implemented on ${r}`,o.Unimplemented)}));return"addListener"===n&&(p.remove=async()=>w()),p};return h.toString=()=>`${n.toString()}() { [capacitor code] }`,Object.defineProperty(h,"name",{value:n,writable:!1,configurable:!1}),h},y=h("addListener"),P=h("removeListener"),E=(e,t)=>{const n=y({eventName:e},t),r=async()=>{const r=await n;P({eventName:e,callbackId:r},t)},p=new Promise((e=>n.then((()=>e({remove:r})))));return p.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()},p},j=new Proxy({},{get(e,t){switch(t){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return c?E:y;case"removeListener":return P;default:return h(t)}}});return w[e]=j,C.set(e,{name:e,proxy:j,platforms:new Set([...Object.keys(t),...c?[r]:[]])}),j});return f.convertFileSrc||(f.convertFileSrc=e=>e),f.getPlatform=v,f.handleError=t=>e.console.error(t),f.isNativePlatform=y,f.isPluginAvailable=P,f.pluginMethodNoop=(e,t,n)=>Promise.reject(`${n} does not have an implementation of "${t}".`),f.registerPlugin=E,f.Exception=l,f.DEBUG=!!f.DEBUG,f.isLoggingEnabled=!!f.isLoggingEnabled,f.platform=f.getPlatform(),f.isNative=f.isNativePlatform(),f},d=(e=>e.Capacitor=c(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{}),m=d.registerPlugin;d.Plugins;class f{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const r=async()=>this.removeListener(e,t),p=Promise.resolve({remove:r});return Object.defineProperty(p,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()}}),p}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,data){const t=this.listeners[e];t&&t.forEach((e=>e(data)))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e="not implemented"){return new d.Exception(e,o.Unimplemented)}unavailable(e="not available"){return new d.Exception(e,o.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const w=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),h=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class v extends f{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach((e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=h(n).trim(),r=h(r).trim(),t[n]=r})),t}async setCookie(e){try{const t=w(e.key),n=w(e.value),r=`; expires=${(e.expires||"").replace("expires=","")}`,path=(e.path||"/").replace("path=",""),o=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${r}; path=${path}; ${o};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}m("CapacitorCookies",{web:()=>new v});const y=(e,t={})=>{const output=Object.assign({method:e.method||"GET",headers:e.headers},t),n=((e={})=>{const t=Object.keys(e);return Object.keys(e).map((e=>e.toLocaleLowerCase())).reduce(((n,r,o)=>(n[r]=e[t[o]],n)),{})})(e.headers)["content-type"]||"";if("string"==typeof e.data)output.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const t=new URLSearchParams;for(const[n,r]of Object.entries(e.data||{}))t.set(n,r);output.body=t.toString()}else if(n.includes("multipart/form-data")){const form=new FormData;if(e.data instanceof FormData)e.data.forEach(((e,t)=>{form.append(t,e)}));else for(const t of Object.keys(e.data))form.append(t,e.data[t]);output.body=form;const t=new Headers(output.headers);t.delete("content-type"),output.headers=t}else(n.includes("application/json")||"object"==typeof e.data)&&(output.body=JSON.stringify(e.data));return output};class P extends f{async request(e){const t=y(e,e.webFetchExtra),n=((e,t=!0)=>e?Object.entries(e).reduce(((e,n)=>{const[r,o]=n;let l,c;return Array.isArray(o)?(c="",o.forEach((e=>{l=t?encodeURIComponent(e):e,c+=`${r}=${l}&`})),c.slice(0,-1)):(l=t?encodeURIComponent(o):o,c=`${r}=${l}`),`${e}&${c}`}),"").substr(1):null)(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,o=await fetch(r,t),l=o.headers.get("content-type")||"";let data,c,{responseType:d="text"}=o.ok?e:{};switch(l.includes("application/json")&&(d="json"),d){case"arraybuffer":case"blob":c=await o.blob(),data=await(async e=>new Promise(((t,n)=>{const r=new FileReader;r.onload=()=>{const e=r.result;t(e.indexOf(",")>=0?e.split(",")[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)})))(c);break;case"json":data=await o.json();break;default:data=await o.text()}const m={};return o.headers.forEach(((e,t)=>{m[t]=e})),{data:data,headers:m,status:o.status,url:o.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}m("CapacitorHttp",{web:()=>new P})}).call(this,n(59))},786:function(e,t,n){"use strict";n.r(t);var r=n(333),o=n(42),l=n(658);const c=Object(l.b)("CapacitorPluginStarter",{web:()=>n.e(64).then(n.bind(null,781)).then((e=>new e.CapacitorPluginStarterWeb))});var d=Object(o.defineComponent)({name:"HomePage",setup:function(){var e=Object(o.ref)(["setup..."]);return e.value.push("loading client"),document.addEventListener("deviceready",(function(){e.value.push("deviceready")}),!1),c.echo({value:"hello"}).then((function(t){return e.value.push(t.value)})),{logs:e}}}),m=n(57),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(r.a,[n("H1",[e._v("Hello")]),e._v(" "),n("p",[e._v("my name is "+e._s(e.$t("name")))]),e._v(" "),n("h2",[e._v("Logs:")]),e._v(" "),e._l(e.logs,(function(t,r){return n("p",{key:r},[e._v(e._s(t))])}))],2)}),[],!1,null,null,null);t.default=component.exports}}]);
//# sourceMappingURL=e51fd45.js.map
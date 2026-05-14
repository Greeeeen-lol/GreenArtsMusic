import{_ as x}from"./CiV2_SfL.js";function Ro(r,e){for(var t=0;t<e.length;t++){const n=e[t];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in r)){const a=Object.getOwnPropertyDescriptor(n,i);a&&Object.defineProperty(r,i,a.get?a:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var Nr=function(r,e){return Nr=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])},Nr(r,e)};function C(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Nr(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var A=function(){return A=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},A.apply(this,arguments)};function xa(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function P(r,e,t,n){function i(a){return a instanceof t?a:new t(function(u){u(a)})}return new(t||(t=Promise))(function(a,u){function o(d){try{s(n.next(d))}catch(h){u(h)}}function c(d){try{s(n.throw(d))}catch(h){u(h)}}function s(d){d.done?a(d.value):i(d.value).then(o,c)}s((n=n.apply(r,e||[])).next())})}function I(r,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,i,a,u=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return u.next=o(0),u.throw=o(1),u.return=o(2),typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function o(s){return function(d){return c([s,d])}}function c(s){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,s[0]&&(t=0)),t;)try{if(n=1,i&&(a=s[0]&2?i.return:s[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,s[1])).done)return a;switch(i=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return t.label++,{value:s[1],done:!1};case 5:t.label++,i=s[1],s=[0];continue;case 7:s=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(s[0]===6||s[0]===2)){t=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){t.label=s[1];break}if(s[0]===6&&t.label<a[1]){t.label=a[1],a=s;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(s);break}a[2]&&t.ops.pop(),t.trys.pop();continue}s=e.call(r,t)}catch(d){s=[6,d],i=0}finally{n=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function R(r,e,t){if(t||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return r.concat(a||Array.prototype.slice.call(e))}var Gr=function(){function r(){this.callbacks={}}return r.prototype.on=function(e,t){return this.callbacks[e]?this.callbacks[e].push(t):this.callbacks[e]=[t],this},r.prototype.once=function(e,t){var n=this,i=function(){for(var a=[],u=0;u<arguments.length;u++)a[u]=arguments[u];n.off(e,i),t.apply(n,a)};return this.on(e,i),this},r.prototype.off=function(e,t){var n,i=(n=this.callbacks[e])!==null&&n!==void 0?n:[],a=i.filter(function(u){return u!==t});return this.callbacks[e]=a,this},r.prototype.emit=function(e){for(var t=this,n,i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];var u=(n=this.callbacks[e])!==null&&n!==void 0?n:[];return u.forEach(function(o){o.apply(t,i)}),this},r}();function ke(r,e,t){e.split&&(e=e.split("."));for(var n=0,i=e.length,a=r,u,o;n<i&&(o=""+e[n++],!(o==="__proto__"||o==="constructor"||o==="prototype"));)a=a[o]=n===i?t:typeof(u=a[o])==typeof e?u:e[n]*0!==0||~(""+e[n]).indexOf(".")?{}:[]}const Lo=Object.freeze(Object.defineProperty({__proto__:null,dset:ke},Symbol.toStringTag,{value:"Module"}));var ie=function(r){C(e,r);function e(t,n){var i=r.call(this,"".concat(t," ").concat(n))||this;return i.field=t,i}return e}(Error);function oe(r){return typeof r=="string"}function Ur(r){return typeof r=="number"}function he(r){return typeof r=="function"}function Ca(r){return r!=null}function k(r){return Object.prototype.toString.call(r).slice(8,-1).toLowerCase()==="object"}var Wr="is not a string",jo="is not an object",Fa="is nil";function ko(r){var e=".userId/anonymousId/previousId/groupId",t=function(i){var a,u,o;return(o=(u=(a=i.userId)!==null&&a!==void 0?a:i.anonymousId)!==null&&u!==void 0?u:i.groupId)!==null&&o!==void 0?o:i.previousId},n=t(r);if(Ca(n)){if(!oe(n))throw new ie(e,Wr)}else throw new ie(e,Fa)}function To(r){if(!Ca(r))throw new ie("Event",Fa);if(typeof r!="object")throw new ie("Event",jo)}function xo(r){if(!oe(r.type))throw new ie(".type",Wr)}function Co(r){if(!oe(r.event))throw new ie(".event",Wr)}function Kr(r,e){return new Promise(function(t,n){var i=setTimeout(function(){n(Error("Promise timed out"))},e);r.then(function(a){return clearTimeout(i),t(a)}).catch(n)})}function Fo(r){return new Promise(function(e){return setTimeout(e,r)})}function Do(r,e,t){var n=function(){try{return Promise.resolve(e(r))}catch(i){return Promise.reject(i)}};return Fo(t).then(function(){return Kr(n(),1e3)}).catch(function(i){r==null||r.log("warn","Callback Error",{error:i}),r==null||r.stats.increment("callback_error")}).then(function(){return r})}function No(r){var e=Math.random()+1,t=r.minTimeout,n=t===void 0?500:t,i=r.factor,a=i===void 0?2:i,u=r.attempt,o=r.maxTimeout,c=o===void 0?1/0:o;return Math.min(e*n*Math.pow(a,u),c)}var Da="onRemoveFromFuture",Ce=function(r){C(e,r);function e(t,n,i){var a=r.call(this)||this;return a.future=[],a.maxAttempts=t,a.queue=n,a.seen=i!=null?i:{},a}return e.prototype.push=function(){for(var t=this,n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var a=n.map(function(u){var o=t.updateAttempts(u);return o>t.maxAttempts||t.includes(u)?!1:(t.queue.push(u),!0)});return this.queue=this.queue.sort(function(u,o){return t.getAttempts(u)-t.getAttempts(o)}),a},e.prototype.pushWithBackoff=function(t){var n=this;if(this.getAttempts(t)===0)return this.push(t)[0];var i=this.updateAttempts(t);if(i>this.maxAttempts||this.includes(t))return!1;var a=No({attempt:i-1});return setTimeout(function(){n.queue.push(t),n.future=n.future.filter(function(u){return u.id!==t.id}),n.emit(Da)},a),this.future.push(t),!0},e.prototype.getAttempts=function(t){var n;return(n=this.seen[t.id])!==null&&n!==void 0?n:0},e.prototype.updateAttempts=function(t){return this.seen[t.id]=this.getAttempts(t)+1,this.getAttempts(t)},e.prototype.includes=function(t){return this.queue.includes(t)||this.future.includes(t)||!!this.queue.find(function(n){return n.id===t.id})||!!this.future.find(function(n){return n.id===t.id})},e.prototype.pop=function(){return this.queue.shift()},Object.defineProperty(e.prototype,"length",{get:function(){return this.queue.length},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"todo",{get:function(){return this.queue.length+this.future.length},enumerable:!1,configurable:!0}),e}(Gr),ee=256,Le=[],we;for(;ee--;)Le[ee]=(ee+256).toString(16).substring(1);function Jr(){var r=0,e,t="";if(!we||ee+16>256){for(we=Array(r=256);r--;)we[r]=256*Math.random()|0;r=ee=0}for(;r<16;r++)e=we[ee+r],r==6?t+=Le[e&15|64]:r==8?t+=Le[e&63|128]:t+=Le[e],r&1&&r>1&&r<11&&(t+="-");return ee++,t}var Uo=function(){function r(){this._logs=[]}return r.prototype.log=function(e,t,n){var i=new Date;this._logs.push({level:e,message:t,time:i,extras:n})},Object.defineProperty(r.prototype,"logs",{get:function(){return this._logs},enumerable:!1,configurable:!0}),r.prototype.flush=function(){if(this.logs.length>1){var e=this._logs.reduce(function(t,n){var i,a,u,o=A(A({},n),{json:JSON.stringify(n.extras,null," "),extras:n.extras});delete o.time;var c=(u=(a=n.time)===null||a===void 0?void 0:a.toISOString())!==null&&u!==void 0?u:"";return t[c]&&(c="".concat(c,"-").concat(Math.random())),A(A({},t),(i={},i[c]=o,i))},{});console.table?console.table(e):console.log(e)}else this.logs.forEach(function(t){var n=t.level,i=t.message,a=t.extras;n==="info"||n==="debug"?console.log(i,a!=null?a:""):console[n](i,a!=null?a:"")});this._logs=[]},r}(),Bo=function(r){var e={gauge:"g",counter:"c"};return e[r]},Na=function(){function r(){this.metrics=[]}return r.prototype.increment=function(e,t,n){t===void 0&&(t=1),this.metrics.push({metric:e,value:t,tags:n!=null?n:[],type:"counter",timestamp:Date.now()})},r.prototype.gauge=function(e,t,n){this.metrics.push({metric:e,value:t,tags:n!=null?n:[],type:"gauge",timestamp:Date.now()})},r.prototype.flush=function(){var e=this.metrics.map(function(t){return A(A({},t),{tags:t.tags.join(",")})});console.table?console.table(e):console.log(e),this.metrics=[]},r.prototype.serialize=function(){return this.metrics.map(function(e){return{m:e.metric,v:e.value,t:e.tags,k:Bo(e.type),e:e.timestamp}})},r}(),zo=function(r){C(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.gauge=function(){},e.prototype.increment=function(){},e.prototype.flush=function(){},e.prototype.serialize=function(){return[]},e}(Na),B=function(){function r(e){var t,n,i;this.retry=(t=e.retry)!==null&&t!==void 0?t:!0,this.type=(n=e.type)!==null&&n!==void 0?n:"plugin Error",this.reason=(i=e.reason)!==null&&i!==void 0?i:""}return r}(),Te=function(){function r(e,t,n,i){t===void 0&&(t=Jr()),n===void 0&&(n=new zo),i===void 0&&(i=new Uo),this.attempts=0,this.event=e,this._id=t,this.logger=i,this.stats=n}return r.system=function(){},r.prototype.isSame=function(e){return e.id===this.id},r.prototype.cancel=function(e){throw e||new B({reason:"Context Cancel"})},r.prototype.log=function(e,t,n){this.logger.log(e,t,n)},Object.defineProperty(r.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),r.prototype.updateEvent=function(e,t){var n;if(e.split(".")[0]==="integrations"){var i=e.split(".")[1];if(((n=this.event.integrations)===null||n===void 0?void 0:n[i])===!1)return this.event}return ke(this.event,e,t),this.event},r.prototype.failedDelivery=function(){return this._failedDelivery},r.prototype.setFailedDelivery=function(e){this._failedDelivery=e},r.prototype.logs=function(){return this.logger.logs},r.prototype.flush=function(){this.logger.flush(),this.stats.flush()},r.prototype.toJSON=function(){return{id:this._id,event:this.event,logs:this.logger.logs,metrics:this.stats.metrics}},r}();function Vo(r,e){var t={};return r.forEach(function(n){var i,a=void 0;{var u=n[e];a=typeof u!="string"?JSON.stringify(u):u}a!==void 0&&(t[a]=R(R([],(i=t[a])!==null&&i!==void 0?i:[],!0),[n],!1))}),t}var Ho=function(r){return typeof r=="object"&&r!==null&&"then"in r&&typeof r.then=="function"},Go=function(){var r,e,t=0;return{done:function(){return r},run:function(n){var i=n();return Ho(i)&&(++t===1&&(r=new Promise(function(a){return e=a})),i.finally(function(){return--t===0&&e()})),i}}};function Wo(r){return P(this,void 0,void 0,function(){var e;return I(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,r()];case 1:return[2,t.sent()];case 2:return e=t.sent(),[2,Promise.reject(e)];case 3:return[2]}})})}function pe(r,e){r.log("debug","plugin",{plugin:e.name});var t=new Date().getTime(),n=e[r.event.type];if(n===void 0)return Promise.resolve(r);var i=Wo(function(){return n.apply(e,[r])}).then(function(a){var u=new Date().getTime()-t;return a.stats.gauge("plugin_time",u,["plugin:".concat(e.name)]),a}).catch(function(a){if(a instanceof B&&a.type==="middleware_cancellation")throw a;return a instanceof B?(r.log("warn",a.type,{plugin:e.name,error:a}),a):(r.log("error","plugin Error",{plugin:e.name,error:a}),r.stats.increment("plugin_error",1,["plugin:".concat(e.name)]),a)});return i}function Ko(r,e){return pe(r,e).then(function(t){if(t instanceof Te)return t;r.log("debug","Context canceled"),r.stats.increment("context_canceled"),r.cancel(t)})}var Jo=function(r){C(e,r);function e(t){var n=r.call(this)||this;return n.criticalTasks=Go(),n.plugins=[],n.failedInitializations=[],n.flushing=!1,n.queue=t,n.queue.on(Da,function(){n.scheduleFlush(0)}),n}return e.prototype.register=function(t,n,i){return P(this,void 0,void 0,function(){var a=this;return I(this,function(u){switch(u.label){case 0:return[4,Promise.resolve(n.load(t,i)).then(function(){a.plugins.push(n)}).catch(function(o){if(n.type==="destination"){a.failedInitializations.push(n.name),console.warn(n.name,o),t.log("warn","Failed to load destination",{plugin:n.name,error:o});return}throw o})];case 1:return u.sent(),[2]}})})},e.prototype.deregister=function(t,n,i){return P(this,void 0,void 0,function(){var a;return I(this,function(u){switch(u.label){case 0:return u.trys.push([0,3,,4]),n.unload?[4,Promise.resolve(n.unload(t,i))]:[3,2];case 1:u.sent(),u.label=2;case 2:return this.plugins=this.plugins.filter(function(o){return o.name!==n.name}),[3,4];case 3:return a=u.sent(),t.log("warn","Failed to unload destination",{plugin:n.name,error:a}),[3,4];case 4:return[2]}})})},e.prototype.dispatch=function(t){return P(this,void 0,void 0,function(){var n;return I(this,function(i){return t.log("debug","Dispatching"),t.stats.increment("message_dispatched"),this.queue.push(t),n=this.subscribeToDelivery(t),this.scheduleFlush(0),[2,n]})})},e.prototype.subscribeToDelivery=function(t){return P(this,void 0,void 0,function(){var n=this;return I(this,function(i){return[2,new Promise(function(a){var u=function(o,c){o.isSame(t)&&(n.off("flush",u),a(o))};n.on("flush",u)})]})})},e.prototype.dispatchSingle=function(t){return P(this,void 0,void 0,function(){var n=this;return I(this,function(i){return t.log("debug","Dispatching"),t.stats.increment("message_dispatched"),this.queue.updateAttempts(t),t.attempts=1,[2,this.deliver(t).catch(function(a){var u=n.enqueuRetry(a,t);return u?n.subscribeToDelivery(t):(t.setFailedDelivery({reason:a}),t)})]})})},e.prototype.isEmpty=function(){return this.queue.length===0},e.prototype.scheduleFlush=function(t){var n=this;t===void 0&&(t=500),!this.flushing&&(this.flushing=!0,setTimeout(function(){n.flush().then(function(){setTimeout(function(){n.flushing=!1,n.queue.length&&n.scheduleFlush(0)},0)})},t))},e.prototype.deliver=function(t){return P(this,void 0,void 0,function(){var n,i,a,u;return I(this,function(o){switch(o.label){case 0:return[4,this.criticalTasks.done()];case 1:o.sent(),n=Date.now(),o.label=2;case 2:return o.trys.push([2,4,,5]),[4,this.flushOne(t)];case 3:return t=o.sent(),i=Date.now()-n,this.emit("delivery_success",t),t.stats.gauge("delivered",i),t.log("debug","Delivered",t.event),[2,t];case 4:throw a=o.sent(),u=a,t.log("error","Failed to deliver",u),this.emit("delivery_failure",t,u),t.stats.increment("delivery_failed"),a;case 5:return[2]}})})},e.prototype.enqueuRetry=function(t,n){var i=!(t instanceof B)||t.retry;return i?this.queue.pushWithBackoff(n):!1},e.prototype.flush=function(){return P(this,void 0,void 0,function(){var t,n,i;return I(this,function(a){switch(a.label){case 0:if(this.queue.length===0)return[2,[]];if(t=this.queue.pop(),!t)return[2,[]];t.attempts=this.queue.getAttempts(t),a.label=1;case 1:return a.trys.push([1,3,,4]),[4,this.deliver(t)];case 2:return t=a.sent(),this.emit("flush",t,!0),[3,4];case 3:return n=a.sent(),i=this.enqueuRetry(n,t),i||(t.setFailedDelivery({reason:n}),this.emit("flush",t,!1)),[2,[]];case 4:return[2,[t]]}})})},e.prototype.isReady=function(){return!0},e.prototype.availableExtensions=function(t){var n=this.plugins.filter(function(g){var _,w,S;if(g.type!=="destination"&&g.name!=="Segment.io")return!0;var b=void 0;return(_=g.alternativeNames)===null||_===void 0||_.forEach(function(f){t[f]!==void 0&&(b=t[f])}),(S=(w=t[g.name])!==null&&w!==void 0?w:b)!==null&&S!==void 0?S:(g.name==="Segment.io"?!0:t.All)!==!1}),i=Vo(n,"type"),a=i.before,u=a===void 0?[]:a,o=i.enrichment,c=o===void 0?[]:o,s=i.destination,d=s===void 0?[]:s,h=i.after,y=h===void 0?[]:h;return{before:u,enrichment:c,destinations:d,after:y}},e.prototype.flushOne=function(t){var n,i;return P(this,void 0,void 0,function(){var a,u,o,c,s,d,_,h,y,g,_,w,S,b,f;return I(this,function(l){switch(l.label){case 0:if(!this.isReady())throw new Error("Not ready");t.attempts>1&&this.emit("delivery_retry",t),a=this.availableExtensions((n=t.event.integrations)!==null&&n!==void 0?n:{}),u=a.before,o=a.enrichment,c=0,s=u,l.label=1;case 1:return c<s.length?(d=s[c],[4,Ko(t,d)]):[3,4];case 2:_=l.sent(),_ instanceof Te&&(t=_),this.emit("message_enriched",t,d),l.label=3;case 3:return c++,[3,1];case 4:h=0,y=o,l.label=5;case 5:return h<y.length?(g=y[h],[4,pe(t,g)]):[3,8];case 6:_=l.sent(),_ instanceof Te&&(t=_),this.emit("message_enriched",t,g),l.label=7;case 7:return h++,[3,5];case 8:return w=this.availableExtensions((i=t.event.integrations)!==null&&i!==void 0?i:{}),S=w.destinations,b=w.after,[4,new Promise(function(v,p){setTimeout(function(){var m=S.map(function(O){return pe(t,O)});Promise.all(m).then(v).catch(p)},0)})];case 9:return l.sent(),t.stats.increment("message_delivered"),this.emit("message_delivered",t),f=b.map(function(v){return pe(t,v)}),[4,Promise.all(f)];case 10:return l.sent(),[2,t]}})})},e}(Gr),Qo=function(r,e){var t=Date.now()-r;return Math.max((e!=null?e:300)-t,0)};function Xo(r,e,t,n){return P(this,void 0,void 0,function(){var i,a;return I(this,function(u){switch(u.label){case 0:return t.emit("dispatch_start",r),i=Date.now(),e.isEmpty()?[4,e.dispatchSingle(r)]:[3,2];case 1:return a=u.sent(),[3,4];case 2:return[4,e.dispatch(r)];case 3:a=u.sent(),u.label=4;case 4:return n!=null&&n.callback?[4,Do(a,n.callback,Qo(i,n.timeout))]:[3,6];case 5:a=u.sent(),u.label=6;case 6:return n!=null&&n.debug&&a.flush(),[2,a]}})})}function Yo(r,e,t,n){var i,a=[r,e,t,n],u=k(r)?r.event:r;if(!u||!oe(u))throw new Error("Event missing");var o=k(r)?(i=r.properties)!==null&&i!==void 0?i:{}:k(e)?e:{},c={};he(t)||(c=t!=null?t:{}),k(r)&&!he(e)&&(c=e!=null?e:{});var s=a.find(he);return[u,o,c,s]}function pn(r,e,t,n,i){var a,u,o=null,c=null,s=[r,e,t,n,i],d=s.filter(oe);d[0]!==void 0&&d[1]!==void 0&&(o=d[0],c=d[1]),d.length===1&&(o=null,c=d[0]);var h=s.find(he),y=s.filter(function(w){return c===null?k(w):k(w)||w===null}),g=(a=y[0])!==null&&a!==void 0?a:{},_=(u=y[1])!==null&&u!==void 0?u:{};return[o,c,g,_,h]}var yn=function(r){return function(){for(var e,t,n,i,a,u=[],o=0;o<arguments.length;o++)u[o]=arguments[o];var c=null;c=(n=(e=u.find(oe))!==null&&e!==void 0?e:(t=u.find(Ur))===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:r.id();var s=u.filter(function(g){return c===null?k(g):k(g)||g===null}),d=(i=s[0])!==null&&i!==void 0?i:{},h=(a=s[1])!==null&&a!==void 0?a:{},y=u.find(he);return[c,d,h,y]}};function Zo(r,e,t,n){Ur(r)&&(r=r.toString()),Ur(e)&&(e=e.toString());var i=[r,e,t,n],a=i.filter(oe),u=a[0],o=u===void 0?r:u,c=a[1],s=c===void 0?null:c,d=i.filter(k)[0],h=d===void 0?{}:d,y=i.find(he);return[o,s,h,y]}function Qr(){return typeof window<"u"}function Ua(){return!Qr()}function Ba(){return Qr()?window.navigator.onLine:!0}function ae(){return!Ba()}function eu(r,e){return e=e||{},new Promise(function(t,n){var i=new XMLHttpRequest,a=[],u=[],o={},c=function(){return{ok:(i.status/100|0)==2,statusText:i.statusText,status:i.status,url:i.responseURL,text:function(){return Promise.resolve(i.responseText)},json:function(){return Promise.resolve(i.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([i.response]))},clone:c,headers:{keys:function(){return a},entries:function(){return u},get:function(d){return o[d.toLowerCase()]},has:function(d){return d.toLowerCase()in o}}}};for(var s in i.open(e.method||"get",r,!0),i.onload=function(){i.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(d,h,y){a.push(h=h.toLowerCase()),u.push([h,y]),o[h]=o[h]?o[h]+","+y:y}),t(c())},i.onerror=n,i.withCredentials=e.credentials=="include",e.headers)i.setRequestHeader(s,e.headers[s]);i.send(e.body||null)})}var Xr=function(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:null},Fe=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var t=Xr();return(t&&t.fetch||eu).apply(void 0,r)},De="1.56.0",za="api.segment.io/v1",tu=function(r,e,t){var n=e.reduce(function(i,a){var u=a.split(":"),o=u[0],c=u[1];return i[o]=c,i},{});return{type:"Counter",metric:r,value:1,tags:A(A({},n),{library:"analytics.js",library_version:"npm:next-".concat(De)})}};function Ve(r){console.error("Error sending segment performance metrics",r)}var ru=function(){function r(e){var t=this,n,i,a,u;if(this.host=(n=e==null?void 0:e.host)!==null&&n!==void 0?n:za,this.sampleRate=(i=e==null?void 0:e.sampleRate)!==null&&i!==void 0?i:1,this.flushTimer=(a=e==null?void 0:e.flushTimer)!==null&&a!==void 0?a:30*1e3,this.maxQueueSize=(u=e==null?void 0:e.maxQueueSize)!==null&&u!==void 0?u:20,this.queue=[],this.sampleRate>0){var o=!1,c=function(){o||(o=!0,t.flush().catch(Ve),o=!1,setTimeout(c,t.flushTimer))};c()}}return r.prototype.increment=function(e,t){if(e.includes("analytics_js.")&&t.length!==0&&!(Math.random()>this.sampleRate)&&!(this.queue.length>=this.maxQueueSize)){var n=tu(e,t);this.queue.push(n),e.includes("error")&&this.flush().catch(Ve)}},r.prototype.flush=function(){return P(this,void 0,void 0,function(){var e=this;return I(this,function(t){switch(t.label){case 0:return this.queue.length<=0?[2]:[4,this.send().catch(function(n){Ve(n),e.sampleRate=0})];case 1:return t.sent(),[2]}})})},r.prototype.send=function(){return P(this,void 0,void 0,function(){var e,t,n;return I(this,function(i){return e={series:this.queue},this.queue=[],t={"Content-Type":"text/plain"},n="https://".concat(this.host,"/m"),[2,Fe(n,{headers:t,body:JSON.stringify(e),method:"POST"})]})})},r}(),Se,Va=function(r){C(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.initRemoteMetrics=function(t){Se=new ru(t)},e.prototype.increment=function(t,n,i){r.prototype.increment.call(this,t,n,i),Se==null||Se.increment(t,i!=null?i:[])},e}(Na),re=function(r){C(e,r);function e(t,n){return r.call(this,t,n,new Va)||this}return e.system=function(){return new this({type:"track",event:"system"})},e}(Te);function Ha(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Ga(r){if(Object.prototype.hasOwnProperty.call(r,"__esModule"))return r;var e=r.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(r).forEach(function(n){var i=Object.getOwnPropertyDescriptor(r,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return r[n]}})}),t}var He={exports:{}},mn;function nu(){return mn||(mn=1,function(r,e){(function(t){r.exports=t()})(function(t){var n=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function i(b,f){var l=b[0],v=b[1],p=b[2],m=b[3];l+=(v&p|~v&m)+f[0]-680876936|0,l=(l<<7|l>>>25)+v|0,m+=(l&v|~l&p)+f[1]-389564586|0,m=(m<<12|m>>>20)+l|0,p+=(m&l|~m&v)+f[2]+606105819|0,p=(p<<17|p>>>15)+m|0,v+=(p&m|~p&l)+f[3]-1044525330|0,v=(v<<22|v>>>10)+p|0,l+=(v&p|~v&m)+f[4]-176418897|0,l=(l<<7|l>>>25)+v|0,m+=(l&v|~l&p)+f[5]+1200080426|0,m=(m<<12|m>>>20)+l|0,p+=(m&l|~m&v)+f[6]-1473231341|0,p=(p<<17|p>>>15)+m|0,v+=(p&m|~p&l)+f[7]-45705983|0,v=(v<<22|v>>>10)+p|0,l+=(v&p|~v&m)+f[8]+1770035416|0,l=(l<<7|l>>>25)+v|0,m+=(l&v|~l&p)+f[9]-1958414417|0,m=(m<<12|m>>>20)+l|0,p+=(m&l|~m&v)+f[10]-42063|0,p=(p<<17|p>>>15)+m|0,v+=(p&m|~p&l)+f[11]-1990404162|0,v=(v<<22|v>>>10)+p|0,l+=(v&p|~v&m)+f[12]+1804603682|0,l=(l<<7|l>>>25)+v|0,m+=(l&v|~l&p)+f[13]-40341101|0,m=(m<<12|m>>>20)+l|0,p+=(m&l|~m&v)+f[14]-1502002290|0,p=(p<<17|p>>>15)+m|0,v+=(p&m|~p&l)+f[15]+1236535329|0,v=(v<<22|v>>>10)+p|0,l+=(v&m|p&~m)+f[1]-165796510|0,l=(l<<5|l>>>27)+v|0,m+=(l&p|v&~p)+f[6]-1069501632|0,m=(m<<9|m>>>23)+l|0,p+=(m&v|l&~v)+f[11]+643717713|0,p=(p<<14|p>>>18)+m|0,v+=(p&l|m&~l)+f[0]-373897302|0,v=(v<<20|v>>>12)+p|0,l+=(v&m|p&~m)+f[5]-701558691|0,l=(l<<5|l>>>27)+v|0,m+=(l&p|v&~p)+f[10]+38016083|0,m=(m<<9|m>>>23)+l|0,p+=(m&v|l&~v)+f[15]-660478335|0,p=(p<<14|p>>>18)+m|0,v+=(p&l|m&~l)+f[4]-405537848|0,v=(v<<20|v>>>12)+p|0,l+=(v&m|p&~m)+f[9]+568446438|0,l=(l<<5|l>>>27)+v|0,m+=(l&p|v&~p)+f[14]-1019803690|0,m=(m<<9|m>>>23)+l|0,p+=(m&v|l&~v)+f[3]-187363961|0,p=(p<<14|p>>>18)+m|0,v+=(p&l|m&~l)+f[8]+1163531501|0,v=(v<<20|v>>>12)+p|0,l+=(v&m|p&~m)+f[13]-1444681467|0,l=(l<<5|l>>>27)+v|0,m+=(l&p|v&~p)+f[2]-51403784|0,m=(m<<9|m>>>23)+l|0,p+=(m&v|l&~v)+f[7]+1735328473|0,p=(p<<14|p>>>18)+m|0,v+=(p&l|m&~l)+f[12]-1926607734|0,v=(v<<20|v>>>12)+p|0,l+=(v^p^m)+f[5]-378558|0,l=(l<<4|l>>>28)+v|0,m+=(l^v^p)+f[8]-2022574463|0,m=(m<<11|m>>>21)+l|0,p+=(m^l^v)+f[11]+1839030562|0,p=(p<<16|p>>>16)+m|0,v+=(p^m^l)+f[14]-35309556|0,v=(v<<23|v>>>9)+p|0,l+=(v^p^m)+f[1]-1530992060|0,l=(l<<4|l>>>28)+v|0,m+=(l^v^p)+f[4]+1272893353|0,m=(m<<11|m>>>21)+l|0,p+=(m^l^v)+f[7]-155497632|0,p=(p<<16|p>>>16)+m|0,v+=(p^m^l)+f[10]-1094730640|0,v=(v<<23|v>>>9)+p|0,l+=(v^p^m)+f[13]+681279174|0,l=(l<<4|l>>>28)+v|0,m+=(l^v^p)+f[0]-358537222|0,m=(m<<11|m>>>21)+l|0,p+=(m^l^v)+f[3]-722521979|0,p=(p<<16|p>>>16)+m|0,v+=(p^m^l)+f[6]+76029189|0,v=(v<<23|v>>>9)+p|0,l+=(v^p^m)+f[9]-640364487|0,l=(l<<4|l>>>28)+v|0,m+=(l^v^p)+f[12]-421815835|0,m=(m<<11|m>>>21)+l|0,p+=(m^l^v)+f[15]+530742520|0,p=(p<<16|p>>>16)+m|0,v+=(p^m^l)+f[2]-995338651|0,v=(v<<23|v>>>9)+p|0,l+=(p^(v|~m))+f[0]-198630844|0,l=(l<<6|l>>>26)+v|0,m+=(v^(l|~p))+f[7]+1126891415|0,m=(m<<10|m>>>22)+l|0,p+=(l^(m|~v))+f[14]-1416354905|0,p=(p<<15|p>>>17)+m|0,v+=(m^(p|~l))+f[5]-57434055|0,v=(v<<21|v>>>11)+p|0,l+=(p^(v|~m))+f[12]+1700485571|0,l=(l<<6|l>>>26)+v|0,m+=(v^(l|~p))+f[3]-1894986606|0,m=(m<<10|m>>>22)+l|0,p+=(l^(m|~v))+f[10]-1051523|0,p=(p<<15|p>>>17)+m|0,v+=(m^(p|~l))+f[1]-2054922799|0,v=(v<<21|v>>>11)+p|0,l+=(p^(v|~m))+f[8]+1873313359|0,l=(l<<6|l>>>26)+v|0,m+=(v^(l|~p))+f[15]-30611744|0,m=(m<<10|m>>>22)+l|0,p+=(l^(m|~v))+f[6]-1560198380|0,p=(p<<15|p>>>17)+m|0,v+=(m^(p|~l))+f[13]+1309151649|0,v=(v<<21|v>>>11)+p|0,l+=(p^(v|~m))+f[4]-145523070|0,l=(l<<6|l>>>26)+v|0,m+=(v^(l|~p))+f[11]-1120210379|0,m=(m<<10|m>>>22)+l|0,p+=(l^(m|~v))+f[2]+718787259|0,p=(p<<15|p>>>17)+m|0,v+=(m^(p|~l))+f[9]-343485551|0,v=(v<<21|v>>>11)+p|0,b[0]=l+b[0]|0,b[1]=v+b[1]|0,b[2]=p+b[2]|0,b[3]=m+b[3]|0}function a(b){var f=[],l;for(l=0;l<64;l+=4)f[l>>2]=b.charCodeAt(l)+(b.charCodeAt(l+1)<<8)+(b.charCodeAt(l+2)<<16)+(b.charCodeAt(l+3)<<24);return f}function u(b){var f=[],l;for(l=0;l<64;l+=4)f[l>>2]=b[l]+(b[l+1]<<8)+(b[l+2]<<16)+(b[l+3]<<24);return f}function o(b){var f=b.length,l=[1732584193,-271733879,-1732584194,271733878],v,p,m,O,q,M;for(v=64;v<=f;v+=64)i(l,a(b.substring(v-64,v)));for(b=b.substring(v-64),p=b.length,m=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],v=0;v<p;v+=1)m[v>>2]|=b.charCodeAt(v)<<(v%4<<3);if(m[v>>2]|=128<<(v%4<<3),v>55)for(i(l,m),v=0;v<16;v+=1)m[v]=0;return O=f*8,O=O.toString(16).match(/(.*?)(.{0,8})$/),q=parseInt(O[2],16),M=parseInt(O[1],16)||0,m[14]=q,m[15]=M,i(l,m),l}function c(b){var f=b.length,l=[1732584193,-271733879,-1732584194,271733878],v,p,m,O,q,M;for(v=64;v<=f;v+=64)i(l,u(b.subarray(v-64,v)));for(b=v-64<f?b.subarray(v-64):new Uint8Array(0),p=b.length,m=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],v=0;v<p;v+=1)m[v>>2]|=b[v]<<(v%4<<3);if(m[v>>2]|=128<<(v%4<<3),v>55)for(i(l,m),v=0;v<16;v+=1)m[v]=0;return O=f*8,O=O.toString(16).match(/(.*?)(.{0,8})$/),q=parseInt(O[2],16),M=parseInt(O[1],16)||0,m[14]=q,m[15]=M,i(l,m),l}function s(b){var f="",l;for(l=0;l<4;l+=1)f+=n[b>>l*8+4&15]+n[b>>l*8&15];return f}function d(b){var f;for(f=0;f<b.length;f+=1)b[f]=s(b[f]);return b.join("")}d(o("hello")),typeof ArrayBuffer<"u"&&!ArrayBuffer.prototype.slice&&function(){function b(f,l){return f=f|0||0,f<0?Math.max(f+l,0):Math.min(f,l)}ArrayBuffer.prototype.slice=function(f,l){var v=this.byteLength,p=b(f,v),m=v,O,q,M,E;return l!==t&&(m=b(l,v)),p>m?new ArrayBuffer(0):(O=m-p,q=new ArrayBuffer(O),M=new Uint8Array(q),E=new Uint8Array(this,p,O),M.set(E),q)}}();function h(b){return/[\u0080-\uFFFF]/.test(b)&&(b=unescape(encodeURIComponent(b))),b}function y(b,f){var l=b.length,v=new ArrayBuffer(l),p=new Uint8Array(v),m;for(m=0;m<l;m+=1)p[m]=b.charCodeAt(m);return f?p:v}function g(b){return String.fromCharCode.apply(null,new Uint8Array(b))}function _(b,f,l){var v=new Uint8Array(b.byteLength+f.byteLength);return v.set(new Uint8Array(b)),v.set(new Uint8Array(f),b.byteLength),v}function w(b){var f=[],l=b.length,v;for(v=0;v<l-1;v+=2)f.push(parseInt(b.substr(v,2),16));return String.fromCharCode.apply(String,f)}function S(){this.reset()}return S.prototype.append=function(b){return this.appendBinary(h(b)),this},S.prototype.appendBinary=function(b){this._buff+=b,this._length+=b.length;var f=this._buff.length,l;for(l=64;l<=f;l+=64)i(this._hash,a(this._buff.substring(l-64,l)));return this._buff=this._buff.substring(l-64),this},S.prototype.end=function(b){var f=this._buff,l=f.length,v,p=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],m;for(v=0;v<l;v+=1)p[v>>2]|=f.charCodeAt(v)<<(v%4<<3);return this._finish(p,l),m=d(this._hash),b&&(m=w(m)),this.reset(),m},S.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},S.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},S.prototype.setState=function(b){return this._buff=b.buff,this._length=b.length,this._hash=b.hash,this},S.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},S.prototype._finish=function(b,f){var l=f,v,p,m;if(b[l>>2]|=128<<(l%4<<3),l>55)for(i(this._hash,b),l=0;l<16;l+=1)b[l]=0;v=this._length*8,v=v.toString(16).match(/(.*?)(.{0,8})$/),p=parseInt(v[2],16),m=parseInt(v[1],16)||0,b[14]=p,b[15]=m,i(this._hash,b)},S.hash=function(b,f){return S.hashBinary(h(b),f)},S.hashBinary=function(b,f){var l=o(b),v=d(l);return f?w(v):v},S.ArrayBuffer=function(){this.reset()},S.ArrayBuffer.prototype.append=function(b){var f=_(this._buff.buffer,b),l=f.length,v;for(this._length+=b.byteLength,v=64;v<=l;v+=64)i(this._hash,u(f.subarray(v-64,v)));return this._buff=v-64<l?new Uint8Array(f.buffer.slice(v-64)):new Uint8Array(0),this},S.ArrayBuffer.prototype.end=function(b){var f=this._buff,l=f.length,v=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p,m;for(p=0;p<l;p+=1)v[p>>2]|=f[p]<<(p%4<<3);return this._finish(v,l),m=d(this._hash),b&&(m=w(m)),this.reset(),m},S.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},S.ArrayBuffer.prototype.getState=function(){var b=S.prototype.getState.call(this);return b.buff=g(b.buff),b},S.ArrayBuffer.prototype.setState=function(b){return b.buff=y(b.buff,!0),S.prototype.setState.call(this,b)},S.ArrayBuffer.prototype.destroy=S.prototype.destroy,S.ArrayBuffer.prototype._finish=S.prototype._finish,S.ArrayBuffer.hash=function(b,f){var l=c(new Uint8Array(b)),v=d(l);return f?w(v):v},S})}(He)),He.exports}var iu=nu();const au=Ha(iu);var ou=function(){function r(e){this.user=e}return r.prototype.track=function(e,t,n,i){return this.normalize(A(A({},this.baseEvent()),{event:e,type:"track",properties:t,options:A({},n),integrations:A({},i)}))},r.prototype.page=function(e,t,n,i,a){var u,o={type:"page",properties:A({},n),options:A({},i),integrations:A({},a)};return e!==null&&(o.category=e,o.properties=(u=o.properties)!==null&&u!==void 0?u:{},o.properties.category=e),t!==null&&(o.name=t),this.normalize(A(A({},this.baseEvent()),o))},r.prototype.screen=function(e,t,n,i,a){var u={type:"screen",properties:A({},n),options:A({},i),integrations:A({},a)};return e!==null&&(u.category=e),t!==null&&(u.name=t),this.normalize(A(A({},this.baseEvent()),u))},r.prototype.identify=function(e,t,n,i){return this.normalize(A(A({},this.baseEvent()),{type:"identify",userId:e,traits:t,options:A({},n),integrations:A({},i)}))},r.prototype.group=function(e,t,n,i){return this.normalize(A(A({},this.baseEvent()),{type:"group",traits:t,options:A({},n),integrations:A({},i),groupId:e}))},r.prototype.alias=function(e,t,n,i){var a={userId:e,type:"alias",options:A({},n),integrations:A({},i)};return t!==null&&(a.previousId=t),e===void 0?this.normalize(A(A({},a),this.baseEvent())):this.normalize(A(A({},this.baseEvent()),a))},r.prototype.baseEvent=function(){var e={integrations:{},options:{}},t=this.user;return t.id()&&(e.userId=t.id()),t.anonymousId()&&(e.anonymousId=t.anonymousId()),e},r.prototype.context=function(e){var t,n,i,a=["integrations","anonymousId","timestamp","userId"],u=(t=e.options)!==null&&t!==void 0?t:{};delete u.integrations;var o=Object.keys(u),c=(i=(n=e.options)===null||n===void 0?void 0:n.context)!==null&&i!==void 0?i:{},s={};return o.forEach(function(d){d!=="context"&&(a.includes(d)?ke(s,d,u[d]):ke(c,d,u[d]))}),[c,s]},r.prototype.normalize=function(e){var t,n,i;!((t=e.options)===null||t===void 0)&&t.anonymousId&&this.user.anonymousId(e.options.anonymousId);var a=Object.keys((n=e.integrations)!==null&&n!==void 0?n:{}).reduce(function(_,w){var S,b;return A(A({},_),(S={},S[w]=!!(!((b=e.integrations)===null||b===void 0)&&b[w]),S))},{}),u=A(A({},a),(i=e.options)===null||i===void 0?void 0:i.integrations),o=this.context(e),c=o[0],s=o[1];e.options;var d=xa(e,["options"]),h=A(A(A({timestamp:new Date},d),{context:c,integrations:u}),s),y="ajs-next-"+au.hash(JSON.stringify(h)+Jr()),g=A(A({},h),{messageId:y});return g},r}(),D={getItem:function(){},setItem:function(){},removeItem:function(){}};try{D=Qr()&&window.localStorage?window.localStorage:D}catch(r){console.warn("Unable to access localStorage",r)}function Wa(r){var e=D.getItem(r);return(e?JSON.parse(e):[]).map(function(t){return new re(t.event,t.id)})}function uu(r,e){var t=Wa(r),n=R(R([],e,!0),t,!0),i=n.reduce(function(a,u){var o;return A(A({},a),(o={},o[u.id]=u,o))},{});D.setItem(r,JSON.stringify(Object.values(i)))}function Ka(r){var e=D.getItem(r);return e?JSON.parse(e):{}}function su(r,e){var t=Ka(r);D.setItem(r,JSON.stringify(A(A({},t),e)))}function gn(r){D.removeItem(r)}var lu=function(){return new Date().getTime()};function Br(r,e,t){t===void 0&&(t=0);var n=50,i="persisted-queue:v1:".concat(r,":lock"),a=function(s){return new Date().getTime()>s},u=D.getItem(i),o=u?JSON.parse(u):null,c=o===null||a(o);if(c){D.setItem(i,JSON.stringify(lu()+n)),e(),D.removeItem(i);return}!c&&t<3?setTimeout(function(){Br(r,e,t+1)},n):console.error("Unable to retrieve lock")}var Ne=function(r){C(e,r);function e(t,n){var i=r.call(this,t,[])||this,a="persisted-queue:v1:".concat(n,":items"),u="persisted-queue:v1:".concat(n,":seen"),o=[],c={};return Br(n,function(){try{o=Wa(a),c=Ka(u),gn(a),gn(u),i.queue=R(R([],o,!0),i.queue,!0),i.seen=A(A({},c),i.seen)}catch(s){console.error(s)}}),window.addEventListener("pagehide",function(){if(i.todo>0){var s=R(R([],i.queue,!0),i.future,!0);try{Br(n,function(){uu(a,s),su(u,i.seen)})}catch(d){console.error(d)}}}),i}return e}(Ce),cu=function(r){C(e,r);function e(t){return r.call(this,typeof t=="string"?new Ne(4,t):t)||this}return e.prototype.flush=function(){return P(this,void 0,void 0,function(){return I(this,function(t){return ae()?[2,[]]:[2,r.prototype.flush.call(this)]})})},e}(Jo);function Yr(r){for(var e=r.constructor.prototype,t=0,n=Object.getOwnPropertyNames(e);t<n.length;t++){var i=n[t];if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(r.constructor.prototype,i);a&&typeof a.value=="function"&&(r[i]=r[i].bind(r))}}return r}/*! js-cookie v3.0.1 | MIT */function Ae(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)r[n]=t[n]}return r}var fu={read:function(r){return r[0]==='"'&&(r=r.slice(1,-1)),r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(r){return encodeURIComponent(r).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function zr(r,e){function t(i,a,u){if(!(typeof document>"u")){u=Ae({},e,u),typeof u.expires=="number"&&(u.expires=new Date(Date.now()+u.expires*864e5)),u.expires&&(u.expires=u.expires.toUTCString()),i=encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="";for(var c in u)u[c]&&(o+="; "+c,u[c]!==!0&&(o+="="+u[c].split(";")[0]));return document.cookie=i+"="+r.write(a,i)+o}}function n(i){if(!(typeof document>"u"||arguments.length&&!i)){for(var a=document.cookie?document.cookie.split("; "):[],u={},o=0;o<a.length;o++){var c=a[o].split("="),s=c.slice(1).join("=");try{var d=decodeURIComponent(c[0]);if(u[d]=r.read(s,d),i===d)break}catch(h){}}return i?u[i]:u}}return Object.create({set:t,get:n,remove:function(i,a){t(i,"",Ae({},a,{expires:-1}))},withAttributes:function(i){return zr(this.converter,Ae({},this.attributes,i))},withConverter:function(i){return zr(Ae({},this.converter,i),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(r)}})}var N=zr(fu,{path:"/"});function du(r){var e=r.hostname,t=e.split("."),n=t[t.length-1],i=[];if(t.length===4&&parseInt(n,10)>0||t.length<=1)return i;for(var a=t.length-2;a>=0;--a)i.push(t.slice(a).join("."));return i}function vu(r){try{return new URL(r)}catch(e){return}}function Ja(r){var e=vu(r);if(e)for(var t=du(e),n=0;n<t.length;++n){var i="__tld__",a=t[n],u={domain:"."+a};try{if(N.set(i,"1",u),N.get(i))return N.remove(i,u),a}catch(o){return}}}var hu=365,Qa=function(){function r(e){e===void 0&&(e=r.defaults),this.options=A(A({},r.defaults),e)}return Object.defineProperty(r,"defaults",{get:function(){return{maxage:hu,domain:Ja(window.location.href),path:"/",sameSite:"Lax"}},enumerable:!1,configurable:!0}),r.prototype.opts=function(){return{sameSite:this.options.sameSite,expires:this.options.maxage,domain:this.options.domain,path:this.options.path,secure:this.options.secure}},r.prototype.get=function(e){var t;try{var n=N.get(e);if(n==null)return null;try{return(t=JSON.parse(n))!==null&&t!==void 0?t:null}catch(i){return n!=null?n:null}}catch(i){return null}},r.prototype.set=function(e,t){typeof t=="string"?N.set(e,t,this.opts()):t===null?N.remove(e,this.opts()):N.set(e,JSON.stringify(t),this.opts())},r.prototype.remove=function(e){return N.remove(e,this.opts())},r}(),pu=function(){function r(){}return r.prototype.localStorageWarning=function(e,t){console.warn("Unable to access ".concat(e,", localStorage may be ").concat(t))},r.prototype.get=function(e){var t;try{var n=localStorage.getItem(e);if(n===null)return null;try{return(t=JSON.parse(n))!==null&&t!==void 0?t:null}catch(i){return n!=null?n:null}}catch(i){return this.localStorageWarning(e,"unavailable"),null}},r.prototype.set=function(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){this.localStorageWarning(e,"full")}},r.prototype.remove=function(e){try{return localStorage.removeItem(e)}catch(t){this.localStorageWarning(e,"unavailable")}},r}(),Zr=function(){function r(){this.cache={}}return r.prototype.get=function(e){var t;return(t=this.cache[e])!==null&&t!==void 0?t:null},r.prototype.set=function(e,t){this.cache[e]=t},r.prototype.remove=function(e){delete this.cache[e]},r}(),j={Cookie:"cookie",LocalStorage:"localStorage",Memory:"memory"};function Xa(r){return r&&r.stores&&Array.isArray(r.stores)&&r.stores.every(function(e){return Object.values(j).includes(e)})}function yu(r){return typeof r=="object"&&r.name!==void 0}var ne=function(){function r(e){this.stores=e}return r.prototype.get=function(e){for(var t=null,n=0,i=this.stores;n<i.length;n++){var a=i[n];try{if(t=a.get(e),t!=null)return t}catch(u){console.warn("Can't access ".concat(e,": ").concat(u))}}return null},r.prototype.set=function(e,t){this.stores.forEach(function(n){try{n.set(e,t)}catch(i){console.warn("Can't set ".concat(e,": ").concat(i))}})},r.prototype.clear=function(e){this.stores.forEach(function(t){try{t.remove(e)}catch(n){console.warn("Can't remove ".concat(e,": ").concat(n))}})},r.prototype.getAndSync=function(e){var t=this.get(e),n=typeof t=="number"?t.toString():t;return this.set(e,n),n},r}();function Vr(r){var e=r.map(function(t){var n,i;switch(yu(t)?(n=t.name,i=t.settings):n=t,n){case j.Cookie:return new Qa(i);case j.LocalStorage:return new pu;case j.Memory:return new Zr;default:throw new Error("Unknown Store Type: ".concat(t))}});return e}function Ya(r,e){return r.map(function(t){return e&&t===j.Cookie?{name:t,settings:e}:t})}var V={persist:!0,cookie:{key:"ajs_user_id",oldKey:"ajs_user"},localStorage:{key:"ajs_user_traits"}},Za=function(){function r(e,t){e===void 0&&(e=V);var n=this,i,a,u,o;this.options={},this.id=function(s){if(n.options.disable)return null;var d=n.identityStore.getAndSync(n.idKey);if(s!==void 0){n.identityStore.set(n.idKey,s);var h=s!==d&&d!==null&&s!==null;h&&n.anonymousId(null)}var y=n.identityStore.getAndSync(n.idKey);if(y)return y;var g=n.legacyUserStore.get(V.cookie.oldKey);return g?typeof g=="object"?g.id:g:null},this.anonymousId=function(s){var d,h;if(n.options.disable)return null;if(s===void 0){var y=(d=n.identityStore.getAndSync(n.anonKey))!==null&&d!==void 0?d:(h=n.legacySIO())===null||h===void 0?void 0:h[0];if(y)return y}return s===null?(n.identityStore.set(n.anonKey,null),n.identityStore.getAndSync(n.anonKey)):(n.identityStore.set(n.anonKey,s!=null?s:Jr()),n.identityStore.getAndSync(n.anonKey))},this.traits=function(s){var d;if(!n.options.disable)return s===null&&(s={}),s&&n.traitsStore.set(n.traitsKey,s!=null?s:{}),(d=n.traitsStore.get(n.traitsKey))!==null&&d!==void 0?d:{}},this.options=A(A({},V),e),this.cookieOptions=t,this.idKey=(a=(i=e.cookie)===null||i===void 0?void 0:i.key)!==null&&a!==void 0?a:V.cookie.key,this.traitsKey=(o=(u=e.localStorage)===null||u===void 0?void 0:u.key)!==null&&o!==void 0?o:V.localStorage.key,this.anonKey="ajs_anonymous_id",this.identityStore=this.createStorage(this.options,t),this.legacyUserStore=this.createStorage(this.options,t,function(s){return s===j.Cookie}),this.traitsStore=this.createStorage(this.options,t,function(s){return s!==j.Cookie});var c=this.legacyUserStore.get(V.cookie.oldKey);c&&typeof c=="object"&&(c.id&&this.id(c.id),c.traits&&this.traits(c.traits)),Yr(this)}return r.prototype.legacySIO=function(){var e=this.legacyUserStore.get("_sio");if(!e)return null;var t=e.split("----"),n=t[0],i=t[1];return[n,i]},r.prototype.identify=function(e,t){if(!this.options.disable){t=t!=null?t:{};var n=this.id();(n===null||n===e)&&(t=A(A({},this.traits()),t)),e&&this.id(e),this.traits(t)}},r.prototype.logout=function(){this.anonymousId(null),this.id(null),this.traits({})},r.prototype.reset=function(){this.logout(),this.identityStore.clear(this.idKey),this.identityStore.clear(this.anonKey),this.traitsStore.clear(this.traitsKey)},r.prototype.load=function(){return new r(this.options,this.cookieOptions)},r.prototype.save=function(){return!0},r.prototype.createStorage=function(e,t,n){var i=[j.LocalStorage,j.Cookie,j.Memory];return e.disable?new ne([]):e.persist?(e.storage!==void 0&&e.storage!==null&&Xa(e.storage)&&(i=e.storage.stores),e.localStorageFallbackDisabled&&(i=i.filter(function(a){return a!==j.LocalStorage})),n&&(i=i.filter(n)),new ne(Vr(Ya(i,t)))):new ne([new Zr])},r.defaults=V,r}(),bn={persist:!0,cookie:{key:"ajs_group_id"},localStorage:{key:"ajs_group_properties"}},mu=function(r){C(e,r);function e(t,n){t===void 0&&(t=bn);var i=r.call(this,A(A({},bn),t),n)||this;return i.anonymousId=function(a){},Yr(i),i}return e}(Za),en="analytics";function tn(){return window[en]}function gu(r){en=r}function bu(r){window[en]=r}var U="This is being deprecated and will be not be available in future releases of Analytics JS",Ge=Xr(),We=Ge==null?void 0:Ge.analytics;function _u(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var n=e?4:1,i=t?new Ce(n,[]):new Ne(n,r);return new cu(i)}function F(){console.warn(U)}var wu=function(r){C(e,r);function e(t,n,i,a,u){var o=this,c,s,d;o=r.call(this)||this,o._debug=!1,o.initialized=!1,o.user=function(){return o._user},o.init=o.initialize.bind(o),o.log=F,o.addIntegrationMiddleware=F,o.listeners=F,o.addEventListener=F,o.removeAllListeners=F,o.removeListener=F,o.removeEventListener=F,o.hasListeners=F,o.add=F,o.addIntegration=F;var h=n==null?void 0:n.cookie,y=(c=n==null?void 0:n.disableClientPersistence)!==null&&c!==void 0?c:!1;o.settings=t,o.settings.timeout=(s=o.settings.timeout)!==null&&s!==void 0?s:300,o.queue=i!=null?i:_u("".concat(t.writeKey,":event-queue"),n==null?void 0:n.retryQueue,y);var g=n==null?void 0:n.storage;return o._universalStorage=o.createStore(y,g,h),o._user=a!=null?a:new Za(A({persist:!y,storage:n==null?void 0:n.storage},n==null?void 0:n.user),h).load(),o._group=u!=null?u:new mu(A({persist:!y,storage:n==null?void 0:n.storage},n==null?void 0:n.group),h).load(),o.eventFactory=new ou(o._user),o.integrations=(d=n==null?void 0:n.integrations)!==null&&d!==void 0?d:{},o.options=n!=null?n:{},Yr(o),o}return e.prototype.createStore=function(t,n,i){return t?new ne([new Zr]):n&&Xa(n)?new ne(Vr(Ya(n.stores,i))):new ne(Vr([j.LocalStorage,{name:j.Cookie,settings:i},j.Memory]))},Object.defineProperty(e.prototype,"storage",{get:function(){return this._universalStorage},enumerable:!1,configurable:!0}),e.prototype.track=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u,o,c,s,d=this;return I(this,function(h){return i=Yo.apply(void 0,t),a=i[0],u=i[1],o=i[2],c=i[3],s=this.eventFactory.track(a,u,o,this.integrations),[2,this._dispatch(s,c).then(function(y){return d.emit("track",a,y.event.properties,y.event.options),y})]})})},e.prototype.page=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u,o,c,s,d,h=this;return I(this,function(y){return i=pn.apply(void 0,t),a=i[0],u=i[1],o=i[2],c=i[3],s=i[4],d=this.eventFactory.page(a,u,o,c,this.integrations),[2,this._dispatch(d,s).then(function(g){return h.emit("page",a,u,g.event.properties,g.event.options),g})]})})},e.prototype.identify=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u,o,c,s,d=this;return I(this,function(h){return i=yn(this._user).apply(void 0,t),a=i[0],u=i[1],o=i[2],c=i[3],this._user.identify(a,u),s=this.eventFactory.identify(this._user.id(),this._user.traits(),o,this.integrations),[2,this._dispatch(s,c).then(function(y){return d.emit("identify",y.event.userId,y.event.traits,y.event.options),y})]})})},e.prototype.group=function(){for(var t=this,n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];if(n.length===0)return this._group;var a=yn(this._group).apply(void 0,n),u=a[0],o=a[1],c=a[2],s=a[3];this._group.identify(u,o);var d=this._group.id(),h=this._group.traits(),y=this.eventFactory.group(d,h,c,this.integrations);return this._dispatch(y,s).then(function(g){return t.emit("group",g.event.groupId,g.event.traits,g.event.options),g})},e.prototype.alias=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u,o,c,s,d=this;return I(this,function(h){return i=Zo.apply(void 0,t),a=i[0],u=i[1],o=i[2],c=i[3],s=this.eventFactory.alias(a,u,o,this.integrations),[2,this._dispatch(s,c).then(function(y){return d.emit("alias",a,u,y.event.options),y})]})})},e.prototype.screen=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u,o,c,s,d,h=this;return I(this,function(y){return i=pn.apply(void 0,t),a=i[0],u=i[1],o=i[2],c=i[3],s=i[4],d=this.eventFactory.screen(a,u,o,c,this.integrations),[2,this._dispatch(d,s).then(function(g){return h.emit("screen",a,u,g.event.properties,g.event.options),g})]})})},e.prototype.trackClick=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a;return I(this,function(u){switch(u.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)];case 1:return i=u.sent(),[2,(a=i.link).call.apply(a,R([this],t,!1))]}})})},e.prototype.trackLink=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a;return I(this,function(u){switch(u.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)];case 1:return i=u.sent(),[2,(a=i.link).call.apply(a,R([this],t,!1))]}})})},e.prototype.trackSubmit=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a;return I(this,function(u){switch(u.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)];case 1:return i=u.sent(),[2,(a=i.form).call.apply(a,R([this],t,!1))]}})})},e.prototype.trackForm=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a;return I(this,function(u){switch(u.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)];case 1:return i=u.sent(),[2,(a=i.form).call.apply(a,R([this],t,!1))]}})})},e.prototype.register=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u=this;return I(this,function(o){switch(o.label){case 0:return i=re.system(),a=t.map(function(c){return u.queue.register(i,c,u)}),[4,Promise.all(a)];case 1:return o.sent(),[2,i]}})})},e.prototype.deregister=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return P(this,void 0,void 0,function(){var i,a,u=this;return I(this,function(o){switch(o.label){case 0:return i=re.system(),a=t.map(function(c){var s=u.queue.plugins.find(function(d){return d.name===c});if(s)return u.queue.deregister(i,s,u);i.log("warn","plugin ".concat(c," not found"))}),[4,Promise.all(a)];case 1:return o.sent(),[2,i]}})})},e.prototype.debug=function(t){return t===!1&&localStorage.getItem("debug")&&localStorage.removeItem("debug"),this._debug=t,this},e.prototype.reset=function(){this._user.reset(),this._group.reset(),this.emit("reset")},e.prototype.timeout=function(t){this.settings.timeout=t},e.prototype._dispatch=function(t,n){return P(this,void 0,void 0,function(){var i;return I(this,function(a){return i=new re(t),ae()&&!this.options.retryQueue?[2,i]:[2,Xo(i,this.queue,this,{callback:n,debug:this._debug,timeout:this.settings.timeout})]})})},e.prototype.addSourceMiddleware=function(t){return P(this,void 0,void 0,function(){var n=this;return I(this,function(i){switch(i.label){case 0:return[4,this.queue.criticalTasks.run(function(){return P(n,void 0,void 0,function(){var a,u,o;return I(this,function(c){switch(c.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Xu),void 0,import.meta.url)];case 1:return a=c.sent().sourceMiddlewarePlugin,u={},this.queue.plugins.forEach(function(s){if(s.type==="destination")return u[s.name]=!0}),o=a(t,u),[4,this.register(o)];case 2:return c.sent(),[2]}})})})];case 1:return i.sent(),[2,this]}})})},e.prototype.addDestinationMiddleware=function(t){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var a=this.queue.plugins.filter(function(u){return u.name.toLowerCase()===t.toLowerCase()});return a.forEach(function(u){u.addMiddleware.apply(u,n)}),Promise.resolve(this)},e.prototype.setAnonymousId=function(t){return this._user.anonymousId(t)},e.prototype.queryString=function(t){return P(this,void 0,void 0,function(){var n;return I(this,function(i){switch(i.label){case 0:return this.options.useQueryString===!1?[2,[]]:[4,x(()=>Promise.resolve().then(()=>Fs),void 0,import.meta.url)];case 1:return n=i.sent().queryString,[2,n(this,t)]}})})},e.prototype.use=function(t){return t(this),this},e.prototype.ready=function(t){return t===void 0&&(t=function(n){return n}),P(this,void 0,void 0,function(){return I(this,function(n){return[2,Promise.all(this.queue.plugins.map(function(i){return i.ready?i.ready():Promise.resolve()})).then(function(i){return t(i),i})]})})},e.prototype.noConflict=function(){return console.warn(U),bu(We!=null?We:this),this},e.prototype.normalize=function(t){return console.warn(U),this.eventFactory.normalize(t)},Object.defineProperty(e.prototype,"failedInitializations",{get:function(){return console.warn(U),this.queue.failedInitializations},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"VERSION",{get:function(){return De},enumerable:!1,configurable:!0}),e.prototype.initialize=function(t,n){return P(this,void 0,void 0,function(){return I(this,function(i){return console.warn(U),[2,Promise.resolve(this)]})})},e.prototype.pageview=function(t){return P(this,void 0,void 0,function(){return I(this,function(n){switch(n.label){case 0:return console.warn(U),[4,this.page({path:t})];case 1:return n.sent(),[2,this]}})})},Object.defineProperty(e.prototype,"plugins",{get:function(){var t;return console.warn(U),(t=this._plugins)!==null&&t!==void 0?t:{}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"Integrations",{get:function(){console.warn(U);var t=this.queue.plugins.filter(function(n){return n.type==="destination"}).reduce(function(n,i){var a="".concat(i.name.toLowerCase().replace(".","").split(" ").join("-"),"Integration"),u=window[a];if(!u)return n;var o=u.Integration;return o?(n[i.name]=o,n):(n[i.name]=u,n)},{});return t},enumerable:!1,configurable:!0}),e.prototype.push=function(t){var n=this,i=t.shift();i&&!n[i]||n[i].apply(this,t)},e}(Gr),_n={};function eo(){return typeof process>"u"||!_n?{}:_n}var Su=/(https:\/\/.*)\/analytics\.js\/v1\/(?:.*?)\/(?:platform|analytics.*)?/,Au=function(){var r,e=Array.prototype.slice.call(document.querySelectorAll("script"));return e.forEach(function(t){var n,i=(n=t.getAttribute("src"))!==null&&n!==void 0?n:"",a=Su.exec(i);a&&a[1]&&(r=a[1])}),r},je,Pu=function(){var r,e=je!=null?je:(r=tn())===null||r===void 0?void 0:r._cdn;return e},Iu=function(r){var e=tn();e&&(e._cdn=r),je=r},rn=function(){var r=Pu();if(r)return r;var e=Au();return e||"https://cdn.segment.com"},nn=function(){var r=rn();return"".concat(r,"/next-integrations")};function to(r,e){var t,n=Object.entries((t=e.integrations)!==null&&t!==void 0?t:{}).reduce(function(i,a){var u,o,c=a[0],s=a[1];return typeof s=="object"?A(A({},i),(u={},u[c]=s,u)):A(A({},i),(o={},o[c]={},o))},{});return Object.entries(r.integrations).reduce(function(i,a){var u,o=a[0],c=a[1];return A(A({},i),(u={},u[o]=A(A({},c),n[o]),u))},{})}var Ou=function(){var r,e,t=new Promise(function(n,i){r=n,e=i});return{resolve:r,reject:e,promise:t}},qu=function(r,e){return Object.assign.apply(Object,R([{}],e.map(function(t){var n;if(r&&Object.prototype.hasOwnProperty.call(r,t))return n={},n[t]=r[t],n}),!1))};function ro(r){try{return decodeURIComponent(r.replace(/\+/g," "))}catch(e){return r}}var me;function Eu(){if(me)return me;var r=Ja(window.location.href);return me={expires:31536e6,secure:!1,path:"/"},r&&(me.domain=r),me}function $u(r){var e={btid:"dataxu",urid:"millennial-media"};r.startsWith("?")&&(r=r.substring(1)),r=r.replace(/\?/g,"&");for(var t=r.split("&"),n=0,i=t;n<i.length;n++){var a=i[n],u=a.split("="),o=u[0],c=u[1];if(e[o])return{id:c,type:e[o]}}}function no(){var r=document.querySelector("link[rel='canonical']");if(r)return r.getAttribute("href")||void 0}function Mu(){var r=no();if(!r)return window.location.pathname;var e=document.createElement("a");e.href=r;var t=e.pathname.startsWith("/")?e.pathname:"/"+e.pathname;return t}function Ru(r){r===void 0&&(r="");var e=no();if(e)return e.includes("?")?e:"".concat(e).concat(r);var t=window.location.href,n=t.indexOf("#");return n===-1?t:t.slice(0,n)}function Lu(){return{path:Mu(),referrer:document.referrer,search:location.search,title:document.title,url:Ru(location.search)}}function ju(r){return r.startsWith("?")&&(r=r.substring(1)),r=r.replace(/\?/g,"&"),r.split("&").reduce(function(e,t){var n=t.split("="),i=n[0],a=n[1],u=a===void 0?"":a;if(i.includes("utm_")&&i.length>4){var o=i.substr(4);o==="campaign"&&(o="name"),e[o]=ro(u)}return e},{})}function ku(){var r=N.get("_ga");if(r&&r.startsWith("amp"))return r}function Tu(r,e,t){var n,i=new ne(t?[]:[new Qa(Eu())]),a=i.get("s:context.referrer"),u=(n=$u(r))!==null&&n!==void 0?n:a;u&&(e&&(e.referrer=A(A({},e.referrer),u)),i.set("s:context.referrer",u))}var xu=function(){function r(){var e=this;this.name="Page Enrichment",this.type="before",this.version="0.1.0",this.isLoaded=function(){return!0},this.load=function(t,n){return e.instance=n,Promise.resolve()},this.enrich=function(t){var n,i,a,u=t.event,o=(n=u.context)!==null&&n!==void 0?n:u.context={},c=Lu(),s;u.type==="page"&&(s=u.properties&&qu(u.properties,Object.keys(c)),u.properties=A(A(A({},c),u.properties),u.name?{name:u.name}:{})),o.page=A(A(A({},c),s),o.page);var d=o.page.search||"";o.userAgent=navigator.userAgent;var h=navigator.userLanguage||navigator.language;typeof o.locale>"u"&&typeof h<"u"&&(o.locale=h),(i=o.library)!==null&&i!==void 0||(o.library={name:"analytics.js",version:"".concat("npm:next","-").concat(De)}),d&&!o.campaign&&(o.campaign=ju(d));var y=ku();return y&&(o.amp={id:y}),Tu(d,o,(a=e.instance.options.disableClientPersistence)!==null&&a!==void 0?a:!1),t},this.track=this.enrich,this.identify=this.enrich,this.page=this.enrich,this.group=this.enrich,this.alias=this.enrich,this.screen=this.enrich}return r}(),Cu=new xu;function io(r){var e=Array.prototype.slice.call(window.document.querySelectorAll("script"));return e.find(function(t){return t.src===r})}function ye(r,e){var t=io(r);if(t!==void 0){var n=t==null?void 0:t.getAttribute("status");if(n==="loaded")return Promise.resolve(t);if(n==="loading")return new Promise(function(i,a){t.addEventListener("load",function(){return i(t)}),t.addEventListener("error",function(u){return a(u)})})}return new Promise(function(i,a){var u,o=window.document.createElement("script");o.type="text/javascript",o.src=r,o.async=!0,o.setAttribute("status","loading");for(var c=0,s=Object.entries({});c<s.length;c++){var d=s[c],h=d[0],y=d[1];o.setAttribute(h,y)}o.onload=function(){o.onerror=o.onload=null,o.setAttribute("status","loaded"),i(o)},o.onerror=function(){o.onerror=o.onload=null,o.setAttribute("status","error"),a(new Error("Failed to load ".concat(r)))};var g=window.document.getElementsByTagName("script")[0];(u=g.parentElement)===null||u===void 0||u.insertBefore(o,g)})}function Fu(r){var e=io(r);return e!==void 0&&e.remove(),Promise.resolve()}var ge={},H={},le={},Ke={exports:{}},wn;function Ue(){return wn||(wn=1,function(r){r.exports=e(t),r.exports.find=r.exports,r.exports.replace=function(o,c,s,d){return e(i).call(this,o,c,s,d),o},r.exports.del=function(o,c,s){return e(n).call(this,o,c,null,s),o};function e(o){return function(c,s,d,h){var y=h&&u(h.normalizer)?h.normalizer:a;s=y(s);for(var g,_=!1;!_;)w();function w(){for(g in c){var S=y(g);if(s.indexOf(S)===0){var b=s.substr(S.length);if(b.charAt(0)==="."||b.length===0){s=b.substr(1);var f=c[g];if(f==null){_=!0;return}if(!s.length){_=!0;return}c=f;return}}}g=void 0,_=!0}if(g)return c==null?c:o(c,g,d)}}function t(o,c){if(o.hasOwnProperty(c))return o[c]}function n(o,c){return o.hasOwnProperty(c)&&delete o[c],o}function i(o,c,s){return o.hasOwnProperty(c)&&(o[c]=s),o}function a(o){return o.replace(/[^a-zA-Z0-9\.]+/g,"").toLowerCase()}function u(o){return typeof o=="function"}}(Ke)),Ke.exports}var Sn;function Du(){if(Sn)return le;Sn=1;var r=le&&le.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(le,"__esModule",{value:!0});var e=r(Ue());function t(i,a){return function(){var u=this.traits(),o=this.properties?this.properties():{};return e.default(u,"address."+i)||e.default(u,i)||(a?e.default(u,"address."+a):null)||(a?e.default(u,a):null)||e.default(o,"address."+i)||e.default(o,i)||(a?e.default(o,"address."+a):null)||(a?e.default(o,a):null)}}function n(i){i.zip=t("postalCode","zip"),i.country=t("country"),i.street=t("street"),i.state=t("state"),i.city=t("city"),i.region=t("region")}return le.default=n,le}var be={},An;function Nu(){if(An)return be;An=1,Object.defineProperty(be,"__esModule",{value:!0}),be.clone=void 0;function r(e){if(typeof e!="object")return e;if(Object.prototype.toString.call(e)==="[object Object]"){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=r(e[n]));return t}else return Array.isArray(e)?e.map(r):e}return be.clone=r,be}var Pe={},Pn;function Uu(){if(Pn)return Pe;Pn=1,Object.defineProperty(Pe,"__esModule",{value:!0});var r={Salesforce:!0};function e(t){return!r[t]}return Pe.default=e,Pe}var Ie={},In;function ao(){if(In)return Ie;In=1;var r=/^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;return Ie.parse=function(e){var t=[1,5,6,7,11,12],n=r.exec(e),i=0;if(!n)return new Date(e);for(var a=0,u;u=t[a];a++)n[u]=parseInt(n[u],10)||0;n[2]=parseInt(n[2],10)||1,n[3]=parseInt(n[3],10)||1,n[2]--,n[8]=n[8]?(n[8]+"00").substring(0,3):0,n[4]===" "?i=new Date().getTimezoneOffset():n[9]!=="Z"&&n[10]&&(i=n[11]*60+n[12],n[10]==="+"&&(i=0-i));var o=Date.UTC(n[1],n[2],n[3],n[5],n[6]+i,n[7],n[8]);return new Date(o)},Ie.is=function(e,t){return typeof e!="string"||t&&/^\d{4}-\d{2}-\d{2}/.test(e)===!1?!1:r.test(e)},Ie}var Oe={},On;function Bu(){if(On)return Oe;On=1;var r=/\d{13}/;return Oe.is=function(e){return r.test(e)},Oe.parse=function(e){return e=parseInt(e,10),new Date(e)},Oe}var qe={},qn;function zu(){if(qn)return qe;qn=1;var r=/\d{10}/;return qe.is=function(e){return r.test(e)},qe.parse=function(e){var t=parseInt(e,10)*1e3;return new Date(t)},qe}var Je,En;function an(){if(En)return Je;En=1;var r=ao(),e=Bu(),t=zu(),n=Object.prototype,i=n.toString;function a(c){return i.call(c)==="[object Date]"}function u(c){return i.call(c)==="[object Number]"}Je=function(s){return a(s)?s:u(s)?new Date(o(s)):r.is(s)?r.parse(s):e.is(s)?e.parse(s):t.is(s)?t.parse(s):new Date(s)};function o(c){return c<315576e5?c*1e3:c}return Je}var Qe,$n;function Vu(){if($n)return Qe;$n=1;var r=ao();Qe=e;function e(i,a){return a===void 0&&(a=!0),i&&typeof i=="object"?t(i,a):Array.isArray(i)?n(i,a):r.is(i,a)?r.parse(i):i}function t(i,a){return Object.keys(i).forEach(function(u){i[u]=e(i[u],a)}),i}function n(i,a){return i.forEach(function(u,o){i[o]=e(u,a)}),i}return Qe}var Mn;function ue(){if(Mn)return H;Mn=1;var r=H&&H.__importDefault||function(d){return d&&d.__esModule?d:{default:d}};Object.defineProperty(H,"__esModule",{value:!0}),H.Facade=void 0;var e=r(Du()),t=Nu(),n=r(Uu()),i=r(an()),a=r(Ue()),u=r(Vu());function o(d,h){h=h||{},this.raw=t.clone(d),"clone"in h||(h.clone=!0),h.clone&&(d=t.clone(d)),"traverse"in h||(h.traverse=!0),"timestamp"in d?d.timestamp=i.default(d.timestamp):d.timestamp=new Date,h.traverse&&u.default(d),this.opts=h,this.obj=d}H.Facade=o;var c=o.prototype;c.proxy=function(d){var h=d.split(".");d=h.shift();var y=this[d]||this.obj[d];return y&&(typeof y=="function"&&(y=y.call(this)||{}),h.length===0?this.opts.clone?s(y):y:(y=a.default(y,h.join(".")),this.opts.clone?s(y):y))},c.field=function(d){var h=this.obj[d];return this.opts.clone?s(h):h},o.proxy=function(d){return function(){return this.proxy(d)}},o.field=function(d){return function(){return this.field(d)}},o.multi=function(d){return function(){var h=this.proxy(d+"s");if(Array.isArray(h))return h;var y=this.proxy(d);return y&&(y=[this.opts.clone?t.clone(y):y]),y||[]}},o.one=function(d){return function(){var h=this.proxy(d);if(h)return h;var y=this.proxy(d+"s");if(Array.isArray(y))return y[0]}},c.json=function(){var d=this.opts.clone?t.clone(this.obj):this.obj;return this.type&&(d.type=this.type()),d},c.rawEvent=function(){return this.raw},c.options=function(d){var h=this.obj.options||this.obj.context||{},y=this.opts.clone?t.clone(h):h;if(!d)return y;if(this.enabled(d)){var g=this.integrations(),_=g[d]||a.default(g,d);return typeof _!="object"&&(_=a.default(this.options(),d)),typeof _=="object"?_:{}}},c.context=c.options,c.enabled=function(d){var h=this.proxy("options.providers.all");typeof h!="boolean"&&(h=this.proxy("options.all")),typeof h!="boolean"&&(h=this.proxy("integrations.all")),typeof h!="boolean"&&(h=!0);var y=h&&n.default(d),g=this.integrations();if(g.providers&&g.providers.hasOwnProperty(d)&&(y=g.providers[d]),g.hasOwnProperty(d)){var _=g[d];typeof _=="boolean"?y=_:y=!0}return!!y},c.integrations=function(){return this.obj.integrations||this.proxy("options.providers")||this.options()},c.active=function(){var d=this.proxy("options.active");return d==null&&(d=!0),d},c.anonymousId=function(){return this.field("anonymousId")||this.field("sessionId")},c.sessionId=c.anonymousId,c.groupId=o.proxy("options.groupId"),c.traits=function(d){var h=this.proxy("options.traits")||{},y=this.userId();d=d||{},y&&(h.id=y);for(var g in d)if(Object.prototype.hasOwnProperty.call(d,g)){var _=this[g]==null?this.proxy("options.traits."+g):this[g]();if(_==null)continue;h[d[g]]=_,delete h[g]}return h},c.library=function(){var d=this.proxy("options.library");return d?typeof d=="string"?{name:d,version:null}:d:{name:"unknown",version:null}},c.device=function(){var d=this.proxy("context.device");(typeof d!="object"||d===null)&&(d={});var h=this.library().name;return d.type||(h.indexOf("ios")>-1&&(d.type="ios"),h.indexOf("android")>-1&&(d.type="android")),d},c.userAgent=o.proxy("context.userAgent"),c.timezone=o.proxy("context.timezone"),c.timestamp=o.field("timestamp"),c.channel=o.field("channel"),c.ip=o.proxy("context.ip"),c.userId=o.field("userId"),e.default(c);function s(d){return t.clone(d)}return H}var G={},Ee={exports:{}},Rn;function se(){return Rn||(Rn=1,typeof Object.create=="function"?Ee.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:Ee.exports=function(e,t){if(t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}}),Ee.exports}var Ln;function Hu(){if(Ln)return G;Ln=1;var r=G&&G.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(G,"__esModule",{value:!0}),G.Alias=void 0;var e=r(se()),t=ue();function n(i,a){t.Facade.call(this,i,a)}return G.Alias=n,e.default(n,t.Facade),n.prototype.action=function(){return"alias"},n.prototype.type=n.prototype.action,n.prototype.previousId=function(){return this.field("previousId")||this.field("from")},n.prototype.from=n.prototype.previousId,n.prototype.userId=function(){return this.field("userId")||this.field("to")},n.prototype.to=n.prototype.userId,G}var W={},$e={},jn;function Be(){if(jn)return $e;jn=1,Object.defineProperty($e,"__esModule",{value:!0});var r=/.+\@.+\..+/;function e(t){return r.test(t)}return $e.default=e,$e}var kn;function Gu(){if(kn)return W;kn=1;var r=W&&W.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(W,"__esModule",{value:!0}),W.Group=void 0;var e=r(se()),t=r(Be()),n=r(an()),i=ue();function a(o,c){i.Facade.call(this,o,c)}W.Group=a,e.default(a,i.Facade);var u=a.prototype;return u.action=function(){return"group"},u.type=u.action,u.groupId=i.Facade.field("groupId"),u.created=function(){var o=this.proxy("traits.createdAt")||this.proxy("traits.created")||this.proxy("properties.createdAt")||this.proxy("properties.created");if(o)return n.default(o)},u.email=function(){var o=this.proxy("traits.email");if(o)return o;var c=this.groupId();if(t.default(c))return c},u.traits=function(o){var c=this.properties(),s=this.groupId();o=o||{},s&&(c.id=s);for(var d in o)if(Object.prototype.hasOwnProperty.call(o,d)){var h=this[d]==null?this.proxy("traits."+d):this[d]();if(h==null)continue;c[o[d]]=h,delete c[d]}return c},u.name=i.Facade.proxy("traits.name"),u.industry=i.Facade.proxy("traits.industry"),u.employees=i.Facade.proxy("traits.employees"),u.properties=function(){return this.field("traits")||this.field("properties")||{}},W}var K={},Tn;function oo(){if(Tn)return K;Tn=1;var r=K&&K.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(K,"__esModule",{value:!0}),K.Identify=void 0;var e=ue(),t=r(Ue()),n=r(se()),i=r(Be()),a=r(an()),u=function(s){return s.trim()};function o(s,d){e.Facade.call(this,s,d)}K.Identify=o,n.default(o,e.Facade);var c=o.prototype;return c.action=function(){return"identify"},c.type=c.action,c.traits=function(s){var d=this.field("traits")||{},h=this.userId();s=s||{},h&&(d.id=h);for(var y in s){var g=this[y]==null?this.proxy("traits."+y):this[y]();g!=null&&(d[s[y]]=g,y!==s[y]&&delete d[y])}return d},c.email=function(){var s=this.proxy("traits.email");if(s)return s;var d=this.userId();if(i.default(d))return d},c.created=function(){var s=this.proxy("traits.created")||this.proxy("traits.createdAt");if(s)return a.default(s)},c.companyCreated=function(){var s=this.proxy("traits.company.created")||this.proxy("traits.company.createdAt");if(s)return a.default(s)},c.companyName=function(){return this.proxy("traits.company.name")},c.name=function(){var s=this.proxy("traits.name");if(typeof s=="string")return u(s);var d=this.firstName(),h=this.lastName();if(d&&h)return u(d+" "+h)},c.firstName=function(){var s=this.proxy("traits.firstName");if(typeof s=="string")return u(s);var d=this.proxy("traits.name");if(typeof d=="string")return u(d).split(" ")[0]},c.lastName=function(){var s=this.proxy("traits.lastName");if(typeof s=="string")return u(s);var d=this.proxy("traits.name");if(typeof d=="string"){var h=u(d).indexOf(" ");if(h!==-1)return u(d.substr(h+1))}},c.uid=function(){return this.userId()||this.username()||this.email()},c.description=function(){return this.proxy("traits.description")||this.proxy("traits.background")},c.age=function(){var s=this.birthday(),d=t.default(this.traits(),"age");if(d!=null)return d;if(s instanceof Date){var h=new Date;return h.getFullYear()-s.getFullYear()}},c.avatar=function(){var s=this.traits();return t.default(s,"avatar")||t.default(s,"photoUrl")||t.default(s,"avatarUrl")},c.position=function(){var s=this.traits();return t.default(s,"position")||t.default(s,"jobTitle")},c.username=e.Facade.proxy("traits.username"),c.website=e.Facade.one("traits.website"),c.websites=e.Facade.multi("traits.website"),c.phone=e.Facade.one("traits.phone"),c.phones=e.Facade.multi("traits.phone"),c.address=e.Facade.proxy("traits.address"),c.gender=e.Facade.proxy("traits.gender"),c.birthday=e.Facade.proxy("traits.birthday"),K}var J={},xn;function on(){if(xn)return J;xn=1;var r=J&&J.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(J,"__esModule",{value:!0}),J.Track=void 0;var e=r(se()),t=ue(),n=oo(),i=r(Be()),a=r(Ue());function u(s,d){t.Facade.call(this,s,d)}J.Track=u,e.default(u,t.Facade);var o=u.prototype;o.action=function(){return"track"},o.type=o.action,o.event=t.Facade.field("event"),o.value=t.Facade.proxy("properties.value"),o.category=t.Facade.proxy("properties.category"),o.id=t.Facade.proxy("properties.id"),o.productId=function(){return this.proxy("properties.product_id")||this.proxy("properties.productId")},o.promotionId=function(){return this.proxy("properties.promotion_id")||this.proxy("properties.promotionId")},o.cartId=function(){return this.proxy("properties.cart_id")||this.proxy("properties.cartId")},o.checkoutId=function(){return this.proxy("properties.checkout_id")||this.proxy("properties.checkoutId")},o.paymentId=function(){return this.proxy("properties.payment_id")||this.proxy("properties.paymentId")},o.couponId=function(){return this.proxy("properties.coupon_id")||this.proxy("properties.couponId")},o.wishlistId=function(){return this.proxy("properties.wishlist_id")||this.proxy("properties.wishlistId")},o.reviewId=function(){return this.proxy("properties.review_id")||this.proxy("properties.reviewId")},o.orderId=function(){return this.proxy("properties.id")||this.proxy("properties.order_id")||this.proxy("properties.orderId")},o.sku=t.Facade.proxy("properties.sku"),o.tax=t.Facade.proxy("properties.tax"),o.name=t.Facade.proxy("properties.name"),o.price=t.Facade.proxy("properties.price"),o.total=t.Facade.proxy("properties.total"),o.repeat=t.Facade.proxy("properties.repeat"),o.coupon=t.Facade.proxy("properties.coupon"),o.shipping=t.Facade.proxy("properties.shipping"),o.discount=t.Facade.proxy("properties.discount"),o.shippingMethod=function(){return this.proxy("properties.shipping_method")||this.proxy("properties.shippingMethod")},o.paymentMethod=function(){return this.proxy("properties.payment_method")||this.proxy("properties.paymentMethod")},o.description=t.Facade.proxy("properties.description"),o.plan=t.Facade.proxy("properties.plan"),o.subtotal=function(){var s=a.default(this.properties(),"subtotal"),d=this.total()||this.revenue();if(s)return s;if(!d)return 0;if(this.total()){var h=this.tax();h&&(d-=h),h=this.shipping(),h&&(d-=h),h=this.discount(),h&&(d+=h)}return d},o.products=function(){var s=this.properties(),d=a.default(s,"products");return Array.isArray(d)?d.filter(function(h){return h!==null}):[]},o.quantity=function(){var s=this.obj.properties||{};return s.quantity||1},o.currency=function(){var s=this.obj.properties||{};return s.currency||"USD"},o.referrer=function(){return this.proxy("context.referrer.url")||this.proxy("context.page.referrer")||this.proxy("properties.referrer")},o.query=t.Facade.proxy("options.query"),o.properties=function(s){var d=this.field("properties")||{};s=s||{};for(var h in s)if(Object.prototype.hasOwnProperty.call(s,h)){var y=this[h]==null?this.proxy("properties."+h):this[h]();if(y==null)continue;d[s[h]]=y,delete d[h]}return d},o.username=function(){return this.proxy("traits.username")||this.proxy("properties.username")||this.userId()||this.sessionId()},o.email=function(){var s=this.proxy("traits.email")||this.proxy("properties.email")||this.proxy("options.traits.email");if(s)return s;var d=this.userId();if(i.default(d))return d},o.revenue=function(){var s=this.proxy("properties.revenue"),d=this.event(),h=/^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;return!s&&d&&d.match(h)&&(s=this.proxy("properties.total")),c(s)},o.cents=function(){var s=this.revenue();return typeof s!="number"?this.value()||0:s*100},o.identify=function(){var s=this.json();return s.traits=this.traits(),new n.Identify(s,this.opts)};function c(s){if(s){if(typeof s=="number")return s;if(typeof s=="string"&&(s=s.replace(/\$/g,""),s=parseFloat(s),!isNaN(s)))return s}}return J}var Q={},Cn;function uo(){if(Cn)return Q;Cn=1;var r=Q&&Q.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(Q,"__esModule",{value:!0}),Q.Page=void 0;var e=r(se()),t=ue(),n=on(),i=r(Be());function a(o,c){t.Facade.call(this,o,c)}Q.Page=a,e.default(a,t.Facade);var u=a.prototype;return u.action=function(){return"page"},u.type=u.action,u.category=t.Facade.field("category"),u.name=t.Facade.field("name"),u.title=t.Facade.proxy("properties.title"),u.path=t.Facade.proxy("properties.path"),u.url=t.Facade.proxy("properties.url"),u.referrer=function(){return this.proxy("context.referrer.url")||this.proxy("context.page.referrer")||this.proxy("properties.referrer")},u.properties=function(o){var c=this.field("properties")||{},s=this.category(),d=this.name();o=o||{},s&&(c.category=s),d&&(c.name=d);for(var h in o)if(Object.prototype.hasOwnProperty.call(o,h)){var y=this[h]==null?this.proxy("properties."+h):this[h]();if(y==null)continue;c[o[h]]=y,h!==o[h]&&delete c[h]}return c},u.email=function(){var o=this.proxy("context.traits.email")||this.proxy("properties.email");if(o)return o;var c=this.userId();if(i.default(c))return c},u.fullName=function(){var o=this.category(),c=this.name();return c&&o?o+" "+c:c},u.event=function(o){return o?"Viewed "+o+" Page":"Loaded a Page"},u.track=function(o){var c=this.json();return c.event=this.event(o),c.timestamp=this.timestamp(),c.properties=this.properties(),new n.Track(c,this.opts)},Q}var X={},Fn;function Wu(){if(Fn)return X;Fn=1;var r=X&&X.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(X,"__esModule",{value:!0}),X.Screen=void 0;var e=r(se()),t=uo(),n=on();function i(a,u){t.Page.call(this,a,u)}return X.Screen=i,e.default(i,t.Page),i.prototype.action=function(){return"screen"},i.prototype.type=i.prototype.action,i.prototype.event=function(a){return a?"Viewed "+a+" Screen":"Loaded a Screen"},i.prototype.track=function(a){var u=this.json();return u.event=this.event(a),u.timestamp=this.timestamp(),u.properties=this.properties(),new n.Track(u,this.opts)},X}var Y={},Dn;function Ku(){if(Dn)return Y;Dn=1;var r=Y&&Y.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Y,"__esModule",{value:!0}),Y.Delete=void 0;var e=r(se()),t=ue();function n(i,a){t.Facade.call(this,i,a)}return Y.Delete=n,e.default(n,t.Facade),n.prototype.type=function(){return"delete"},Y}var Nn;function Ju(){return Nn||(Nn=1,function(r){var e=ge&&ge.__assign||function(){return e=Object.assign||function(d){for(var h,y=1,g=arguments.length;y<g;y++){h=arguments[y];for(var _ in h)Object.prototype.hasOwnProperty.call(h,_)&&(d[_]=h[_])}return d},e.apply(this,arguments)};Object.defineProperty(r,"__esModule",{value:!0}),r.Delete=r.Screen=r.Page=r.Track=r.Identify=r.Group=r.Alias=r.Facade=void 0;var t=ue();Object.defineProperty(r,"Facade",{enumerable:!0,get:function(){return t.Facade}});var n=Hu();Object.defineProperty(r,"Alias",{enumerable:!0,get:function(){return n.Alias}});var i=Gu();Object.defineProperty(r,"Group",{enumerable:!0,get:function(){return i.Group}});var a=oo();Object.defineProperty(r,"Identify",{enumerable:!0,get:function(){return a.Identify}});var u=on();Object.defineProperty(r,"Track",{enumerable:!0,get:function(){return u.Track}});var o=uo();Object.defineProperty(r,"Page",{enumerable:!0,get:function(){return o.Page}});var c=Wu();Object.defineProperty(r,"Screen",{enumerable:!0,get:function(){return c.Screen}});var s=Ku();Object.defineProperty(r,"Delete",{enumerable:!0,get:function(){return s.Delete}}),r.default=e(e({},t.Facade),{Alias:n.Alias,Group:i.Group,Identify:a.Identify,Track:u.Track,Page:o.Page,Screen:c.Screen,Delete:s.Delete})}(ge)),ge}var T=Ju();function xe(r,e){var t=new T.Facade(r,e);return r.type==="track"&&(t=new T.Track(r,e)),r.type==="identify"&&(t=new T.Identify(r,e)),r.type==="page"&&(t=new T.Page(r,e)),r.type==="alias"&&(t=new T.Alias(r,e)),r.type==="group"&&(t=new T.Group(r,e)),r.type==="screen"&&(t=new T.Screen(r,e)),Object.defineProperty(t,"obj",{value:r,writable:!0}),t}function un(r,e,t){return P(this,void 0,void 0,function(){function n(s,d){return P(this,void 0,void 0,function(){var h,y,g;return I(this,function(_){switch(_.label){case 0:return h=!1,y=null,[4,d({payload:xe(s,{clone:!0,traverse:!1}),integration:r,next:function(w){h=!0,w===null&&(y=null),w&&(y=w.obj)}})];case 1:return _.sent(),!h&&y!==null&&(y=y,y.integrations=A(A({},s.integrations),(g={},g[r]=!1,g))),[2,y]}})})}var i,a,u,o,c;return I(this,function(s){switch(s.label){case 0:i=xe(e,{clone:!0,traverse:!1}).rawEvent(),a=0,u=t,s.label=1;case 1:return a<u.length?(o=u[a],[4,n(i,o)]):[3,4];case 2:if(c=s.sent(),c===null)return[2,null];i=c,s.label=3;case 3:return a++,[3,1];case 4:return[2,i]}})})}function Qu(r,e){function t(n){return P(this,void 0,void 0,function(){var i;return I(this,function(a){switch(a.label){case 0:return i=!1,[4,r({payload:xe(n.event,{clone:!0,traverse:!1}),integrations:e!=null?e:{},next:function(u){i=!0,u&&(n.event=u.obj)}})];case 1:if(a.sent(),!i)throw new B({retry:!1,type:"middleware_cancellation",reason:"Middleware `next` function skipped"});return[2,n]}})})}return{name:"Source Middleware ".concat(r.name),type:"before",version:"0.1.0",isLoaded:function(){return!0},load:function(n){return Promise.resolve(n)},track:t,page:t,identify:t,alias:t,group:t}}const Xu=Object.freeze(Object.defineProperty({__proto__:null,applyDestinationMiddleware:un,sourceMiddlewarePlugin:Qu},Symbol.toStringTag,{value:"Module"}));var Yu=function(){function r(e,t){this.version="1.0.0",this.alternativeNames=[],this.middleware=[],this.alias=this._createMethod("alias"),this.group=this._createMethod("group"),this.identify=this._createMethod("identify"),this.page=this._createMethod("page"),this.screen=this._createMethod("screen"),this.track=this._createMethod("track"),this.action=t,this.name=e,this.type=t.type,this.alternativeNames.push(t.name)}return r.prototype.addMiddleware=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this.type==="destination"&&(e=this.middleware).push.apply(e,t)},r.prototype.transform=function(e){return P(this,void 0,void 0,function(){var t;return I(this,function(n){switch(n.label){case 0:return[4,un(this.name,e.event,this.middleware)];case 1:return t=n.sent(),t===null&&e.cancel(new B({retry:!1,reason:"dropped by destination middleware"})),[2,new re(t)]}})})},r.prototype._createMethod=function(e){var t=this;return function(n){return P(t,void 0,void 0,function(){var i;return I(this,function(a){switch(a.label){case 0:return this.action[e]?(i=n,this.type!=="destination"?[3,2]:[4,this.transform(n)]):[2,n];case 1:i=a.sent(),a.label=2;case 2:return[4,this.action[e](i)];case 3:return a.sent(),[2,n]}})})}},r.prototype.isLoaded=function(){return this.action.isLoaded()},r.prototype.ready=function(){return this.action.ready?this.action.ready():Promise.resolve()},r.prototype.load=function(e,t){return this.action.load(e,t)},r.prototype.unload=function(e,t){var n,i;return(i=(n=this.action).unload)===null||i===void 0?void 0:i.call(n,e,t)},r}();function Zu(r){if(!Array.isArray(r))throw new Error("Not a valid list of plugins");var e=["load","isLoaded","name","version","type"];return r.forEach(function(t){e.forEach(function(n){var i;if(t[n]===void 0)throw new Error("Plugin: ".concat((i=t.name)!==null&&i!==void 0?i:"unknown"," missing required function ").concat(n))})}),!0}function es(r,e){var t=r[e.creationName],n=r[e.name];return r.All===!1&&!t&&!n||t===!1||n===!1}function ts(r,e){return P(this,void 0,void 0,function(){var t,n,i,a,u;return I(this,function(o){switch(o.label){case 0:if(t=new RegExp("https://cdn.segment.(com|build)"),n=rn(),!e)return[3,6];i=r.url.split("/"),a=i[i.length-2],u=r.url.replace(a,btoa(a).replace(/=/g,"")),o.label=1;case 1:return o.trys.push([1,3,,5]),[4,ye(u.replace(t,n))];case 2:return o.sent(),[3,5];case 3:return o.sent(),[4,ye(r.url.replace(t,n))];case 4:return o.sent(),[3,5];case 5:return[3,8];case 6:return[4,ye(r.url.replace(t,n))];case 7:o.sent(),o.label=8;case 8:return typeof window[r.libraryName]=="function"?[2,window[r.libraryName]]:[2]}})})}function rs(r,e,t,n,i,a){var u,o,c;return P(this,void 0,void 0,function(){var s,d,h,y=this;return I(this,function(g){switch(g.label){case 0:return s=[],d=(o=(u=r.middlewareSettings)===null||u===void 0?void 0:u.routingRules)!==null&&o!==void 0?o:[],h=((c=r.remotePlugins)!==null&&c!==void 0?c:[]).map(function(_){return P(y,void 0,void 0,function(){var w,S,b,f,l,v;return I(this,function(p){switch(p.label){case 0:if(es(e,_))return[2];p.label=1;case 1:return p.trys.push([1,6,,7]),S=a==null?void 0:a.find(function(m){var O=m.pluginName;return O===_.name}),S?[3,3]:[4,ts(_,n)];case 2:S=p.sent(),p.label=3;case 3:return w=S,w?[4,w(A(A({},_.settings),t[_.name]))]:[3,5];case 4:b=p.sent(),f=Array.isArray(b)?b:[b],Zu(f),l=d.filter(function(m){return m.destinationName===_.creationName}),f.forEach(function(m){var O=new Yu(_.creationName,m);l.length&&i&&m.type==="destination"&&O.addMiddleware(i),s.push(O)}),p.label=5;case 5:return[3,7];case 6:return v=p.sent(),console.warn("Failed to load Remote Plugin",v),[3,7];case 7:return[2]}})})}),[4,Promise.all(h)];case 1:return g.sent(),[2,s.filter(Boolean)]}})})}var ns=function(r){var e=!1;window.addEventListener("pagehide",function(){e||(e=!0,r(e))}),document.addEventListener("visibilitychange",function(){if(document.visibilityState=="hidden"){if(e)return;e=!0}else e=!1;r(e)})},is=500;function so(r){var e=encodeURI(JSON.stringify(r)).split(/%..|./).length-1;return e/1024}function as(r){return so(r)>=is-50}function os(r){var e=[],t=0;return r.forEach(function(n){var i=so(e[t]);i>=64&&t++,e[t]?e[t].push(n):e[t]=[n]}),e}function us(r,e){var t,n,i=[],a=!1,u=(t=e==null?void 0:e.size)!==null&&t!==void 0?t:10,o=(n=e==null?void 0:e.timeout)!==null&&n!==void 0?n:5e3;function c(g){var _;if(g.length!==0){var w=(_=g[0])===null||_===void 0?void 0:_.writeKey,S=g.map(function(b){var f=b;f.sentAt;var l=xa(f,["sentAt"]);return l});return Fe("https://".concat(r,"/b"),{keepalive:a,headers:{"Content-Type":"text/plain"},method:"post",body:JSON.stringify({writeKey:w,batch:S,sentAt:new Date().toISOString()})})}}function s(){return P(this,void 0,void 0,function(){var g;return I(this,function(_){return i.length?(g=i,i=[],[2,c(g)]):[2]})})}var d;function h(){d||(d=setTimeout(function(){d=void 0,s().catch(console.error)},o))}ns(function(g){if(a=g,a&&i.length){var _=os(i).map(c);Promise.all(_).catch(console.error)}});function y(g,_){return P(this,void 0,void 0,function(){var w;return I(this,function(S){return i.push(_),w=i.length>=u||as(i),[2,w||a?s():h()]})})}return{dispatch:y}}function ss(r){function e(t,n){return Fe(t,{keepalive:r==null?void 0:r.keepalive,headers:{"Content-Type":"text/plain"},method:"post",body:JSON.stringify(n)})}return{dispatch:e}}function ls(r,e,t,n){var i,a=r.user();delete e.options,e.writeKey=t==null?void 0:t.apiKey,e.userId=e.userId||a.id(),e.anonymousId=e.anonymousId||a.anonymousId(),e.sentAt=new Date;var u=r.queue.failedInitializations||[];u.length>0&&(e._metadata={failedInitializations:u});var o=[],c=[];for(var s in n){var d=n[s];s==="Segment.io"&&o.push(s),d.bundlingStatus==="bundled"&&o.push(s),d.bundlingStatus==="unbundled"&&c.push(s)}for(var h=0,y=(t==null?void 0:t.unbundledIntegrations)||[];h<y.length;h++){var g=y[h];c.includes(g)||c.push(g)}var _=(i=t==null?void 0:t.maybeBundledConfigIds)!==null&&i!==void 0?i:{},w=[];return o.sort().forEach(function(S){var b;((b=_[S])!==null&&b!==void 0?b:[]).forEach(function(f){w.push(f)})}),(t==null?void 0:t.addBundledMetadata)!==!1&&(e._metadata=A(A({},e._metadata),{bundled:o.sort(),unbundled:c.sort(),bundledIds:w})),e}var lo=function(r,e){return P(void 0,void 0,void 0,function(){var t;return I(this,function(n){return t=function(i){return P(void 0,void 0,void 0,function(){var a;return I(this,function(u){switch(u.label){case 0:return r(i)?(a=t,[4,e()]):[3,2];case 1:return[2,a.apply(void 0,[u.sent()])];case 2:return[2]}})})},[2,t(void 0)]})})};function cs(r,e){return P(this,void 0,void 0,function(){var t,n=this;return I(this,function(i){switch(i.label){case 0:return t=[],ae()?[2,e]:[4,lo(function(){return e.length>0&&!ae()},function(){return P(n,void 0,void 0,function(){var a,u,o;return I(this,function(c){switch(c.label){case 0:return a=e.pop(),a?[4,pe(a,r)]:[2];case 1:return u=c.sent(),o=u instanceof re,o||t.push(a),[2]}})})})];case 1:return i.sent(),t.map(function(a){return e.pushWithBackoff(a)}),[2,e]}})})}function ce(r,e,t,n){var i=this;r||setTimeout(function(){return P(i,void 0,void 0,function(){var a,u;return I(this,function(o){switch(o.label){case 0:return a=!0,[4,cs(t,e)];case 1:return u=o.sent(),a=!1,e.todo>0&&n(a,u,t,n),[2]}})})},Math.random()*5e3)}function fs(r){return P(this,void 0,void 0,function(){var e;return I(this,function(t){return e=navigator.userAgentData,e?r?[2,e.getHighEntropyValues(r).catch(function(){return e.toJSON()})]:[2,e.toJSON()]:[2,void 0]})})}function ds(r,e){var t,n,i,a,u=r.user();return e.previousId=(i=(n=(t=e.previousId)!==null&&t!==void 0?t:e.from)!==null&&n!==void 0?n:u.id())!==null&&i!==void 0?i:u.anonymousId(),e.userId=(a=e.userId)!==null&&a!==void 0?a:e.to,delete e.from,delete e.to,e}function vs(r,e,t){var n,i,a;return P(this,void 0,void 0,function(){function u(f){return P(this,void 0,void 0,function(){var l,v;return I(this,function(p){return ae()?(c.push(f),ce(d,c,b,ce),[2,f]):(s.add(f),l=f.event.type.charAt(0),S&&f.event.context&&(f.event.context.userAgentData=S),v=xe(f.event).json(),f.event.type==="track"&&delete v.traits,f.event.type==="alias"&&(v=ds(r,v)),[2,w.dispatch("".concat(g,"/").concat(l),ls(r,v,e,t)).then(function(){return f}).catch(function(){return c.pushWithBackoff(f),ce(d,c,b,ce),f}).finally(function(){s.delete(f)})])})})}var o,c,s,d,h,y,g,_,w,S,b;return I(this,function(f){switch(f.label){case 0:window.addEventListener("pagehide",function(){c.push.apply(c,Array.from(s)),s.clear()}),o=(n=e==null?void 0:e.apiKey)!==null&&n!==void 0?n:"",c=r.options.disableClientPersistence?new Ce(r.queue.queue.maxAttempts,[]):new Ne(r.queue.queue.maxAttempts,"".concat(o,":dest-Segment.io")),s=new Set,d=!1,h=(i=e==null?void 0:e.apiHost)!==null&&i!==void 0?i:za,y=(a=e==null?void 0:e.protocol)!==null&&a!==void 0?a:"https",g="".concat(y,"://").concat(h),_=e==null?void 0:e.deliveryStrategy,w=(_==null?void 0:_.strategy)==="batching"?us(h,_.config):ss(_==null?void 0:_.config),f.label=1;case 1:return f.trys.push([1,3,,4]),[4,fs(r.options.highEntropyValuesClientHints)];case 2:return S=f.sent(),[3,4];case 3:return f.sent(),S=void 0,[3,4];case 4:return b={name:"Segment.io",type:"after",version:"0.1.0",isLoaded:function(){return!0},load:function(){return Promise.resolve()},track:u,identify:u,page:u,alias:u,group:u,screen:u},c.todo&&ce(d,c,b,ce),[2,b]}})})}function fe(r){var e,t=r.event;To(t),xo(t),t.type==="track"&&Co(t);var n=(e=t.properties)!==null&&e!==void 0?e:t.traits;if(t.type!=="alias"&&!k(n))throw new ie(".properties","is not an object");return ko(t),r}var hs={name:"Event Validation",type:"before",version:"1.0.0",isLoaded:function(){return!0},load:function(){return Promise.resolve()},track:fe,identify:fe,page:fe,alias:fe,group:fe,screen:fe},ps=function(r){return typeof r=="object"&&r!==null&&"then"in r&&typeof r.then=="function"},co=function(r,e,t){t.getCalls(r).forEach(function(n){sn(e,n).catch(console.error)})},ys=function(r,e){return P(void 0,void 0,void 0,function(){var t,n,i;return I(this,function(a){switch(a.label){case 0:t=0,n=e.getCalls("addSourceMiddleware"),a.label=1;case 1:return t<n.length?(i=n[t],[4,sn(r,i).catch(console.error)]):[3,4];case 2:a.sent(),a.label=3;case 3:return t++,[3,1];case 4:return[2]}})})},ms=co.bind(void 0,"on"),gs=co.bind(void 0,"setAnonymousId"),bs=function(r,e){e.toArray().forEach(function(t){setTimeout(function(){sn(r,t).catch(console.error)},0)})},_s=function(){function r(){this._value={}}return r.prototype.toArray=function(){var e;return(e=[]).concat.apply(e,Object.values(this._value))},r.prototype.getCalls=function(e){var t;return(t=this._value[e])!==null&&t!==void 0?t:[]},r.prototype.push=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.forEach(function(i){e._value[i.method]?e._value[i.method].push(i):e._value[i.method]=[i]}),this},r.prototype.clear=function(){return this._value={},this},r}();function sn(r,e){return P(this,void 0,void 0,function(){var t,n;return I(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),e.called?[2,void 0]:(e.called=!0,t=r[e.method].apply(r,e.args),ps(t)?[4,t]:[3,2]);case 1:i.sent(),i.label=2;case 2:return e.resolve(t),[3,4];case 3:return n=i.sent(),e.reject(n),[3,4];case 4:return[2]}})})}var ws=function(){function r(e){var t=this;this._preInitBuffer=new _s,this.trackSubmit=this._createMethod("trackSubmit"),this.trackClick=this._createMethod("trackClick"),this.trackLink=this._createMethod("trackLink"),this.pageView=this._createMethod("pageview"),this.identify=this._createMethod("identify"),this.reset=this._createMethod("reset"),this.group=this._createMethod("group"),this.track=this._createMethod("track"),this.ready=this._createMethod("ready"),this.alias=this._createMethod("alias"),this.debug=this._createChainableMethod("debug"),this.page=this._createMethod("page"),this.once=this._createChainableMethod("once"),this.off=this._createChainableMethod("off"),this.on=this._createChainableMethod("on"),this.addSourceMiddleware=this._createMethod("addSourceMiddleware"),this.setAnonymousId=this._createMethod("setAnonymousId"),this.addDestinationMiddleware=this._createMethod("addDestinationMiddleware"),this.screen=this._createMethod("screen"),this.register=this._createMethod("register"),this.deregister=this._createMethod("deregister"),this.user=this._createMethod("user"),this.VERSION=De,this._promise=e(this._preInitBuffer),this._promise.then(function(n){var i=n[0],a=n[1];t.instance=i,t.ctx=a}).catch(function(){})}return r.prototype.then=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).then.apply(e,t)},r.prototype.catch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).catch.apply(e,t)},r.prototype.finally=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).finally.apply(e,t)},r.prototype._createMethod=function(e){var t=this;return function(){for(var n,i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];if(t.instance){var u=(n=t.instance)[e].apply(n,i);return Promise.resolve(u)}return new Promise(function(o,c){t._preInitBuffer.push({method:e,args:i,resolve:o,reject:c,called:!1})})}},r.prototype._createChainableMethod=function(e){var t=this;return function(){for(var n,i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];return t.instance?((n=t.instance)[e].apply(n,i),t):(t._preInitBuffer.push({method:e,args:i,resolve:function(){},reject:console.error,called:!1}),t)}},r}();function Ss(r){var e=r[0],t=r.slice(1);return{method:e,resolve:function(){},reject:console.error,args:t,called:!1}}var As=function(r){return r.map(Ss)},Hr=function(r){r===void 0&&(r=tn());var e=r;if(!Array.isArray(e))return[];var t=e.splice(0,e.length);return As(t)},Xe,Un,Ps=Xr(),Bn=(Xe=(Un=Ps).__SEGMENT_INSPECTOR__)!==null&&Xe!==void 0?Xe:Un.__SEGMENT_INSPECTOR__={},Is=function(r){var e;return(e=Bn.attach)===null||e===void 0?void 0:e.call(Bn,r)};function Os(r,e){var t=e!=null?e:rn();return Fe("".concat(t,"/v1/projects/").concat(r,"/settings")).then(function(n){return n.ok?n.json():n.text().then(function(i){throw new Error(i)})}).catch(function(n){throw console.error(n.message),n})}function qs(r){return eo().NODE_ENV!=="test"&&Object.keys(r.integrations).length>1}function Es(r){var e,t,n;return eo().NODE_ENV!=="test"&&((n=(t=(e=r.middlewareSettings)===null||e===void 0?void 0:e.routingRules)===null||t===void 0?void 0:t.length)!==null&&n!==void 0?n:0)>0}function $s(r,e){e.push.apply(e,Hr()),gs(r,e),ms(r,e)}function Ms(r,e){return P(this,void 0,void 0,function(){return I(this,function(t){switch(t.label){case 0:return e.push.apply(e,Hr()),[4,ys(r,e)];case 1:return t.sent(),e.push.apply(e,Hr()),bs(r,e),e.clear(),[2]}})})}function Rs(r,e,t,n,i,a,u){var o,c,s;return a===void 0&&(a=[]),P(this,void 0,void 0,function(){var d,h,y,g,_,w,S,b,f,l,v,p,m,O,q,M=this;return I(this,function(E){switch(E.label){case 0:return d=a==null?void 0:a.filter(function($){return typeof $=="object"}),h=a==null?void 0:a.filter(function($){return typeof $=="function"&&typeof $.pluginName=="string"}),Es(e)?[4,x(()=>Promise.resolve().then(()=>gc),void 0,import.meta.url).then(function($){return $.tsubMiddleware(e.middlewareSettings.routingRules)})]:[3,2];case 1:return g=E.sent(),[3,3];case 2:g=void 0,E.label=3;case 3:return y=g,qs(e)||u.length>0?[4,x(()=>Promise.resolve().then(()=>$c),void 0,import.meta.url).then(function($){return $.ajsDestinations(r,e,t.integrations,n,y,u)})]:[3,5];case 4:return w=E.sent(),[3,6];case 5:w=[],E.label=6;case 6:return _=w,e.legacyVideoPluginsEnabled?[4,x(()=>Promise.resolve().then(()=>Rc),void 0,import.meta.url).then(function($){return $.loadLegacyVideoPlugins(t)})]:[3,8];case 7:E.sent(),E.label=8;case 8:return!((o=n.plan)===null||o===void 0)&&o.track?[4,x(()=>Promise.resolve().then(()=>kc),void 0,import.meta.url).then(function($){var L;return $.schemaFilter((L=n.plan)===null||L===void 0?void 0:L.track,e)})]:[3,10];case 9:return b=E.sent(),[3,11];case 10:b=void 0,E.label=11;case 11:return S=b,f=to(e,i),[4,rs(e,t.integrations,f,i.obfuscate,y,h).catch(function(){return[]})];case 12:return l=E.sent(),v=R(R(R([hs,Cu],d,!0),_,!0),l,!0),S&&v.push(S),p=((c=n.integrations)===null||c===void 0?void 0:c.All)===!1&&!n.integrations["Segment.io"]||n.integrations&&n.integrations["Segment.io"]===!1,p?[3,14]:(O=(m=v).push,[4,vs(t,f["Segment.io"],e.integrations)]);case 13:O.apply(m,[E.sent()]),E.label=14;case 14:return[4,t.register.apply(t,v)];case 15:return q=E.sent(),Object.entries((s=e.enabledMiddleware)!==null&&s!==void 0?s:{}).some(function($){var L=$[1];return L})?[4,x(()=>Promise.resolve().then(()=>xc),void 0,import.meta.url).then(function($){var L=$.remoteMiddlewares;return P(M,void 0,void 0,function(){var z,vn;return I(this,function(hn){switch(hn.label){case 0:return[4,L(q,e,i.obfuscate)];case 1:return z=hn.sent(),vn=z.map(function(Mo){return t.addSourceMiddleware(Mo)}),[2,Promise.all(vn)]}})})})]:[3,17];case 16:E.sent(),E.label=17;case 17:return[2,q]}})})}function Ls(r,e,t){var n,i,a,u,o,c,s;return e===void 0&&(e={}),P(this,void 0,void 0,function(){var d,h,y,g,_,w,S,b,f,l,v;return I(this,function(p){switch(p.label){case 0:return e.globalAnalyticsKey&&gu(e.globalAnalyticsKey),r.cdnURL&&Iu(r.cdnURL),(n=r.cdnSettings)!==null&&n!==void 0?(h=n,[3,3]):[3,1];case 1:return[4,Os(r.writeKey,r.cdnURL)];case 2:h=p.sent(),p.label=3;case 3:return d=h,e.updateCDNSettings&&(d=e.updateCDNSettings(d)),y=(a=(i=d.integrations["Segment.io"])===null||i===void 0?void 0:i.retryQueue)!==null&&a!==void 0?a:!0,g=A({retryQueue:y},e),_=new wu(r,g),Is(_),w=(u=r.plugins)!==null&&u!==void 0?u:[],S=(o=r.classicIntegrations)!==null&&o!==void 0?o:[],Va.initRemoteMetrics(d.metrics),$s(_,t),[4,Rs(r.writeKey,d,_,g,e,w,S)];case 4:return b=p.sent(),f=(c=window.location.search)!==null&&c!==void 0?c:"",l=(s=window.location.hash)!==null&&s!==void 0?s:"",v=f.length?f:l.replace(/(?=#).*(?=\?)/,""),v.includes("ajs_")?[4,_.queryString(v).catch(console.error)]:[3,6];case 5:p.sent(),p.label=6;case 6:return _.initialized=!0,_.emit("initialize",r,e),e.initialPageview&&_.page().catch(console.error),[4,Ms(_,t)];case 7:return p.sent(),[2,[_,b]]}})})}var Uc=function(r){C(e,r);function e(){var t=this,n=Ou(),i=n.promise,a=n.resolve;return t=r.call(this,function(u){return i.then(function(o){var c=o[0],s=o[1];return Ls(c,s,u)})})||this,t._resolveLoadStart=function(u,o){return a([u,o])},t}return e.prototype.load=function(t,n){return n===void 0&&(n={}),this._resolveLoadStart(t,n),this},e.load=function(t,n){return n===void 0&&(n={}),new e().load(t,n)},e.standalone=function(t,n){return e.load({writeKey:t},n).then(function(i){return i[0]})},e}(ws);function js(r){var e=r;return!!(e.ctrlKey||e.shiftKey||e.metaKey||e.button&&e.button==1)}function ks(r,e){return!!(r.target==="_blank"&&e)}function Ts(r,e,t,n){var i=this,a=[];return r?(r instanceof Element?a=[r]:"toArray"in r?a=r.toArray():a=r,a.forEach(function(u){u.addEventListener("click",function(o){var c,s,d=e instanceof Function?e(u):e,h=t instanceof Function?t(u):t,y=u.getAttribute("href")||u.getAttributeNS("http://www.w3.org/1999/xlink","href")||u.getAttribute("xlink:href")||((c=u.getElementsByTagName("a")[0])===null||c===void 0?void 0:c.getAttribute("href")),g=Kr(i.track(d,h,n!=null?n:{}),(s=i.settings.timeout)!==null&&s!==void 0?s:500);!ks(u,y)&&!js(o)&&y&&(o.preventDefault?o.preventDefault():o.returnValue=!1,g.catch(console.error).then(function(){window.location.href=y}).catch(console.error))},!1)}),this):this}function xs(r,e,t,n){var i=this;if(!r)return this;r instanceof HTMLFormElement&&(r=[r]);var a=r;return a.forEach(function(u){if(!(u instanceof Element))throw new TypeError("Must pass HTMLElement to trackForm/trackSubmit.");var o=function(s){var d;s.preventDefault?s.preventDefault():s.returnValue=!1;var h=e instanceof Function?e(u):e,y=t instanceof Function?t(u):t,g=Kr(i.track(h,y,n!=null?n:{}),(d=i.settings.timeout)!==null&&d!==void 0?d:500);g.catch(console.error).then(function(){u.submit()}).catch(console.error)},c=window.jQuery||window.Zepto;c?c(u).submit(o):u.addEventListener("submit",o,!1)}),this}const Me=Object.freeze(Object.defineProperty({__proto__:null,form:xs,link:Ts},Symbol.toStringTag,{value:"Module"}));function zn(r,e){return Object.keys(e).reduce(function(t,n){if(n.startsWith(r)){var i=n.substr(r.length);t[i]=e[n]}return t},{})}function Cs(r,e){var t=document.createElement("a");t.href=e;var n=t.search.slice(1),i=n.split("&").reduce(function(l,v){var p=v.split("="),m=p[0],O=p[1];return l[m]=ro(O),l},{}),a=[],u=i.ajs_uid,o=i.ajs_event,c=i.ajs_aid,s=k(r.options.useQueryString)?r.options.useQueryString:{},d=s.aid,h=d===void 0?/.+/:d,y=s.uid,g=y===void 0?/.+/:y;if(c){var _=Array.isArray(i.ajs_aid)?i.ajs_aid[0]:i.ajs_aid;h.test(_)&&r.setAnonymousId(_)}if(u){var w=Array.isArray(i.ajs_uid)?i.ajs_uid[0]:i.ajs_uid;if(g.test(w)){var S=zn("ajs_trait_",i);a.push(r.identify(w,S))}}if(o){var b=Array.isArray(i.ajs_event)?i.ajs_event[0]:i.ajs_event,f=zn("ajs_prop_",i);a.push(r.track(b,f))}return Promise.all(a)}const Fs=Object.freeze(Object.defineProperty({__proto__:null,queryString:Cs},Symbol.toStringTag,{value:"Module"}));var _e={},de={};for(var fo=[],te=0;te<64;)fo[te]=0|4294967296*Math.sin(++te%Math.PI);function Ds(r){var e,t,n,i=[e=1732584193,t=4023233417,~e,~t],a=[],u=unescape(encodeURI(r))+"",o=u.length;for(r=--o/4+2|15,a[--r]=8*o;~o;)a[o>>2]|=u.charCodeAt(o)<<8*o--;for(te=u=0;te<r;te+=16){for(o=i;u<64;o=[n=o[3],e+((n=o[0]+[e&t|~e&n,n&e|~n&t,e^t^n,t^(e|~n)][o=u>>4]+fo[u]+~~a[te|15&[u,5*u+1,3*u+5,7*u][o]])<<(o=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*o+u++%4])|n>>>-o),e,t])e=0|o[1],t=o[2];for(u=4;u;)i[--u]+=o[u]}for(r="";u<32;)r+=(i[u>>3]>>4*(1^u++)&15).toString(16);return r}const Ns=Object.freeze(Object.defineProperty({__proto__:null,default:Ds},Symbol.toStringTag,{value:"Module"})),Us=Ga(Ns);var Ye={exports:{}},Vn;function ln(){return Vn||(Vn=1,function(r,e){(function(t,n){r.exports=function(i,a,u,o,c){for(a=a.split?a.split("."):a,o=0;o<a.length;o++)i=i?i[a[o]]:c;return i===c?u:i}})()}(Ye)),Ye.exports}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ze,Hn;function vo(){if(Hn)return Ze;Hn=1;var r=Number.POSITIVE_INFINITY;return Ze=r,Ze}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var et,Gn;function Bs(){return Gn||(Gn=1,et=Number),et}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tt,Wn;function zs(){if(Wn)return tt;Wn=1;var r=Bs();return tt=r,tt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rt,Kn;function ho(){if(Kn)return rt;Kn=1;var r=zs(),e=r.NEGATIVE_INFINITY;return rt=e,rt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nt,Jn;function po(){if(Jn)return nt;Jn=1;var r=1023;return nt=r,nt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var it,Qn;function Vs(){if(Qn)return it;Qn=1;var r=1023;return it=r,it}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var at,Xn;function Hs(){if(Xn)return at;Xn=1;var r=-1023;return at=r,at}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ot,Yn;function Gs(){if(Yn)return ot;Yn=1;var r=-1074;return ot=r,ot}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ut,Zn;function Ws(){if(Zn)return ut;Zn=1;function r(e){return e!==e}return ut=r,ut}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var st,ei;function yo(){if(ei)return st;ei=1;var r=Ws();return st=r,st}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lt,ti;function Ks(){if(ti)return lt;ti=1;var r=vo(),e=ho();function t(n){return n===r||n===e}return lt=t,lt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ct,ri;function mo(){if(ri)return ct;ri=1;var r=Ks();return ct=r,ct}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ft,ni;function Js(){if(ni)return ft;ni=1;var r=2147483648;return ft=r,ft}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dt,ii;function Qs(){if(ii)return dt;ii=1;var r=2147483647;return dt=r,dt}/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vt,ai;function Xs(){if(ai)return vt;ai=1;var r=typeof Object.defineProperty=="function"?Object.defineProperty:null;return vt=r,vt}/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ht,oi;function Ys(){if(oi)return ht;oi=1;var r=Xs();function e(){try{return r({},"x",{}),!0}catch(t){return!1}}return ht=e,ht}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pt,ui;function Zs(){if(ui)return pt;ui=1;var r=Object.defineProperty;return pt=r,pt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yt,si;function el(){if(si)return yt;si=1;var r=Object.prototype,e=r.toString,t=r.__defineGetter__,n=r.__defineSetter__,i=r.__lookupGetter__,a=r.__lookupSetter__;function u(o,c,s){var d,h,y,g;if(typeof o!="object"||o===null||e.call(o)==="[object Array]")throw new TypeError("invalid argument. First argument must be an object. Value: `"+o+"`.");if(typeof s!="object"||s===null||e.call(s)==="[object Array]")throw new TypeError("invalid argument. Property descriptor must be an object. Value: `"+s+"`.");if(h="value"in s,h&&(i.call(o,c)||a.call(o,c)?(d=o.__proto__,o.__proto__=r,delete o[c],o[c]=s.value,o.__proto__=d):o[c]=s.value),y="get"in s,g="set"in s,h&&(y||g))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return y&&t&&t.call(o,c,s.get),g&&n&&n.call(o,c,s.set),o}return yt=u,yt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mt,li;function tl(){if(li)return mt;li=1;var r=Ys(),e=Zs(),t=el(),n;return r()?n=e:n=t,mt=n,mt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gt,ci;function rl(){if(ci)return gt;ci=1;var r=tl();function e(t,n,i){r(t,n,{configurable:!1,enumerable:!1,writable:!1,value:i})}return gt=e,gt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bt,fi;function go(){if(fi)return bt;fi=1;var r=rl();return bt=r,bt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _t,di;function nl(){if(di)return _t;di=1;function r(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}return _t=r,_t}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wt,vi;function il(){if(vi)return wt;vi=1;var r=nl();return wt=r,wt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var St,hi;function al(){if(hi)return St;hi=1;var r=il(),e=r();function t(){return e&&typeof Symbol.toStringTag=="symbol"}return St=t,St}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var At,pi;function ol(){if(pi)return At;pi=1;var r=al();return At=r,At}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Pt,yi;function bo(){if(yi)return Pt;yi=1;var r=Object.prototype.toString;return Pt=r,Pt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var It,mi;function ul(){if(mi)return It;mi=1;var r=bo();function e(t){return r.call(t)}return It=e,It}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ot,gi;function sl(){if(gi)return Ot;gi=1;var r=Object.prototype.hasOwnProperty;function e(t,n){return t==null?!1:r.call(t,n)}return Ot=e,Ot}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qt,bi;function ll(){if(bi)return qt;bi=1;var r=sl();return qt=r,qt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Et,_i;function cl(){if(_i)return Et;_i=1;var r=typeof Symbol=="function"?Symbol.toStringTag:"";return Et=r,Et}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $t,wi;function fl(){if(wi)return $t;wi=1;var r=ll(),e=cl(),t=bo();function n(i){var a,u,o;if(i==null)return t.call(i);u=i[e],a=r(i,e);try{i[e]=void 0}catch(c){return t.call(i)}return o=t.call(i),a?i[e]=u:delete i[e],o}return $t=n,$t}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mt,Si;function ze(){if(Si)return Mt;Si=1;var r=ol(),e=ul(),t=fl(),n;return r()?n=t:n=e,Mt=n,Mt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Rt,Ai;function dl(){if(Ai)return Rt;Ai=1;var r=ze(),e=typeof Uint32Array=="function";function t(n){return e&&n instanceof Uint32Array||r(n)==="[object Uint32Array]"}return Rt=t,Rt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lt,Pi;function vl(){if(Pi)return Lt;Pi=1;var r=dl();return Lt=r,Lt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jt,Ii;function hl(){if(Ii)return jt;Ii=1;var r=4294967295;return jt=r,jt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kt,Oi;function pl(){if(Oi)return kt;Oi=1;var r=typeof Uint32Array=="function"?Uint32Array:null;return kt=r,kt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Tt,qi;function yl(){if(qi)return Tt;qi=1;var r=vl(),e=hl(),t=pl();function n(){var i,a;if(typeof t!="function")return!1;try{a=[1,3.14,-3.14,e+1,e+2],a=new t(a),i=r(a)&&a[0]===1&&a[1]===3&&a[2]===e-2&&a[3]===0&&a[4]===1}catch(u){i=!1}return i}return Tt=n,Tt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xt,Ei;function ml(){if(Ei)return xt;Ei=1;var r=yl();return xt=r,xt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ct,$i;function gl(){if($i)return Ct;$i=1;var r=typeof Uint32Array=="function"?Uint32Array:void 0;return Ct=r,Ct}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ft,Mi;function bl(){if(Mi)return Ft;Mi=1;function r(){throw new Error("not implemented")}return Ft=r,Ft}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Dt,Ri;function cn(){if(Ri)return Dt;Ri=1;var r=ml(),e=gl(),t=bl(),n;return r()?n=e:n=t,Dt=n,Dt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Nt,Li;function _l(){if(Li)return Nt;Li=1;var r=ze(),e=typeof Float64Array=="function";function t(n){return e&&n instanceof Float64Array||r(n)==="[object Float64Array]"}return Nt=t,Nt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ut,ji;function wl(){if(ji)return Ut;ji=1;var r=_l();return Ut=r,Ut}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Bt,ki;function Sl(){if(ki)return Bt;ki=1;var r=typeof Float64Array=="function"?Float64Array:null;return Bt=r,Bt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zt,Ti;function Al(){if(Ti)return zt;Ti=1;var r=wl(),e=Sl();function t(){var n,i;if(typeof e!="function")return!1;try{i=new e([1,3.14,-3.14,NaN]),n=r(i)&&i[0]===1&&i[1]===3.14&&i[2]===-3.14&&i[3]!==i[3]}catch(a){n=!1}return n}return zt=t,zt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Vt,xi;function Pl(){if(xi)return Vt;xi=1;var r=Al();return Vt=r,Vt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ht,Ci;function Il(){if(Ci)return Ht;Ci=1;var r=typeof Float64Array=="function"?Float64Array:void 0;return Ht=r,Ht}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Gt,Fi;function Ol(){if(Fi)return Gt;Fi=1;function r(){throw new Error("not implemented")}return Gt=r,Gt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Wt,Di;function fn(){if(Di)return Wt;Di=1;var r=Pl(),e=Il(),t=Ol(),n;return r()?n=e:n=t,Wt=n,Wt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Kt,Ni;function ql(){if(Ni)return Kt;Ni=1;var r=ze(),e=typeof Uint8Array=="function";function t(n){return e&&n instanceof Uint8Array||r(n)==="[object Uint8Array]"}return Kt=t,Kt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jt,Ui;function El(){if(Ui)return Jt;Ui=1;var r=ql();return Jt=r,Jt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Qt,Bi;function $l(){if(Bi)return Qt;Bi=1;var r=255;return Qt=r,Qt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xt,zi;function Ml(){if(zi)return Xt;zi=1;var r=typeof Uint8Array=="function"?Uint8Array:null;return Xt=r,Xt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Yt,Vi;function Rl(){if(Vi)return Yt;Vi=1;var r=El(),e=$l(),t=Ml();function n(){var i,a;if(typeof t!="function")return!1;try{a=[1,3.14,-3.14,e+1,e+2],a=new t(a),i=r(a)&&a[0]===1&&a[1]===3&&a[2]===e-2&&a[3]===0&&a[4]===1}catch(u){i=!1}return i}return Yt=n,Yt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zt,Hi;function Ll(){if(Hi)return Zt;Hi=1;var r=Rl();return Zt=r,Zt}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var er,Gi;function jl(){if(Gi)return er;Gi=1;var r=typeof Uint8Array=="function"?Uint8Array:void 0;return er=r,er}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tr,Wi;function kl(){if(Wi)return tr;Wi=1;function r(){throw new Error("not implemented")}return tr=r,tr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rr,Ki;function Tl(){if(Ki)return rr;Ki=1;var r=Ll(),e=jl(),t=kl(),n;return r()?n=e:n=t,rr=n,rr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nr,Ji;function xl(){if(Ji)return nr;Ji=1;var r=ze(),e=typeof Uint16Array=="function";function t(n){return e&&n instanceof Uint16Array||r(n)==="[object Uint16Array]"}return nr=t,nr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ir,Qi;function Cl(){if(Qi)return ir;Qi=1;var r=xl();return ir=r,ir}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ar,Xi;function Fl(){if(Xi)return ar;Xi=1;var r=65535;return ar=r,ar}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var or,Yi;function Dl(){if(Yi)return or;Yi=1;var r=typeof Uint16Array=="function"?Uint16Array:null;return or=r,or}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ur,Zi;function Nl(){if(Zi)return ur;Zi=1;var r=Cl(),e=Fl(),t=Dl();function n(){var i,a;if(typeof t!="function")return!1;try{a=[1,3.14,-3.14,e+1,e+2],a=new t(a),i=r(a)&&a[0]===1&&a[1]===3&&a[2]===e-2&&a[3]===0&&a[4]===1}catch(u){i=!1}return i}return ur=n,ur}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sr,ea;function Ul(){if(ea)return sr;ea=1;var r=Nl();return sr=r,sr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lr,ta;function Bl(){if(ta)return lr;ta=1;var r=typeof Uint16Array=="function"?Uint16Array:void 0;return lr=r,lr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cr,ra;function zl(){if(ra)return cr;ra=1;function r(){throw new Error("not implemented")}return cr=r,cr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fr,na;function Vl(){if(na)return fr;na=1;var r=Ul(),e=Bl(),t=zl(),n;return r()?n=e:n=t,fr=n,fr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dr,ia;function Hl(){if(ia)return dr;ia=1;var r=Tl(),e=Vl(),t={uint16:e,uint8:r};return dr=t,dr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vr,aa;function Gl(){if(aa)return vr;aa=1;var r=Hl(),e;function t(){var n,i;return n=new r.uint16(1),n[0]=4660,i=new r.uint8(n.buffer),i[0]===52}return e=t(),vr=e,vr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hr,oa;function dn(){if(oa)return hr;oa=1;var r=Gl();return hr=r,hr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pr,ua;function Wl(){if(ua)return pr;ua=1;var r=dn(),e,t,n;return r===!0?(t=1,n=0):(t=0,n=1),e={HIGH:t,LOW:n},pr=e,pr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yr,sa;function _o(){if(sa)return yr;sa=1;var r=cn(),e=fn(),t=Wl(),n=new e(1),i=new r(n.buffer),a=t.HIGH,u=t.LOW;function o(c,s,d,h){return n[0]=c,s[h]=i[a],s[h+d]=i[u],s}return yr=o,yr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mr,la;function Kl(){if(la)return mr;la=1;var r=_o();function e(t){return r(t,[0,0],1,0)}return mr=e,mr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gr,ca;function wo(){if(ca)return gr;ca=1;var r=go(),e=Kl(),t=_o();return r(e,"assign",t),gr=e,gr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var br,fa;function Jl(){if(fa)return br;fa=1;var r=dn(),e;return r===!0?e=1:e=0,br=e,br}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _r,da;function Ql(){if(da)return _r;da=1;var r=cn(),e=fn(),t=Jl(),n=new e(1),i=new r(n.buffer);function a(u){return n[0]=u,i[t]}return _r=a,_r}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wr,va;function So(){if(va)return wr;va=1;var r=Ql();return wr=r,wr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Sr,ha;function Xl(){if(ha)return Sr;ha=1;var r=dn(),e,t,n;return r===!0?(t=1,n=0):(t=0,n=1),e={HIGH:t,LOW:n},Sr=e,Sr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ar,pa;function Yl(){if(pa)return Ar;pa=1;var r=cn(),e=fn(),t=Xl(),n=new e(1),i=new r(n.buffer),a=t.HIGH,u=t.LOW;function o(c,s){return i[a]=c,i[u]=s,n[0]}return Ar=o,Ar}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Pr,ya;function Ao(){if(ya)return Pr;ya=1;var r=Yl();return Pr=r,Pr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ir,ma;function Zl(){if(ma)return Ir;ma=1;var r=Js(),e=Qs(),t=wo(),n=So(),i=Ao(),a=[0,0];function u(o,c){var s,d;return t.assign(o,a,1,0),s=a[0],s&=e,d=n(c),d&=r,s|=d,i(s,a[1])}return Ir=u,Ir}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Or,ga;function ec(){if(ga)return Or;ga=1;var r=Zl();return Or=r,Or}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qr,ba;function tc(){if(ba)return qr;ba=1;var r=22250738585072014e-324;return qr=r,qr}/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Er,_a;function rc(){if(_a)return Er;_a=1;function r(e){return Math.abs(e)}return Er=r,Er}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $r,wa;function nc(){if(wa)return $r;wa=1;var r=rc();return $r=r,$r}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mr,Sa;function Po(){if(Sa)return Mr;Sa=1;var r=tc(),e=mo(),t=yo(),n=nc(),i=4503599627370496;function a(u,o,c,s){return t(u)||e(u)?(o[s]=u,o[s+c]=0,o):u!==0&&n(u)<r?(o[s]=u*i,o[s+c]=-52,o):(o[s]=u,o[s+c]=0,o)}return Mr=a,Mr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Rr,Aa;function ic(){if(Aa)return Rr;Aa=1;var r=Po();function e(t){return r(t,[0,0],1,0)}return Rr=e,Rr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lr,Pa;function ac(){if(Pa)return Lr;Pa=1;var r=go(),e=ic(),t=Po();return r(e,"assign",t),Lr=e,Lr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jr,Ia;function oc(){if(Ia)return jr;Ia=1;var r=2146435072;return jr=r,jr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kr,Oa;function uc(){if(Oa)return kr;Oa=1;var r=So(),e=oc(),t=po();function n(i){var a=r(i);return a=(a&e)>>>20,a-t|0}return kr=n,kr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Tr,qa;function sc(){if(qa)return Tr;qa=1;var r=uc();return Tr=r,Tr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xr,Ea;function lc(){if(Ea)return xr;Ea=1;var r=vo(),e=ho(),t=po(),n=Vs(),i=Hs(),a=Gs(),u=yo(),o=mo(),c=ec(),s=ac(),d=sc(),h=wo(),y=Ao(),g=2220446049250313e-31,_=2148532223,w=[0,0],S=[0,0];function b(f,l){var v,p;return f===0||u(f)||o(f)?f:(s(w,f),f=w[0],l+=w[1],l+=d(f),l<a?c(0,f):l>n?f<0?e:r:(l<=i?(l+=52,p=g):p=1,h(S,f),v=S[0],v&=_,v|=l+t<<20,p*y(v,S[1])))}return xr=b,xr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Cr,$a;function cc(){if($a)return Cr;$a=1;var r=lc();return Cr=r,Cr}const fc=Ga(Lo);var Z={},Ma;function dc(){if(Ma)return Z;Ma=1;var r=Z&&Z.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(Z,"__esModule",{value:!0}),Z.unset=void 0;var e=r(ln());function t(n,i){if((0,e.default)(n,i)){for(var a=i.split("."),u=a.pop();a.length&&a[a.length-1].slice(-1)==="\\";)u=a.pop().slice(0,-1)+"."+u;for(;a.length;)n=n[i=a.shift()];return delete n[u]}return!0}return Z.unset=t,Z}var Ra;function vc(){if(Ra)return de;Ra=1;var r=de&&de.__importDefault||function(w){return w&&w.__esModule?w:{default:w}};Object.defineProperty(de,"__esModule",{value:!0});var e=r(Us),t=r(ln()),n=r(cc()),i=fc,a=dc();function u(w,S){for(var b=w,f=0,l=S;f<l.length;f++){var v=l[f];switch(v.type){case"drop":return null;case"drop_properties":o(b,v.config);break;case"allow_properties":c(b,v.config);break;case"sample_event":if(h(b,v.config))break;return null;case"map_properties":d(b,v.config);break;case"hash_properties":break;default:throw new Error('Transformer of type "'.concat(v.type,'" is unsupported.'))}}return b}de.default=u;function o(w,S){s(w,S.drop,function(b,f){f.forEach(function(l){return delete b[l]})})}function c(w,S){s(w,S.allow,function(b,f){Object.keys(b).forEach(function(l){f.includes(l)||delete b[l]})})}function s(w,S,b){Object.entries(S).forEach(function(f){var l=f[0],v=f[1],p=function(O){typeof O!="object"||O===null||b(O,v)},m=l===""?w:(0,t.default)(w,l);Array.isArray(m)?m.forEach(p):p(m)})}function d(w,S){var b=JSON.parse(JSON.stringify(w));for(var f in S.map)if(S.map.hasOwnProperty(f)){var l=S.map[f],v=f.split("."),p=void 0;if(v.length>1?(v.pop(),p=(0,t.default)(b,v.join("."))):p=w,typeof p=="object"){if(l.copy){var m=(0,t.default)(b,l.copy);m!==void 0&&(0,i.dset)(w,f,m)}else if(l.move){var O=(0,t.default)(b,l.move);O!==void 0&&(0,i.dset)(w,f,O),(0,a.unset)(w,l.move)}else l.hasOwnProperty("set")&&(0,i.dset)(w,f,l.set);if(l.to_string){var q=(0,t.default)(w,f);if(typeof q=="string"||typeof q=="object"&&q!==null)continue;q!==void 0?(0,i.dset)(w,f,JSON.stringify(q)):(0,i.dset)(w,f,"undefined")}}}}function h(w,S){return S.sample.percent<=0?!1:S.sample.percent>=1?!0:S.sample.path?g(w,S):y(S.sample.percent)}function y(w){return Math.random()<=w}function g(w,S){var b=(0,t.default)(w,S.sample.path),f=(0,e.default)(JSON.stringify(b)),l=-64,v=[];_(f.slice(0,8),v);for(var p=0,m=0;m<64&&v[m]!==1;m++)p++;if(p!==0){var O=[];_(f.slice(9,16),O),l-=p,v.splice(0,p),O.splice(64-p),v=v.concat(O)}return v[63]=v[63]===0?1:0,(0,n.default)(parseInt(v.join(""),2),l)<S.sample.percent}function _(w,S){for(var b=0;b<8;b++)for(var f=w[b],l=128;l>=1;l/=2)f-l>=0?(f-=l,S.push(1)):S.push(0)}return de}var ve={},La;function hc(){if(La)return ve;La=1;var r=ve&&ve.__importDefault||function(f){return f&&f.__esModule?f:{default:f}};Object.defineProperty(ve,"__esModule",{value:!0});var e=r(ln());function t(f,l){if(!l)throw new Error("No matcher supplied!");switch(l.type){case"all":return n();case"fql":return i(l.ir,f);default:throw new Error("Matcher of type ".concat(l.type," unsupported."))}}ve.default=t;function n(){return!0}function i(f,l){if(!f)return!1;try{f=JSON.parse(f)}catch(p){throw new Error('Failed to JSON.parse FQL intermediate representation "'.concat(f,'": ').concat(p))}var v=a(f,l);return typeof v!="boolean"?!1:v}function a(f,l){if(!Array.isArray(f))return u(f,l)===!0;var v=f[0];switch(v){case"!":return!a(f[1],l);case"or":for(var p=1;p<f.length;p++)if(a(f[p],l))return!0;return!1;case"and":for(var p=1;p<f.length;p++)if(!a(f[p],l))return!1;return!0;case"=":case"!=":return s(u(f[1],l),u(f[2],l),v,l);case"<=":case"<":case">":case">=":return c(u(f[1],l),u(f[2],l),v,l);case"in":return o(u(f[1],l),u(f[2],l),l);case"contains":return d(u(f[1],l),u(f[2],l));case"match":return h(u(f[1],l),u(f[2],l));case"lowercase":var m=u(f[1],l);return typeof m!="string"?null:m.toLowerCase();case"typeof":return typeof u(f[1],l);case"length":return y(u(f[1],l));default:throw new Error("FQL IR could not evaluate for token: ".concat(v))}}function u(f,l){return Array.isArray(f)?f:typeof f=="object"?f.value:(0,e.default)(l,f)}function o(f,l,v){return l.find(function(p){return u(p,v)===f})!==void 0}function c(f,l,v,p){if(g(f)&&(f=a(f,p)),g(l)&&(l=a(l,p)),typeof f!="number"||typeof l!="number")return!1;switch(v){case"<=":return f<=l;case">=":return f>=l;case"<":return f<l;case">":return f>l;default:throw new Error("Invalid operator in compareNumbers: ".concat(v))}}function s(f,l,v,p){switch(g(f)&&(f=a(f,p)),g(l)&&(l=a(l,p)),typeof f=="object"&&typeof l=="object"&&(f=JSON.stringify(f),l=JSON.stringify(l)),v){case"=":return f===l;case"!=":return f!==l;default:throw new Error("Invalid operator in compareItems: ".concat(v))}}function d(f,l){return typeof f!="string"||typeof l!="string"?!1:f.indexOf(l)!==-1}function h(f,l){return typeof f!="string"||typeof l!="string"?!1:_(l,f)}function y(f){return f===null?0:!Array.isArray(f)&&typeof f!="string"?NaN:f.length}function g(f){return Array.isArray(f)?(f[0]==="lowercase"||f[0]==="length"||f[0]==="typeof")&&f.length===2||(f[0]==="contains"||f[0]==="match")&&f.length===3:!1}function _(f,l){var v,p;e:for(;f.length>0;){var m=void 0,O=void 0;if(v=w(f),m=v.star,O=v.chunk,f=v.pattern,m&&O==="")return!0;var q=S(O,l),M=q.t,E=q.ok,$=q.err;if($)return!1;if(E&&(M.length===0||f.length>0)){l=M;continue}if(m)for(var L=0;L<l.length;L++){if(p=S(O,l.slice(L+1)),M=p.t,E=p.ok,$=p.err,E){if(f.length===0&&M.length>0)continue;l=M;continue e}if($)return!1}return!1}return l.length===0}function w(f){for(var l={star:!1,chunk:"",pattern:""};f.length>0&&f[0]==="*";)f=f.slice(1),l.star=!0;var v=!1,p;e:for(p=0;p<f.length;p++)switch(f[p]){case"\\":p+1<f.length&&p++;break;case"[":v=!0;break;case"]":v=!1;break;case"*":if(!v)break e}return l.chunk=f.slice(0,p),l.pattern=f.slice(p),l}function S(f,l){for(var v,p,m={t:"",ok:!1,err:!1};f.length>0;){if(l.length===0)return m;switch(f[0]){case"[":var O=l[0];l=l.slice(1),f=f.slice(1);var q=!0;f.length>0&&f[0]==="^"&&(q=!1,f=f.slice(1));for(var M=!1,E=0;;){if(f.length>0&&f[0]==="]"&&E>0){f=f.slice(1);break}var $="",L="",z=void 0;if(v=b(f),$=v.char,f=v.newChunk,z=v.err,z||(L=$,f[0]==="-"&&(p=b(f.slice(1)),L=p.char,f=p.newChunk,z=p.err,z)))return m;$<=O&&O<=L&&(M=!0),E++}if(M!==q)return m;break;case"?":l=l.slice(1),f=f.slice(1);break;case"\\":if(f=f.slice(1),f.length===0)return m.err=!0,m;default:if(f[0]!==l[0])return m;l=l.slice(1),f=f.slice(1)}}return m.t=l,m.ok=!0,m.err=!1,m}function b(f){var l={char:"",newChunk:"",err:!1};return f.length===0||f[0]==="-"||f[0]==="]"||f[0]==="\\"&&(f=f.slice(1),f.length===0)?(l.err=!0,l):(l.char=f[0],l.newChunk=f.slice(1),l.newChunk.length===0&&(l.err=!0),l)}return ve}var Re={},ja;function pc(){if(ja)return Re;ja=1,Object.defineProperty(Re,"__esModule",{value:!0});var r=function(){function e(t){this.rules=[],this.rules=t||[]}return e.prototype.getRulesByDestinationName=function(t){for(var n=[],i=0,a=this.rules;i<a.length;i++){var u=a[i];(u.destinationName===t||u.destinationName===void 0)&&n.push(u)}return n},e}();return Re.default=r,Re}var ka;function yc(){return ka||(ka=1,function(r){var e=_e&&_e.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(r,"__esModule",{value:!0}),r.Store=r.matches=r.transform=void 0;var t=vc();Object.defineProperty(r,"transform",{enumerable:!0,get:function(){return e(t).default}});var n=hc();Object.defineProperty(r,"matches",{enumerable:!0,get:function(){return e(n).default}});var i=pc();Object.defineProperty(r,"Store",{enumerable:!0,get:function(){return e(i).default}})}(_e)),_e}var Fr=yc(),mc=function(r){return function(e){var t=e.payload,n=e.integration,i=e.next,a=new Fr.Store(r),u=a.getRulesByDestinationName(n);u.forEach(function(o){for(var c=o.matchers,s=o.transformers,d=0;d<c.length;d++)if(Fr.matches(t.obj,c[d])&&(t.obj=Fr.transform(t.obj,s[d]),t.obj===null))return i(null)}),i(t)}};const gc=Object.freeze(Object.defineProperty({__proto__:null,tsubMiddleware:mc},Symbol.toStringTag,{value:"Module"}));function Io(r,e){var t,n;return typeof(e==null?void 0:e.enabled)=="boolean"?e.enabled:(n=(t=r==null?void 0:r.__default)===null||t===void 0?void 0:t.enabled)!==null&&n!==void 0?n:!0}function Oo(r){return r.toLowerCase().replace(".","").replace(/\s+/g,"-")}function qo(r,e){return e===void 0&&(e=!1),e?btoa(r).replace(/=/g,""):void 0}function bc(r){return("Integration"in r?r.Integration:r).prototype.name}function _c(r,e,t){var n,i;try{var a=((i=(n=window==null?void 0:window.performance)===null||n===void 0?void 0:n.getEntriesByName(r,"resource"))!==null&&i!==void 0?i:[])[0];a&&e.stats.gauge("legacy_destination_time",Math.round(a.duration),R([t],a.duration<100?["cached"]:[],!0))}catch(u){}}function wc(r,e,t){var n;if("Integration"in r){var i={user:function(){return t.user()},addIntegration:function(){}};r(i),n=r.Integration}else n=r;var a=new n(e);return a.analytics=t,a}function Sc(r,e,t,n){return P(this,void 0,void 0,function(){var i,a,u,o,c,s;return I(this,function(d){switch(d.label){case 0:i=Oo(e),a=qo(i,n),u=nn(),o="".concat(u,"/integrations/").concat(a!=null?a:i,"/").concat(t,"/").concat(a!=null?a:i,".dynamic.js.gz"),d.label=1;case 1:return d.trys.push([1,3,,4]),[4,ye(o)];case 2:return d.sent(),_c(o,r,e),[3,4];case 3:throw c=d.sent(),r.stats.gauge("legacy_destination_time",-1,["plugin:".concat(e),"failed"]),c;case 4:return s=window["".concat(i,"Deps")],[4,Promise.all(s.map(function(h){return ye(u+h+".gz")}))];case 5:return d.sent(),window["".concat(i,"Loader")](),[2,window["".concat(i,"Integration")]]}})})}function Ac(r,e,t){return P(this,void 0,void 0,function(){var n,i,a,u;return I(this,function(o){return n=nn(),i=Oo(r),a=qo(r,t),u="".concat(n,"/integrations/").concat(a!=null?a:i,"/").concat(e,"/").concat(a!=null?a:i,".dynamic.js.gz"),[2,Fu(u)]})})}function Pc(r){var e,t,n,i;return(i=(t=(e=r==null?void 0:r.versionSettings)===null||e===void 0?void 0:e.override)!==null&&t!==void 0?t:(n=r==null?void 0:r.versionSettings)===null||n===void 0?void 0:n.version)!==null&&i!==void 0?i:"latest"}var Ic=function(r,e){var t,n=e.type,i=e.bundlingStatus,a=e.versionSettings,u=i!=="unbundled"&&(n==="browser"||((t=a==null?void 0:a.componentTypes)===null||t===void 0?void 0:t.includes("browser")));return!r.startsWith("Segment")&&r!=="Iterable"&&u},Oc=function(r,e){var t=e.All===!1&&e[r]===void 0;return e[r]===!1||t};function qc(r,e){return P(this,void 0,void 0,function(){var t,n=this;return I(this,function(i){switch(i.label){case 0:return t=[],ae()?[2,e]:[4,lo(function(){return e.length>0&&Ba()},function(){return P(n,void 0,void 0,function(){var a,u,o;return I(this,function(c){switch(c.label){case 0:return a=e.pop(),a?[4,pe(a,r)]:[2];case 1:return u=c.sent(),o=u instanceof re,o||t.push(a),[2]}})})})];case 1:return i.sent(),t.map(function(a){return e.pushWithBackoff(a)}),[2,e]}})})}var Eo=function(){function r(e,t,n,i,a,u){i===void 0&&(i={}),this.options={},this.type="destination",this.middleware=[],this._ready=!1,this._initialized=!1,this.flushing=!1,this.name=e,this.version=t,this.settings=A({},i),this.disableAutoISOConversion=a.disableAutoISOConversion||!1,this.integrationSource=u,this.settings.type&&this.settings.type==="browser"&&delete this.settings.type,this.options=a,this.buffer=a.disableClientPersistence?new Ce(4,[]):new Ne(4,"".concat(n,":dest-").concat(e)),this.scheduleFlush()}return r.prototype.isLoaded=function(){return this._ready},r.prototype.ready=function(){var e;return(e=this.onReady)!==null&&e!==void 0?e:Promise.resolve()},r.prototype.load=function(e,t){var n;return P(this,void 0,void 0,function(){var i,a,u=this;return I(this,function(o){switch(o.label){case 0:return this._ready||this.onReady!==void 0?[2]:(n=this.integrationSource)!==null&&n!==void 0?(a=n,[3,3]):[3,1];case 1:return[4,Sc(e,this.name,this.version,this.options.obfuscate)];case 2:a=o.sent(),o.label=3;case 3:i=a,this.integration=wc(i,this.settings,t),this.onReady=new Promise(function(c){var s=function(){u._ready=!0,c(!0)};u.integration.once("ready",s)}),this.onInitialize=new Promise(function(c){var s=function(){u._initialized=!0,c(!0)};u.integration.on("initialize",s)});try{e.stats.increment("analytics_js.integration.invoke",1,["method:initialize","integration_name:".concat(this.name)]),this.integration.initialize()}catch(c){throw e.stats.increment("analytics_js.integration.invoke.error",1,["method:initialize","integration_name:".concat(this.name)]),c}return[2]}})})},r.prototype.unload=function(e,t){return Ac(this.name,this.version,this.options.obfuscate)},r.prototype.addMiddleware=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this.middleware=(e=this.middleware).concat.apply(e,t)},r.prototype.shouldBuffer=function(e){return e.event.type!=="page"&&(ae()||this._ready===!1||this._initialized===!1)},r.prototype.send=function(e,t,n){var i,a;return P(this,void 0,void 0,function(){var u,o,c,s,d,h;return I(this,function(y){switch(y.label){case 0:if(this.shouldBuffer(e))return this.buffer.push(e),this.scheduleFlush(),[2,e];if(u=(a=(i=this.options)===null||i===void 0?void 0:i.plan)===null||a===void 0?void 0:a.track,o=e.event.event,u&&o&&this.name!=="Segment.io"){if(c=u[o],Io(u,c))e.updateEvent("integrations",A(A({},e.event.integrations),c==null?void 0:c.integrations));else return e.updateEvent("integrations",A(A({},e.event.integrations),{All:!1,"Segment.io":!0})),e.cancel(new B({retry:!1,reason:"Event ".concat(o," disabled for integration ").concat(this.name," in tracking plan"),type:"Dropped by plan"})),[2,e];if(c!=null&&c.enabled&&(c==null?void 0:c.integrations[this.name])===!1)return e.cancel(new B({retry:!1,reason:"Event ".concat(o," disabled for integration ").concat(this.name," in tracking plan"),type:"Dropped by plan"})),[2,e]}return[4,un(this.name,e.event,this.middleware)];case 1:if(s=y.sent(),s===null)return[2,e];d=new t(s,{traverse:!this.disableAutoISOConversion}),e.stats.increment("analytics_js.integration.invoke",1,["method:".concat(n),"integration_name:".concat(this.name)]),y.label=2;case 2:return y.trys.push([2,5,,6]),this.integration?[4,this.integration.invoke.call(this.integration,n,d)]:[3,4];case 3:y.sent(),y.label=4;case 4:return[3,6];case 5:throw h=y.sent(),e.stats.increment("analytics_js.integration.invoke.error",1,["method:".concat(n),"integration_name:".concat(this.name)]),h;case 6:return[2,e]}})})},r.prototype.track=function(e){return P(this,void 0,void 0,function(){return I(this,function(t){return[2,this.send(e,T.Track,"track")]})})},r.prototype.page=function(e){var t;return P(this,void 0,void 0,function(){var n=this;return I(this,function(i){return!((t=this.integration)===null||t===void 0)&&t._assumesPageview&&!this._initialized&&this.integration.initialize(),[2,this.onInitialize.then(function(){return n.send(e,T.Page,"page")})]})})},r.prototype.identify=function(e){return P(this,void 0,void 0,function(){return I(this,function(t){return[2,this.send(e,T.Identify,"identify")]})})},r.prototype.alias=function(e){return P(this,void 0,void 0,function(){return I(this,function(t){return[2,this.send(e,T.Alias,"alias")]})})},r.prototype.group=function(e){return P(this,void 0,void 0,function(){return I(this,function(t){return[2,this.send(e,T.Group,"group")]})})},r.prototype.scheduleFlush=function(){var e=this;this.flushing||setTimeout(function(){return P(e,void 0,void 0,function(){var t;return I(this,function(n){switch(n.label){case 0:return this.flushing=!0,t=this,[4,qc(this,this.buffer)];case 1:return t.buffer=n.sent(),this.flushing=!1,this.buffer.todo>0&&this.scheduleFlush(),[2]}})})},Math.random()*5e3)},r}();function Ec(r,e,t,n,i,a){var u,o;if(t===void 0&&(t={}),n===void 0&&(n={}),Ua())return[];e.plan&&(n=n!=null?n:{},n.plan=e.plan);var c=(o=(u=e.middlewareSettings)===null||u===void 0?void 0:u.routingRules)!==null&&o!==void 0?o:[],s=e.integrations,d=n.integrations,h=to(e,n!=null?n:{}),y=a==null?void 0:a.reduce(function(_,w){var S;return A(A({},_),(S={},S[bc(w)]=w,S))},{}),g=new Set(R(R([],Object.keys(s).filter(function(_){return Ic(_,s[_])}),!0),Object.keys(y||{}).filter(function(_){return k(s[_])||k(d==null?void 0:d[_])}),!0));return Array.from(g).filter(function(_){return!Oc(_,t)}).map(function(_){var w=s[_],S=Pc(w),b=new Eo(_,S,r,h[_],n,y==null?void 0:y[_]),f=c.filter(function(l){return l.destinationName===_});return f.length>0&&i&&b.addMiddleware(i),b})}const $c=Object.freeze(Object.defineProperty({__proto__:null,LegacyDestination:Eo,ajsDestinations:Ec},Symbol.toStringTag,{value:"Module"}));function Mc(r){return P(this,void 0,void 0,function(){var e;return I(this,function(t){switch(t.label){case 0:return[4,x(()=>Promise.resolve().then(()=>Dc),void 0,import.meta.url)];case 1:return e=t.sent(),r._plugins=e,[2]}})})}const Rc=Object.freeze(Object.defineProperty({__proto__:null,loadLegacyVideoPlugins:Mc},Symbol.toStringTag,{value:"Module"}));function Lc(r,e){var t,n;if(!r||!Object.keys(r))return{};var i=r.integrations?Object.keys(r.integrations).filter(function(u){return r.integrations[u]===!1}):[],a=[];return((t=e.remotePlugins)!==null&&t!==void 0?t:[]).forEach(function(u){i.forEach(function(o){(u.name.includes(o)||o.includes(u.name))&&a.push(u.name)})}),((n=e.remotePlugins)!==null&&n!==void 0?n:[]).reduce(function(u,o){return o.settings.subscriptions&&a.includes(o.name)&&o.settings.subscriptions.forEach(function(c){return u["".concat(o.name," ").concat(c.partnerAction)]=!1}),u},{})}function jc(r,e){function t(n){var i=r,a=n.event.event;if(i&&a){var u=i[a];if(Io(i,u)){var o=Lc(u,e);n.updateEvent("integrations",A(A(A({},n.event.integrations),u==null?void 0:u.integrations),o))}else return n.updateEvent("integrations",A(A({},n.event.integrations),{All:!1,"Segment.io":!0})),n}return n}return{name:"Schema Filter",version:"0.1.0",isLoaded:function(){return!0},load:function(){return Promise.resolve()},type:"before",page:t,alias:t,track:t,identify:t,group:t}}const kc=Object.freeze(Object.defineProperty({__proto__:null,schemaFilter:jc},Symbol.toStringTag,{value:"Module"}));function Tc(r,e,t){var n;return P(this,void 0,void 0,function(){var i,a,u,o,c,s=this;return I(this,function(d){switch(d.label){case 0:return Ua()?[2,[]]:(i=nn(),a=(n=e.enabledMiddleware)!==null&&n!==void 0?n:{},u=Object.entries(a).filter(function(h){h[0];var y=h[1];return y}).map(function(h){var y=h[0];return y}),o=u.map(function(h){return P(s,void 0,void 0,function(){var y,g,_,w;return I(this,function(S){switch(S.label){case 0:y=h.replace("@segment/",""),g=y,t&&(g=btoa(y).replace(/=/g,"")),_="".concat(i,"/middleware/").concat(g,"/latest/").concat(g,".js.gz"),S.label=1;case 1:return S.trys.push([1,3,,4]),[4,ye(_)];case 2:return S.sent(),[2,window["".concat(y,"Middleware")]];case 3:return w=S.sent(),r.log("error",w),r.stats.increment("failed_remote_middleware"),[3,4];case 4:return[2]}})})}),[4,Promise.all(o)]);case 1:return c=d.sent(),c=c.filter(Boolean),[2,c]}})})}const xc=Object.freeze(Object.defineProperty({__proto__:null,remoteMiddlewares:Tc},Symbol.toStringTag,{value:"Module"}));var Dr={exports:{}},Ta;function Cc(){return Ta||(Ta=1,function(r,e){(function(t,n){r.exports=n()})(window,function(){return function(t){var n={};function i(a){if(n[a])return n[a].exports;var u=n[a]={i:a,l:!1,exports:{}};return t[a].call(u.exports,u,u.exports,i),u.l=!0,u.exports}return i.m=t,i.c=n,i.d=function(a,u,o){i.o(a,u)||Object.defineProperty(a,u,{enumerable:!0,get:o})},i.r=function(a){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},i.t=function(a,u){if(1&u&&(a=i(a)),8&u||4&u&&typeof a=="object"&&a&&a.__esModule)return a;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:a}),2&u&&typeof a!="string")for(var c in a)i.d(o,c,(function(s){return a[s]}).bind(null,c));return o},i.n=function(a){var u=a&&a.__esModule?function(){return a.default}:function(){return a};return i.d(u,"a",u),u},i.o=function(a,u){return Object.prototype.hasOwnProperty.call(a,u)},i.p="",i(i.s=2)}([function(t,n,i){i.r(n);var a=typeof fetch=="function"?fetch.bind():function(u,o){return o=o||{},new Promise(function(c,s){var d=new XMLHttpRequest;for(var h in d.open(o.method||"get",u,!0),o.headers)d.setRequestHeader(h,o.headers[h]);function y(){var g,_=[],w=[],S={};return d.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(b,f,l){_.push(f=f.toLowerCase()),w.push([f,l]),g=S[f],S[f]=g?g+","+l:l}),{ok:(d.status/100|0)==2,status:d.status,statusText:d.statusText,url:d.responseURL,clone:y,text:function(){return Promise.resolve(d.responseText)},json:function(){return Promise.resolve(d.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([d.response]))},headers:{keys:function(){return _},entries:function(){return w},get:function(b){return S[b.toLowerCase()]},has:function(b){return b.toLowerCase()in S}}}}d.withCredentials=o.credentials=="include",d.onload=function(){c(y())},d.onerror=s,d.send(o.body)})};n.default=a},function(t,n,i){Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function o(c,s){for(var d=0;d<s.length;d++){var h=s[d];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(c,h.key,h)}}return function(c,s,d){return s&&o(c.prototype,s),d&&o(c,d),c}}(),u=function(){function o(c,s){(function(d,h){if(!(d instanceof h))throw new TypeError("Cannot call a class as a function")})(this,o),this.pluginName=c}return a(o,[{key:"track",value:function(c,s){window.analytics.track(c,s,{integration:{name:this.pluginName}})}}]),o}();n.default=u},function(t,n,i){Object.defineProperty(n,"__esModule",{value:!0}),n.YouTubeAnalytics=n.VimeoAnalytics=void 0;var a=o(i(3)),u=o(i(4));function o(c){return c&&c.__esModule?c:{default:c}}n.VimeoAnalytics=a.default,n.YouTubeAnalytics=u.default},function(t,n,i){Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function s(d,h){for(var y=0;y<h.length;y++){var g=h[y];g.enumerable=g.enumerable||!1,g.configurable=!0,"value"in g&&(g.writable=!0),Object.defineProperty(d,g.key,g)}}return function(d,h,y){return h&&s(d.prototype,h),y&&s(d,y),d}}(),u=o(i(0));function o(s){return s&&s.__esModule?s:{default:s}}var c=function(s){function d(h,y){(function(_,w){if(!(_ instanceof w))throw new TypeError("Cannot call a class as a function")})(this,d);var g=function(_,w){if(!_)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!w||typeof w!="object"&&typeof w!="function"?_:w}(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,"VimeoAnalytics"));return g.authToken=y,g.player=h,g.metadata={content:{},playback:{videoPlayer:"Vimeo"}},g.mostRecentHeartbeat=0,g.isPaused=!1,g}return function(h,y){if(typeof y!="function"&&y!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof y);h.prototype=Object.create(y&&y.prototype,{constructor:{value:h,enumerable:!1,writable:!0,configurable:!0}}),y&&(Object.setPrototypeOf?Object.setPrototypeOf(h,y):h.__proto__=y)}(d,s),a(d,[{key:"initialize",value:function(){var h=this,y={loaded:this.retrieveMetadata,play:this.trackPlay,pause:this.trackPause,ended:this.trackEnded,timeupdate:this.trackHeartbeat};for(var g in y)this.registerHandler(g,y[g]);this.player.getVideoId().then(function(_){h.retrieveMetadata({id:_})}).catch(console.error)}},{key:"registerHandler",value:function(h,y){var g=this;this.player.on(h,function(_){g.updateMetadata(_),y.call(g,_)})}},{key:"trackPlay",value:function(){this.isPaused?(this.track("Video Playback Resumed",this.metadata.playback),this.isPaused=!1):(this.track("Video Playback Started",this.metadata.playback),this.track("Video Content Started",this.metadata.content))}},{key:"trackEnded",value:function(){this.track("Video Playback Completed",this.metadata.playback),this.track("Video Content Completed",this.metadata.content)}},{key:"trackHeartbeat",value:function(){var h=this.mostRecentHeartbeat,y=this.metadata.playback.position;y!==h&&y-h>=10&&(this.track("Video Content Playing",this.metadata.content),this.mostRecentHeartbeat=Math.floor(y))}},{key:"trackPause",value:function(){this.isPaused=!0,this.track("Video Playback Paused",this.metadata.playback)}},{key:"retrieveMetadata",value:function(h){var y=this;return new Promise(function(g,_){var w=h.id;(0,u.default)("https://api.vimeo.com/videos/"+w,{headers:{Authorization:"Bearer "+y.authToken}}).then(function(S){return S.ok?S.json():_(S)}).then(function(S){y.metadata.content.title=S.name,y.metadata.content.description=S.description,y.metadata.content.publisher=S.user.name,y.metadata.playback.position=0,y.metadata.playback.totalLength=S.duration}).catch(function(S){return console.error("Request to Vimeo API Failed with: ",S),_(S)})})}},{key:"updateMetadata",value:function(h){var y=this;return new Promise(function(g,_){y.player.getVolume().then(function(w){w&&(y.metadata.playback.sound=100*w),y.metadata.playback.position=h.seconds,g()}).catch(_)})}}]),d}(o(i(1)).default);n.default=c},function(t,n,i){Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function h(y,g){for(var _=0;_<g.length;_++){var w=g[_];w.enumerable=w.enumerable||!1,w.configurable=!0,"value"in w&&(w.writable=!0),Object.defineProperty(y,w.key,w)}}return function(y,g,_){return g&&h(y.prototype,g),_&&h(y,_),y}}(),u=c(i(0)),o=c(i(1));function c(h){return h&&h.__esModule?h:{default:h}}var s=function(h){function y(g,_){(function(S,b){if(!(S instanceof b))throw new TypeError("Cannot call a class as a function")})(this,y);var w=function(S,b){if(!S)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||typeof b!="object"&&typeof b!="function"?S:b}(this,(y.__proto__||Object.getPrototypeOf(y)).call(this,"YoutubeAnalytics"));return w.player=g,w.apiKey=_,w.playerLoaded=!1,w.playbackStarted=!1,w.contentStarted=!1,w.isPaused=!1,w.isBuffering=!1,w.isSeeking=!1,w.lastRecordedTime={timeReported:Date.now(),timeElapsed:0},w.metadata=[{playback:{video_player:"youtube"},content:{}}],w.playlistIndex=0,w}return function(g,_){if(typeof _!="function"&&_!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof _);g.prototype=Object.create(_&&_.prototype,{constructor:{value:g,enumerable:!1,writable:!0,configurable:!0}}),_&&(Object.setPrototypeOf?Object.setPrototypeOf(g,_):g.__proto__=_)}(y,h),a(y,[{key:"initialize",value:function(){window.segmentYoutubeOnStateChange=this.onPlayerStateChange.bind(this),window.segmentYoutubeOnReady=this.onPlayerReady.bind(this),this.player.addEventListener("onReady","segmentYoutubeOnReady"),this.player.addEventListener("onStateChange","segmentYoutubeOnStateChange")}},{key:"onPlayerReady",value:function(g){this.retrieveMetadata()}},{key:"onPlayerStateChange",value:function(g){var _=this.player.getCurrentTime();switch(this.metadata[this.playlistIndex]&&(this.metadata[this.playlistIndex].playback.position=this.metadata[this.playlistIndex].content.position=_,this.metadata[this.playlistIndex].playback.quality=this.player.getPlaybackQuality(),this.metadata[this.playlistIndex].playback.sound=this.player.isMuted()?0:this.player.getVolume()),g.data){case-1:if(this.playerLoaded)break;this.retrieveMetadata(),this.playerLoaded=!0;break;case YT.PlayerState.BUFFERING:this.handleBuffer();break;case YT.PlayerState.PLAYING:this.handlePlay();break;case YT.PlayerState.PAUSED:this.handlePause();break;case YT.PlayerState.ENDED:this.handleEnd()}this.lastRecordedTime={timeReported:Date.now(),timeElapsed:1e3*this.player.getCurrentTime()}}},{key:"retrieveMetadata",value:function(){var g=this;return new Promise(function(_,w){var S=g.player.getVideoData(),b=g.player.getPlaylist()||[S.video_id],f=b.join();(0,u.default)("https://www.googleapis.com/youtube/v3/videos?id="+f+"&part=snippet,contentDetails&key="+g.apiKey).then(function(l){if(!l.ok){var v=new Error("Segment request to Youtube API failed (likely due to a bad API Key. Events will still be sent but will not contain video metadata)");throw v.response=l,v}return l.json()}).then(function(l){g.metadata=[];for(var v=0,p=0;p<b.length;p++){var m=l.items[p];g.metadata.push({content:{title:m.snippet.title,description:m.snippet.description,keywords:m.snippet.tags,channel:m.snippet.channelTitle,airdate:m.snippet.publishedAt}}),v+=d(m.contentDetails.duration)}for(p=0;p<b.length;p++)g.metadata[p].playback={total_length:v,video_player:"youtube"};_()}).catch(function(l){g.metadata=b.map(function(v){return{playback:{video_player:"youtube"},content:{}}}),w(l)})})}},{key:"handleBuffer",value:function(){var g=this.determineSeek();this.playbackStarted||(this.playbackStarted=!0,this.track("Video Playback Started",this.metadata[this.playlistIndex].playback)),g&&!this.isSeeking&&(this.isSeeking=!0,this.track("Video Playback Seek Started",this.metadata[this.playlistIndex].playback)),this.isSeeking&&(this.track("Video Playback Seek Completed",this.metadata[this.playlistIndex].playback),this.isSeeking=!1);var _=this.player.getPlaylist();_&&this.player.getCurrentTime()===0&&this.player.getPlaylistIndex()!==this.playlistIndex&&(this.contentStarted=!1,this.playlistIndex===_.length-1&&this.player.getPlaylistIndex()===0&&(this.track("Video Playback Completed",this.metadata[this.player.getPlaylistIndex()].playback),this.track("Video Playback Started",this.metadata[this.player.getPlaylistIndex()].playback))),this.track("Video Playback Buffer Started",this.metadata[this.playlistIndex].playback),this.isBuffering=!0}},{key:"handlePlay",value:function(){this.contentStarted||(this.playlistIndex=this.player.getPlaylistIndex(),this.playlistIndex===-1&&(this.playlistIndex=0),this.track("Video Content Started",this.metadata[this.playlistIndex].content),this.contentStarted=!0),this.isBuffering&&(this.track("Video Playback Buffer Completed",this.metadata[this.playlistIndex].playback),this.isBuffering=!1),this.isPaused&&(this.track("Video Playback Resumed",this.metadata[this.playlistIndex].playback),this.isPaused=!1)}},{key:"handlePause",value:function(){var g=this.determineSeek();this.isBuffering&&(this.track("Video Playback Buffer Completed",this.metadata[this.playlistIndex].playback),this.isBuffering=!1),this.isPaused||(g?(this.track("Video Playback Seek Started",this.metadata[this.playlistIndex].playback),this.isSeeking=!0):(this.track("Video Playback Paused",this.metadata[this.playlistIndex].playback),this.isPaused=!0))}},{key:"handleEnd",value:function(){this.track("Video Content Completed",this.metadata[this.playlistIndex].content),this.contentStarted=!1;var g=this.player.getPlaylistIndex(),_=this.player.getPlaylist();(_&&g===_.length-1||g===-1)&&(this.track("Video Playback Completed",this.metadata[this.playlistIndex].playback),this.playbackStarted=!1)}},{key:"determineSeek",value:function(){var g=this.isPaused||this.isBuffering?0:Date.now()-this.lastRecordedTime.timeReported,_=1e3*this.player.getCurrentTime()-this.lastRecordedTime.timeElapsed;return Math.abs(g-_)>2e3}}]),y}(o.default);function d(h){var y=h.match(/PT(\d+H)?(\d+M)?(\d+S)?/);return y=y.slice(1).map(function(g){if(g!=null)return g.replace(/\D/,"")}),3600*(parseInt(y[0])||0)+60*(parseInt(y[1])||0)+(parseInt(y[2])||0)}n.default=s}])})}(Dr)),Dr.exports}var $o=Cc();const Fc=Ha($o),Dc=Ro({__proto__:null,default:Fc},[$o]);export{Uc as A};

!function(r){function t(t){for(var e,n,i=t[0],s=t[1],o=t[2],a=0,h=[];a<i.length;a++)n=i[a],l[n]&&h.push(l[n][0]),l[n]=0;for(e in s)Object.prototype.hasOwnProperty.call(s,e)&&(r[e]=s[e]);for(f&&f(t);h.length;)h.shift()();return u.push.apply(u,o||[]),c()}function c(){for(var t,e=0;e<u.length;e++){for(var n=u[e],i=!0,s=1;s<n.length;s++){var o=n[s];0!==l[o]&&(i=!1)}i&&(u.splice(e--,1),t=a(a.s=n[0]))}return t}var n={},l={1:0},u=[];function a(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=r,a.c=n,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var e=window.webpackJsonp=window.webpackJsonp||[],i=e.push.bind(e);e.push=t,e=e.slice();for(var s=0;s<e.length;s++)t(e[s]);var f=i;u.push([8,0]),c()}({29:function(t,e,n){"use strict";n.r(e);n(9);var i,s,o,a,h=n(7),r=n.n(h),c=function(){function a(t){var e=this;if(this.noteWidth=102,this.noteHeight=102,this.noteWidthFlip=125,this.scale=3,this.saveSpeed=12,this.backPng=void 0,this._notePng="",this.tapCanvas=document.createElement("canvas"),this.longLoopCanvas=document.createElement("canvas"),this.longMoveCanvas=document.createElement("canvas"),this.longMoveWhiteCanvas=document.createElement("canvas"),this.flipLeftCanvas=document.createElement("canvas"),this.flipRightCanvas=document.createElement("canvas"),this._se=null,this._seOk=null,a._instance)return a._instance;this.noteWidth=t.noteWidth||this.noteWidth,this.noteHeight=t.noteHeight||this.noteHeight,this.noteWidthFlip=t.noteWidthFlip||this.noteWidthFlip,this.scale=t.scale||this.scale,this.saveSpeed=t.saveSpeed||this.saveSpeed,this.backPng=t.backPng,this._notePng=t.notePng,this.tapCanvas.width=this.longLoopCanvas.width=this.longMoveCanvas.width=this.longMoveWhiteCanvas.width=this.tapCanvas.height=this.longLoopCanvas.height=this.longMoveCanvas.height=this.longMoveWhiteCanvas.height=this.flipLeftCanvas.height=this.flipRightCanvas.height=this.noteWidth,this.flipLeftCanvas.width=this.flipRightCanvas.width=this.noteWidthFlip;var n=a.newImage(this._notePng);return n.addEventListener("load",function(){e.tapCanvas.getContext("2d").drawImage(n,0,0,e.noteWidth,e.noteHeight,0,0,e.noteWidth,e.noteHeight),e.longLoopCanvas.getContext("2d").drawImage(n,e.noteWidth,0,e.noteWidth,e.noteHeight,0,0,e.noteWidth,e.noteHeight),e.longMoveCanvas.getContext("2d").drawImage(n,2*e.noteWidth,0,e.noteWidth,e.noteHeight,0,0,e.noteWidth,e.noteHeight),e.longMoveWhiteCanvas.getContext("2d").drawImage(n,3*e.noteWidth,0,e.noteWidth,e.noteHeight,0,0,e.noteWidth,e.noteHeight),e.flipLeftCanvas.getContext("2d").drawImage(n,4*e.noteWidth,0,e.noteWidthFlip,e.noteHeight,0,0,e.noteWidthFlip,e.noteHeight),e.flipRightCanvas.getContext("2d").drawImage(n,4*e.noteWidth+e.noteWidthFlip,0,e.noteWidthFlip,e.noteHeight,0,0,e.noteWidthFlip,e.noteHeight)}),t.se&&(this._se=a.createAudio(t.se)),t.seOk&&(this._seOk=a.createAudio(t.seOk)),a._instance=this}return a.newImage=function(t){var e=new Image;return e.src=t,e},a.createAudio=function(t){var e=new Audio(t);return e.preload="auto",e},a.createScore=function(t){for(var e=t.split("\n"),n=e[1].split(",").map(function(t){return Number(t)})[5],i=[],s=2;s<e.length;s++){var o=e[s].split(",").map(function(t){return Number(t)});1!==o[2]&&2!==o[2]&&3!==o[2]||i.push({sec:o[1],type:o[2],finishPos:o[4],status:o[5],sync:o[6],groupId:o[7]})}return{fullCombo:n,score:i}},a.getQuery=function(t){if(a._query)return a._query[t];if(a._query={},window.location.search){for(var e=window.location.search.substr(1).split("&"),n=0;n<e.length;n++){var i=e[n].split("="),s=i[0],o=i[1];a._query[s]=o}return a._query[t]}},Object.defineProperty(a.prototype,"noteWidthDelta",{get:function(){return this.noteWidthFlip-this.noteWidth},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"noteWidthHalf",{get:function(){return this.noteWidth/2},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"noteHeightHalf",{get:function(){return this.noteHeight/2},enumerable:!0,configurable:!0}),a.prototype.getInstance=function(){if(!a._instance)throw new Error("Global instance null.");return a._instance},a.prototype.playSe=function(){this._se&&(this._se.currentTime=0,this._se.play().catch(function(t){return console.log(t)}))},a.prototype.playSeOk=function(){this._seOk&&(this._seOk.currentTime=0,this._seOk.play().catch(function(t){return console.log(t)}))},a._instance=null,a._query=null,a}(),f=new c({notePng:"./img/icon_notes.png",backPng:{src:"./img/live_icon_857x114.png",height:114,width:857}}),l=c,u=function(){function t(t){this._connectionHeight=12,this._sec=t.sec,this._x=m.X[t.finishPos-1],this._y=-f.noteHeight,this._connection=null,this._synchronizedNote=null}return t.prototype.setY=function(t){this._y=t},t.prototype.getX=function(){return this._x},t.prototype.setX=function(t){this._x=t},t.prototype.saveDrawSync=function(t){if(this._synchronizedNote){var e=m.X[this._synchronizedNote.finishPos-1]+f.noteWidthHalf,n=m.saveCalY(t,this._sec)+f.noteHeightHalf-this._connectionHeight/2/f.scale,i=this._x+f.noteWidthHalf+(m.X.includes(this._x)?0:f.noteWidthDelta);t.saveCtx.fillRect((i<e?i:e)+f.noteWidthHalf,n,(i<e?e-i:i-e)-f.noteWidth,this._connectionHeight/f.scale)}},t.prototype.drawSync=function(t){if(this._synchronizedNote){var e=m.X[this._synchronizedNote.finishPos-1]+f.noteWidthHalf,n=m.calY(t.options.speed,this._sec,t.audio.currentTime)+f.noteHeightHalf-this._connectionHeight/2,i=this._x+f.noteWidthHalf+(m.X.includes(this._x)?0:f.noteWidthDelta);t.frontCtx.fillRect((i<e?i:e)+f.noteWidthHalf,n,(i<e?e-i:i-e)-f.noteWidth,this._connectionHeight)}},t.prototype.isNeedDraw=function(){return this._y<-f.noteHeight?!!this._connection&&this._connection._instance._y>=-f.noteHeight:this._y<m.TOP_TO_TARGET_POSITION},t}(),_=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),p=function(i){function t(t,e){var n=i.call(this,t)||this;return e&&(n._synchronizedNote=e),n}return _(t,i),t.prototype.drawConnection=function(t){},t.prototype.drawNote=function(t){t.frontCtx.drawImage(f.tapCanvas,this._x,this._y)},t.prototype.saveDrawConnection=function(t){},t.prototype.saveDrawNote=function(t){t.saveCtx.drawImage(f.tapCanvas,0,0,f.tapCanvas.width,f.tapCanvas.height,this._x,this._y,f.tapCanvas.width/f.scale,f.tapCanvas.height/f.scale)},t}(u),d=(s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),g=function(s){function t(t,e,n){var i=s.call(this,t)||this;return i._status=t.status,1===i._status&&(i._x=i._x-f.noteWidthDelta),e&&(i._connection=e),n&&(i._synchronizedNote=n),i}return d(t,s),t.prototype._drawFlipConnection=function(t,e,n){if(!(n>=m.TOP_TO_TARGET_POSITION)){var i=1===this._status?this._x+f.noteWidthDelta+f.noteWidthHalf:this._x+f.noteWidthHalf;t.beginPath(),t.moveTo(i,this._y),t.lineTo(i,this._y+f.noteHeight),t.lineTo(e+f.noteWidthHalf,n+f.noteHeight),t.lineTo(e+f.noteWidthHalf,n),t.lineTo(i,this._y),t.fill()}},t.prototype._drawLongConnection=function(t,e){var n=1===this._status?this._x+f.noteWidthDelta:this._x;t.beginPath(),t.arc(n+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var i=e>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:e+f.noteHeightHalf;t.lineTo(n,i),t.arc(n+f.noteWidthHalf,i,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.lineTo(n+f.noteWidth,this._y+f.noteHeightHalf),t.fill()},t.prototype._drawMoveConnection=function(t,e,n,i){t.beginPath(),t.arc(1===this._status?this._x+f.noteWidthHalf+f.noteWidthDelta:this._x+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var s=n>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:n+f.noteHeightHalf,o=n>m.TOP_TO_TARGET_POSITION?e+(this._x-e)*-(m.TOP_TO_TARGET_POSITION-n)/(-(m.TOP_TO_TARGET_POSITION-n)+(m.TOP_TO_TARGET_POSITION-this._y)):e;t.lineTo(o,s),t.arc(o+f.noteWidthHalf,s,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.lineTo(1===this._status?this._x+f.noteWidth+f.noteWidthDelta:this._x+f.noteWidth,this._y+f.noteHeightHalf),t.fill(),n>m.TOP_TO_TARGET_POSITION&&(i?t.drawImage(f.longMoveWhiteCanvas,0,0,f.longMoveWhiteCanvas.width,f.longMoveWhiteCanvas.height,o,s-f.noteHeightHalf,f.longMoveWhiteCanvas.width/i,f.longMoveWhiteCanvas.height/i):t.drawImage(f.longMoveWhiteCanvas,o,s-f.noteHeightHalf))},t.prototype.drawConnection=function(t){if(this._connection){var e=m.X[this._connection.finishPos-1],n=m.calY(t.options.speed,this._connection.sec,t.audio.currentTime);1===this._connection.type?this._drawFlipConnection(t.frontCtx,e,n):2===this._connection.type?0===this._connection.status?this._drawLongConnection(t.frontCtx,n):this._drawFlipConnection(t.frontCtx,e,n):3===this._connection.type&&(0===this._connection.status?this._drawMoveConnection(t.frontCtx,e,n):this._drawFlipConnection(t.frontCtx,e,n))}},t.prototype.drawNote=function(t){t.frontCtx.drawImage(1===this._status?f.flipLeftCanvas:f.flipRightCanvas,this._x,this._y)},t.prototype.saveDrawConnection=function(t){if(this._connection){var e=m.X[this._connection.finishPos-1],n=m.saveCalY(t,this._connection.sec);1===this._connection.type?this._drawFlipConnection(t.saveCtx,e,n):2===this._connection.type?0===this._connection.status?this._drawLongConnection(t.saveCtx,n):this._drawFlipConnection(t.saveCtx,e,n):3===this._connection.type&&(0===this._connection.status?this._drawMoveConnection(t.saveCtx,e,n,f.scale):this._drawFlipConnection(t.saveCtx,e,n))}},t.prototype.saveDrawNote=function(t){1===this._status?t.saveCtx.drawImage(f.flipLeftCanvas,0,0,f.flipLeftCanvas.width,f.flipLeftCanvas.height,this._x,this._y,f.flipLeftCanvas.width/f.scale,f.flipLeftCanvas.height/f.scale):t.saveCtx.drawImage(f.flipRightCanvas,0,0,f.flipRightCanvas.width,f.flipRightCanvas.height,this._x,this._y,f.flipRightCanvas.width/f.scale,f.flipRightCanvas.height/f.scale)},t}(u),v=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),y=function(s){function t(t,e,n){var i=s.call(this,t)||this;return e&&(i._connection=e),n&&(i._synchronizedNote=n),i}return v(t,s),t.prototype.drawConnection=function(t){if(this._connection){var e=m.calY(t.options.speed,this._connection.sec,t.audio.currentTime);t.frontCtx.beginPath(),t.frontCtx.arc(this._x+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var n=e>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:e+f.noteHeightHalf;t.frontCtx.lineTo(this._x,n),t.frontCtx.arc(this._x+f.noteWidthHalf,n,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.frontCtx.lineTo(this._x+f.noteWidth,this._y+f.noteHeightHalf),t.frontCtx.fill()}},t.prototype.drawNote=function(t){t.frontCtx.drawImage(f.longLoopCanvas,this._x,this._y)},t.prototype.saveDrawConnection=function(t){if(this._connection){var e=m.saveCalY(t,this._connection.sec);t.saveCtx.beginPath(),t.saveCtx.arc(this._x+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var n=e>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:e+f.noteHeightHalf;t.saveCtx.lineTo(this._x,n),t.saveCtx.arc(this._x+f.noteWidthHalf,n,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.saveCtx.lineTo(this._x+f.noteWidth,this._y+f.noteHeightHalf),t.saveCtx.fill()}},t.prototype.saveDrawNote=function(t){t.saveCtx.drawImage(f.longLoopCanvas,0,0,f.longLoopCanvas.width,f.longLoopCanvas.height,this._x,this._y,f.longLoopCanvas.width/f.scale,f.longLoopCanvas.height/f.scale)},t}(u),C=(a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),T=function(s){function t(t,e,n){var i=s.call(this,t)||this;return e&&(i._connection=e),n&&(i._synchronizedNote=n),i}return C(t,s),t.prototype.drawConnection=function(t){if(this._connection){var e=m.X[this._connection.finishPos-1],n=m.calY(t.options.speed,this._connection.sec,t.audio.currentTime);t.frontCtx.beginPath(),t.frontCtx.arc(this._x+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var i=n>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:n+f.noteHeightHalf,s=n>m.TOP_TO_TARGET_POSITION?e+(this._x-e)*-(m.TOP_TO_TARGET_POSITION-n)/(-(m.TOP_TO_TARGET_POSITION-n)+(m.TOP_TO_TARGET_POSITION-this._y)):e;t.frontCtx.lineTo(s,i),t.frontCtx.arc(s+f.noteWidthHalf,i,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.frontCtx.lineTo(this._x+f.noteWidth,this._y+f.noteHeightHalf),t.frontCtx.fill(),n>m.TOP_TO_TARGET_POSITION&&t.frontCtx.drawImage(f.longMoveWhiteCanvas,s,i-f.noteHeightHalf)}},t.prototype.drawNote=function(t){t.frontCtx.drawImage(f.longMoveCanvas,this._x,this._y)},t.prototype.saveDrawConnection=function(t){if(this._connection){var e=m.X[this._connection.finishPos-1],n=m.saveCalY(t,this._connection.sec);t.saveCtx.beginPath(),t.saveCtx.arc(this._x+f.noteWidthHalf,this._y+f.noteHeightHalf,f.noteWidthHalf,0,Math.PI,!0);var i=n>m.TOP_TO_TARGET_POSITION?m.TOP_TO_TARGET_POSITION+f.noteHeightHalf:n+f.noteHeightHalf,s=n>m.TOP_TO_TARGET_POSITION?e+(this._x-e)*-(m.TOP_TO_TARGET_POSITION-n)/(-(m.TOP_TO_TARGET_POSITION-n)+(m.TOP_TO_TARGET_POSITION-this._y)):e;t.saveCtx.lineTo(s,i),t.saveCtx.arc(s+f.noteWidthHalf,i,f.noteWidthHalf,Math.PI,2*Math.PI,!0),t.saveCtx.lineTo(this._x+f.noteWidth,this._y+f.noteHeightHalf),t.saveCtx.fill(),n>m.TOP_TO_TARGET_POSITION&&t.saveCtx.drawImage(f.longMoveWhiteCanvas,0,0,f.longMoveWhiteCanvas.width,f.longMoveWhiteCanvas.height,s,i-f.noteHeightHalf,f.longMoveWhiteCanvas.width/f.scale,f.longMoveWhiteCanvas.height/f.scale)}},t.prototype.saveDrawNote=function(t){t.saveCtx.drawImage(f.longMoveCanvas,0,0,f.longMoveCanvas.width,f.longMoveCanvas.height,this._x,this._y,f.longMoveCanvas.width/f.scale,f.longMoveCanvas.height/f.scale)},t}(u),O=function(o,a,h,r){return new(h||(h=Promise))(function(t,e){function n(t){try{s(r.next(t))}catch(t){e(t)}}function i(t){try{s(r.throw(t))}catch(t){e(t)}}function s(e){e.done?t(e.value):new h(function(t){t(e.value)}).then(n,i)}s((r=r.apply(o,a||[])).next())})},I=function(n,i){var s,o,a,t,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(s)throw new TypeError("Generator is already executing.");for(;h;)try{if(s=1,o&&(a=2&e[0]?o.return:e[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,e[1])).done)return a;switch(o=0,a&&(e=[2&e[0],a.value]),e[0]){case 0:case 1:a=e;break;case 4:return h.label++,{value:e[1],done:!1};case 5:h.label++,o=e[1],e=[0];continue;case 7:e=h.ops.pop(),h.trys.pop();continue;default:if(!(a=0<(a=h.trys).length&&a[a.length-1])&&(6===e[0]||2===e[0])){h=0;continue}if(3===e[0]&&(!a||e[1]>a[0]&&e[1]<a[3])){h.label=e[1];break}if(6===e[0]&&h.label<a[1]){h.label=a[1],a=e;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(e);break}a[2]&&h.ops.pop(),h.trys.pop();continue}e=i.call(n,h)}catch(t){e=[6,t],o=0}finally{s=a=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}},w="2018",H="4",m=function(){function u(t,e,n){return this.options={speed:12},this._isReady=!1,this._isReadyToSave=!1,this._isPaused=!0,this._isClean=!0,u._instance?u._instance:(n&&(this.options=Object.assign({},this.options,n)),this.audio=l.createAudio(t.src),this.song=t,this._resolveNoteList(),this._resolveDOM(e),u._instance=this)}return u.main=function(){return O(this,void 0,void 0,function(){var e,n,i,s;return I(this,function(t){switch(t.label){case 0:return w=l.getQuery("id")||"2018",H=l.getQuery("difficulty")||"4",[4,r.a.get("./res/"+w+"-"+H+".csv")];case 1:return e=t.sent().data,n=l.createScore(e),i=n.fullCombo,s=n.score,u.init({src:"./res/"+w+".mp3",fullCombo:i,score:s},document.body),[2]}})})},u.init=function(t,e,n){return new u(t,e,n)},u.calY=function(t,e,n){return u.TOP_TO_TARGET_POSITION-~~(60*t*(e-n))},u.saveCalY=function(t,e){return t.saveCanvas.height-~~(60*f.saveSpeed*e)/f.scale},u.prototype._setNoteInstance=function(t,e){this.song.score[t]._instance||(this.song.score[t]._instance=e)},u.prototype._resolveNoteList=function(){for(var t=0;t<this.song.score.length;t++)if(!this.song.score[t]._instance){var e=this.song.score[t];switch(e.type){case 1:if(0===e.status)this._setNoteInstance(t,new p(e,this._getSyncNote(t)));else{var n=this._findSameGroup(t,e.groupId);if(n.length){for(var i=0;i<n.length-1;i++)if(this.song.score[n[i]].finishPos===this.song.score[n[i+1]].finishPos){n=n.slice(0,i+1);break}for(var s=n.length-1;0<s;s--)this._setNoteInstance(n[s],new g(this.song.score[n[s]],this.song.score[n[s-1]],this._getSyncNote(n[s])));this._setNoteInstance(n[0],new g(this.song.score[n[0]],e,this._getSyncNote(n[0])))}this._setNoteInstance(t,new g(e,void 0,this._getSyncNote(t)))}break;case 2:var o=this._findLongNote(t,e.finishPos);if(-1!==o){var a=this._findSameGroup(o,this.song.score[o].groupId);if(a.length){for(s=a.length-1;0<s;s--)2===this.song.score[a[s]].type&&0===this.song.score[a[s]].status?this._setNoteInstance(a[s],new y(this.song.score[a[s]],this.song.score[a[s-1]],this._getSyncNote(a[s]))):this._setNoteInstance(a[s],new g(this.song.score[a[s]],this.song.score[a[s-1]],this._getSyncNote(a[s])));2===this.song.score[a[0]].type&&0===this.song.score[a[0]].status?this._setNoteInstance(a[0],new y(this.song.score[a[0]],this.song.score[o],this._getSyncNote(a[0]))):this._setNoteInstance(a[0],new g(this.song.score[a[0]],this.song.score[o],this._getSyncNote(a[0])))}2===this.song.score[o].type&&0===this.song.score[o].status?this._setNoteInstance(o,new y(this.song.score[o],e,this._getSyncNote(o))):this._setNoteInstance(o,new g(this.song.score[o],e,this._getSyncNote(o)))}this._setNoteInstance(t,new y(e,void 0,this._getSyncNote(t)));break;case 3:var h=this._findSameGroup(t,e.groupId);if(h.length){for(s=h.length-1;0<s;s--)3===this.song.score[h[s]].type&&0===this.song.score[h[s]].status?this._setNoteInstance(h[s],new T(this.song.score[h[s]],this.song.score[h[s-1]],this._getSyncNote(h[s]))):this._setNoteInstance(h[s],new g(this.song.score[h[s]],this.song.score[h[s-1]],this._getSyncNote(h[s])));3===this.song.score[h[0]].type&&0===this.song.score[h[0]].status?this._setNoteInstance(h[0],new T(this.song.score[h[0]],e,this._getSyncNote(h[0]))):this._setNoteInstance(h[0],new g(this.song.score[h[0]],e,this._getSyncNote(h[0])))}this._setNoteInstance(t,new T(e,void 0,this._getSyncNote(t)))}}},u.prototype.start=function(){var t=this;if(this._isReady){this.audio.play().catch(function(t){return console.log(t)});var e=this;!function t(){e._cal();e._renderNote();e._t=window.requestAnimationFrame(t)}()}else setTimeout(function(){t.start()},100)},u.prototype.stop=function(){this.audio.pause(),window.cancelAnimationFrame(this._t)},u.prototype._clear=function(){this._isClean||(this.frontCtx.clearRect(0,0,u.CANVAS_WIDTH,u.CANVAS_HEIGHT-15),this._isClean=!0)},u.prototype._cal=function(){for(var t=-1,e=0;e<this.song.score.length;e++){if(this.song.score[e].sec>this.audio.currentTime){t=e;break}this.song.score[e]._instance.setY(u.calY(this.options.speed,this.song.score[e].sec,this.audio.currentTime))}-1===t&&(t=this.song.score.length),this._comboDom.innerHTML!==""+t&&(this._comboDom.innerHTML=""+t);for(e=t;e<this.song.score.length;e++)this.song.score[e]._instance.setY(u.calY(this.options.speed,this.song.score[e].sec,this.audio.currentTime))},u.prototype._findLongNote=function(t,e){for(var n=t+1;n<this.song.score.length;n++)if(this.song.score[n].finishPos===e)return n;return-1},u.prototype._findSameGroup=function(t,e){if(0===e)return[];for(var n=[],i=t+1;i<this.song.score.length;i++)this.song.score[i].groupId===e&&n.push(i);return n},u.prototype._renderNote=function(){this._clear();for(var t=this.song.score.length-1;0<=t;t--)this.song.score[t]._instance.isNeedDraw()&&this.song.score[t]._instance.drawConnection(this);this.frontCtx.save(),this.frontCtx.fillStyle="#fff";for(t=this.song.score.length-1;0<=t;t--)this.song.score[t]._instance.isNeedDraw()&&this.song.score[t]._instance.drawSync(this);this.frontCtx.restore();for(t=this.song.score.length-1;0<=t;t--)this.song.score[t]._instance.isNeedDraw()&&this.song.score[t]._instance.drawNote(this);this._isClean=!1},u.prototype._getSyncNote=function(t){if(t!==this.song.score.length-1&&1===this.song.score[t].sync&&this.song.score[t].sec===this.song.score[t+1].sec)return this.song.score[t+1]},u.prototype._saveScore=function(){return O(this,void 0,void 0,function(){var c,l,n=this;return I(this,function(t){switch(t.label){case 0:return this._isReady?(c=function(){return new Promise(function(e){n.saveCanvas.toBlob(function(t){e(t)},"image/png",1)})},[4,(l=function(){return O(n,void 0,void 0,function(){var e,n,i,s,o,a,h,r;return I(this,function(t){switch(t.label){case 0:if(!this._isReadyToSave){for(this.stop(),this.saveCanvas.height=60*f.saveSpeed*this.audio.duration/f.scale,this.saveCtx=this.saveCanvas.getContext("2d"),this.saveCtx.fillStyle="rgba(255, 255, 255, 0.66)",this.saveCtx.save(),this.saveCtx.fillStyle="rgb(39, 40, 34)",this.saveCtx.font="12px Consolas",this.saveCtx.fillRect(0,0,this.saveCanvas.width,this.saveCanvas.height),this.saveCtx.strokeStyle="#e070d0",this.saveCtx.fillStyle="#e070d0",e=this.saveCanvas.height-10,this.saveCtx.font="12px -apple-system, BlinkMacSystemFont, Segoe WPC,Segoe UI, HelveticaNeue-Light, Noto Sans, Microsoft YaHei, PingFang SC, Hiragino Sans GB, Source Han Sans SC, Source Han Sans CN, Source Han Sans, sans-serif",this.saveCtx.fillStyle="#fff",this.saveCtx.textAlign="center",this.saveCtx.fillText("https://github.com/toyobayashi/mishiro-score-viewer",this.saveCanvas.width/2,e-7),this.saveCtx.restore(),f.noteWidth/=f.scale,f.noteHeight/=f.scale,f.noteWidthFlip/=f.scale,n=u.TOP_TO_TARGET_POSITION,i=u.X,u.X=[32,208,383,558,731].map(function(t){return t/f.scale}),u.TOP_TO_TARGET_POSITION=this.saveCanvas.height,s=0;s<this.song.score.length;s++)this.song.score[s]._instance.setX(this.song.score[s]._instance.getX()/f.scale),this.song.score[s]._instance.setY(u.saveCalY(this,this.song.score[s].sec));for(s=this.song.score.length-1;0<=s;s--)this.song.score[s]._instance.saveDrawConnection(this);for(this.saveCtx.save(),this.saveCtx.fillStyle="#fff",s=this.song.score.length-1;0<=s;s--)this.song.score[s]._instance.saveDrawSync(this);for(this.saveCtx.restore(),s=this.song.score.length-1;0<=s;s--)this.song.score[s]._instance.saveDrawNote(this);for(s=0;s<this.song.score.length;s++)this.song.score[s]._instance.setX(this.song.score[s]._instance.getX()*f.scale);f.noteWidth*=f.scale,f.noteHeight*=f.scale,f.noteWidthFlip*=f.scale,u.TOP_TO_TARGET_POSITION=n,u.X=i}return[4,c()];case 1:return(o=t.sent())?[3,3]:(a=f.saveSpeed,f.saveSpeed--,[4,l()]);case 2:return t.sent(),f.saveSpeed=a,[2];case 3:return this._isReadyToSave=!0,this.start(),(h=document.createElement("a")).download=w+"-"+H+".png",h.href=URL.createObjectURL(o),r=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}),h.dispatchEvent(r),h.remove(),[2]}})})})()]):(setTimeout(function(){return O(n,void 0,void 0,function(){return I(this,function(t){switch(t.label){case 0:return[4,this._saveScore()];case 1:return t.sent(),[2]}})})},100),[2]);case 1:return t.sent(),[2]}})})},u.prototype._resolveDOM=function(t){var e=this;this.frontCanvas=document.createElement("canvas"),this.saveCanvas=document.createElement("canvas"),this.frontCanvas.width=u.CANVAS_WIDTH,this.frontCanvas.height=u.CANVAS_HEIGHT,this.saveCanvas.width=u.CANVAS_WIDTH/f.scale,this.pauseButton=document.createElement("button"),this.pauseButton.innerHTML="play",this.pauseButton.addEventListener("click",function(){f.playSe(),e._isPaused?e.start():e.stop()}),this.pauseButton.className="cgss-btn cgss-btn-ok",this.pauseButton.style.position="absolute",this.pauseButton.style.zIndex="2000",this.pauseButton.style.top="2%",this.pauseButton.style.left="1%",this.saveButton=document.createElement("button"),this.saveButton.innerHTML="save",this.saveButton.addEventListener("click",function(){f.playSeOk(),e._saveScore()}),this.saveButton.className="cgss-btn cgss-btn-ok",this.saveButton.style.position="absolute",this.saveButton.style.zIndex="2000",this.saveButton.style.top="calc(2% + 84px)",this.saveButton.style.left="1%",this.rangeInput=document.createElement("input"),this.rangeInput.type="range",this.rangeInput.min="0",this.rangeInput.max="100",this.rangeInput.value="0",this.rangeInput.style.position="absolute",this.rangeInput.style.zIndex="2000",this.rangeInput.style.width="50%",this.rangeInput.style.left="25%",this.rangeInput.style.bottom="10px",this.rangeInput.addEventListener("input",function(t){e.audio.currentTime=Number(t.target.value)}),this.speedInput=document.createElement("input"),this.speedInput.type="range",this.speedInput.min="5",this.speedInput.max="20",this.speedInput.value="12",this.speedInput.style.position="absolute",this.speedInput.style.zIndex="2000",this.speedInput.style.width="15%",this.speedInput.style.left="2%",this.speedInput.style.bottom="10px",this.speedInput.addEventListener("input",function(t){e.options.speed=Number(t.target.value)});var n=document.createElement("span");this._comboDom=document.createElement("span"),this._comboDom.className="combo-number",this._comboDom.innerHTML="0",n.className="combo-text",n.innerHTML="combo";var i=document.createElement("div");if(i.className="combo",i.appendChild(this._comboDom),i.appendChild(n),f.backPng&&f.backPng.src){this.backCanvas=document.createElement("canvas"),this.backCanvas.width=u.CANVAS_WIDTH,this.backCanvas.height=u.CANVAS_HEIGHT,this.backCtx=this.backCanvas.getContext("2d");var s=this;l.newImage(f.backPng.src).addEventListener("load",function(){s.backCtx.drawImage(this,Math.round((u.CANVAS_WIDTH-this.width)/2),u.CANVAS_HEIGHT-u.BOTTOM-this.height)},!1),t.appendChild(this.backCanvas)}t.appendChild(this.frontCanvas),t.appendChild(this.pauseButton),t.appendChild(this.saveButton),t.appendChild(this.rangeInput),t.appendChild(this.speedInput),t.appendChild(i),this.frontCtx=this.frontCanvas.getContext("2d"),this.frontCtx.fillStyle="rgba(255, 255, 255, 0.66)",this.audio.addEventListener("canplay",function(){e._isReady=!0,e.rangeInput.max=e.audio.duration.toString()}),this.audio.addEventListener("play",function(){e._isPaused=!1,e.pauseButton.innerHTML="pause",e.pauseButton.className="cgss-btn cgss-btn-star"}),this.audio.addEventListener("pause",function(){e._isPaused=!0,e.pauseButton.innerHTML="play",e.pauseButton.className="cgss-btn cgss-btn-ok"}),this.audio.addEventListener("ended",function(){window.close()},!1),this.audio.addEventListener("timeupdate",function(){e.rangeInput.value=e.audio.currentTime.toString(),e.rangeInput.style.backgroundSize=e.audio.currentTime/e.audio.duration*100+"% 100%"});var o=function(){window.innerWidth/window.innerHeight>=u.CANVAS_WIDTH/u.CANVAS_HEIGHT?(e.frontCanvas.className="canvas canvas-center",e.backCanvas&&(e.backCanvas.className="canvas canvas-center")):(e.frontCanvas.className="canvas canvas-middle",e.backCanvas&&(e.backCanvas.className="canvas canvas-middle"))};o(),window.addEventListener("resize",o,!1)},u._instance=null,u.CANVAS_WIDTH=867,u.CANVAS_HEIGHT=720,u.X=[32,208,383,558,731],u.TOP_TO_TARGET_POSITION=u.CANVAS_HEIGHT-(u.BOTTOM=20)-(f.backPng?f.backPng.height:0)+(f.backPng?Math.round((f.backPng.height-f.noteHeight)/2):0),u}();m.main()},8:function(t,e,n){t.exports=n(29)},9:function(t,e,n){}});
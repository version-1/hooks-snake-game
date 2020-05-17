(this["webpackJsonphooks-snake-game"]=this["webpackJsonphooks-snake-game"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(7),c=n.n(o),r=(n(13),n(3)),u=n(1),s=n(5),l=function(e){return i.a.createElement("div",{className:"dots ".concat(e.value)})},f=function(e){var t=e.fields;return i.a.createElement("div",{className:"field"},t.map((function(e,t){return e.map((function(e,n){return i.a.createElement(l,{key:"".concat(t,"-").concat(n),value:e})}))})))},d=function(e){var t=e.state,n=e.canUp,a=e.canDown,o=e.onChangeDifficulty,c=t.length,r=t.difficulty,u=n?"":"is-hidden",s=a?"":"is-hidden";return i.a.createElement("div",{className:"navigation"},i.a.createElement("div",{className:"navigation-item"},i.a.createElement("span",{className:"navigation-label"},"Length: "),i.a.createElement("div",{className:"navigation-item-number-container"},i.a.createElement("div",{className:"num-board"},c))),i.a.createElement("div",{className:"navigation-item"},i.a.createElement("span",{className:"navigation-label"},"Difficulty: "),i.a.createElement("div",{className:"navigation-item-number-container"},i.a.createElement("span",{className:"num-board"},r),i.a.createElement("div",{className:"difficulty-button-container"},i.a.createElement("div",{className:"difficulty-button difficulty-up ".concat(u),onClick:function(){return o(1)}}),i.a.createElement("div",{className:"difficulty-button difficulty-down ".concat(s),onClick:function(){return o(-1)}})))))},m={up:"up",down:"down",right:"right",left:"left"},y={FieldSize:35,DefaultDifficulty:3,IntervalList:[500,300,100,50,10],StatusType:{init:"init",playing:"playing",suspended:"suspended",gameover:"gameover"},StatusText:{init:"START",playing:"STOP",gameover:"GAME OVER",suspended:"START"},DirectionType:m,OppositeDirectionType:{up:"down",down:"up",right:"left",left:"right"},DotType:{none:"",snake:"snake",food:"food"},DirectionTypeDelta:{up:function(e){return{x:e.x,y:e.y-1}},down:function(e){return{x:e.x,y:e.y+1}},right:function(e){return{x:e.x+1,y:e.y}},left:function(e){return{x:e.x-1,y:e.y}}},DirectionKeyCodeMap:{37:m.left,38:m.up,39:m.right,40:m.down},SnakeStartPosition:{x:Math.round(17.5)-1,y:Math.round(17.5)-1}},p=function(e){var t=e.status,n=e.onStart,a=e.onStop,o=e.onRestart,c=y.StatusText[t];return i.a.createElement("div",{className:"button-start"},i.a.createElement("button",{className:"btn btn-".concat(t),tabIndex:1,onClick:function(){({init:n,playing:a,gameover:o,suspended:n})[t]()}},c))},v=function(e){var t=e.handleChangeDirection;return i.a.createElement("div",{className:"move-button"},i.a.createElement("button",{className:"btn btn-move btn-left",onClick:function(){return t("left")}},"\u2190"),i.a.createElement("div",{className:"btn-up-down"},i.a.createElement("button",{className:"btn btn-move btn-up",onClick:function(){return t("up")}},"\u2191"),i.a.createElement("button",{className:"btn btn-move btn-down",onClick:function(){return t("down")}},"\u2193")),i.a.createElement("button",{className:"btn btn-move btn-right",onClick:function(){return t("right")}},"\u2192"))},b=function(e,t){return Math.floor(Math.random()*(t+1-e))+e},g=function(e,t){var n=function(e){for(var t=function(){var t={x:b(1,y.FieldSize-2),y:b(1,y.FieldSize-2)};if(e.every((function(e){return t.x!==e.x||t.y!==e.y})))return{v:t}};;){var n=t();if("object"===typeof n)return n.v}}(e);return t[n.y][n.x]=y.DotType.food,n},h=function(){for(var e=[],t=0;t<y.FieldSize;t++){var n=new Array(y.FieldSize).fill(y.DotType.none);e.push(n)}var a=function(e){return e[y.SnakeStartPosition.y][y.SnakeStartPosition.x]=y.DotType.snake,y.SnakeStartPosition}(e);return g([a],e),e},E=function(){return{position:y.SnakeStartPosition,history:[],length:1,difficulty:y.DefaultDifficulty,fields:h(),tickId:null,status:y.StatusType.init,direction:y.DirectionType.up}},S=function(e,t){var n=t.length,a=t.history,i=t.fields,o=t.position,c=y.DirectionTypeDelta[e](o),r=[o].concat(Object(s.a)(a)).slice(0,n);if(!function(e){return e.y<0||e.x<0||e.y>y.FieldSize-1||e.x>y.FieldSize-1}(c)&&!function(e,t){return e[t.y][t.x]===y.DotType.snake}(i,c)){var l=Object(s.a)(i),f=n;l[c.y][c.x]===y.DotType.food&&(g([c].concat(Object(s.a)(r)),l),f=n+1);var d=r.slice(-1)[0];return l[c.y][c.x]=y.DotType.snake,l[d.y][d.x]=y.DotType.none,Object(u.a)({},t,{status:y.StatusType.playing,history:r,length:f,position:c,fields:l})}return Object(u.a)({},t,{status:y.StatusType.gameover,tickId:null})},T=null,k=function(){var e=Object(a.useState)(E()),t=Object(r.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(0),s=Object(r.a)(c,2),l=s[0],m=s[1],b=Object(a.useState)(),g=Object(r.a)(b,2),h=g[0],k=g[1],D=Object(a.useState)(y.DirectionType.up),N=Object(r.a)(D,2),O=N[0],j=N[1],x=n.status,w=n.fields,C=n.difficulty,M=Object(a.useMemo)((function(){return x===y.StatusType.init}),[x]),I=Object(a.useMemo)((function(){return C-1<y.IntervalList.length-1}),[C]),z=Object(a.useMemo)((function(){return C-1>0}),[C]);Object(a.useEffect)((function(){var e=setInterval((function(){m((function(e){return e+1}))}),y.IntervalList[C-1]);return k(e),function(){clearInterval(e)}}),[C]),Object(a.useEffect)((function(){if(n.status===y.StatusType.playing){var e=S(O,n);o(e)}}),[h,O,l,o]);var F=Object(a.useCallback)((function(e){y.DirectionType[e]&&x===y.StatusType.playing&&y.OppositeDirectionType[O]!==e&&O!==e&&j(e)}),[O,x,j]);return Object(a.useEffect)((function(){T&&document.removeEventListener("keydown",T),T=function(e){var t=y.DirectionKeyCodeMap[e.keyCode];F(t)},document.addEventListener("keydown",T)}),[F]),i.a.createElement("div",{className:"app"},i.a.createElement("header",{className:"header"},i.a.createElement("div",{className:"title-container"},i.a.createElement("h1",{className:"title"},"SNAKE GAME")),i.a.createElement(d,{state:n,editable:M,canUp:I,canDown:z,onChangeDifficulty:function(e){M&&o((function(t){return y.IntervalList[t.difficulty-1+e]?Object(u.a)({},t,{difficulty:t.difficulty+e}):t}))}})),i.a.createElement("main",{className:"main"},i.a.createElement(f,{fields:w})),i.a.createElement("footer",{className:"footer"},i.a.createElement(p,{status:x,onStart:function(){o((function(e){return Object(u.a)({},e,{status:y.StatusType.playing})}))},onRestart:function(){j(y.DirectionType.up),o(E())},onStop:function(){o((function(e){return Object(u.a)({},e,{status:y.StatusType.suspended})}))}}),i.a.createElement(v,{handleChangeDirection:F})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.1a342220.chunk.js.map
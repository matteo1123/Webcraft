(this.webpackJsonpsciibuildfinder=this.webpackJsonpsciibuildfinder||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n.p+"static/media/BuildingCommandBar.19d3d6dd.jpg"},,,function(e,t,n){e.exports=n.p+"static/media/Building.1da2f8a8.png"},function(e,t,n){e.exports=n.p+"static/media/Worker.20adb206.png"},,function(e,t,n){e.exports=n.p+"static/media/WorkerCommandBar.f3d75a19.jpg"},function(e,t,n){e.exports=n(28)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i=n(0),l=n.n(i),s=n(10),o=n.n(s),c=(n(20),n(7)),a=n(2),r=n(3),u=n(6),d=n(4),p=n(1),h=n(5),m=(n(21),n(22),function(e){function t(){return Object(a.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"Pause"},l.a.createElement("h1",null,"Pause"))}}]),t}(i.Component)),v=(n(23),function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).clickMiniMap=n.clickMiniMap.bind(Object(p.a)(n)),n.state={top:"0",left:"0"},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"clickMiniMap",value:function(e){var t=100*(e.clientY/window.innerHeight-.75)>20?20:100*(e.clientY/window.innerHeight-.75),n=e.clientX/window.innerWidth*100-3>20?20:e.clientX/window.innerWidth*100-3;n<0&&(n=0),t<0&&(t=0),this.setState({top:t+"vh",left:n+"vw"}),this.props.click(n,t)}},{key:"render",value:function(){var e={top:this.state.top,left:this.state.left};return l.a.createElement("div",{onClick:this.clickMiniMap,className:"Minimap"},l.a.createElement("div",{style:e,className:"screenIndicator"}))}}]),t}(i.Component)),b=(n(24),n(11)),f=n.n(b),y=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).directClick=n.directClick.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"directClick",value:function(e){this.props.selected(),e.stopPropagation(),e.target.parentNode.classList.add("Selected")}},{key:"render",value:function(){return l.a.createElement("div",{onClick:this.directClick,style:this.props,className:"Building"},l.a.createElement("img",{alt:"shutup",src:f.a}))}}]),t}(i.Component);y.defaultProps={top:"25px",left:"25px"};var g=y,w=(n(25),n(12)),k=n.n(w),j=n(13),O=n.n(j),E=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).directClick=n.directClick.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"directClick",value:function(e){this.props.selected(),e.stopPropagation(),e.target.parentNode.classList.add("Selected")}},{key:"render",value:function(){return l.a.createElement("div",{id:this.props.id,onClick:this.directClick,style:this.props,className:"Worker Unit"},l.a.createElement("img",{alt:"shutup",src:k.a}))}}]),t}(i.Component);E.defaultProps={top:"25px",left:"25px",id:O()()};var x=E,B=(n(26),n(14)),C=n.n(B),S=n(8),M=n.n(S),N=M.a,L=function(e){function t(){return Object(a.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return this.props.selected&&(N="Worker"===this.props.selected.classList[0]?C.a:M.a),l.a.createElement("div",{className:"CommandBar"},l.a.createElement("img",{alt:"commandPanel",className:"CommandPanel",src:N}))}}]),t}(i.Component),P=(n(27),function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).scroll=n.scroll.bind(Object(p.a)(n)),n.stopScroll=n.stopScroll.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"scroll",value:function(){this.setState({scrolling:window.setInterval(this.props.mouseover,20,this.props.direction)})}},{key:"stopScroll",value:function(){window.clearInterval(this.state.scrolling)}},{key:"render",value:function(){return l.a.createElement("div",{onMouseOut:this.stopScroll,onMouseOver:this.scroll,className:"scrollbar "+this.props.direction})}}]),t}(i.Component)),W=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={paused:!1,selectBox:{},boxPos:[]},n.paused=n.paused.bind(Object(p.a)(n)),n.miniMapClick=n.miniMapClick.bind(Object(p.a)(n)),n.selectBox=n.selectBox.bind(Object(p.a)(n)),n.resizeBox=n.resizeBox.bind(Object(p.a)(n)),n.closeBox=n.closeBox.bind(Object(p.a)(n)),n.rightClick=n.rightClick.bind(Object(p.a)(n)),n.moveTo=n.moveTo.bind(Object(p.a)(n)),n.scroll=n.scroll.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"paused",value:function(e){27===e.keyCode&&(this.state.paused?this.setState({paused:!1}):this.setState({paused:!0}))}},{key:"unselectEverythingElse",value:function(e){Object(c.a)(document.querySelectorAll(".Selected")).map((function(e){return e.classList.toggle("Selected"),0}))}},{key:"miniMapClick",value:function(e,t){var n=.05*e*2.5*window.innerWidth,i=.05*t*2.5*window.innerHeight;window.scrollTo(n,i)}},{key:"selectBox",value:function(e){this.unselectEverythingElse(null);var t=document.createElement("div");t.classList.add("selectBox"),document.body.appendChild(t);var n;t.style.display="block",t.style.top=e.pageY+"px",t.style.left=e.pageX+"px",t.style.width="0px",t.style.height="0px",n=[e.pageX,e.pageY],this.setState({selectBox:t,boxPos:n}),window.addEventListener("mousemove",this.resizeBox)}},{key:"resizeBox",value:function(e){var t=this.state,n=t.boxPos,i=t.selectBox;i.style.top=Math.min(n[1],e.pageY)+"px",i.style.left=Math.min(n[0],e.pageX)+"px",i.style.width=Math.abs(e.pageX-n[0])+"px",i.style.height=Math.abs(e.pageY-n[1])+"px",window.addEventListener("mouseup",this.closeBox),this.setState({selectBox:i})}},{key:"closeBox",value:function(e){var t=this.state.selectBox;Object(c.a)(document.querySelectorAll(".Unit")).map((function(e){var n=Number(e.style.top.slice(0,e.style.top.length-2)),i=Number(e.style.left.slice(0,e.style.left.length-2)),l=Number(t.style.top.slice(0,t.style.top.length-2)),s=Number(t.style.height.slice(0,t.style.height.length-2)),o=Number(t.style.left.slice(0,t.style.left.length-2)),c=Number(t.style.width.slice(0,t.style.width.length-2));return n+20>=l&&n-8<=s+l&&i+20>=o&&i-8<=o+c&&e.classList.add("Selected"),0})),t.remove(),window.removeEventListener("mousemove",this.resizeBox),window.removeEventListener("mouseup",this.closeBox)}},{key:"rightClick",value:function(e){var t=this;if(e.preventDefault(),document.querySelector(".Selected")){var n=document.querySelectorAll(".Selected");n[0].classList.contains("Building")&&console.log("make set waypoint function!"),n[0].classList.contains("Unit")&&Object(c.a)(n).map((function(n){return t.setState({id:!1}),t.setState({id:setInterval(t.moveTo,25,n,e.pageX,e.pageY)}),0}))}}},{key:"moveTo",value:function(e,t,n){var i=Number(e.style.top.slice(0,e.style.top.length-2)),l=Number(e.style.left.slice(0,e.style.left.length-2));i<n&&(i+=5),i>n&&(i-=5),l<t&&(l+=5),l>t&&(l-=5),e.style.top=i+"px",e.style.left=l+"px",console.log(e.id),Math.abs(i+l-t-n)<30&&this.setState({id:!1})}},{key:"scroll",value:function(e){"left"===e&&window.scrollBy(-20,0),"right"===e&&window.scrollBy(20,0),"up"===e&&window.scrollBy(0,-20),"down"===e&&window.scrollBy(0,20),"upleft"===e&&window.scrollBy(-20,-20),"upright"===e&&window.scrollBy(20,-20),"downleft"===e&&window.scrollBy(-20,20),"downright"===e&&window.scrollBy(20,20)}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.paused,!1),window.addEventListener("scroll",this.noScroll)}},{key:"render",value:function(){return l.a.createElement("div",{draggable:"true",className:"App",onDragStart:this.selectBox,scroll:"no",overflow:"hidden",onContextMenu:this.rightClick,onClick:this.unselectEverythingElse},this.state.paused&&l.a.createElement(m,null),l.a.createElement(g,{selected:this.unselectEverythingElse,top:"200px",left:"150px"}),l.a.createElement(x,{selected:this.unselectEverythingElse,top:"145px"}),l.a.createElement(x,{selected:this.unselectEverythingElse,top:"90px"}),l.a.createElement(x,{selected:this.unselectEverythingElse}),l.a.createElement(v,{click:this.miniMapClick}),l.a.createElement(L,{selected:document.querySelector(".Selected")}),l.a.createElement(P,{mouseover:this.scroll,direction:"left"}),l.a.createElement(P,{mouseover:this.scroll,direction:"right"}),l.a.createElement(P,{mouseover:this.scroll,direction:"up"}),l.a.createElement(P,{mouseover:this.scroll,direction:"down"}),l.a.createElement(P,{mouseover:this.scroll,direction:"upleft"}),l.a.createElement(P,{mouseover:this.scroll,direction:"upright"}),l.a.createElement(P,{mouseover:this.scroll,direction:"downleft"}),l.a.createElement(P,{mouseover:this.scroll,direction:"downright"}))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[15,1,2]]]);
//# sourceMappingURL=main.6c7d025f.chunk.js.map
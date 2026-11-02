(function(){
var $=function(s){return document.querySelector(s)},all=function(s){return[].slice.call(document.querySelectorAll(s))},cl=function(x){return Math.min(1,Math.max(0,x))};
var ld=$('#ld'),pc=$('#pc'),n=0;
function tick(){n=Math.min(100,n+2+Math.random()*4);pc.textContent=Math.floor(n);n<100?setTimeout(tick,35):setTimeout(function(){ld.classList.add('done')},250)}tick();
all('[data-s]').forEach(function(el){var i=0;el.innerHTML=el.textContent.split(' ').map(function(w){return'<span class="w"><i style="--i:'+(i++)+'">'+w+'</i></span> '}).join('')});
var chs=all('.ch'),chap=$('#home'),pg=$('#pg'),cur=-1;
function chapters(){var r=chap.getBoundingClientRect(),p=cl(-r.top/(chap.offsetHeight-innerHeight)),k=Math.min(chs.length-1,Math.floor(p*chs.length));pg.style.width=p*100+'%';
if(k!==cur){chs.forEach(function(c,j){c.classList.toggle('on',j===k);c.classList.toggle('past',j<k)});cur=k}}
addEventListener('scroll',chapters,{passive:true});chapters();
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('in')})},{threshold:.15});all('.calc').forEach(function(c){io.observe(c)});
var cu=$('#cur'),mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,nx=0,ny=0;
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;nx=mx/innerWidth-.5;ny=my/innerHeight-.5});
all('a,button,select,summary,input').forEach(function(e){e.addEventListener('pointerenter',function(){cu.classList.add('big')});e.addEventListener('pointerleave',function(){cu.classList.remove('big')})});
var mags=all('.mag');
function mag(){mags.forEach(function(m){var r=m.getBoundingClientRect(),dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2),d=Math.hypot(dx,dy);m.style.transform=d<110?'translate('+dx*.3+'px,'+dy*.3+'px)':''})}
var T=window.THREE,cv=$('#gl');
if(!T){loop();return}
var sc=new T.Scene(),cam=new T.PerspectiveCamera(60,1,.1,200),rd=new T.WebGLRenderer({canvas:cv,antialias:true});
rd.setPixelRatio(Math.min(devicePixelRatio,2));
var cols=[new T.Color(0xb4491f),new T.Color(0xc93a1f),new T.Color(0x2a1710)],bg=new T.Color();
sc.fog=new T.Fog(0xb4491f,8,70);
sc.add(new T.AmbientLight(0xfff0dc,.7));var dl=new T.DirectionalLight(0xffffff,1.1);dl.position.set(4,8,6);sc.add(dl);
var g=[new T.SphereGeometry(1,28,20),new T.SphereGeometry(1,28,20),new T.TorusGeometry(.8,.3,14,30)],ms=[],bahan=[0xd8402a,0xfff3d6,0xf2b632,0x5f8f3a,0xfff3d6,0xc93a1f,0xe8a13a,0x7da640,0xfbe6c2];
for(var i=0;i<90;i++){var m=new T.Mesh(g[i%3],new T.MeshStandardMaterial({color:bahan[i%9],flatShading:false,roughness:.42,metalness:0}));
var s=.5+Math.random()*2.2;m.scale.set(s,s*(.6+Math.random()),s);m.position.set((Math.random()-.5)*30,(Math.random()-.5)*18,-Math.random()*130);m.userData={r:(Math.random()-.5)*.01,y:m.position.y,f:Math.random()*6};sc.add(m);ms.push(m)}
function size(){rd.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',size);size();
var sp=0,t=0,vel=0;
function loop(){requestAnimationFrame(loop);cx+=(mx-cx)*.15;cy+=(my-cy)*.15;if(cu)cu.style.transform='translate('+cx+'px,'+cy+'px)';mag();
if(!T||window._pause)return;t+=.01;var max=document.documentElement.scrollHeight-innerHeight,p=max>0?cl(scrollY/max):0;var d=(p-sp)*.06;sp+=d;vel+=(Math.abs(d)-vel)*.1;
cam.position.z=-sp*115;cam.position.x+=(nx*6-cam.position.x)*.05;cam.position.y+=(-ny*4-cam.position.y)*.05;cam.rotation.z=Math.sin(sp*9)*.08;cam.rotation.y=-nx*.15;
var a=sp<.5?0:1,f=sp<.5?sp*2:(sp-.5)*2;bg.copy(cols[a]).lerp(cols[a+1],f);sc.fog.color.copy(bg);rd.setClearColor(bg);
ms.forEach(function(m){m.rotation.x+=m.userData.r*(2+vel*900);m.rotation.y+=m.userData.r*(1+vel*600);m.position.y=m.userData.y+Math.sin(t+m.userData.f)*.6});
rd.render(sc,cam)}
loop()})();

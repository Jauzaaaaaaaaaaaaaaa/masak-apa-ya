(function(){
var $=function(s){return document.querySelector(s)},all=function(s){return[].slice.call(document.querySelectorAll(s))},cl=function(x){return Math.min(1,Math.max(0,x))};
var sm=$('.stmt'),ws;if(sm){sm.innerHTML=sm.textContent.split(' ').map(function(w){return'<span class="lw">'+w+'</span>'}).join(' ');ws=all('.lw')}
var dk=$('#kisah'),hz=$('#resep'),trk=$('#trk'),R=window.R,E={ayam:'🍗',telur:'🍳',tahutempe:'🫘',ikan:'🐟',sayur:'🥬'};
if(trk&&R){trk.innerHTML=R.map(function(r,i){return'<div class="cd" data-i="'+i+'"><div class="em">'+E[r.c]+'</div><h3>'+r.n+'</h3><div class="tg">'+r.t+' menit</div><p class="tg">'+r.i.slice(0,3).join(', ')+', dan lainnya</p><span class="pl">▶ Buka buku resep</span></div>'}).join('')+'<div class="cd cta"><h3>Mau yang lain?</h3><a class="btn" href="#acak" style="margin-top:14px">Acak menu</a></div>';
all('.cd[data-i]').forEach(function(c){c.addEventListener('click',function(e){window.cook(+c.dataset.i,e)})});
all('.cd').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.transform='perspective(700px) rotateY('+((e.clientX-r.left)/r.width-.5)*14+'deg) rotateX('+(.5-(e.clientY-r.top)/r.height)*14+'deg)'});c.addEventListener('pointerleave',function(){c.style.transform=''})})}
function sc(){var r;
if(ws){r=dk.getBoundingClientRect();var k=Math.floor(cl(-r.top/(dk.offsetHeight-innerHeight)*1.25)*ws.length);ws.forEach(function(w,i){w.classList.toggle('on',i<=k)})}
if(trk){r=hz.getBoundingClientRect();var q=cl(-r.top/(hz.offsetHeight-innerHeight));trk.style.transform='translateX('+(-q*Math.max(0,trk.scrollWidth-innerWidth+innerWidth*.16))+'px)'}}
addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();
var sb=$('#sb'),sl=$('#sl'),sts=all('.st'),EM=['🕗','🥬','🎲'],L=['Waktu makan','Bahan di dapur','Acak menu'];
function step(i){sb.textContent=EM[i];sl.textContent=L[i];sts.forEach(function(s,j){s.classList.toggle('act',j===i)})}step(0);
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)step(sts.indexOf(x.target))})},{rootMargin:'-42% 0px -42% 0px'});sts.forEach(function(s){io.observe(s)});
var links=all('.nav a[href^="#"]'),no=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})})},{rootMargin:'-45% 0px -45% 0px'});
links.forEach(function(a){var s=$(a.getAttribute('href'));s&&no.observe(s)})})();

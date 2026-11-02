/* Buku masakan rumahan: halaman kiri = bahan & alat, halaman kanan = cara masak yang ditulis pena per huruf. Tanpa 3D. */
(function(){
var R=window.R,$=function(i){return document.getElementById(i)};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var rnd=function(a,b){return a+Math.random()*(b-a)};
var reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);

/* pena: ujung di kiri (0,8), badan ke kanan */
var PEN='<svg class="pen-in" viewBox="0 0 64 16" width="64" height="16" aria-hidden="true">'+
'<path d="M0 8L9 4.6L9 11.4Z" fill="#b9bdc7"/>'+
'<circle cx=".7" cy="8" r=".8" fill="#1d3262"/>'+
'<rect x="9" y="3.6" width="44" height="8.8" rx="3" fill="#1d3262"/>'+
'<rect x="12" y="4.9" width="36" height="1.8" rx=".9" fill="#ffffff" opacity=".28"/>'+
'<path d="M31 3.6V1.4H37V3.6" fill="none" stroke="#c9a24a" stroke-width="1.2"/>'+
'<rect x="53" y="3.6" width="7" height="8.8" rx="2" fill="#c9a24a"/>'+
'</svg>';

function meta(r){
var w=r.w.length>2?'kapan saja':r.w.map(function(x){return{s:'sarapan',l:'makan siang',m:'makan malam'}[x]}).join(' dan ');
return r.t+' menit · cocok untuk '+w}

/* DOM buku */
var bk=document.createElement('div');
bk.className='bk';
bk.setAttribute('role','dialog');
bk.setAttribute('aria-modal','true');
bk.setAttribute('aria-label','Buku masakan rumahan');
bk.innerHTML='<div class="bkp">'+
'<header class="bkh"><button class="bkx" id="bkx" type="button" aria-label="Tutup buku">×</button>'+
'<div class="bklabel"><small>Buku masakan rumahan</small><h3 id="bkt"></h3><p id="bkm"></p></div></header>'+
'<div class="spread">'+
'<section class="pg pg-l" aria-label="Bahan dan alat"><h4>Bahan</h4><ul class="ing" id="bki"></ul><h4>Alat</h4><div class="alat" id="bka"></div></section>'+
'<section class="pg pg-r" id="bkr" aria-label="Cara masak"><div class="bk-blank"><p>Halaman cara masak masih tertutup.</p><button class="bk-go" id="bkgo" type="button">Lanjut ke cara masak →</button></div>'+
'<div class="bk-steps" id="bksw"><h4>Cara masak</h4><ol class="stp" id="bks"></ol><p class="bk-end" id="bke"></p>'+
'<button class="bk-skip" id="bkskip" type="button">lewati ›</button>'+
'<div class="pen" id="bkpen">'+PEN+'</div></div></section>'+
'</div></div>';
document.body.appendChild(bk);

/* tiap kata dibungkus span, tiap huruf span sendiri (awalnya transparan) */
function words(text){
return text.split(' ').map(function(w){
var cs=Array.from(w).map(function(ch){return'<span class="c">'+esc(ch)+'</span>'}).join('');
return'<span class="wd" style="--r:'+rnd(-1.4,1.4).toFixed(2)+'deg;--y:'+rnd(-.8,.6).toFixed(2)+'px">'+cs+'</span>'}).join(' ')}

function fill(r){
$('bkt').textContent=r.n;
$('bkm').textContent=meta(r);
$('bki').innerHTML=r.i.map(function(x){return'<li>'+esc(x)+'</li>'}).join('');
$('bka').innerHTML=(r.a||[]).map(function(x){return'<span>'+esc(x)+'</span>'}).join('');
$('bks').innerHTML=r.s.map(function(x){return'<li>'+words(x)+'</li>'}).join('');
$('bke').innerHTML=words('Selamat makan! '+r.n+' siap disajikan.')}

/* antrean huruf: langkah-langkah lalu tanda selesai */
var Q=[],qi=0,wt=0,on=false,pen=$('bkpen'),box=$('bksw');
function queue(){
var q=[];
[].forEach.call($('bks').children,function(li){
[].forEach.call(li.querySelectorAll('.c'),function(c,k){q.push({c:c,li:k===0?li:null,first:k===0})})});
[].forEach.call($('bke').querySelectorAll('.c'),function(c,k){q.push({c:c,li:null,first:k===0})});
return q}

function placePen(c,edge){
var b=box.getBoundingClientRect(),r=c.getBoundingClientRect();
var x=(edge==='end'?r.right:r.left)-b.left,y=r.bottom-b.top-12;
pen.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate(-28deg)'}

function step(){
if(!on)return;
if(qi>=Q.length){done();return}
var it=Q[qi++],wait=0;
if(it.first){
if(it.li){it.li.classList.add('on');if(it.li.scrollIntoView)it.li.scrollIntoView({block:'nearest'})}
placePen(it.c,'start');
wait=it.li?420:260}
wt=setTimeout(function(){
it.c.classList.add('on');
placePen(it.c,'end');
var ch=it.c.textContent,d=/[,.;:!?]/.test(ch)?rnd(170,240):rnd(24,46);
if(!it.c.nextElementSibling)d+=rnd(45,85);
wt=setTimeout(step,d)},wait)}

function write(){
Q=queue();qi=0;
if(reduce){done();return}
on=true;
bk.classList.add('writing');
step()}

function done(){
on=false;clearTimeout(wt);
Q.forEach(function(it){it.c.classList.add('on')});
[].forEach.call($('bks').children,function(li){li.classList.add('on')});
bk.classList.remove('writing')}

function stop(){on=false;clearTimeout(wt);bk.classList.remove('writing')}

function open(i){
var r=R&&R[i];if(!r)return;
stop();
fill(r);
bk.classList.remove('show');
bk.querySelector('.bkp').scrollTop=0;
document.body.style.overflow='hidden';
window._pause=true;
requestAnimationFrame(function(){bk.classList.add('open')});
if(window.show)window.show(i)}

function close(){
stop();
bk.classList.remove('open');
document.body.style.overflow='';
window._pause=false}

function reveal(){
bk.classList.add('show');
if(innerWidth<=760)$('bkr').scrollIntoView({behavior:'smooth',block:'start'});
clearTimeout(wt);
wt=setTimeout(write,innerWidth<=760?600:350)}

$('bkgo').addEventListener('click',reveal);
$('bkskip').addEventListener('click',function(){clearTimeout(wt);done()});
$('bkx').addEventListener('click',close);
bk.addEventListener('click',function(e){if(e.target===bk)close()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&bk.classList.contains('open'))close()});

window.cook=open;
var ab=$('anim');
if(ab)ab.addEventListener('click',function(){open(window._cur||0)});
})();

(function(){
var R=window.R,$=function(i){return document.getElementById(i)},wk='x',bh='x',last=-1;
function chip(id,set){$(id).addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call($(id).children,function(x){x.classList.toggle('on',x===b)});set(b.dataset.v)})}
chip('c1',function(v){wk=v});chip('c2',function(v){bh=v});
function render(r){$('rn').textContent=r.n;$('rm').textContent=r.t+' menit, cocok untuk '+(r.w.length>2?'kapan saja':r.w.map(function(x){return{s:'sarapan',l:'makan siang',m:'makan malam'}[x]}).join(' dan '));
$('ri').innerHTML=r.i.map(function(x){return'<li>'+x+'</li>'}).join('');$('rs').innerHTML=r.s.map(function(x){return'<li>'+x+'</li>'}).join('');
window._s=r.n+'\nBahan: '+r.i.join(', ')+'\nCara: '+r.s.join(' ')+'\nDari Masak Apa Ya';
var c=$('res');c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop')}
window.show=function(i){last=i;window._cur=i;render(R[i])};
$('go').addEventListener('click',function(){var p=R.filter(function(r){return(wk==='x'||r.w.indexOf(wk)>-1)&&(bh==='x'||r.c===bh)});
if(!p.length){$('msg').textContent='Belum ada resep untuk kombinasi itu. Coba pilih "Apa saja".';return}$('msg').textContent='';
var pick=p[Math.floor(Math.random()*p.length)];if(p.length>1)while(R.indexOf(pick)===last)pick=p[Math.floor(Math.random()*p.length)];
var n=0,iv=setInterval(function(){$('rn').textContent=R[Math.floor(Math.random()*R.length)].n;if(++n>12){clearInterval(iv);window.show(R.indexOf(pick))}},70)});
$('salin').addEventListener('click',function(){navigator.clipboard&&navigator.clipboard.writeText(window._s).then(function(){$('salin').textContent='Tersalin'})});
window.show(1)})();

var trips={
"d1":{
label:"1 Day",
best:"Quick getaway, weekend travelers",
stops:[
{t:"6:00 AM",ico:"Sunrise",n:"Ganpatipule Beach",d:"Watch the sunrise over the Arabian Sea."},
{t:"9:00 AM",ico:"Temple",n:"Ganpatipule Temple",d:"Ancient Ganesh temple right on the beach."},
{t:"12:00 PM",ico:"Meal",n:"Konkani Lunch",d:"Try Sol Kadhi, fish curry and rice at a local eatery."},
{t:"2:30 PM",ico:"Fort",n:"Ratnadurg Fort",d:"Historic sea fort with panoramic coastal views."},
{t:"5:30 PM",ico:"Beach",n:"Beach Sunset",d:"End your day watching the sun dip into the sea."}
]
},
"d3":{
label:"3 Days",
best:"Families and short vacations",
stops:[
{t:"Day 1 – AM",ico:"Fort",n:"Ratnagiri City & Forts",d:"Explore Ratnadurg Fort and Thibaw Palace museum."},
{t:"Day 1 – PM",ico:"Beach",n:"Ganpatipule Beach",d:"Relax on the famous beach and visit the temple."},
{t:"Day 2 – AM",ico:"Boat",n:"Murud Beach, Dapoli",d:"Quiet golden sands and shallow waters."},
{t:"Day 2 – PM",ico:"Fort",n:"Suvarnadurg Fort",d:"Maratha sea fort on a small island near Harne."},
{t:"Day 3 – AM",ico:"Beach",n:"Guhagar Beach",d:"One of the cleanest beaches on the Konkan coast."},
{t:"Day 3 – PM",ico:"Temple",n:"Vyadeshwar Temple",d:"500-year-old temple, a major pilgrimage site."}
]
},
"d5":{
label:"5 Days",
best:"Relaxed sightseeing",
stops:[
{t:"Day 1",ico:"Fort",n:"Ratnagiri Attractions",d:"Ratnadurg Fort, Thibaw Palace, local beaches."},
{t:"Day 2",ico:"Beach",n:"Dapoli Beaches",d:"Murud Beach, Suvarnadurg Fort, Keshavraj Temple."},
{t:"Day 3",ico:"Beach",n:"Chiplun",d:"Parshuram Temple and Vashishti river boat ride."},
{t:"Day 4",ico:"Falls",n:"Sangameshwar Waterfalls",d:"Marleshwar Temple surrounded by monsoon falls."},
{t:"Day 5",ico:"Farm",n:"Mango Farms & Local Cuisine",d:"Alphonso farm visit (seasonal) and farewell seafood."}
]
},
"d7":{
label:"7 Days",
best:"Complete Konkan experience",
stops:[
{t:"Day 1–2",ico:"Fort",n:"Ratnagiri & Guhagar",d:"Forts, beaches, temples, and local markets."},
{t:"Day 3",ico:"Beach",n:"Dapoli",d:"Murud Beach, Suvarnadurg Fort, and sunset views."},
{t:"Day 4",ico:"Beach",n:"Chiplun",d:"Parshuram Temple, Vashishti river, Panchganga Ghat."},
{t:"Day 5",ico:"Hills",n:"Khed & Mandangad",d:"Hidden gems — hills, forts, and scenic drives."},
{t:"Day 6",ico:"Nature",n:"Lanja & Rajapur",d:"Rajapur Ganga hot springs and rural village life."},
{t:"Day 7",ico:"Falls",n:"Sangameshwar",d:"Marleshwar Temple, waterfalls, and peaceful retreat."}
]
}
};
var spots=[
{n:"Ganpatipule Beach",img:"images/ganpatipule_beach.jpg",st:5,d:"Ratnagiri"},
{n:"Ratnadurg Fort",img:"images/ratnadurg_fort.jpg",st:5,d:"Ratnagiri"},
{n:"Marleshwar Temple",img:"images/marleshwar_temple.jpg",st:5,d:"Sangameshwar"},
{n:"Guhagar Beach",img:"images/guhagar_beach.jpg",st:4,d:"Guhagar"},
{n:"Suvarnadurg Fort",img:"images/suvarnadurg_fort.jpg",st:4,d:"Dapoli"},
{n:"Parshuram Temple",img:"images/parshuram_temple1.jpg",st:4,d:"Chiplun"},
{n:"Vyadeshwar Temple",img:"images/vyadeshwar_temple.jpg",st:4,d:"Guhagar"},
{n:"Chiplun River",img:"images/chiplun_river.jpg",st:4,d:"Chiplun"}
];
var curTab="d1";
var trOpt="bus";
function rSpots(){
var sc=document.getElementById("spots-scroll");
if(!sc)return;
var s="";
var i=0;
for(i=0;i<spots.length;i++){
var sp=spots[i];
var st="";
var j=0;
for(j=0;j<5;j++){st+=j<sp.st?"*":"-";}
s+='<div class="spot-card">';
s+='<img src="'+sp.img+'" alt="'+sp.n+'" loading="lazy">';
s+='<div class="spot-info"><h4>'+sp.n+'</h4>';
s+='<div class="spot-stars">'+st+'</div>';
s+='<span class="spot-badge">'+sp.d+'</span></div></div>';
}
sc.innerHTML=s;
}
function getCk(tid){
var v=localStorage.getItem("ck_"+tid);
return v?JSON.parse(v):{};
}
function saveCk(tid,obj){
localStorage.setItem("ck_"+tid,JSON.stringify(obj));
}
function upPB(tid){
var t=trips[tid];
var ck=getCk(tid);
var total=t.stops.length;
var done=0;
var i=0;
while(i<total){if(ck[i])done++;i++;}
var pct=total>0?Math.round(done/total*100):0;
var pb=document.getElementById("pb_"+tid);
var pl=document.getElementById("pl_"+tid);
if(pb)pb.style.width=pct+"%";
if(pl)pl.textContent=done+" of "+total+" stops visited";
}
function tgCk(tid,idx){
var ck=getCk(tid);
ck[idx]=!ck[idx];
saveCk(tid,ck);
var card=document.getElementById("tc_"+tid+"_"+idx);
var dot=document.getElementById("td_"+tid+"_"+idx);
var cb=document.getElementById("cb_"+tid+"_"+idx);
if(ck[idx]){
if(card)card.classList.add("done");
if(dot)dot.classList.add("done");
if(cb)cb.checked=true;
}else{
if(card)card.classList.remove("done");
if(dot)dot.classList.remove("done");
if(cb)cb.checked=false;
}
upPB(tid);
}
function getMp(){
var v=localStorage.getItem("myplan");
return v?JSON.parse(v):[];
}
function saveMp(arr){
localStorage.setItem("myplan",JSON.stringify(arr));
}
function addPlan(nm,btnId){
var p=getMp();
var i=0;
var found=false;
while(i<p.length){if(p[i]===nm){found=true;break;}i++;}
if(!found){
p.push(nm);
saveMp(p);
}
var btn=document.getElementById(btnId);
if(btn){btn.textContent="Saved";btn.classList.add("saved");}
upBadge();
rPlanList();
}
function rmPlan(idx){
var p=getMp();
p.splice(idx,1);
saveMp(p);
upBadge();
rPlanList();
}
function clrPlan(){
localStorage.removeItem("myplan");
upBadge();
rPlanList();
}
function upBadge(){
var p=getMp();
var bc=document.getElementById("badge-cnt");
if(bc)bc.textContent=p.length;
}
function rPlanList(){
var p=getMp();
var pb=document.getElementById("pp-body");
if(!pb)return;
if(p.length===0){pb.innerHTML='<p class="pp-empty">No places saved yet.</p>';return;}
var s="";
var i=0;
while(i<p.length){
s+='<div class="pp-item"><span>[Place] '+p[i]+'</span><button class="pp-rm" onclick="rmPlan('+i+')">×</button></div>';
i++;
}
pb.innerHTML=s;
}
function shPlan(){
var pp=document.getElementById("plan-popup");
if(!pp)return;
pp.classList.toggle("show");
rPlanList();
}
function rTL(tid){
var t=trips[tid];
var ck=getCk(tid);
var el=document.getElementById("tl_"+tid);
if(!el)return;
var s="";
s+='<div class="prog-wrap"><div class="prog-bar" id="pb_'+tid+'"></div></div>';
s+='<p class="prog-label" id="pl_'+tid+'">0 of '+t.stops.length+' stops visited</p>';
s+='<div class="timeline">';
var i=0;
for(i=0;i<t.stops.length;i++){
var sp=t.stops[i];
var dk=ck[i]||false;
var dc=dk?" done":"";
var bid="apb_"+tid+"_"+i;
var isSaved=getMp().indexOf(sp.n)>=0;
s+='<div class="tl-item">';
s+='<div class="tl-dot'+dc+'" id="td_'+tid+'_'+i+'"></div>';
s+='<div class="tl-card'+dc+'" id="tc_'+tid+'_'+i+'">';
s+='<div class="tl-ico">'+sp.ico+'</div>';
s+='<div class="tl-body">';
s+='<div class="tl-time">'+sp.t+'</div>';
s+='<p class="tl-name">'+sp.n+'</p>';
s+='<p class="tl-desc">'+sp.d+'</p>';
s+='</div>';
s+='<div class="tl-right">';
s+='<input type="checkbox" class="ck-box" id="cb_'+tid+'_'+i+'"'+(dk?' checked':'')+' onchange="tgCk(\''+tid+'\','+i+')">';
s+='<button class="add-plan-btn'+(isSaved?' saved':'')+'" id="'+bid+'" onclick="addPlan(\''+sp.n+'\',\''+bid+'\')">'+(isSaved?'Saved':'+ Plan')+'</button>';
s+='</div>';
s+='</div></div>';
}
s+='</div>';
s+='<p style="font-size:12px;color:#888;margin:0;"><b>Best for:</b> '+t.best+'</p>';
el.innerHTML=s;
upPB(tid);
}
function swTab(tid){
curTab=tid;
var ps=document.querySelectorAll(".tab-panel");
var bs=document.querySelectorAll(".tab-btn");
var i=0;
for(i=0;i<ps.length;i++){ps[i].classList.remove("show");}
for(i=0;i<bs.length;i++){bs[i].classList.remove("act");}
var tp=document.getElementById("tp_"+tid);
if(tp)tp.classList.add("show");
var tb=document.getElementById("tb_"+tid);
if(tb)tb.classList.add("act");
rTL(tid);
updCost();
}
function updCost(){
var ht=document.getElementById("sl-hotel");
var pp=document.getElementById("sl-people");
var fd=document.getElementById("sl-food");
if(!ht||!pp||!fd)return;
var hv=parseInt(ht.value);
var pv=parseInt(pp.value);
var fv=parseInt(fd.value);
var days={"d1":1,"d3":3,"d5":5,"d7":7};
var nd=days[curTab]||1;
var rooms=Math.ceil(pv/2);
var hotelT=hv*rooms*nd;
var foodT=fv*pv*nd;
var trDay={"bus":Math.ceil(pv/5)*300,"car":2200,"taxi":3500};
var trT=(trDay[trOpt]||300)*nd;
var entryT=150*pv*nd;
var miscT=Math.round(0.08*(hotelT+foodT+trT));
var total=hotelT+foodT+trT+entryT+miscT;
var svh=document.getElementById("sv-hotel");
var svf=document.getElementById("sv-food");
var spv=document.getElementById("sv-people");
var br=document.getElementById("cost-breakdown");
var cr=document.getElementById("cost-result-val");
var cd=document.getElementById("cost-days");
if(svh)svh.textContent="₹"+hv.toLocaleString("en-IN")+"/night";
if(svf)svf.textContent="₹"+fv.toLocaleString("en-IN")+"/person/day";
if(spv)spv.textContent=pv+" person"+(pv>1?"s":"")+" ("+rooms+" room"+(rooms>1?"s":"")+" shared)";
if(br)br.innerHTML='<div class="bk-row"><span>[Hotel] Hotel ('+rooms+' room'+(rooms>1?"s":"")+' × '+nd+' night'+(nd>1?"s":"")+')</span><span>₹'+hotelT.toLocaleString("en-IN")+'</span></div>'+'<div class="bk-row"><span>[Food] Food ('+pv+' × '+nd+' day'+(nd>1?"s":"")+')</span><span>₹'+foodT.toLocaleString("en-IN")+'</span></div>'+'<div class="bk-row"><span>[Bus] Transport ('+trOpt+')</span><span>₹'+trT.toLocaleString("en-IN")+'</span></div>'+'<div class="bk-row"><span>[Entry] Entry fees</span><span>₹'+entryT.toLocaleString("en-IN")+'</span></div>'+'<div class="bk-row"><span>[Misc] Miscellaneous (8%)</span><span>₹'+miscT.toLocaleString("en-IN")+'</span></div>';
if(cr)cr.textContent="₹"+total.toLocaleString("en-IN");
if(cd)cd.textContent="Total for "+nd+" day"+(nd>1?"s":"")+" · "+pv+" person"+(pv>1?"s":"")+" · "+trOpt;
}
function setTr(v,el){
trOpt=v;
var os=document.querySelectorAll(".tr-opt");
var i=0;
for(i=0;i<os.length;i++){os[i].classList.remove("act");}
if(el)el.classList.add("act");
updCost();
}
window.addEventListener("DOMContentLoaded",function(){
rSpots();
swTab("d1");
var bd=document.getElementById("sl-budget");
var pp=document.getElementById("sl-people");
var ht2=document.getElementById("sl-hotel");
var fd2=document.getElementById("sl-food");
var pp2=document.getElementById("sl-people");
if(ht2)ht2.addEventListener("input",updCost);
if(fd2)fd2.addEventListener("input",updCost);
if(pp2)pp2.addEventListener("input",updCost);
upBadge();
document.getElementById("plan-badge").addEventListener("click",shPlan);
document.getElementById("pp-cls").addEventListener("click",function(){
document.getElementById("plan-popup").classList.remove("show");
});
document.getElementById("pp-clr").addEventListener("click",clrPlan);
});

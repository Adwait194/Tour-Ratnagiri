var qd=[
{img:"images/ganpatipule_beach.jpg",a:"Ratnagiri"},
{img:"images/ratnadurg_fort.jpg",a:"Ratnagiri"},
{img:"images/thibaw_palace.jpg",a:"Ratnagiri"},
{img:"images/ratnagiri_hotel1.jpg",a:"Ratnagiri"},
{img:"images/dapoli_beach.jpg",a:"Dapoli"},
{img:"images/suvarnadurg_fort.jpg",a:"Dapoli"},
{img:"images/keshavraj_temple.jpg",a:"Dapoli"},
{img:"images/guhagar_beach.jpg",a:"Guhagar"},
{img:"images/guhagar_resort1.jpg",a:"Guhagar"},
{img:"images/vyadeshwar_temple.jpg",a:"Guhagar"},
{img:"images/hedvi_temple.jpg",a:"Guhagar"},
{img:"images/chiplun_river.jpg",a:"Chiplun"},
{img:"images/parshuram_temple1.jpg",a:"Chiplun"},
{img:"images/panchganga_ghat.jpg",a:"Chiplun"},
{img:"images/marleshwar_temple.jpg",a:"Sangameshwar"},
{img:"images/sangmeshwar_river.jpg",a:"Sangameshwar"},
{img:"images/karneshwar_temple.jpg",a:"Sangameshwar"},
{img:"images/laja_river.jpg",a:"Lanja"},
{img:"images/laja_hills.jpg",a:"Lanja"},
{img:"images/laja_temple.jpg",a:"Lanja"},
{img:"images/rajapur_ganga.jpg",a:"Rajapur"},
{img:"images/rajapur_temple.jpg",a:"Rajapur"},
{img:"images/rajapur_river.jpg",a:"Rajapur"},
{img:"images/mandangad_fort.jpg",a:"Mandangad"},
{img:"images/savitri_river.jpg",a:"Mandangad"},
{img:"images/khed_hills.jpg",a:"Khed"},
{img:"images/savitri_river_khed.jpg",a:"Khed"},
{img:"images/khed_hotel1.jpg",a:"Khed"}
];
var dists=["Ratnagiri","Dapoli","Guhagar","Chiplun","Sangameshwar","Lanja","Rajapur","Mandangad","Khed"];
var score=0,asked=0,total=10,cur=null,deck=[],answered=false;
function shuffle(arr){
var a=arr.slice();
var i=a.length,j,t;
while(i--){j=Math.floor(Math.random()*(i+1));t=a[i];a[i]=a[j];a[j]=t;}
return a;
}
function mkDeck(){
var sh=shuffle(qd);
deck=sh.slice(0,total);
}
function wrongs(ans){
var w=dists.filter(function(d){return d!==ans;});
var sw=shuffle(w).slice(0,3);
return shuffle([ans].concat(sw));
}
function upScore(){
var sc=document.getElementById("qscore");
var sq=document.getElementById("qasked");
if(sc)sc.textContent=score;
if(sq)sq.textContent=asked+"/"+total;
}
function showEnd(){
var qw=document.getElementById("qwrap");
qw.innerHTML='<div class="end-card">'
+'<div class="big">'+(score>=8?"":score>=5?"":"")+'</div>'
+'<h3>Quiz Complete!</h3>'
+'<p>You scored <b>'+score+' out of '+total+'</b>.<br>'
+(score===total?"Perfect score! You know Ratnagiri inside out!":score>=7?"Great job! You know Ratnagiri well.":score>=4?"Good effort! Explore the gallery to learn more.":"Keep exploring — Ratnagiri has so much to discover!")
+'</p>'
+'<button class="retry-btn" id="retryBtn">Play Again</button>'
+'</div>';
document.getElementById("retryBtn").addEventListener("click",startQ);
}
function nextQ(){
if(asked>=total){showEnd();return;}
answered=false;
cur=deck[asked];
var opts=wrongs(cur.a);
var qw=document.getElementById("qwrap");
var s='<div class="quiz-img-wrap"><img src="'+cur.img+'" alt="Guess the district" loading="lazy"></div>';
s+='<p class="quiz-q">Which district does this place belong to?</p>';
s+='<div class="opts">';
var i=0;
for(i=0;i<opts.length;i++){
s+='<button class="opt-btn" data-val="'+opts[i]+'">'+opts[i]+'</button>';
}
s+='</div>';
s+='<div class="quiz-feedback" id="qfb"></div>';
s+='<button class="next-btn" id="nxtBtn" disabled>'+(asked===total-1?"See Results":"Next →")+'</button>';
qw.innerHTML=s;
var bs=document.querySelectorAll(".opt-btn");
var j=0;
for(j=0;j<bs.length;j++){
bs[j].addEventListener("click",function(){
if(answered)return;
answered=true;
asked++;
var ch=this.getAttribute("data-val");
var fb=document.getElementById("qfb");
var nb=document.getElementById("nxtBtn");
var all=document.querySelectorAll(".opt-btn");
var k=0;
for(k=0;k<all.length;k++){
all[k].disabled=true;
if(all[k].getAttribute("data-val")===cur.a)all[k].classList.add("correct");
}
if(ch===cur.a){
score++;
this.classList.add("correct");
fb.textContent="Correct! It's "+cur.a+".";
fb.className="quiz-feedback ok";
}else{
this.classList.add("wrong");
fb.textContent="Wrong. The answer is "+cur.a+".";
fb.className="quiz-feedback no";
}
upScore();
nb.disabled=false;
});
}
document.getElementById("nxtBtn").addEventListener("click",nextQ);
}
function startQ(){
score=0;asked=0;answered=false;
mkDeck();
upScore();
nextQ();
}
window.addEventListener("DOMContentLoaded",function(){
var gd2=[
{n:"Ganpatipule Beach",cat:"beach",d:"Ratnagiri",img:"images/ganpatipule_beach.jpg",desc:"Famous pristine beach with the ancient Ganpatipule temple right on the shore."},
{n:"Dapoli Beach",cat:"beach",d:"Dapoli",img:"images/dapoli_beach.jpg",desc:"Peaceful golden sands and shallow waters, perfect for family visits."},
{n:"Guhagar Beach",cat:"beach",d:"Guhagar",img:"images/guhagar_beach.jpg",desc:"One of the cleanest and least crowded beaches on the Konkan coast."},
{n:"Rajapur River",cat:"nature",d:"Rajapur",img:"images/rajapur_river.jpg",desc:"Scenic riverside views with lush greenery and cool breezes."},
{n:"Chiplun River",cat:"nature",d:"Chiplun",img:"images/chiplun_river.jpg",desc:"The Vashishti river flows calmly through Chiplun, creating a beautiful landscape."},
{n:"Ratnadurg Fort",cat:"fort",d:"Ratnagiri",img:"images/ratnadurg_fort.jpg",desc:"A sea fort perched on a cliff offering panoramic views of the Arabian Sea."},
{n:"Suvarnadurg Fort",cat:"fort",d:"Dapoli",img:"images/suvarnadurg_fort.jpg",desc:"Historic Maratha sea fort located on a small island near Harne harbour."},
{n:"Mandangad Fort",cat:"fort",d:"Mandangad",img:"images/mandangad_fort.jpg",desc:"An ancient hill fort surrounded by dense forests and scenic valleys."},
{n:"Marleshwar Temple",cat:"temple",d:"Sangameshwar",img:"images/marleshwar_temple.jpg",desc:"A cave temple dedicated to Lord Shiva, surrounded by lush waterfalls."},
{n:"Vyadeshwar Temple",cat:"temple",d:"Guhagar",img:"images/vyadeshwar_temple.jpg",desc:"One of the most revered temples of the Konkan region, over 500 years old."},
{n:"Keshavraj Temple",cat:"temple",d:"Dapoli",img:"images/keshavraj_temple.jpg",desc:"A peaceful temple dedicated to Lord Vishnu located near Dapoli coast."},
{n:"Karneshwar Temple",cat:"temple",d:"Sangameshwar",img:"images/karneshwar_temple.jpg",desc:"A beautiful Shiva temple beside the Shastri river."},
{n:"Hedvi Temple",cat:"temple",d:"Guhagar",img:"images/hedvi_temple.jpg",desc:"The Hedvi Ganpati temple sits close to the beach and is considered highly auspicious."},
{n:"Khed Hills",cat:"nature",d:"Khed",img:"images/khed_hills.jpg",desc:"Rolling green hills with breathtaking views during the monsoon season."},
{n:"Lanja Hills",cat:"nature",d:"Lanja",img:"images/laja_hills.jpg",desc:"Peaceful hilly terrain with winding rural roads and lush forests."},
{n:"Lanja River",cat:"nature",d:"Lanja",img:"images/laja_river.jpg",desc:"A calm river with scenic ghats and riverside views."},
{n:"Sangameshwar River",cat:"nature",d:"Sangameshwar",img:"images/sangmeshwar_river.jpg",desc:"A beautiful river confluence surrounded by forest."},
{n:"Savitri River",cat:"nature",d:"Mandangad",img:"images/savitri_river.jpg",desc:"The Savitri river runs through Mandangad, offering peaceful boat rides."},
{n:"Panchganga Ghat",cat:"nature",d:"Chiplun",img:"images/panchganga_ghat.jpg",desc:"A sacred riverside ghat where five rivers meet."},
{n:"Thibaw Palace",cat:"fort",d:"Ratnagiri",img:"images/thibaw_palace.jpg",desc:"Historical palace where Burma's last king lived in exile, now a museum."},
{n:"Rajapur Temple",cat:"temple",d:"Rajapur",img:"images/rajapur_temple.jpg",desc:"A riverside temple with intricate stone carvings."},
{n:"Parshuram Temple",cat:"temple",d:"Chiplun",img:"images/parshuram_temple1.jpg",desc:"An important pilgrimage site on the banks of the Vashishti river."}
];
var curCat="all";
function rGal(cat){
var ga=document.getElementById("gal");
if(!ga)return;
var f=cat==="all"?gd2:gd2.filter(function(x){return x.cat===cat;});
var s="";
var i=0;
for(i=0;i<f.length;i++){
var gv=f[i];
s+='<div class="gal-card"><img src="'+gv.img+'" alt="'+gv.n+'" loading="lazy">';
s+='<div class="gc-info"><span class="tag">'+gv.cat.charAt(0).toUpperCase()+gv.cat.slice(1)+'</span>';
s+='<h4>'+gv.n+'</h4><p>'+gv.desc+'</p></div></div>';
}
ga.innerHTML=s||'<p>No items in this category.</p>';
}
window.gf=function(cat,btn){
curCat=cat;
var bs=document.querySelectorAll(".filter-bar button");
var i=0;
for(i=0;i<bs.length;i++){bs[i].classList.remove("act");}
if(btn)btn.classList.add("act");
rGal(cat);
};
rGal("all");
startQ();
});

var qdata=[
{q:"What is Ratnagiri famous for producing?",opts:["Basmati Rice","Alphonso Mango","Darjeeling Tea","Kashmiri Saffron"],ans:1},
{q:"Which fort is located right at the sea near Ratnagiri city?",opts:["Sindhudurg Fort","Suvarnadurg Fort","Ratnadurg Fort","Mandangad Fort"],ans:2},
{q:"What is Sol Kadhi made from?",opts:["Tamarind and chilli","Kokum and coconut milk","Mango pulp and jaggery","Buttermilk and mustard"],ans:1},
{q:"Which river flows through Chiplun?",opts:["Savitri River","Krishna River","Vashishti River","Ulhas River"],ans:2},
{q:"Ratnagiri is the birthplace of which freedom fighter?",opts:["Gopal Krishna Gokhale","Bal Gangadhar Tilak","Vinayak Damodar Savarkar","Lal Lajpat Rai"],ans:1},
{q:"Which beach in Ratnagiri has a Ganesh temple right on the shore?",opts:["Murud Beach","Guhagar Beach","Ganpatipule Beach","Kelshi Beach"],ans:2},
{q:"What is the best season to visit Ratnagiri for beaches?",opts:["Summer (Mar-May)","Monsoon (Jun-Sep)","Winter (Oct-Feb)","Any time"],ans:2},
{q:"Suvarnadurg Fort is located near which harbour?",opts:["Ratnagiri Harbour","Jaigad Harbour","Harne Harbour","Dabhol Harbour"],ans:2},
{q:"Which folk theatre form is popular in Ratnagiri district?",opts:["Tamasha","Dashavatar","Lavani","Kirtana"],ans:1},
{q:"How many districts make up the Ratnagiri region on the map?",opts:["6","7","8","9"],ans:3}
];
var qi=0,qs=0,answered=false;
function loadQ(){
answered=false;
var d=qdata[qi];
document.getElementById("qq").textContent=(qi+1)+". "+d.q;
var ob=document.getElementById("qopts");
ob.innerHTML="";
var i=0;
for(i=0;i<d.opts.length;i++){
var b=document.createElement("button");
b.className="qopt";
b.textContent=d.opts[i];
b.setAttribute("data-i",i);
b.addEventListener("click",checkAns);
ob.appendChild(b);
}
document.getElementById("qfb").textContent="";
document.getElementById("qfb").className="quiz-fb";
document.getElementById("qnxt").disabled=true;
document.getElementById("qsc").textContent="Question "+(qi+1)+" of "+qdata.length+" | Score: "+qs;
}
function checkAns(){
if(answered)return;
answered=true;
var chosen=parseInt(this.getAttribute("data-i"));
var correct=qdata[qi].ans;
var all=document.querySelectorAll(".qopt");
var i=0;
for(i=0;i<all.length;i++){
all[i].disabled=true;
if(parseInt(all[i].getAttribute("data-i"))===correct)all[i].classList.add("correct");
}
var fb=document.getElementById("qfb");
if(chosen===correct){
qs++;
this.classList.add("correct");
fb.textContent="Correct!";
fb.className="quiz-fb ok";
}else{
this.classList.add("wrong");
fb.textContent="Wrong. The answer is: "+qdata[qi].opts[correct];
fb.className="quiz-fb no";
}
document.getElementById("qsc").textContent="Question "+(qi+1)+" of "+qdata.length+" | Score: "+qs;
document.getElementById("qnxt").disabled=false;
}
function nextQ(){
qi++;
if(qi>=qdata.length){
var qw=document.getElementById("quiz-inner");
var pct=Math.round(qs/qdata.length*100);
qw.innerHTML='<p class="quiz-q">Quiz Complete — you scored '+qs+' out of '+qdata.length+' ('+pct+'%)</p>'
+'<p style="font-size:14px;color:#555;">'
+(pct===100?"Perfect score. You know Ratnagiri inside out.":pct>=70?"Good knowledge of Ratnagiri!":"Keep exploring — there is a lot to discover.")
+'</p>'
+'<button class="qnext" id="qretry">Try Again</button>';
document.getElementById("qretry").addEventListener("click",function(){
qi=0;qs=0;
qw.innerHTML='<p class="quiz-q" id="qq"></p><div class="quiz-opts" id="qopts"></div>'
+'<div class="quiz-fb" id="qfb"></div>'
+'<div class="quiz-nav"><span class="quiz-score" id="qsc"></span><button class="qnext" id="qnxt" disabled>Next</button></div>';
document.getElementById("qnxt").addEventListener("click",nextQ);
loadQ();
});
return;
}
loadQ();
}
function initWave(){
var cv=document.getElementById("waveCanvas");
if(!cv)return;
var g=cv.getContext("2d");
var w=cv.width,h=cv.height;
var t=0;
var cols=["#0096c7","#0077b6","#023e8a","#00b4d8"];
function draw(){
g.clearRect(0,0,w,h);
var li=0;
for(li=0;li<cols.length;li++){
var offset=li*0.5;
var amp=18-li*3;
var speed=0.025-li*0.004;
g.beginPath();
g.moveTo(0,h/2);
var x=0;
while(x<=w){
var y=h/2+Math.sin(x*0.012+t*speed*10+offset)*amp+Math.sin(x*0.02+t*(speed*6)+offset*1.5)*(amp*0.5);
g.lineTo(x,y);
x+=2;
}
g.lineTo(w,h);
g.lineTo(0,h);
g.closePath();
g.fillStyle=cols[li];
g.globalAlpha=0.3-li*0.04;
g.fill();
}
g.globalAlpha=1;
t+=1;
requestAnimationFrame(draw);
}
draw();
}
window.addEventListener("DOMContentLoaded",function(){
loadQ();
document.getElementById("qnxt").addEventListener("click",nextQ);
initWave();
});

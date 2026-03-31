function mkBubbles(){
var i=0;
while(i<12){
var b=document.createElement("div");
b.className="bubble";
var sz=20+Math.random()*60;
b.style.width=sz+"px";
b.style.height=sz+"px";
b.style.left=Math.random()*100+"vw";
b.style.animationDuration=(6+Math.random()*10)+"s";
b.style.animationDelay=(Math.random()*8)+"s";
document.body.appendChild(b);
i++;
}
}
function clrErr(id){
var f=document.getElementById(id);
if(f){
f.classList.remove("err");
var em=f.parentElement.querySelector(".err-msg");
if(em)em.classList.remove("show");
}
}
function setErr(id,msg){
var f=document.getElementById(id);
if(f){
f.classList.add("err");
var em=f.parentElement.querySelector(".err-msg");
if(em){em.textContent=msg;em.classList.add("show");}
}
}
function doLogin(e){
e.preventDefault();
var u=document.getElementById("un").value.trim();
var p=document.getElementById("pw").value.trim();
var ok=true;
clrErr("un");
clrErr("pw");
if(u===""){
setErr("un","Username cannot be empty.");
alert("Please enter your username.");
document.getElementById("un").focus();
return;
}
if(u.length<3){
setErr("un","Username must be at least 3 characters.");
alert("Username is too short. Please enter at least 3 characters.");
document.getElementById("un").focus();
return;
}
if(p===""){
setErr("pw","Password cannot be empty.");
alert("Please enter your password.");
document.getElementById("pw").focus();
return;
}
if(p.length<4){
setErr("pw","Password must be at least 4 characters.");
alert("Password is too short. Please enter at least 4 characters.");
document.getElementById("pw").focus();
return;
}
localStorage.setItem("u",u);
var ov=document.getElementById("sov");
var wn=document.getElementById("welcomeName");
if(wn)wn.textContent=u;
if(ov)ov.classList.add("show");
setTimeout(function(){
window.top.location.href="index.html";
},2000);
}
window.addEventListener("DOMContentLoaded",function(){
mkBubbles();
document.getElementById("lf").addEventListener("submit",doLogin);
document.getElementById("un").addEventListener("input",function(){clrErr("un");});
document.getElementById("pw").addEventListener("input",function(){clrErr("pw");});
});

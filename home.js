var cv=null,ctx=null;
function initCanvas(){
cv=document.getElementById("mapCanvas");
if(!cv)return;
ctx=cv.getContext("2d");
}
function drawRegion(coords){
if(!ctx)return;
ctx.clearRect(0,0,cv.width,cv.height);
var pts=coords.split(",").map(Number);
ctx.beginPath();
ctx.moveTo(pts[0],pts[1]);
var i=2;
while(i<pts.length){ctx.lineTo(pts[i],pts[i+1]);i+=2;}
ctx.closePath();
ctx.fillStyle="rgba(0,119,182,0.35)";
ctx.fill();
ctx.strokeStyle="#023e8a";
ctx.lineWidth=2;
ctx.stroke();
}
function clearCanvas(){
if(!ctx)return;
ctx.clearRect(0,0,cv.width,cv.height);
}
function showPreview(e,img,title,info){
clearTimeout(window.phide);
var bx=document.getElementById("preview-box");
if(!bx)return;
document.getElementById("preview-img").src=img;
document.getElementById("preview-title").textContent=title;
document.getElementById("preview-text").textContent=info;
var lk=document.getElementById("preview-link");
if(lk)lk.href=e.target.href||"#";
bx.style.display="flex";
}
function delayHide(){
window.phide=setTimeout(function(){
var bx=document.getElementById("preview-box");
if(bx)bx.style.display="none";
clearCanvas();
},320);
}
function hidePreview(){
var bx=document.getElementById("preview-box");
if(bx)bx.style.display="none";
clearCanvas();
}
function closeBadge(){
var b=document.getElementById("wb");
if(b)b.style.display="none";
}
window.addEventListener("DOMContentLoaded",function(){
initCanvas();
var u=localStorage.getItem("u");
var wb=document.getElementById("wb");
if(wb){
if(u){
wb.innerHTML='Welcome back,<br><b>'+u+'</b><span class="badge-close" onclick="closeBadge()">Click to close</span>';
}else{
wb.innerHTML='Plan your visit<br>to Ratnagiri<span class="badge-close" onclick="closeBadge()">Click to close</span>';
}
}
});

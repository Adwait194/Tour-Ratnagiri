var b=document.getElementById("btt");
window.addEventListener("scroll",function(){
b.classList.toggle("show",window.scrollY>200);
});
b.addEventListener("click",function(){
window.scrollTo({top:0,behavior:"smooth"});
});

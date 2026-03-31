function uF(){
var rn=document.querySelectorAll('input[name="dur"]');
var dur="";
var i=0;
for(i=0;i<rn.length;i++){if(rn[i].checked){dur=rn[i].value+" Day"+(rn[i].value!=="1"?"s":"");break;}}
var cn=document.querySelectorAll('input[name="int"]:checked');
var ci=[];
var j=0;
while(j<cn.length){ci.push(cn[j].value);j++;}
var sv=document.getElementById("ssn");
var sx=document.getElementById("dst");
var tx=document.getElementById("sreq");
var fc=document.getElementById("fc");
var fcg=document.getElementById("fcg");
if(!fc||!fcg)return;
if(!dur&&ci.length===0){fc.style.display="none";return;}
fc.style.display="block";
var sd=[];
if(sx){
var sl=sx.selectedOptions;
var k=0;
while(k<sl.length){sd.push(sl[k].text);k++;}
}
var s="";
s+='<div class="fc-item"><div class="lbl">Duration</div><div class="val">'+(dur||"Not selected")+'</div></div>';
s+='<div class="fc-item"><div class="lbl">Season</div><div class="val">'+(sv?sv.options[sv.selectedIndex].text.split("—")[0].trim():"—")+'</div></div>';
s+='<div class="fc-item"><div class="lbl">Interests</div><div class="val">'+(ci.length>0?ci.join(", "):"None selected")+'</div></div>';
s+='<div class="fc-item"><div class="lbl">Districts</div><div class="val">'+(sd.length>0?sd.join(", "):"All")+'</div></div>';
if(tx&&tx.value.trim()){
s+='<div class="fc-item full"><div class="lbl">Special Requests</div><div class="val">'+tx.value.trim()+'</div></div>';
}
fcg.innerHTML=s;
}
function rst(){
var rn=document.querySelectorAll('input[name="dur"]');
var cn=document.querySelectorAll('input[name="int"]');
var i=0;
for(i=0;i<rn.length;i++){rn[i].checked=false;}
for(i=0;i<cn.length;i++){cn[i].checked=false;}
var sv=document.getElementById("ssn");
if(sv)sv.selectedIndex=2;
var sx=document.getElementById("dst");
if(sx){for(i=0;i<sx.options.length;i++){sx.options[i].selected=false;}}
var tx=document.getElementById("sreq");
if(tx)tx.value="";
document.getElementById("fc").style.display="none";
}
window.addEventListener("DOMContentLoaded",function(){
var rn=document.querySelectorAll('input[name="dur"]');
var cn=document.querySelectorAll('input[name="int"]');
var i=0;
for(i=0;i<rn.length;i++){rn[i].addEventListener("change",uF);}
for(i=0;i<cn.length;i++){cn[i].addEventListener("change",uF);}
var sv=document.getElementById("ssn");
if(sv)sv.addEventListener("change",uF);
var sx=document.getElementById("dst");
if(sx)sx.addEventListener("change",uF);
var tx=document.getElementById("sreq");
if(tx)tx.addEventListener("input",uF);
var rb=document.getElementById("rstbtn");
if(rb)rb.addEventListener("click",rst);
});

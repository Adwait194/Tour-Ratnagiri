const express=require("express");
const path=require("path");
const app=express();
const PORT=3000;
const GROQ_KEY="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";
const rl=new Map();
const RL_MAX=10;
const RL_WIN=60*1000;
function chkRL(ip){
var now=Date.now();
var rec=rl.get(ip);
if(!rec||now>rec.rt){rl.set(ip,{c:1,rt:now+RL_WIN});return false;}
if(rec.c>=RL_MAX)return true;
rec.c++;
return false;
}
const SYS="You are a helpful travel assistant for Ratnagiri district, Maharashtra, India. Give friendly, concise, practical answers. Mention specific local places, food, forts, temples, and travel tips when relevant. Respond in plain text only. No markdown, no asterisks, no bullet symbols.";
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.post("/api/chat",async function(req,res){
var ip=req.headers["x-forwarded-for"]||req.socket.remoteAddress||"unknown";
if(chkRL(ip)){res.status(429).json({error:"Too many requests. Please wait a moment."});return;}
if(!GROQ_KEY||GROQ_KEY==="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"){res.status(500).json({error:"GROQ_API_KEY not set in server.js"});return;}
var msgs=req.body.messages;
if(!msgs||msgs.length===0){res.status(400).json({error:"No messages provided"});return;}
try{
var r=await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{"Content-Type":"application/json","Authorization":"Bearer "+GROQ_KEY},
body:JSON.stringify({
model:"llama-3.1-8b-instant",
max_tokens:300,
messages:[{role:"system",content:SYS},...msgs]
})
});
var d=await r.json();
if(!r.ok){res.status(r.status).json({error:d.error&&d.error.message?d.error.message:"Groq API error"});return;}
var at=d.choices&&d.choices[0]?d.choices[0].message.content:"Sorry, no response received.";
res.json({message:{role:"assistant",content:at}});
}catch(e){
res.status(500).json({error:"Failed to reach Groq API. Check your internet connection."});
}
});
app.listen(PORT,function(){
console.log("TourRatnagiri running at http://localhost:"+PORT);
console.log("Open http://localhost:"+PORT+"/Index.html in your browser");
});

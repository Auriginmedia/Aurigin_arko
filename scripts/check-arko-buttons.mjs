let cookie='';
async function api(path,body){const r=await fetch('http://127.0.0.1:4173/api'+path,{method:'POST',headers:{Origin:'http://127.0.0.1:4173',Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify(body)});if(r.headers.getSetCookie().length)cookie=r.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ');const v=await r.json();if(!r.ok)throw new Error(v.code||v.error);return v;}
let c=await api('/arko/session',{});
for(let i=0;i<3;i++){
 const message=i===0?'What services does Aurigin provide?':c.suggestions[0];
 if(!message)throw new Error('No next suggested answer');
 c=await api('/arko/message',{message,revision:c.revision,requestId:crypto.randomUUID()});
 const last=c.messages.at(-1);if(last.source!=='ai'||last.content.startsWith('I’ve noted'))throw new Error('Not a valid AI reply');
 console.log(JSON.stringify({button:message,reply:last.content,remaining:c.callsRemaining}));
}

import {GeminiArko,emptyBrief} from '../server/arko-model.ts';
import {Store} from '../server/store.ts';
const store=new Store('data/aurigin.sqlite');
const counts={};for(const c of store.list('ArkoCall'))counts[c.status]=(counts[c.status]||0)+1;
console.log('Local call totals',counts);store.db.close();
let brief=structuredClone(emptyBrief),messages=[];
for(const message of ['What services does Aurigin provide?','I have an interior design firm and want to create a website.','Generate better enquiries']){
 messages.push({role:'user',content:message});const start=Date.now();
 try{const r=await new GeminiArko().respond({brief,messages});console.log(JSON.stringify({question:message,reply:r.value.reply,services:r.value.brief.services,suggestions:r.value.suggestions,ms:Date.now()-start}));brief=r.value.brief;messages.push({role:'assistant',content:r.value.reply});}
 catch(e){console.log('FAILED',e.message);process.exitCode=1;break;}
}

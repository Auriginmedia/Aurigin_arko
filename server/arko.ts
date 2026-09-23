import type { Express } from 'express';
import { z } from 'zod';
import { Store,uid,now } from './store.ts';
import { briefSchema,emptyBrief,OpenAIArko,GeminiArko,responseSchema,safeResponse,nextQuestion } from './arko-model.ts';
import type { ArkoModel,Brief } from './arko-model.ts';
import { registration,requirements,recommend } from './discovery.ts';
import { currencies } from './catalogue.ts';
import {publicKnowledge,qualityFlag,reviewTurn} from './knowledge.ts';

export function briefRequirements(b:Brief){return requirements.parse({intent:'Conversation with Arko',services:b.services,problem:b.goal,goals:b.goal,projectBudget:b.budget||'Not sure',monthlyBudget:b.budget||'Not sure',startDate:b.timing,assets:b.assets||'To confirm at consultation',notes:b.notes,languages:'English',uncertain:true,assumptionsConfirmed:false,details:{source:'Customer-reviewed Arko brief; all detailed delivery assumptions need consultation.'}});}
export function mountArko(app:Express,store:Store,options:{mode:string,policy:()=>any,blockers:()=>string[],issue:(res:any,owner:string,role?:string)=>void,session:(req:any,role?:string)=>any,model?:ArkoModel}){
 const {session,issue}=options;
 const configured=()=>Boolean(options.model||(process.env.ARKO_AI_ENABLED==='true'&&((process.env.OPENAI_API_KEY&&process.env.OPENAI_MODEL)||(process.env.GEMINI_API_KEY&&process.env.GEMINI_MODEL))));
 const model=options.model||(process.env.GEMINI_API_KEY?new GeminiArko():new OpenAIArko());
 const busy=new Set<string>();
 const conversationLimit=()=>Math.min(200,Math.max(1,Number(process.env.ARKO_CONVERSATION_REPLY_LIMIT)||60));
 const oldFallback=(m:any)=>m.role==='assistant'&&(m.content.startsWith('I’ve noted that as a starting point.')||m.content.startsWith('A clear portfolio website can help show your interior work'));
 const successful=(id:string)=>store.list('ArkoCall',id).filter(x=>x.status==='completed').length;
 const requireChat=(req:any,res:any,next:any)=>{const s=session(req,'arko');if(!s)return res.status(401).json({error:'Start a conversation to continue.'});const c=store.get(s.owner,'Conversation');if(!c)return res.status(401).json({error:'Conversation expired.'});req.chat=c;next();};
 function current(req:any){return store.get(req.chat.id,'Conversation');}
 function view(c:any){return{id:c.id,leadId:c.leadId,revision:c.revision,brief:c.brief,messages:c.messages,suggestions:oldFallback(c.messages.at(-1))?[]:c.suggestions,intent:c.intent,linked:Boolean(c.leadId),linkedHere:Boolean(c.leadId),ai:configured()?'connected':'unavailable',callsRemaining:Math.max(0,conversationLimit()-successful(c.id)),notice:configured()?'Messages are processed by AI and saved for your project. Avoid sensitive information.':'Live AI is not connected. You can explore the example or edit your brief; neither is a live AI conversation.',recommendation:c.brief.services.length?recommend(briefRequirements(c.brief),c.brief.country||'IN',options.policy()):null};}
 const initialMessages=[{id:uid(),role:'assistant',content:'Hi, I’m Arko, Aurigin’s AI assistant. Tell me what you’re working on, and we’ll shape the next step together.',source:'welcome'}];
 app.post('/api/arko/session',(req,res)=>{if(options.mode==='LIVE'&&options.blockers().length)return res.status(503).json({error:'Live Arko is awaiting launch configuration review.'});if(!session(req,'arko')){const id=uid();store.put('Conversation',{revision:1,brief:structuredClone(emptyBrief),messages:initialMessages,suggestions:['Our website needs a fresh start','We need a stronger brand','Help us attract better enquiries'],intent:'discovery',leadId:null},id,id);issue(res,id,'arko');return res.json(view(store.get(id)));}res.json(view(store.get(session(req,'arko').owner)));});
 app.post('/api/arko/new',requireChat,(req:any,res)=>{if(busy.has(req.chat.id))return res.status(409).json({error:'Wait for the current response before starting another project.'});const id=uid();const c=store.put('Conversation',{revision:1,brief:structuredClone(emptyBrief),messages:[{...initialMessages[0],id:uid()}],suggestions:[],intent:'discovery',leadId:null},id,id);issue(res,id,'arko');res.json(view(c));});
 app.get('/api/arko',requireChat,(req:any,res)=>{const c=current(req);const v=view(c);v.linkedHere=c.leadId===session(req)?.owner;res.json(v);});
 app.post('/api/arko/message',requireChat,async(req:any,res)=>{
  const input=z.object({message:z.string().trim().min(1).max(2000),requestId:z.string().uuid(),revision:z.number().int().positive()}).strict().parse(req.body);
  const c=current(req);const existing=store.list('ArkoTurn',c.id).find(x=>x.requestId===input.requestId);if(existing)return res.json(view(c));
  if(busy.has(c.id)||c.revision!==input.revision)return res.status(409).json({error:'The conversation changed. Refresh it before sending again.'});
  if(c.leadId)return res.status(409).json({error:'Your brief is saved. Use the saved project to change scope or send Arjun a request.'});
  const commercial=/\b(price|pricing|cost|quote|discount|floor|fee|salary|payment|paid)\b|how much/i.test(input.message);
  const action=/\b(book|schedule|reserve)\b.{0,35}\b(appointment|consultation|call|meeting)\b|^\s*(speak|talk) to (arjun|a human|the founder)\s*[.!]?$/i.test(input.message);
  const identity=/\b(who are you|what are you|who (built|designed|created|made) (you|arko)|who designed|who made)\b/i.test(input.message);
  if(!configured()&&!commercial&&!action&&!identity)return res.status(503).json({error:'Live AI is not connected. Your brief is safe. Use the example, edit your brief, or switch to the form.'});
  const calls=store.list('ArkoCall',c.id);
  const day=now().slice(0,10);const daily=store.list('ArkoCall').filter(x=>x.created_at.startsWith(day)).length;
  const limit=Math.min(1000,Math.max(1,Number(process.env.ARKO_DAILY_CALL_LIMIT)||150));
  if(!commercial&&!action&&!identity){
   if(successful(c.id)>=conversationLimit())return res.status(429).json({error:'This conversation has reached Arko’s '+conversationLimit()+'-reply allowance. Your brief is saved. Start a new project or contact the team.',code:'conversation_limit'});
   if(daily>=limit)return res.status(429).json({error:'Aurigin’s daily AI allowance has been reached. This is an app limit, separate from Gemini’s quota. Your brief is saved.',code:'app_daily_limit'});
   if(calls.filter(x=>Date.now()-Date.parse(x.created_at)<60000).length>=8)return res.status(429).json({error:'Please wait a minute before sending more messages.',code:'app_rate_limit'});
  }
  busy.add(c.id);
  try{
   let result:any;
   if(identity)result={reply:'I’m Arko, Aurigin Media’s AI project assistant. The Aurigin team designed me to help you turn an initial idea into a clear project brief, suggested scope and the right next step.',brief:c.brief,intent:'about',suggestions:['Tell me what you want to build','Explore Aurigin services']};
   else if(commercial)result={reply:'Your estimate is calculated by the pricing system after a confirmed consultation. I can help shape the scope first; your stated budget does not change the price of identical work.',brief:c.brief,intent:'pricing',suggestions:[]};
   else if(action)result={reply:'Review your brief and use “Choose a consultation” below. The booking card will confirm an appointment only when it is successfully reserved.',brief:c.brief,intent:'booking',suggestions:[]};
   else {
    const call=store.put('ArkoCall',{status:'requested',model:process.env.GEMINI_MODEL||process.env.OPENAI_MODEL||'test adapter'},c.id);
    try{
     const messages=c.messages.filter((m:any)=>!oldFallback(m)).slice(-12).map((m:any)=>({role:m.role,content:m.content}));
     const response=await model.respond({knowledge:publicKnowledge(store,input.message+' '+c.brief.services.join(' ')),brief:c.brief,messages:[...messages,{role:'user',content:input.message}]});
     result=safeResponse(responseSchema.parse(response.value));
     result.suggestions=[...new Set(result.suggestions)].filter((x:any)=>x.toLowerCase()!==input.message.toLowerCase());
     store.put('ArkoCall',{status:'completed',model:process.env.GEMINI_MODEL||process.env.OPENAI_MODEL||'test adapter',usage:response.usage||null},c.id,call.id);
    }catch(error:any){
     const code=/^provider_[a-z_0-9]+$/.test(error?.message||'')?error.message:'provider_invalid_response';
     store.put('ArkoCall',{status:'failed',code},c.id,call.id);qualityFlag(store,'provider_failure',code,c.id,call.id);
     return res.status(503).json({code,error:code==='provider_quota'?'Gemini’s API quota is temporarily exhausted. Please try again later. Your message is still in the text box.':'Arko could not complete this reply. Please retry your message; your brief has not changed.'});
    }
   }
   reviewTurn(store,c.id,input.message,result.reply,c.messages);
   const latest=current(req);if(latest.revision!==input.revision)return res.status(409).json({error:'The brief changed while Arko was thinking. Please send your message again.'});
   const updated=store.tx(()=>{store.put('ArkoTurn',{requestId:input.requestId},c.id);return store.put('Conversation',{...c,revision:c.revision+1,brief:result.brief,intent:result.intent,suggestions:result.suggestions,messages:[...c.messages,{id:uid(),role:'user',content:input.message,source:'user'},{id:uid(),role:'assistant',content:result.reply,source:commercial||action||identity?'system':'ai'}].slice(-42)},c.id,c.id);});res.json(view(updated));
  }finally{busy.delete(c.id);}
 });
 app.post('/api/arko/brief',requireChat,(req:any,res)=>{const input=z.object({brief:briefSchema,revision:z.number().int().positive()}).strict().parse(req.body);const c=current(req);if(c.leadId||busy.has(c.id)||input.revision!==c.revision)return res.status(409).json({error:'Brief changed or is already saved. Refresh before editing.'});const v=store.put('Conversation',{...c,brief:input.brief,revision:c.revision+1,suggestions:[],messages:[...c.messages,{id:uid(),role:'assistant',content:'Your project brief is updated. '+nextQuestion(input.brief),source:'system'}].slice(-42)},c.id,c.id);res.json(view(v));});
 app.post('/api/arko/example',requireChat,(req:any,res)=>{const c=current(req);if(c.leadId||c.messages.length>1||busy.has(c.id))return res.status(409).json({error:'The example is only available in an empty conversation.'});const brief={...emptyBrief,services:['portfolio','social'],goal:'Showcase architecture projects and build a consistent Instagram presence',industry:'Architecture',country:'IN',budget:'Not sure',timing:'Within the next few months',assets:'Project photos available; copy needs review'};res.json(view(store.put('Conversation',{...c,brief,revision:c.revision+1,intent:'scope',suggestions:[],messages:[...c.messages,{id:uid(),role:'user',content:'We’re an architecture studio. We need a better portfolio website and help with Instagram. We have project photos but are unsure about budget.',source:'example'},{id:uid(),role:'assistant',content:'A portfolio website can give your projects a clear home, with social content as a separate workstream. I’ve prepared an example brief for you to edit. This is a scripted preview, not an AI-generated reply.',source:'example'}]},c.id,c.id)));});
 app.post('/api/arko/enroll',requireChat,(req:any,res)=>{
  const input=z.object({revision:z.number().int().positive(),contact:z.object({name:z.string(),email:z.string(),phone:z.string(),company:z.string(),country:z.string(),industry:z.string(),contactPermission:z.literal(true),marketingPermission:z.boolean().default(false)}).strict(),briefConfirmed:z.literal(true)}).strict().parse(req.body);
  const c=current(req);if(c.leadId)return res.status(409).json({error:'This brief has already been saved. Use your existing project or its secure resume code.'});if(busy.has(c.id)||c.revision!==input.revision)return res.status(409).json({error:'Review the latest brief before continuing.'});if(!c.brief.goal||!c.brief.services.length)return res.status(400).json({error:'Add a goal and a service direction to your brief first.'});
  if(options.mode==='LIVE'&&options.blockers().length)return res.status(503).json({error:'Live booking awaits the required connection and commercial checks.'});
  const r=briefRequirements(c.brief);const contact=registration.parse({...input.contact,serviceInterest:c.brief.services.join(', '),projectBudget:c.brief.budget||'Not sure',monthlyBudget:c.brief.budget||'Not sure',attribution:{utm_source:'arko'},website:''});
  if(options.mode==='DEMO'&&!contact.email.endsWith('.invalid'))return res.status(400).json({error:'Use synthetic details and an email ending in .invalid in this demo.'});
  const l=store.tx(()=>{const lead=store.put('Lead',{...contact,stage:'scope ready',marketReview:!currencies[contact.country],conversationId:c.id});store.put('Company',{name:lead.company,country:lead.country},lead.id);store.put('ContactPermission',{service:true,marketing:contact.marketingPermission,at:now()},lead.id);store.put('Attribution',contact.attribution,lead.id);store.put('MarketAssignment',{country:lead.country,currency:currencies[lead.country]||null,source:'company confirmation'},lead.id);store.put('RequirementAnswer',{value:r},lead.id);store.put('Conversation',{...c,revision:c.revision+1,leadId:lead.id},c.id,c.id);store.event('registration_completed',lead.id,{source:'arko'});store.event('discovery_completed',lead.id,{source:'arko',conversation:c.id});return lead;});
  issue(res,l.id);res.json({ok:true,leadId:l.id,conversation:view(store.get(c.id))});
 });
 app.get('/api/admin/arko',(req,res)=>{if(!session(req,'admin'))return res.status(401).json({error:'Founder sign-in required.'});res.json({conversations:store.list('Conversation').slice(0,100).map(c=>({id:c.id,leadId:c.leadId,brief:c.brief,updatedAt:c.updated_at,turns:c.messages.filter((m:any)=>m.role==='user').length})),calls:store.list('ArkoCall').length,failures:store.list('ArkoCall').filter(c=>c.status==='failed').length});});
 app.get('/api/admin/arko/:id',(req,res)=>{if(!session(req,'admin'))return res.status(401).json({error:'Founder sign-in required.'});const c=store.get(req.params.id,'Conversation');if(!c)return res.sendStatus(404);res.json(view(c));});
}

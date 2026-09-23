import { existsSync,readFileSync,writeFileSync,mkdirSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import express from 'express';
import { resolve } from 'node:path';
import { Store } from './store.ts';
import { createApp } from './app.ts';
try{process.loadEnvFile('.env');}catch{}
const mode=process.env.MODE||'DEMO',port=Number(process.env.PORT||4173),origin=process.env.APP_ORIGIN||`http://127.0.0.1:${port}`;
mkdirSync('data',{recursive:true});let password=process.env.ADMIN_PASSWORD;if(!password){if(mode==='LIVE')throw new Error('ADMIN_PASSWORD required for LIVE');const path='data/demo-admin-password.txt';if(!existsSync(path))writeFileSync(path,randomBytes(18).toString('base64url'),{mode:0o600});password=readFileSync(path,'utf8').trim();}
if(password.length<16)throw new Error('Founder password must contain at least 16 characters');
const runtime=createApp(new Store(process.env.DATABASE_PATH||'data/aurigin.sqlite'),{mode,adminPassword:password,origin});
runtime.app.use(express.static(resolve('dist'),{index:false}));runtime.app.get('/{*path}',(_req,res)=>res.sendFile(resolve('dist/index.html')));
let working=false;setInterval(async()=>{if(working)return;working=true;try{await runtime.work();}finally{working=false;}},10000).unref();
runtime.app.listen(port,'127.0.0.1',()=>console.log(`Aurigin ${mode} preview: ${origin}`));

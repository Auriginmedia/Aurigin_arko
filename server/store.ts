import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
export const uid=()=>randomUUID();
export const now=()=>new Date().toISOString();
export const hash=(x:unknown)=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
export class Store {
 db:DatabaseSync;
 constructor(path:string){if(path!==':memory:')mkdirSync(dirname(path),{recursive:true});this.db=new DatabaseSync(path);this.db.exec(readFileSync(new URL('../migrations/001_initial.sql',import.meta.url),'utf8'));this.db.exec('PRAGMA busy_timeout=5000');}
 tx<T>(f:()=>T):T {this.db.exec('BEGIN IMMEDIATE');try{const r=f();this.db.exec('COMMIT');return r;}catch(e){this.db.exec('ROLLBACK');throw e;}}
 put(kind:string,data:any,owner:string|null=null,id:string=uid()){const old=this.db.prepare('SELECT * FROM records WHERE id=?').get(id) as any;const time=now();this.db.prepare('INSERT INTO records VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at,version=records.version+1').run(id,kind,owner,1,time,time,JSON.stringify(data));return{...data,id,kind,owner,version:old?old.version+1:1,created_at:old?.created_at||time,updated_at:time};}
 get(id:string,kind?:string){const r=this.db.prepare('SELECT * FROM records WHERE id=?').get(id) as any;if(!r||kind&&r.kind!==kind)return null;return{...JSON.parse(r.data),...r,data:undefined};}
 list(kind:string,owner?:string){const rows=owner===undefined?this.db.prepare('SELECT * FROM records WHERE kind=? ORDER BY created_at DESC,rowid DESC').all(kind):this.db.prepare('SELECT * FROM records WHERE kind=? AND owner=? ORDER BY created_at DESC,rowid DESC').all(kind,owner);return rows.map((r:any)=>({...JSON.parse(r.data),...r,data:undefined}));}
 event(type:string,owner:string|null,details:any={}){return this.put('AuditEvent',{type,details},owner);}
 enqueue(channel:string,destination:string,payload:any,dedupe:string){this.db.prepare('INSERT OR IGNORE INTO outbox(id,dedupe,channel,destination,payload,status,created_at) VALUES(?,?,?,?,?,?,?)').run(uid(),dedupe,channel,destination,JSON.stringify(payload),'queued',now());}
}


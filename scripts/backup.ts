import {DatabaseSync,backup} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
try{process.loadEnvFile('.env');}catch{}
const target=process.argv[2];if(!target)throw new Error('Pass a private backup path. Existing backups are never overwritten.');
const source=process.env.DATABASE_PATH||'data/aurigin.sqlite';if(resolve(source)===resolve(target))throw new Error('Backup path must differ from source');
mkdirSync(dirname(resolve(target)),{recursive:true});
const {existsSync}=await import('node:fs');if(existsSync(target))throw new Error('Choose a new backup filename');
const db=new DatabaseSync(source);await backup(db,target);db.close();const check=new DatabaseSync(target,{readOnly:true});const result=check.prepare('PRAGMA integrity_check').get();check.close();if(result?.integrity_check!=='ok')throw new Error('Backup integrity check failed');console.log('Private backup created and integrity checked: '+target);

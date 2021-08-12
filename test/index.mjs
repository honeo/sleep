// Mod: npm
import {is, not, any} from '@honeo/check';

// Mod: local
import sleep from '../index.mjs';


/// main


// arg1
{
	let isValided = false;
	try{
		await sleep('hoge');
	}catch(e){
		isValided = true;
	}
	if( !isValided ){
		throw new Error('arg1 validation: failed');
	}
}

// arg2
{
	const ms_startMs = Date.now();
	const str = await sleep(100, 'foobar');
	if( ms_startMs+100 <= Date.now() && str==='foobar' ){

	}else{
		throw new Error('arg2: failed');
	}
}

// arg3
{
	let isValided = false;
	try{
		await sleep(1, null, true);
	}catch(e){
		isValided = true;
	}
	if( !isValided ){
		throw new Error('arg3 validation: failed');
	}
}


// wait
{
	const num_startMs = Date.now();
	await sleep(100);
	if( num_startMs+100 <= Date.now() ){

	}else{
		throw new Error('wait 100ms: failed');
	}
}
{
	const num_startMs = Date.now();
	await sleep(500);
	if( num_startMs+500 <= Date.now() ){

	}else{
		throw new Error('wait 500ms: failed');
	}
}
{
	const num_startMs = Date.now();
	await sleep(1000);
	if( num_startMs+1000 <= Date.now() ){

	}else{
		throw new Error('wait 1000ms: failed');
	}
}


// sync
{
	const num_startMs = Date.now();
	let isBlocking = true;
	setTimeout(function(){
		isBlocking = false;
	}, 0);
	sleep(100, null, {sync: true});
	if( not.true(isBlocking) ){
		throw new Error('sync blocking: failed');
	}
}
{
	const num_startMs = Date.now();
	sleep(1000, null, {sync: true});
	if( !(num_startMs+1000<=Date.now()) ){
		throw new Error('sync wait 1000ms: failed');
	}
}

// Abort
{
	const abortcontroller = new AbortController();
	sleep(500).then( ()=>{
		abortcontroller.abort(); // 下のsleep待機中にabortする
	});
	const bool = await sleep(1000, false, {
		signal: abortcontroller.signal
	}).then( (arg)=>{
		return arg;
	}).catch( (err)=>{
		return err.message.includes('aborted');
	});
	if( not.true(bool) ){
		throw new Error('abort: failed');
	}
}

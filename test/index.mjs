// Mod: npm
import {is, not, any} from '@honeo/check';

// Mod: local
import sleep from '../index.mjs';
import json from '../package.json';


// main


// 指定時間が経過できているか
{
	const date_before = Date.now();
	await sleep(100);
	if( date_before+100 <= Date.now() ){

	}else{
		throw new Error('failed');
	}
}

// その２
{
	const date_before = Date.now();
	await sleep(500);
	if( date_before+500 <= Date.now() ){

	}else{
		throw new Error('failed');
	}
}

// その３
{
	const date_before = Date.now();
	await sleep(1000);
	if( date_before+1000 <= Date.now() ){

	}else{
		throw new Error('failed');
	}
}

// 引数渡しチェック
{
	const date_before = Date.now();
	const str = await sleep(100, 'foobar');
	if( date_before+100 <= Date.now() && str==='foobar' ){

	}else{
		throw new Error('failed');
	}
}

// validation確認 arg1
{
	let isValided = false;
	try{
		await sleep('hoge');
	}catch(e){
		isValided = true;
	}
	if( !isValided ){
		throw new Error('validation arg1: failed');
	}
}
// validation確認 arg3
{
	let isValided = false;
	try{
		await sleep(1, null, true);
	}catch(e){
		isValided = true;
	}
	if( !isValided ){
		throw new Error('validation arg3: failed');
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

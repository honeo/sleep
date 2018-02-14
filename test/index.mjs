/*
	Test
*/

// register, nodeがDynamicImport対応したら切り替える
import '../register.mjs';

// Mod
import sleep from '../index.mjs';
import test from '@honeo/test';
import json from '../package.json';
console.log(`${json.name} v${json.version}: test`);



// main
test([

	// 指定時間が経過できているか
	async function(){
		const date_before = Date.now();
		await sleep(100);
		return date_before+100 <= Date.now();
	},

	// その２
	async function(){
		const date_before = Date.now();
		await sleep(500);
		return date_before+500 <= Date.now();
	},

	// その３
	async function(){
		const date_before = Date.now();
		await sleep(1000);
		return date_before+1000 <= Date.now();
	},

	// 引数渡しチェック
	async function(){
		const date_before = Date.now();
		const str = await sleep(100, 'foobar');
		return date_before+100 <= Date.now() && str==='foobar';
	},

	// Prototype拡張
	async function(){
		const date_before = Date.now();
		return Promise.resolve()
			.sleep(100)
			.then( (arg)=>{
				return date_before+100 <= Date.now();
			});
	}
], {
	exit: true
});

/*
	Test
*/


// Mod
const test = require('@honeo/test');
const json = require('../package.json');
console.log(`${json.name} v${json.version}: test`);



// main
test([

	// 指定時間が経過できているか
	async function(){
		const {default: sleep} = await import('../index.mjs');
		const date_before = Date.now();
		await sleep(100);
		return date_before+100 <= Date.now();
	},

	// その２
	async function(){
		const {default: sleep} = await import('../index.mjs');
		const date_before = Date.now();
		await sleep(500);
		return date_before+500 <= Date.now();
	},

	// その３
	async function(){
		const {default: sleep} = await import('../index.mjs');
		const date_before = Date.now();
		await sleep(1000);
		return date_before+1000 <= Date.now();
	},

	// 引数渡しチェック
	async function(){
		const {default: sleep} = await import('../index.mjs');
		const date_before = Date.now();
		const str = await sleep(100, 'foobar');
		return date_before+100 <= Date.now() && str==='foobar';
	},

	// validation機能確認
	async function(){
		const {default: sleep} = await import('../index.mjs');
		try{
			return sleep('hoge');
			return false;
		}catch(e){
			return true;
		}
	},

	async function(){
		const {default: sleep} = await import('../index.mjs');
		try{
			return sleep(-1);
			return false;
		}catch(e){
			return true;
		}
	},



	// Prototype拡張
	async function(){
		await import('../register.mjs');

		const date_before = Date.now();
		return Promise.resolve()
			.sleep(100)
			.then( (arg)=>{
				return date_before+100 <= Date.now();
			});
	},

	// CJS
	async function(){
		const sleep_cjs = require('../CJS/index.cjs');
		return typeof sleep_cjs==='function';
	}

], {
	exit: true
});

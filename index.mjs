// Mod
import {is, not, any} from '@honeo/check';


/*
	引数msの間待ってresolveするpromiseを返す。

		引数
			1: op, number | date
				待機するms or 目標時間。
				default: 1
			2: op, any
			3: op, object
		返り値
			promise<arg2>
*/
function sleep(num_delayMs=1, any, _options={}){

	// arg1がdateならmsに書き換え
	if( is.date(num_delayMs) ){
		const num_nowMs = Date.now();
		const num_afterMs = num_delayMs.getTime();
		num_delayMs = num_afterMs - num_nowMs;
	}

	// validation
	if( not.num(num_delayMs) ){
		throw new TypeError(`Invalid arguments 1: ${num_delayMs}`);
	}
	if( not.obj(_options) ){
		throw new TypeError(`Invalid arguments 3: ${_options}`);
	}

	// var
	const obj_defaultOp = {
		debug: false,
		sync: false
	}
	const options = {...obj_defaultOp, ..._options}
	const isSignal = is.abortsignal(options.signal);

	if( options.debug ){
		console.log('sleep()');
		console.log(num_delayMs, any, options);
	}

	return (options.sync ?
		sleepSync:
		sleepPromise
	)(num_delayMs, any, options);
}



/*
	Promise版
		AbortController対応。

		args
			1: number
			2: any
			3: object
		result
			arg2
*/
function sleepPromise(num_delayMs, any, options){
	return new Promise( (resolve, reject)=>{
		if( is.abortsignal(options.signal) ){
			// 既に中止済みなら即reject
			if( options.signal.aborted ){
				reject(new Error('sleep: aborted'));
			}else{
				const timer = setTimeout(resolve, num_delayMs, any);
				options.signal.onabort = function(e){
					clearTimeout(timer);
					reject(new Error('sleep: aborted'));
				}
			}
		}else{
			setTimeout(resolve, num_delayMs, any);
		}
	});
}


/*
	同期版
		AbortController非対応。
			発火させるタイミングがないので。

		args
			1: number
			2: any
			3: object
		result
			arg2
*/
function sleepSync(num_delayMs, any, options){
	// var
	const num_startMs = Date.now();

	while( !(num_startMs+num_delayMs < Date.now()) ){}
	return any;
}

export default sleep;

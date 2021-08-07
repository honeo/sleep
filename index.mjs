// Mod
import {is, not, any} from '@honeo/check';


/*
	引数msの間待ってresolveするpromiseを返す。

		引数
			1: op, number
				待機するms
				default: 1
			2: op, any
			3: op, object
		返り値
			promise<arg2>
*/
function sleep(ms=1, arg, options={debug: false}){

	// validation
	if( not.num(ms) ){
		throw new TypeError(`Invalid arguments 1: ${ms}`);
	}
	if( not.obj(options) ){
		throw new TypeError(`Invalid arguments 3: ${options}`);
	}

	if( options.debug ){
		console.log('sleep()');
		console.log(ms, arg, options);
	}
	// var
	const isSignal = is.abortsignal(options.signal);

	return new Promise( (resolve, reject)=>{
		if( isSignal ){
			// 既に中止済みなら即reject
			if( options.signal.aborted ){
				reject(new Error('sleep: aborted'));
			}else{
				const timer = setTimeout(resolve, ms, arg);
				options.signal.onabort = function(e){
					clearTimeout(timer);
					reject(new Error('sleep: aborted'));
				}
			}
		}else{
			setTimeout(resolve, ms, arg);
		}
	});
}

export default sleep;

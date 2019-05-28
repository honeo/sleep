/*
	引数msの間待ってresolveするpromiseを返す。

	引数
		1: number
			待機するms
		2: any
	返り値
		promise<arg2>
*/
function sleep(ms, arg){

	// validation
	if( typeof ms!=='number' || ms<0 ){
		throw new TypeError(`Invalid arguments: ${ms}`);
	}

	return new Promise( (resolve)=>{
		setTimeout(resolve, ms, arg);
	});
}

export default sleep;

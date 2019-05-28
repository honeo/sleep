/*
	prototype拡張版
*/
import sleep from './index.mjs';

Promise.prototype.sleep = function(ms){
	return sleep(ms);
}

/*
	prototype拡張版
*/
import sleep from './';

Promise.prototype.sleep = function(ms){
	return sleep(ms);
}

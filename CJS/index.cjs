"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
	引数msの間待ってresolveするpromiseを返す。

	引数
		1: number
			待機するms
		2: any
	返り値
		promise<arg2>
*/
function sleep(ms, arg) {
  // validation
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError("Invalid arguments: ".concat(ms));
  }

  return new Promise(function (resolve) {
    setTimeout(resolve, ms, arg);
  });
}

var _default = sleep;
exports["default"] = _default;
module.exports = exports.default;

"use strict";

var _index = _interopRequireDefault(require("./index.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
	prototype拡張版
*/
Promise.prototype.sleep = function (ms) {
  return (0, _index["default"])(ms);
};

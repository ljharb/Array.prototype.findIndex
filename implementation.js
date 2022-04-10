'use strict';

var Call = require('es-abstract/2021/Call');
var Get = require('es-abstract/2021/Get');
var IsCallable = require('es-abstract/2021/IsCallable');
var LengthOfArrayLike = require('es-abstract/2021/LengthOfArrayLike');
var ToBoolean = require('es-abstract/2021/ToBoolean');
var ToObject = require('es-abstract/2021/ToObject');
var ToString = require('es-abstract/2021/ToString');

module.exports = function findIndex(predicate) {
	var O = ToObject(this);
	var len = LengthOfArrayLike(O);
	if (!IsCallable(predicate)) {
		throw new TypeError('Array#findIndex: predicate must be a function');
	}

	var thisArg = arguments.length > 1 ? arguments[1] : void undefined;

	var k = 0;
	while (k < len) {
		var Pk = ToString(k);
		var kValue = Get(O, Pk);
		var testResult = ToBoolean(Call(predicate, thisArg, [kValue, k, O]));
		if (testResult) {
			return k;
		}
		k += 1;
	}

	return -1;
};

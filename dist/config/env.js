'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getEnv = getEnv;

var _dotenv = require('dotenv');

function getEnv() {
	(0, _dotenv.config)();
	return Object.assign({}, process.env);
}
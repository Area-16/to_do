'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _env = require('./../config/env');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _env.getEnv)();

var secretKey = process.env.TOKEN_SECRET || Math.floor(Math.random() * 9999 * Math.random()).toString();

var Token = function () {
	function Token() {
		_classCallCheck(this, Token);
	}

	_createClass(Token, null, [{
		key: 'createToken',
		value: function createToken(payload) {
			try {
				var token = (0, _jsonwebtoken.sign)(payload, secretKey, {
					expiresIn: process.env.TOKEN_EXPIRE
				});
				return 'Bearer ' + token;
			} catch (err) {
				return false;
			}
		}
	}, {
		key: 'verifyToken',
		value: function verifyToken(token) {
			try {
				var valid = (0, _jsonwebtoken.verify)(Token.getRawToken(token), secretKey.toString());
				return Boolean(valid);
			} catch (err) {
				return false;
			}
		}
	}, {
		key: 'decodeToken',
		value: function decodeToken(token) {
			try {
				var payload = (0, _jsonwebtoken.decode)(Token.getRawToken(token));
				return payload;
			} catch (err) {
				return false;
			}
		}
	}, {
		key: 'getRawToken',
		value: function getRawToken(token) {
			var rawToken = token.split('Bearer').pop().trim();
			return rawToken;
		}
	}]);

	return Token;
}();

exports.default = Token;
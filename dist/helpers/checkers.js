'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.taskCheckers = exports.sessionCheckers = exports.loginCheckers = exports.userCheckers = undefined;

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userCheckers = function userCheckers(req, res, next) {
	var _req$body = req.body,
	    name = _req$body.name,
	    username = _req$body.username,
	    password = _req$body.password;

	if (!name || !username || !password) {
		return res.status(400).send({
			data: {
				message: 'missing data from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		});
	}
	next();
};

var sessionCheckers = function sessionCheckers(req, res, next) {
	var authorization = req.headers.authorization;


	if (!authorization) {
		return res.status(400).send({
			data: {
				message: 'missing session token',
				code: 'MISSING_TOKEN'
			},
			status: 400
		});
	}

	if (!_jwt2.default.verifyToken(authorization)) {
		return res.status(400).send({
			data: {
				message: 'invalid token data',
				code: 'INVALID_TOKEN'
			},
			status: 400
		});
	}

	next(_jwt2.default.decodeToken(authorization));
};

var loginCheckers = function loginCheckers(req, res, next) {
	var _req$body2 = req.body,
	    username = _req$body2.username,
	    password = _req$body2.password;


	if (!username || !password) {
		return res.status(400).send({
			data: {
				message: 'missing data from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		});
	}

	next();
};

var taskCheckers = function taskCheckers(req, res, next) {
	var title = req.body.title;

	if (!title) {
		return res.status(400).send({
			data: {
				message: 'missing title from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		});
	}
	next();
};

exports.userCheckers = userCheckers;
exports.loginCheckers = loginCheckers;
exports.sessionCheckers = sessionCheckers;
exports.taskCheckers = taskCheckers;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _mongo = require('./../db/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _crypto = require('./../helpers/crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = new _mongo2.default.Schema({
	_id: {
		type: String,
		default: _shortid2.default.generate
	},
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

exports.default = _mongo2.default.model('users', users);
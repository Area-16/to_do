'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tasks = new _mongoose2.default.Schema({
	_id: {
		type: String,
		default: _shortid2.default.generate
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	done: {
		type: Boolean,
		default: false
	},
	author: {
		type: String,
		ref: 'users',
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

exports.default = _mongoose2.default.model('tasks', tasks);
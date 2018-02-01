'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(process.env.MONGO_URI || 'mongodb://mongo/todo', function (err) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
});

exports.default = _mongoose2.default;
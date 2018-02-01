'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Start = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _responseTime = require('response-time');

var _responseTime2 = _interopRequireDefault(_responseTime);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _env = require('./../config/env');

var _cors = require('./cors');

var _cors2 = _interopRequireDefault(_cors);

var _userController = require('./../api/controllers/user-controller');

var _userController2 = _interopRequireDefault(_userController);

var _taskController = require('./../api/controllers/task-controller');

var _taskController2 = _interopRequireDefault(_taskController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var envValues = (0, _env.getEnv)();

app.use([(0, _bodyParser.json)(), (0, _bodyParser.urlencoded)({ extended: true })]);
app.use([(0, _compression2.default)(), (0, _responseTime2.default)()]);
app.use((0, _helmet2.default)({ hidePoweredBy: true }));
app.use(_cors2.default);
app.use('/api', [_userController2.default, _taskController2.default]);
app.set('port', parseInt(envValues.PORT) || 3000);

function Start() {
	app.listen(app.get('port'), '0.0.0.0', function (err) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.info('Server running on port: ' + app.get('port'));
	});
}

exports.Start = Start;
exports.default = app;
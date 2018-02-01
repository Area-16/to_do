'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hasher = function () {
	function Hasher() {
		_classCallCheck(this, Hasher);
	}

	_createClass(Hasher, null, [{
		key: 'createMd5',
		value: function createMd5(toBeHashed) {
			try {
				return (0, _crypto.createHash)('md5').update(toBeHashed.toString()).digest('hex');
			} catch (err) {
				return false;
			}
		}
	}, {
		key: 'compareMd5',
		value: function compareMd5(text, hashed) {
			return hashed === Hasher.createMd5(text);
		}
	}, {
		key: 'createBcryptHash',
		value: function createBcryptHash(text) {
			try {
				return _bcryptjs2.default.hashSync(text, 10);
			} catch (err) {
				return false;
			}
		}
	}, {
		key: 'compareBcrypt',
		value: function compareBcrypt(text, hash) {
			try {
				return _bcryptjs2.default.compareSync(text, hash);
			} catch (err) {
				return false;
			}
		}
	}]);

	return Hasher;
}();

exports.default = Hasher;
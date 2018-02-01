'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.startSession = undefined;

var _users = require('./../../models/users');

var _users2 = _interopRequireDefault(_users);

var _crypto = require('./../../helpers/crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jwt = require('./../../helpers/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _treater = require('./../../helpers/treater');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findUserById = function findUserById(_ref) {
  var _id = _ref._id;

  return new Promise(function (resolve, reject) {
    _users2.default.findById(_id).then(function (data) {
      if (data) {
        return resolve(data);
      }
      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var startSession = function startSession(_ref2) {
  var username = _ref2.username,
      password = _ref2.password;

  return new Promise(function (resolve, reject) {
    var hash = _crypto2.default.createMd5(password);
    _users2.default.findOne({ username: username, password: hash }).then(function (data) {
      if (data) {
        var token = _jwt2.default.createToken({ _id: data._id });
        return resolve({ token: token });
      }
      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var verifyDuplication = function verifyDuplication(_ref3) {
  var username = _ref3.username;

  return new Promise(function (resolve, reject) {
    _users2.default.findOne({ username: username }).then(function (data) {
      if (!data) {
        return resolve({ notFound: true });
      }
      throw new Error('duplicate username');
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var createUser = function createUser(_ref4) {
  var name = _ref4.name,
      username = _ref4.username,
      password = _ref4.password;

  return new Promise(function (resolve, reject) {
    verifyDuplication({ username: username }).then(function (data) {
      var hash = _crypto2.default.createBcryptHash(password);
      _users2.default.create({ name: name, username: username, password: hash }).then(function (newUser) {
        if (newUser) {
          return resolve(newUser);
        }

        throw new Error('create error');
      }).catch(function (err) {
        return reject((0, _treater.errorTreater)(err.message));
      });
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

exports.startSession = startSession;
exports.createUser = createUser;
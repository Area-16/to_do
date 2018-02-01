'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneTask = exports.updateTask = exports.updateTaskStatus = exports.deleteTask = exports.createTask = exports.findByAuthor = undefined;

var _tasks = require('./../../models/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _jwt = require('./../../helpers/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _treater = require('./../../helpers/treater');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findByAuthor = function findByAuthor(_ref) {
  var author = _ref.author;

  return new Promise(function (resolve, reject) {
    _tasks2.default.find({ author: author }).sort({ createdAt: 'desc' }).then(function (data) {
      if (data.length) return resolve(data);

      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var createTask = function createTask(_ref2) {
  var title = _ref2.title,
      description = _ref2.description,
      author = _ref2.author;

  return new Promise(function (resolve, reject) {
    _tasks2.default.create({ title: title, description: description, author: author }).then(function (data) {
      if (data) return resolve(data);

      throw new Error('create error');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var getOneTask = function getOneTask(_ref3) {
  var _id = _ref3._id,
      author = _ref3.author;

  return new Promise(function (resolve, reject) {
    _tasks2.default.find({ _id: _id, author: author }).then(function (data) {
      if (!data.length) throw new Error('not found');

      return resolve(data);
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var deleteTask = function deleteTask(_ref4) {
  var _id = _ref4._id;

  return new Promise(function (resolve, reject) {
    _tasks2.default.remove({ _id: _id }).then(function (data) {
      if (data.n > 0) {
        return resolve({ sucess: true });
      }

      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var updateTaskStatus = function updateTaskStatus(_ref5) {
  var _id = _ref5._id,
      done = _ref5.done;

  return new Promise(function (resolve, reject) {
    _tasks2.default.findByIdAndUpdate(_id, { done: done }, { new: true }).then(function (data) {
      if (data) return resolve(data);

      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

var updateTask = function updateTask(_ref6) {
  var _id = _ref6._id,
      title = _ref6.title,
      description = _ref6.description,
      done = _ref6.done;

  return new Promise(function (resolve, reject) {
    _tasks2.default.findByIdAndUpdate(_id, { title: title, description: description, done: done || 0 }, { new: true }).then(function (data) {
      if (data) return resolve(data);

      throw new Error('not found');
    }).catch(function (err) {
      return reject((0, _treater.errorTreater)(err.message));
    });
  });
};

exports.findByAuthor = findByAuthor;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
exports.updateTaskStatus = updateTaskStatus;
exports.updateTask = updateTask;
exports.getOneTask = getOneTask;
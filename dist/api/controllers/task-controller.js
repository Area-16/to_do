'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _checkers = require('./../../helpers/checkers');

var _taskServices = require('./../services/task-services');

var routing = (0, _express.Router)();

routing.post('/v1/tasks', _checkers.sessionCheckers, function (token, req, res, next) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description;
  var _id = token._id;

  (0, _taskServices.createTask)({ title: title, description: description, author: _id }).then(function (data) {
    return res.send({
      data: data,
      status: 201
    }).status(201);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

routing.get('/v1/tasks/author/:author', _checkers.sessionCheckers, function (token, req, res, next) {
  var _id = token._id;
  var author = req.params.author;

  (0, _taskServices.findByAuthor)({ author: _id || author }).then(function (data) {
    return res.send({
      data: data,
      status: 201
    }).status(201);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

routing.get('/v1/tasks/:task/author/:author', _checkers.sessionCheckers, function (token, req, res, next) {
  var _id = token._id;
  var _req$params = req.params,
      task = _req$params.task,
      author = _req$params.author;

  (0, _taskServices.getOneTask)({
    _id: task,
    author: _id || author
  }).then(function (data) {
    return res.send({
      data: data,
      status: 201
    }).status(201);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

routing.patch('/v1/tasks/:task/status/:done', _checkers.sessionCheckers, function (token, req, res, next) {
  var _req$params2 = req.params,
      task = _req$params2.task,
      done = _req$params2.done;

  (0, _taskServices.updateTaskStatus)({
    _id: task,
    done: done
  }).then(function (data) {
    return res.send({
      data: data,
      status: 201
    }).status(201);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

routing.put('/v1/tasks/:_id', _checkers.taskCheckers, _checkers.sessionCheckers, function (token, req, res, next) {
  var _id = req.params._id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      description = _req$body2.description,
      done = _req$body2.done;

  (0, _taskServices.updateTask)({
    _id: _id,
    title: title,
    description: description,
    done: done
  }).then(function (data) {
    return res.send({
      data: data,
      status: 201
    }).status(201);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

routing.delete('/v1/tasks/:_id', _checkers.sessionCheckers, function (token, req, res, next) {
  var _id = req.params._id;

  (0, _taskServices.deleteTask)({ _id: _id }).then(function (data) {
    return res.send({
      data: data,
      status: 200
    }).status(200);
  }).catch(function (data) {
    return res.status(data.status || 500).send({
      data: {
        message: data.message,
        code: data.code
      },
      status: data.status || 500
    });
  });
});

exports.default = routing;
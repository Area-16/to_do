'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _checkers = require('./../../helpers/checkers');

var _userServices = require('./../services/user-services');

var routing = (0, _express.Router)();

routing.post('/v1/users', _checkers.userCheckers, function (req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      username = _req$body.username,
      password = _req$body.password;

  return (0, _userServices.createUser)({
    name: name,
    username: username,
    password: password
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

routing.post('/v1/users/session', _checkers.loginCheckers, function (req, res, next) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  (0, _userServices.startSession)({ username: username, password: password }).then(function (data) {
    res.setHeader('Authorization', data.token);
    return res.status(200).send({
      data: {
        sucess: true
      },
      status: 200
    });
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
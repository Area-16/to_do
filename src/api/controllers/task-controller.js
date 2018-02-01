import { Router } from 'express'

import { sessionCheckers, taskCheckers } from './../../helpers/checkers'
import { createTask, deleteTask, updateTaskStatus, updateTask, findByAuthor, getOneTask } from './../services/task-services' 


const routing = Router()

routing.post('/v1/tasks', sessionCheckers, (token, req, res, next) => {
  const { title, description } = req.body
  const { _id } = token
  createTask({ title, description, author: _id  })
    .then((data) => {
      return res.send({
        data,
        status: 201
      }).status(201)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

routing.get('/v1/tasks/author/:author', sessionCheckers, (token, req, res, next) => {
  const { _id } = token
  const { author } = req.params
  findByAuthor({ author: _id || author })
    .then((data) => {
      return res.send({
        data,
        status: 201
      }).status(201)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

routing.get('/v1/tasks/:task/author/:author', sessionCheckers, (token, req, res, next) => {
  const { _id } = token
  const { task, author } = req.params
  getOneTask({
    _id: task,
    author: _id || author
  })
    .then((data) => {
      return res.send({
        data,
        status: 201
      }).status(201)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

routing.patch('/v1/tasks/:task/status/:done', sessionCheckers, (token, req, res, next) => {
  const { task, done } = req.params
  updateTaskStatus({
    _id: task,
    done
  })
    .then((data) => {
      return res.send({
        data,
        status: 201
      }).status(201)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

routing.put('/v1/tasks/:_id', taskCheckers, sessionCheckers, (token, req, res, next) => {
  const { _id } = req.params
  const { title, description, done } = req.body
  updateTask({
    _id,
    title,
    description,
    done
  })
    .then((data) => {
      return res.send({
        data,
        status: 201
      }).status(201)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

routing.delete('/v1/tasks/:_id', sessionCheckers,  (token, req, res, next) => {
  const { _id } = req.params
  deleteTask({ _id })
    .then((data) => {
      return res.send({
        data,
        status: 200
      }).status(200)
    })
    .catch((data) => 
      res.status(data.status || 500)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status || 500
      })
    )
})

export default routing

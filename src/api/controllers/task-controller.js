import { Router } from 'express'

import { sessionCheckers, taskCheckers } from './../../helpers/checkers'
import { createTask, deleteTask, updateTaskStatus, updateTask, findByAuthor, getOneTask } from './../services/task-services' 


const routing = Router()

routing.post('/v1/tasks', sessionCheckers, (req, res, next) => {
  const decodedToken = req.userSession
  const { _id } = decodedToken
  const { title, description } = req.body
  createTask({ title, description, author: _id  })
    .then((data) => {
      const status = 201
      return res.send({
        data,
        status
      }).status(status)
    })
    .catch((data) => 
      res.status(data.status)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status
      })
    )
})

routing.get('/v1/tasks/author/:author', sessionCheckers, (req, res, next) => {
  const decodedToken = req.userSession
  const { _id } = decodedToken
  const { author } = req.params
  findByAuthor({ author: _id || author })
    .then((data) => {
      const status = 201
      return res.send({
        data,
        status
      }).status(status)
    })
    .catch((data) => 
      res.status(data.status)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status
      })
    )
})

routing.get('/v1/tasks/:task/author/:author', sessionCheckers, (req, res, next) => {
  const decodedToken = req.userSession
  const { _id } = decodedToken
  const { task, author } = req.params
  getOneTask({
    _id: task,
    author: _id || author
  })
    .then((data) => {
      const status = 201
      return res.send({
        data,
        status
      }).status(status)
    })
    .catch((data) => 
      res
        .send({ 
          data: {
            message: data.message,
            code: data.code,
          },
          status: data.status
        }).status(data.status)
    )
})

routing.patch('/v1/tasks/:task/status/:done', sessionCheckers, (req, res, next) => {
  const { task, done } = req.params
  const decodedToken = req.userSession
  
  updateTaskStatus({
    _id: task,
    done
  })
    .then((data) => {
      const status = 201
      return res.send({
        data,
        status
      }).status(status)
    })
    .catch((err) => {
      const { status, message, code } = err
      return res.status(status)
      .send({ 
        data: {
          message: message,
          code: code,
        },
        status
      })
    })
})

routing.put('/v1/tasks/:_id', taskCheckers, sessionCheckers, (req, res, next) => {
  const { _id } = req.params
  const { title, description, done } = req.body
  const decodedToken = req.userSession

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
      res.status(data.status)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status
      })
    )
})

routing.delete('/v1/tasks/:_id', sessionCheckers,  (req, res, next) => {
  const { _id } = req.params
  deleteTask({ _id })
    .then((data) => {
      return res.send({
        data,
        status: 200
      }).status(200)
    })
    .catch((data) => 
      res.status(data.status)
      .send({ 
        data: {
          message: data.message,
          code: data.code,
        },
        status: data.status
      })
    )
})

export default routing

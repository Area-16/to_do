import { Router } from 'express'

import { userCheckers, loginCheckers } from './../../helpers/checkers'
import { startSession, createUser } from './../services/user-services'

const routing = Router()

routing.post('/v1/users', userCheckers, (req, res, next) => {
  const { name, username, password } = req.body
  return createUser({
    name: name,
    username: username,
    password: password
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

routing.post('/v1/users/session', loginCheckers, (req, res, next) => {
  const { username, password } = req.body
  startSession({ username, password })
    .then((data) => {
      res.setHeader('Authorization', data.token)
      return res
        .status(200)
        .send({ 
          data: {
            sucess: true
          },
          status: 200
        })
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

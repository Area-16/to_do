import task from './../../models/tasks'
import Jwt from './../../helpers/jwt'
import { errorTreater } from './../../helpers/treater'

const findByAuthor = ({ author }) => {
  return new Promise((resolve, reject) => {
    task.find({ author }).populate('author')
    .sort({ createdAt: 'desc' })
    .then((data) => {
      if (data.length) return resolve(data)

      throw new Error('not found')
    })
    .catch((err) => {
      return reject(errorTreater(err.message))
    })
  })
}

const createTask = ({ title, description, author }) => {
  return new Promise((resolve, reject) => {
    task.create({ title, description, author })
      .then((data) => {
        if (data) return resolve(data)

        throw new Error('create error')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const getOneTask = ({ _id, author }) => {
  return new Promise((resolve, reject) => {
    task.find({ _id, author }).populate('author')
      .then((data) => {
        if (!data.length) throw new Error('not found')

        return resolve(data)
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const deleteTask = ({ _id }) => {
  return new Promise((resolve, reject) => {
    task.remove({ _id })
      .then((data) => {
        if (data.n > 0) {
          return resolve({ sucess: true })
        }

        throw new Error('not found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const updateTaskStatus = ({ _id, done }) => {
  return new Promise((resolve, reject) => {
    task.findByIdAndUpdate(_id, { done }, { new: true })
      .then((data) => {
        if (data) return resolve(data)

        throw new Error('not found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const updateTask = ({ _id, title, description, done }) => {
  return new Promise((resolve, reject) => {
    task.findByIdAndUpdate(_id, { title, description, done: done || 0 }, { new: true })
      .then((data) => {
        if (data) return resolve(data)

        throw new Error('not found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

export { findByAuthor, createTask, deleteTask, updateTaskStatus, updateTask, getOneTask }

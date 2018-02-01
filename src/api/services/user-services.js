import user from './../../models/users'
import Crypto from './../../helpers/crypto'
import Jwt from './../../helpers/jwt'
import { errorTreater } from './../../helpers/treater'

const findUserById = ({ _id }) => {
  return new Promise((resolve, reject) => {
    user.findById(_id)
      .then((data) => {
        if (data) {
          return resolve(data)
        }
        throw new Error('not found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const startSession = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const hash = Crypto.createBcryptHash(password)
    user.findOne({ username, password: hash })
      .then((data) => {
        if (data) {
          const token = Jwt.createToken({ _id: data._id })
          return resolve({ token })
        }
        throw new Error('not found')
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const verifyDuplication = ({ username }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ username })
      .then((data) => {
        if (!data) {
          return resolve({ notFound: true })
        }
        throw new Error('duplicate username')
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const createUser = ({ name, username, password }) => {
  return new Promise((resolve, reject) => {
    verifyDuplication({ username })
      .then((data) => {     
        const hash = Crypto.createBcryptHash(password)
        user.create({ name, username, password: hash })
          .then((newUser) => {
            if (newUser) {
              return resolve(newUser)
            }

            throw new Error('create error')
          })
          .catch((err) => {
            return reject(errorTreater(err.message))
          })
        })
        .catch((err) => {
          return reject(errorTreater(err.message))
      })
  })
}

export { startSession, createUser }

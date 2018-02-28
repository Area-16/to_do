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

const findByEmail = ({ email : String }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ email })
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

const startSession = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ email })
      .select('+password')
      .then(data => {
        if (data) {
          if (Crypto.compareBcrypt(password, data.password)) {
            const token = Jwt.createToken({ _id: data._id })
            return resolve({ token })
          }
          throw new Error('incorrect session')
        }
        throw new Error('not found')
      })
      .catch(err => {
        return reject(errorTreater(err.message))
      })
  })
}

const verifyDuplication = ({ email }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ email })
      .then((data) => {
        if (!data) {
          return resolve({ notFound: true })
        }
        throw new Error('duplicate email')
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const createUser = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    verifyDuplication({ email })
      .then((data) => {
        const hash = Crypto.createBcryptHash(password)
        user.create({ name, email, password: hash })
          .then((newUser) => {
            if (newUser) {
              const token = Jwt.createToken({ _id: newUser._id })
              return resolve({ user: newUser, token })
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

const updateTokenAndExpiration = ({ _id: String }, { tokenPassword: String, tokenExpiration: String }) => {
  return new Promise((resolve, reject) => {
    user.findByIdAndUpdate(_id, {
      '$set': {
        tokenPassword,
        tokenExpiration
      }
    })
      .then(() => {
        return resolve({ sucess: true })
      })
      .catch((err) => {
        return reject(errorTreater(err.message))
      })
  })
}

const findUserAndSelect = ({ email: String }, { select: String }) => {
  return new Promise((resolve, reject) => {
    user.findOne({ email })
      .select(select)
      .then((data) => {
        if (!data) throw new Error('not found')
        return resolve(data)
      })
      .catch((err) => reject(errorTreater(err.message)))
  })
}

export { startSession, createUser, findByEmail, updateTokenAndExpiration, findUserAndSelect }

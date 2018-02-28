import shortId from 'shortid'
import { hashSync } from 'bcryptjs'

import connection from './../db/mongo'

const users = new connection.Schema({
	_id: {
		type: String,
		default: shortId.generate
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	tokenPassword: {
		type: String,
		select: false
	},
	tokenExpiration: {
		type: Date,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

users.pre('create', async (next) => {
	const hash = await hashSync(this.password, 10)
	this.password = hash

	next()
})

export default connection.model('users', users)

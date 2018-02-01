import shortId from 'shortid'

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
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default connection.model('users', users)

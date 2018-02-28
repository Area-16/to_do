import Mongoose from 'mongoose'
import shortId from 'shortid'

const tasks = new Mongoose.Schema({
	_id: {
		type: String,
		default: shortId.generate
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	done: {
		type: Boolean,
		default: false
	},
	author: {
		type: String,
		ref: 'users',
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
})

export default Mongoose.model('tasks', tasks)

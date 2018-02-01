import Mongo from 'mongoose'

Mongo.Promise = global.Promise

Mongo.connect(process.env.MONGO_URI || 'mongodb://mongo/todo', (err) => {
	if (err) {
		console.error(err)
		process.exit(1)	
	}
})

export default Mongo

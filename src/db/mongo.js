import Mongo from 'mongoose'

Mongo.Promise = global.Promise

Mongo.connect(process.env.MONGO_URI || 'mongodb://mongo/intelUp', (err) => {
	if (err) {
		console.error(err)
		process.exit(1)	
	}
})

export default Mongo

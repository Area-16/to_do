import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import responseTime from 'response-time'
import helmet from 'helmet'

import { getEnv } from './../config/env'
import cors from './cors'
import userRoutes from './../api/controllers/user-controller'
import taskRoutes from './../api/controllers/task-controller'

const app = express()
const envValues = getEnv()

app.use([json(), urlencoded({ extended: true })])
app.use([compression(), responseTime()])
app.use(helmet({ hidePoweredBy: true }))
app.use(cors)
app.use('/api', [userRoutes, taskRoutes])
app.set('port', parseInt(envValues.PORT) || 3000)

function Start() { 
	app.listen(app.get('port'), '0.0.0.0', (err) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
		console.info('Server running on port: '+ app.get('port'))
	})
}

export { Start }
export default app
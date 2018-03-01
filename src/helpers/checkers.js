import Jwt from './jwt'

const userCheckers = (req, res, next) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		return res.status(400).send({
			data: {
				message: 'missing data from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		})
	}
	next()
}

const sessionCheckers = (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(400).send({
			data: {
				message: 'missing session token',
				code: 'MISSING_TOKEN'
			},
			status: 400
		})
	}

	if (!Jwt.verifyToken(authorization)) {
		return res.status(400).send({
			data: {
				message: 'invalid token data',
				code: 'INVALID_TOKEN'
			},
			status: 400
		})
	}
	req.userSession = Jwt.decodeToken(authorization)
	next()
}

const loginCheckers = (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send({
			data: {
				message: 'missing data from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		})
	}

	next()
}

const taskCheckers = (req, res, next) => {
	const { title } = req.body
	if (!title) {
		return res.status(400).send({
			data: {
				message: 'missing title from the payload',
				code: 'INCORRECT_PAYLOAD'
			},
			status: 400
		})
	}
	next()
}


export { userCheckers, loginCheckers, sessionCheckers, taskCheckers }

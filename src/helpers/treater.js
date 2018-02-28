export function errorTreater(message) {
	const error = {
		message: '',
		code: '',
		status: 200
	}

	switch (message) {
	case 'not found':
		error.message = 'The data your searching could not be found',
		error.code = 'NOT_FOUND',
		error.status = 404
		break
		
	case 'create error':
		error.message = 'Your payload could not be inserted in the dabase, try again later',
		error.code = 'CREATE_ERROR',
		error.status = 500
		break
		
	case 'encrypt error':
		error.message = 'Your payload could not be handled, try again later',
		error.code = 'PWD_ERROR',
		error.status = 400
		break
		
	case 'duplicate username':
		error.message = 'This username is taken',
		error.code = 'DUPLICATE_ERROR',
		error.status = 400
		break
		
	case 'incorrect session':
		error.message = 'Invalid user/password data',
		error.code =  'SESSION_ERROR',
		error.status = 400
		break
		
	default:
		error.message = 'An unexpected error ocurred, try again',
		error.code = 'UNEXPECTED_ERR',
		error.status = 500
		break

	}

	return error
} 
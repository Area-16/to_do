'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.errorTreater = errorTreater;
function errorTreater(message) {
	var error = {};

	switch (message) {
		case 'not found':
			error = {
				message: 'The data your searching could not be found',
				code: 'NOT_FOUND',
				status: 404
			};
			break;

		case 'create error':
			error = {
				message: 'Your payload could not be inserted in the dabase, try again later',
				code: 'CREATE_ERROR',
				status: 500
			};
			break;

		case 'encrypt error':
			error = {
				message: 'Your payload could not be handled, try again later',
				code: 'PWD_ERROR',
				status: 400
			};
			break;

		case 'duplicate username':
			error = {
				message: 'This username is taken',
				code: 'DUPLICATE_ERROR',
				status: 400
			};
			break;

		case 'incorrect session':
			error = {
				message: 'Invalid user/password data',
				code: 'SESSION_ERROR',
				status: 400
			};
			break;

		default:
			error = {
				message: message,
				code: 'UNEXPECTED_ERR',
				status: 500
			};
			break;

	}

	return error;
}
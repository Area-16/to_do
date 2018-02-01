import { createHash } from 'crypto'
import bcrypt from 'bcryptjs'

export default class Hasher {
	static createMd5 (toBeHashed) {
		try {
			return createHash('md5')
				.update(toBeHashed.toString())
				.digest('hex')
		} catch (err) {
			return false
		}
	}
  
	static compareMd5 (text, hashed) {
		return (hashed === Hasher.createMd5(text))
	}

	static createBcryptHash(text) {
		try {
			return bcrypt.hashSync(text, 10)
		} catch (err) {
			return false
		}
	}

	static compareBcrypt(text, hash) {
		try {
			return bcrypt.compareSync(text, hash)
		} catch (err) {
			return false
		}
	}
}

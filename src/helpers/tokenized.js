export function resetToken ( clientToken, dbToken, expiration ) {
  if (Date() > expiration) {
    return { message: 'Your token timer has expired, generate a new one', status: 400, code: 'PASS_TOKEN_EXPIRED' }
  }

  if ( clientToken !== dbToken) {
    return { message: 'Invalid token provided', status: 400, code: 'INVALID_PASS_TOKEN' }
  }

  return true
}

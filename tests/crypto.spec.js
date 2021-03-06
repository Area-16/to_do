import { expect } from 'chai'

import Crypto from './../src/helpers/crypto'

describe('Crypto:::', () => {
  const text =  'a simple string'
  const hashedMd5 = Crypto.createMd5(text)
  const hashedCrypto = Crypto.createBcryptHash(text)

  it('Crypto should be a function', (done) => {
    expect(Crypto).to.be.a('function')
    done()
  })

  it('createMd5 should be a function', (done) => {
    expect(Crypto.createMd5).to.be.a('function')
    done()
  })

  it('compareMd5 should be a function', (done) => {
    expect(Crypto.compareMd5).to.be.a('function')
    done()
  })

  it('createBcryptHash should be a function', (done) => {
    expect(Crypto.createBcryptHash).to.be.a('function')
    done()
  })

  it('compareBcrypt should be a function', (done) => {
    expect(Crypto.compareBcrypt).to.be.a('function')
    done()
  })

  it('should encrypt a simple string with Md5 and return a hashed string', (done) => {
    expect(Crypto.createMd5(text)).to.be.a('string')
    done()
  })

  it('should compare strings with Md5 and return true', (done) => {
    expect(Crypto.compareMd5(text, hashedMd5)).to.be.true
    done()
  })

  it('should encrypt a simple string with Bcrypt and return a hashed string', (done) => {
    expect(Crypto.createBcryptHash(text)).to.be.a('string')
    done()
  })

  it('should compare strings with Bcrypt and return true', (done) => {
    expect(Crypto.compareBcrypt(text, hashedCrypto)).to.be.true
    done()
  })
})
const chai = require('chai')
const expect = chai.expect

const Eloqua = require('..')

describe('client', function () {
  let eloqua

  before(() => {
    eloqua = new Eloqua({ siteName: process.env.siteName, username: process.env.username, password: process.env.password })
  })

  describe('methods', () => {
    it('should check to see if client has all endpoints defined', function () {
      expect(eloqua.contacts).to.be.a('object')
    })
  })

  describe('getBaseUrl', function () {
    it('should obtain a baseUrl from the login endpoint', async () => {
      const baseUrl = await eloqua.getBaseUrl()
      console.log(22, baseUrl)
      expect(baseUrl).to.be.a('string')
    })
  })

  describe('_init', () => {
    it('should set the baseUrl parameter on the client', async () => {
      await eloqua._init()
      expect(eloqua.baseUrl).to.be.a('string')
    })
  })
})

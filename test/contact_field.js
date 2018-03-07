const chai = require('chai')
const expect = chai.expect
const Eloqua = require('..')

describe('contact_field', function () {
  this.timeout(10000)
  let eloqua = new Eloqua({ siteName: process.env.siteName, username: process.env.username, password: process.env.password })

  describe('getAll', function () {
    it('should return a list of contact fields', async () => {
      const results = await eloqua.contacts.fields.getAll()
      // console.log(results)
      const { elements = {} } = results
      expect(elements).to.be.an('array')
      expect(results.page).to.be.a('number')
      expect(results.pageSize).to.be.a('number')
      expect(results.total).to.be.a('number')
      const field = elements && elements[0]
      expect(field.type).to.be.a('string')
      expect(field.name).to.be.a('string')
    })
  })

  describe('get', function () {
    let contactFieldId

    before(async () => {
      const results = await eloqua.contacts.fields.getAll()
      const field = results && results.elements && results.elements[0]
      contactFieldId = field.id
    })

    it('should return a contact field', async () => {
      const field = await eloqua.contacts.fields.get(contactFieldId)
      // console.log(field)
      expect(field.id).to.equal(contactFieldId)
      expect(field.type).to.be.an('string')
      expect(field.name).to.be.a('string')
    })
  })
})
